import { Children } from 'react'
import { useHooks, useMemo } from 'use-react-hooks'
import { merge } from 'lodash'
import { addLinks, pathJoin } from '../path'
import { useApp } from '../context'
import { context, useScope } from './context'

/**
 * Primitive used by Features and Mothership
 * for providing their context

 * @param       {string} basePath
 *              base path for views
 *
 * @param       {ReactElement | ReactElement[]} hoist
 *              react children to visit while looking for
 *              values to hoist in this scope
 *
 * @param       {ReactElement | ReactElement[][type]} children
 *              rendered react children
 *
 * @param       {...} rest
 *              any additional values that should be defined in scope
 *
 */
function Scope({ basePath, hoist, children, ...rest }) {
  const scope = useScope()
  const views = useViews(basePath, hoist)
  const value = merge({ views }, scope, rest)

  useModels(hoist)

  return <context.Provider value={value} children={children} />
}

Scope.displayName = 'Scope'

function useViews(basePath, hoisted) {
  return useMemo(
    () => {
      const views = {}
      Children.forEach(hoisted, child => {
        const featureName = child.type.featureConfig?.name
        const featureViews = child.type.featureConfig?.views
        const featurePath = pathJoin(basePath, child.props.path)

        if (featureName) {
          addLinks(views, featurePath, [
            {
              name: featureName,
              exact: child.props.exact,
              path: '/',
            },
          ])
        }

        if (featureViews) {
          addLinks(views, featurePath, featureViews)
        }
      })
      return views
    },
    [basePath, hoisted]
  )
}

function useModels(hoisted) {
  const app = useApp()

  // TODO: layout effect
  useMemo(
    () =>
      Children.forEach(hoisted, child => {
        const featureModels = child.type.featureConfig?.models

        if (!featureModels) {
          return
        }

        app.registerModels(featureModels)
      }),
    [app, hoisted]
  )
}

export default Scope |> useHooks
