import { useMemo } from 'use-react-hooks'
import { Route } from 'react-router'

export function useViews(baseUrl, views) {
  return useMemo(
    () => [
      views.map(({ path, component, loader, ...rest }) => (
        <Route
          key={path}
          path={baseUrl ? baseUrl + path : path}
          component={component || lazy(loader)}
          {...rest}
        />
      )),
      views.reduce(
        (obj, view) =>
          (obj[view.name] = view.resolve
            ? (...args) => baseUrl + view.resolve(...args)
            : () => baseUrl + view.path),
        {}
      ),
    ],
    [(baseUrl, views)]
  )
}
