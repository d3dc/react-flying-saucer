import { memo } from 'react'
import { withRouter, Route } from 'react-router'
import { useHooks, useMemo } from 'use-react-hooks'

import Scope from '../Scope'
import { useApp } from '../context'
import { createRouting, createLinks } from './views'
import Boundary from './Boundary'

export default function createFeature(config = {}) {
  return Base => {
    const name = config.name || Base.displayName || Base.name

    /*
     * "If a Route does not have a path, and therefore always matches,
     * you'll get the closest parent match. Same goes for withRouter.""
     *
     * https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md
     */
    const Feature = useHooks(({ path, match, children }) => {
      registersModels(config.models)

      const baseUrl = getBaseUrl(match, path)
      const [routing, providedViews] = getRouting(baseUrl, config.views)

      const render = () => (
        <Boundary fallback={config.placeholder} recovery={config.recovery}>
          <Scope views={providedViews} provides={config.provides}>
            <Base>
              {routing}
              {children}
            </Base>
          </Scope>
        </Boundary>
      )

      if (path) {
        // new path
        return <Route path={baseUrl} render={render} />
      } else {
        // "always on", parent already mounted
        return render()
      }
    })

    Feature.displayName = `Feature(${name})`

    return withRouter(memo(Feature))
  }
}

function registersModels(models) {
  const app = useApp()

  // TODO: layout effect
  return useMemo(() => models && app.registerModels(models), [app])
}

function getBaseUrl(match, path) {
  if (!path) {
    return match.path
  }

  if (match.path === '/') {
    return path
  }

  return match.path + path
}

function getRouting(baseUrl, views) {
  return useMemo(
    () => {
      return [createRouting(baseUrl, views), createLinks(baseUrl, views)]
    },
    [baseUrl]
  )
}
