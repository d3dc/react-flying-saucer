import { createElement } from 'react'
import { useHooks, useContext, useMemo } from 'use-react-hooks'
import { Redirect as BaseRedirect } from 'react-router'
import { Switch, Route } from 'react-router'
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
      [view, scope, params]
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

export default { Switch, Route, Link, NavLink, Redirect }
