import { trimStart, trimEnd } from 'lodash'
import { Switch, Route } from 'react-router'
import { useHooks } from 'use-react-hooks'

import { useProvided } from './scope'
import { useAppEffect } from './store'
import { Redirect } from './router'

export function pathJoin(...parts) {
  const slash = '/'
  return parts.reduce((acc, p) => {
    return p === slash
      ? acc // preserve trailing slash
      : [trimEnd(acc, slash), trimStart(p, slash)].join(slash)
  })
}

export function addLinks(dest, basePath, views) {
  views.forEach(view => {
    if (view.name) {
      dest[view.name] = view.resolve
        ? (...args) => pathJoin(basePath, view.resolve(...args))
        : () => pathJoin(basePath, view.path)
    }
  })
}

export function createRouting(basePath, views) {
  return (
    <Switch>
      {views.map(({ path, component, effect, redirect, ...rest }) => {
        const url = pathJoin(basePath, path)
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
  const used = hooks.filter(Boolean)

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
  return () => <Redirect key={view} view={view} params={params} />
}
