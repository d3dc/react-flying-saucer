import { createStore } from '../store'

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

export default function createApp({ inject, rematch } = {}) {
  const registeredModels = {}
  const store = createStore(rematch)
  const { select, dispatch, getState } = store

  return {
    store,
    inject: {
      ...inject,
      select,
      dispatch,
      getState,
    },
    registerModels(models = []) {
      models.forEach(model => {
        if (registeredModels[model.name] !== model) {
          registeredModels[model.name] = model
          store.model(enhance(model, inject))
        }
      })
    },
  }
}
