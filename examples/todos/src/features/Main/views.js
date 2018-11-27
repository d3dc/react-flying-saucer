import { useReduxEffect } from '@@'
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from './models'

export default [
  {
    name: 'all',
    path: '/',
    render() {
      useReduxEffect(dispatch => {
        dispatch.todos.filter(ALL_TODOS)
      })
    },
  },
  {
    name: 'active',
    path: '/active',
    render() {
      useReduxEffect(dispatch => {
        dispatch.todos.filter(ACTIVE_TODOS)
      })
    },
  },
  {
    name: 'completed',
    path: '/completed',
    render() {
      useReduxEffect(dispatch => {
        dispatch.todos.filter(COMPLETED_TODOS)
      })
    },
  },
]
