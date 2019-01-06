import { createBrowserHistory } from 'history'
import { createStore } from '../store'

// interface FlyingSaucerApp<ReduxStore, Model> {
//   store: ReduxStore;
//   history: History;
//   registerModels: (...models: Model[]) => void;
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
    history,
  }

  function registerModels(models) {
    models.forEach(model => {
      if (registeredModels[model.name] !== model) {
        registeredModels[model.name] = model
        store.model(enhance(model, inject))
      }
    })
  }

  return {
    store,
    history,
    registerModels,
  }
}
