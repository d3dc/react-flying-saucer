import { trimStart, trimEnd } from 'lodash'
import { Switch, Route } from 'react-router'
import { useHooks } from 'use-react-hooks'

import { useProvided } from '../Scope'
import { useAppEffect } from '../store'

export function pathJoin(...parts) {
  const slash = '/'
  return parts.reduce((acc, p) => {
    return p === slash
      ? acc // preserve trailing slash
      : [trimEnd(acc, slash), trimStart(p, slash)].join(slash)
  })
}

export function createLinks(baseUrl, views) {
  return views?.reduce((obj, view) => {
    obj[view.name] = {
      exact: view.exact,
      resolve: view.resolve
        ? (...args) => pathJoin(baseUrl, view.resolve(...args))
        : () => pathJoin(baseUrl, view.path),
    }
    return obj
  }, {})
}

export function createRouting(baseUrl, views = []) {
  return (
    <Switch>
      {views.map(({ path, component, effect, redirect, ...rest }) => {
        const url = pathJoin(baseUrl, path)
        const render = renderHooks(
          effect && reduxHook(effect),
          redirect && redirectHook(redirect)
        )
        return (
          <Route
            key={url}
            path={url}
            render={render}
            component={component}
            {...rest}
          />
        )
      })}
    </Switch>
  )
}

function renderHooks(...hooks) {
  const used = hooks.filter(_ !== undefined)

  if (!used.length) {
    return undefined
  }

  return useHooks(~used.map(_.call()))
}

function reduxHook(effect) {
  return () => {
    useAppEffect(effect, [])
    return null
  }
}

function redirectHook(payload) {
  let view, params
  if (typeof payload === 'object') {
    const { to, ...rest } = payload
    view = to
    params = rest
  } else {
    view = payload
  }
  return () => {
    const { Redirect } = useProvided()
    return <Redirect key={view} view={view} params={params} />
  }
}
