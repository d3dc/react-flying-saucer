import { Children } from 'react'
import { useHooks, useMemo } from 'use-react-hooks'
import { merge } from 'lodash'
import { addLinks, pathJoin } from '../views'
import { useApp } from '../context'
import { context, useScope } from './context'

function Scope({ basePath, mounted, children, ...rest }) {
  const views = useViews(basePath, mounted)
  const scope = useScope()
  const value = merge({ views }, scope, rest)

  useModels(mounted)

  return <context.Provider value={value} children={children} />
}

Scope.displayName = 'Scope'

function useViews(basePath, mounted) {
  return useMemo(
    () => {
      const views = {}
      Children.forEach(mounted, child => {
        const featureName = child.type.featureConfig?.name
        const featureViews = child.type.featureConfig?.views
        const featurePath = pathJoin(basePath, child.props.path)
        const featureLink = {
          name: featureName,
          exact: child.props.exact,
          path: '/',
        }

        if (featureName) {
          addLinks(views, featurePath, [featureLink])
        }

        if (featureViews) {
          addLinks(views, featurePath, featureViews)
        }
      })
      return views
    },
    [basePath, mounted]
  )
}

function useModels(mounted) {
  const app = useApp()

  // TODO: layout effect
  useMemo(
    () =>
      Children.forEach(mounted, child => {
        const models = child.type.featureConfig?.models

        if (!models) {
          return
        }

        app.registerModels(models)
      }),
    [app, mounted]
  )
}

export default Scope |> useHooks
