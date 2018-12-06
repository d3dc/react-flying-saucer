import { trimEnd } from 'lodash'
import { Switch, Route } from 'react-router'
import { useHooks } from 'use-react-hooks'

import { useAppEffect } from '../store'

function reduxView(effect) {
  return useHooks(() => {
    useAppEffect(effect)
    return null
  })
}

export function createLinks(baseUrl, views) {
  return views?.reduce((obj, view) => {
    obj[view.name] = {
      exact: view.exact,
      resolve: view.resolve
        ? (...args) => baseUrl + view.resolve(...args)
        : () => baseUrl + view.path,
    }
    return obj
  }, {})
}

export function createRouting(baseUrl, views = []) {
  return (
    <Switch>
      {views.map(({ path, component, effect, ...rest }) => {
        const url = baseUrl + path
        return (
          <Route
            key={url}
            path={url}
            render={effect && reduxView(effect)}
            component={component}
            {...rest}
          />
        )
      })}
    </Switch>
  )
}
