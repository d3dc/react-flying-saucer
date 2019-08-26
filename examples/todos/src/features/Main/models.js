import { lift, _, it } from '@@/macro'
import { mapValues, omit, omitBy } from 'lodash/fp'
import uuid from 'uuid/v4'

export const ALL_TODOS = 'all'
export const ACTIVE_TODOS = 'active'
export const COMPLETED_TODOS = 'completed'

const initialState = {
  allTodos: {},
  filter: ALL_TODOS,
  editing: null,
}

const reducers = {
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
        [id]: { ...payload, id, completed: false },
      },
    }
  },
  edit(state, { todo, id, canceled }) {
    return {
      ...state,
      editing: canceled ? null : id ?? todo.id,
    }
  },
  save(state, { id, todo }) {
    return {
      ...state,
      editing: null,
      allTodos: {
        ...state.allTodos,
        [id ?? todo.id]: todo,
      },
    }
  },
  destroy(state, { todo, id }) {
    return {
      ...state,
      allTodos: state.allTodos |> omit(id ?? todo.id),
    }
  },
  toggle(state, { todo, id }) {
    const key = id ?? todo.id
    const current = state.allTodos[key]
    const next = { ...current, completed: !current.completed }
    return {
      ...state,
      allTodos: {
        ...state.allTodos,
        [key]: next,
      },
    }
  },
  toggleAll(state, { completed }) {
    return {
      ...state,
      allTodos: state.allTodos |> mapValues(todo => ({ ...todo, completed })),
    }
  },
  clearCompleted(state) {
    return {
      ...state,
      allTodos: state.allTodos |> omitBy(it.completed),
    }
  },
}

const selectors = (slice, createSelector) => ({
  byId() {
    return (state, id) => state.todos.allTodos[id]
  },
  count() {
    return createSelector(
      slice(it.allTodos),
      todos => Object.keys(todos).length
    )
  },
  activeCount() {
    return createSelector(
      slice(it.allTodos),
      todos => Object.values(todos).filter(it.completed === false).length
    )
  },
  completedCount() {
    return createSelector(
      this.count,
      this.activeCount,
      lift(_ - _)
    )
  },
  list() {
    return createSelector(
      slice(it.allTodos),
      slice(it.filter),
      (todos, filter) =>
        Object.values(todos).filter(
          do {
            if (filter === ACTIVE_TODOS) {
              it.completed === false
            } else if (filter === COMPLETED_TODOS) {
              it.completed === true
            } else {
              !!it
            }
          }
        )
    )
  },
})

const todos = {
  name: 'todos',
  state: initialState,
  reducers,
  selectors,
}

export default [todos]
