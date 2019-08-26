import { it } from '@@/macro'
import { lazy } from 'react'

const views = [
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

export default views
