import { lazy } from 'react'
import { Switch, Route } from 'react-router'

export default function createRoutes(routes, app) {
  if (app.routing) {
    routes.forEach(
      route => (app.routing[route.name] = route.view || (() => route.path))
    )
  }

  return ({ baseUrl }) => (
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
}
