import { memo } from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { useHooks, useLayoutEffect, useMemo } from 'use-react-hooks'

import Scope, { useScope } from '../Scope'
import { useApp } from '../context'
import { createRoutes, createLinks } from './views'
import Boundary from './Boundary'

export default function createFeature(config = {}) {
  return Base => {
    const name = config.name || Base.displayName || Base.name

    const Feature = useHooks(({ match, path, children }) => {
      registersModels(config.models)

      const [routing, providedViews] = getRouting(config.views, path)

      // don't override the base if there is no match
      const render = ({ match }) => (
        <Boundary fallback={config.placeholder} recovery={config.recovery}>
          <Scope
            base={match?.url}
            views={providedViews}
            provides={config.provides}
          >
            <Base>
              <Switch children={routing} />
              {children}
            </Base>
          </Scope>
        </Boundary>
      )

      if (path) {
        // new path
        return <Route path={baseUrl} render={render} />
      } else {
        // already mounted, "always on"
        return render({ match })
      }
    })

    Feature.displayName = `Feature(${name})`

    return withRouter(memo(Feature))
  }
}

function registersModels(models) {
  const app = useApp()

  return useMemo(() => models && app.registerModels(models), [app])
}

function getRouting(views, path) {
  const scope = useScope()

  return useMemo(
    () => {
      const url = path ? scope.base + path : scope.base
      return [createRoutes(url, views), createLinks(url, views)]
    },
    [scope, path]
  )
}
