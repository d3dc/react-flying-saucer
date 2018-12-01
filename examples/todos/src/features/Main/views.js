import { useHooks, useReduxEffect } from '@@'
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './models'

export default [
  {
    name: 'all',
    path: '/',
    exact: true,
    render: useHooks(() => {
      useReduxEffect(dispatch => {
        dispatch.todos.filter({ filter: ALL_TODOS, fromView: true })
      })
      return null
    }),
  },
  {
    name: 'active',
    path: '/active',
    render: useHooks(() => {
      useReduxEffect(dispatch => {
        dispatch.todos.filter({ filter: ACTIVE_TODOS, fromView: true })
      })
      return null
    }),
  },
  {
    name: 'completed',
    path: '/completed',
    render: useHooks(() => {
      useReduxEffect(dispatch => {
        dispatch.todos.filter({ filter: COMPLETED_TODOS, fromView: true })
      })
      return null
    }),
  },
]
