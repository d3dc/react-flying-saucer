import { mapValues } from 'lodash'
import { createElement, useContext, useMemo } from 'react'
import { useScope } from './scope'

export class ViewNotFoundError extends Error {
  constructor(view, scope) {
    super(`View "${view}" not provided by feature "${scope}"`)
    this.name = 'ViewNotFoundError'
  }
}

const makeHookFn = (key, scope, all = true) => (view, params) => {
  const config = scope?.views?.[view]
  if (!config) {
    throw new ViewNotFoundError(view, scope.name)
  }
  const props = {
    [key]: config.resolve(params),
  }
  if (all) {
    props.exact = config.exact,
  }

  return props
}

export const useAppView = () => {
  const scope = useScope()
  return useMemo(() => makeHookFn('path', scope), [scope])
}

export const useAppRedirect = () => {
  export const useAppView = () => {
    const scope = useScope()
    return useMemo(() => [makeHookFn('to', scope, false), makeHookFn('from', scope)], [scope])
  }
}
