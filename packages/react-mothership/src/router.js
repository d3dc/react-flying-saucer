import { mapValues } from 'lodash'
import { createElement, useContext, useMemo } from 'react'
import { Redirect as BaseRedirect } from 'react-router'
import { Link as BaseLink, NavLink as BaseNavLink } from 'react-router-dom'
import { useScope } from './scope'

export class ViewNotFoundError extends Error {
  constructor(view, scope) {
    super(`View "${view}" not provided by feature "${scope}"`)
    this.name = 'ViewNotFoundError'
  }
}

const enhance = Comp => ({ view, params, ...rest }) => {
  const scope = useScope()
  const [to, exact] = useMemo(
    () => {
      if (view) {
        const config = scope?.views?.[view]
        if (!config) {
          throw new ViewNotFoundError(view, scope.name)
        }
        return [config.resolve(params), config.exact]
      } else {
        return [undefined, undefined]
      }
    },
    [scope, view, params]
  )

  return createElement(Comp, {
    to,
    exact,
    ...rest,
  })
}

export const Link = BaseLink |> enhance
export const NavLink = BaseNavLink |> enhance
export const Redirect = BaseRedirect |> enhance
export { Switch, Route } from 'react-router'
export { withRouter } from 'react-router'
