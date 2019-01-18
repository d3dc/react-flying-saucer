import { trimStart, trimEnd } from 'lodash'

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
      dest[view.name] = {
        exact: view.exact,
        resolve: view.resolve
          ? (...args) => pathJoin(basePath, view.resolve(...args))
          : () => pathJoin(basePath, view.path),
      }
    }
  })
}
