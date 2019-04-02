import { it } from 'param.macro'
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
    component: lazy(() => import('./Signup')),
  },
  {
    name: 'login',
    path: '/login',
    component: lazy(() => import('./Login')),
  },
  {
    name: 'logout',
    path: '/logout',
    effect: it.account.logout(),
    redirect: 'login',
  },
]
