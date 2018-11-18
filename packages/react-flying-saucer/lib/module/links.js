import context from '../context'
import { useHooks, useEffect, useContext } from 'use-react-hooks'
import { Link as BaseLink, NavLink as BaseNavLink } from 'react-router-dom'

const enhance = Comp =>
  useHooks(({ view, params, ...rest }) => {
    const app = useContext(context)
    const path = app.routing?.[view]?.(params)

    return <Comp path={path} {...rest} />
  })

export const Link = enhance(BaseLink)
export const NavLink = enhance(BaseNavLink)
