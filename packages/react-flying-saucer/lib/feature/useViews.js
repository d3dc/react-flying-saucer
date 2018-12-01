import { lazy } from 'react'
import { useMemo } from 'use-react-hooks'
import { Route } from 'react-router'

export default function useViews(baseUrl, views) {
  return useMemo(
    ~[
      views.map(({ path, component, loader, ...rest }) => {
        const url = baseUrl ? baseUrl + path : path
        return (
          <Route
            key={url}
            path={url}
            component={component ?? (loader ? lazy(loader) : undefined)}
            {...rest}
          />
        )
      }),
      views.reduce((obj, view) => {
        obj[view.name] = {
          exact: view.exact,
          resolve: view.resolve
            ? (...args) => baseUrl + view.resolve(...args)
            : () => baseUrl + view.path,
        }
        return obj
      }, {}),
    ],
    [baseUrl, views]
  )
}
