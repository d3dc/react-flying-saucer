import { mapValues } from 'lodash'
import { createBrowserHistory } from 'history'
import { createStore } from '../store'

// interface FlyingSaucerApp<ReduxStore, Model> {
//   store: ReduxStore;
//   history: History;
//   registerModels: (models: Model[], scope: Scope) => void;
//   navigate: (views: { [name]: View }) => { [name]: () => void }
// }

function enhance(model, inject) {
  return {
    ...model,
    effects:
      typeof model.effects === 'function'
        ? (...args) => model.effects(...args, inject)
        : model.effects,
    selectors:
      typeof model.selectors === 'function'
        ? (...args) => model.selectors(...args, inject)
        : model.selectors,
  }
}

/**
 * Create the default kind of app using rematch redux and overloading models with inject.
 *
 * @param {{ rematch: RematchConfig, inject: {} }} config
 *
 * @returns FlyingSaucerApp<RematchStore, RematchModel>
 */
export default function createApp(config = {}) {
  const registeredModels = {}
  const store = createStore(config.rematch)
  const { select, dispatch, getState } = store
  const history = createBrowserHistory()

  const inject = {
    ...config.inject,
    select,
    dispatch,
    getState,
  }

  function navigate(views) {
    return mapValues(views, v => (...args) => history.push(v.resolve(...args)))
  }

  function registerModels(models, scope) {
    models.forEach(model => {
      if (registeredModels[model.name] !== model) {
        const injected = { ...inject, navigator: navigate(scope.views) }
        registeredModels[model.name] = model
        store.model(enhance(model, injected))
      }
    })
  }

  return {
    store,
    history,
    registerModels,
    navigate,
  }
}
