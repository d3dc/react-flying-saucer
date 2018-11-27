import { createModel } from '@@'
import { omit, omitBy } from 'lodash/fp'
import uuid from 'uuid/v4'

export const ALL_TODOS = 'all'
export const ACTIVE_TODOS = 'active'
export const COMPLETED_TODOS = 'completed'

const initialState = {
  allTodos: {},
  filter: ALL_TODOS,
  editing: null,
}

const changeReducers = {
  filter(state, { filter }) {
    return {
      ...state,
      filter,
    }
  },
  addTodo(state, payload) {
    const id = uuid()
    return {
      ...state,
      allTodos: {
        ...state.allTodos,
        [id]: { ...payload, id },
      },
    }
  },
  save(state, { todo }) {
    return {
      ...state,
      allTodos: {
        ...state.allTodos,
        [todo.id]: todo,
      },
    }
  },
  destroy(state, { todo }) {
    return {
      ...state,
      allTodos: state.allTodos |> omit(todo.id),
    }
  },
  toggle(state, { todo }) {
    const current = state.allTodos[todo.id]
    const next = { ...current, completed: !current.completed }
    return {
      ...state,
      allTodos: {
        ...state.allTodos,
        [todo.id]: next,
      },
    }
  },
  toggleAll(state, { completed }) {
    return {
      ...state,
      allTodos: Object.values(state.allTodos).reduce(
        (next, todo) => (next[todo.id] = { ...todo, completed }),
        {}
      ),
    }
  },
  clearCompleted(state) {
    return {
      ...state,
      allTodos: state.allTodos |> omitBy(_.completed),
    }
  },
}

const selectors = (slice, createSelector) => ({
  byId() {
    return (state, id) => state.allTodos[id]
  },
  count() {
    return slice(_.allTodos.length)
  },
  activeCount() {
    return slice(_.allTodos.filter(!_.completed).length)
  },
  completedCount() {
    return createSelector(count, activeCount, _ - _)
  },
  list() {
    return slice(state =>
      Object.values(state.allTodos).filter(
        do {
          if (state.filter === ACTIVE_TODOS) {
            _.completed === false
          } else if (state.filter === COMPLETED_TODOS) {
            _.completed === true
          } else {
            _ => _
          }
        }
      )
    )
  },
})

const todos = createModel({
  name: 'main',
  state: initialState,
  reducers: {
    ...changeReducers,
    ...loopReducers,
  },
  selectors,
})

export default [todos]
