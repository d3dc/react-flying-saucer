import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './models'

export default [
  {
    name: 'all',
    path: '/',
    exact: true,
    effect: dispatch => dispatch.todos.filter({ filter: ALL_TODOS }),
  },
  {
    name: 'active',
    path: '/active',
    effect: dispatch => dispatch.todos.filter({ filter: ACTIVE_TODOS }),
  },
  {
    name: 'completed',
    path: '/completed',
    effect: dispatch => dispatch.todos.filter({ filter: COMPLETED_TODOS }),
  },
]
