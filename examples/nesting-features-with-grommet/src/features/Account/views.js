import { lazy } from 'react'

export default [
  {
    path: '/',
    exact: true,
    redirect: 'signup',
  },
  {
    name: 'signup',
    path: '/signup',
    component: lazy(~import('./Signup')),
  },
  {
    name: 'login',
    path: '/login',
    component: lazy(~import('./Login')),
  },
  {
    name: 'logout',
    path: '/logout',
    effect: _.account.logout(),
    redirect: 'login',
  },
]
