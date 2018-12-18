import { mapValues } from 'lodash'
import { createElement } from 'react'
import { useHooks, useContext, useMemo } from 'use-react-hooks'
import { Redirect as BaseRedirect } from 'react-router'
import { Link as BaseLink, NavLink as BaseNavLink } from 'react-router-dom'
import { useScope } from './scope'

export const useNavigator = () => {
  const {
    views,
    provides: { history },
  } = useScope()

  return useMemo(
    ~mapValues(views, v => (...args) => history.push(v(...args))),
    [history, views]
  )
}

export class ViewNotFoundError extends Error {
  constructor(view, scope) {
    super(`View "${view}" not provided by feature "${scope}"`)
    this.name = 'ViewNotFoundError'
  }
}

const enhance = Comp =>
  useHooks(({ view, params, ...rest }) => {
    const scope = useScope()
    const to = useMemo(
      () => {
        if (view) {
          const resolve = scope?.views?.[view]
          if (!resolve) {
            throw new ViewNotFoundError(view, scope.name)
          }
          return resolve(params)
        } else {
          return undefined
        }
      },
      [scope, view, params]
    )

    return createElement(Comp, {
      to,
      ...rest,
    })
  })

export const Link = BaseLink |> enhance
export const NavLink = BaseNavLink |> enhance
export const Redirect = BaseRedirect |> enhance
export { Switch, Route } from 'react-router'
export { withRouter } from 'react-router'
