import context from '../context'
import { useHooks, useEffect, useContext } from 'use-react-hooks'
import { lazy } from 'react'
import { Switch, Route } from 'react-router'

export default function createRoutes(routes) {
  return useHooks(function Routing({ baseUrl }) {
    const app = useContext(context)

    useEffect(() => {
      if (app.routing) {
        routes.forEach(route => {
          if (baseUrl) {
            app.routing[route.name] = route.view
              ? (...args) => baseUrl + route.view(...args)
              : () => baseUrl + route.path
          } else {
            app.routing[route.name] = route.view ?? (() => route.path)
          }
        })
      }
    })

    return (
      <Switch>
        {routes.map(({ path, component, loader, ...rest }) => (
          <Route
            key={path}
            path={baseUrl ? baseUrl + path : path}
            component={component || lazy(loader)}
            {...rest}
          />
        ))}
      </Switch>
    )
  })
}
