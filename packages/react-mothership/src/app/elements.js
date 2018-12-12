import { createElement } from 'react'
import { useHooks, useContext, useMemo } from 'use-react-hooks'
import { Switch, Route, Redirect as BaseRedirect } from 'react-router'
import { Link as BaseLink, NavLink as BaseNavLink } from 'react-router-dom'

import { useScope } from '../Scope'

const enhance = Comp =>
  useHooks(({ view, params, ...rest }) => {
    const scope = useScope()
    const [to, exact] = useMemo(
      () => {
        if (view) {
          const config = scope?.views?.[view]
          return [config?.resolve(params), config?.exact]
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
  })

export const Link = enhance(BaseLink)
export const NavLink = enhance(BaseNavLink)
export const Redirect = enhance(BaseRedirect)

// TODO: Can this be configurable?
export default { Switch, Route, Link, NavLink, Redirect }
