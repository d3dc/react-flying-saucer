import { createContext, useContext } from 'react'
import { get } from 'lodash'

class NotProvidedInScopeError extends Error {
  constructor(path, scope) {
    super(`Path "${path}" not provided by feature "${scope}"`)
    this.name = 'ViewNotFoundError'
  }
}

export const context = createContext({
  name: 'root',
  views: {},
  provides: {},
})

// toolkit
export function useScope() {
  return useContext(context)
}

// user
export function useProvided(...deps) {
  const scope = useContext(context)
  return deps.map(path => {
    const val = get(scope.provides, path)
    if (val === undefined) {
      throw new NotProvidedInScopeError(path, scope.name)
    }
    return val
  })
}
