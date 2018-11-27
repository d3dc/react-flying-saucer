import { memo, lazy } from 'react'
import { withRouter, Switch } from 'react-router'
import { useHooks, useEffect } from 'use-react-hooks'

import Scope, { useScope } from '../Scope'
import { useApp } from '../app'
import useViews from './useViews'
import Boundary from './Boundary'

export default function createFeature(config = {}) {
  return Base => {
    const name = config.name || Base.displayName || Base.name

    const Feature = useHooks(({ match, path, children }) => {
      const app = useApp()
      const scope = useScope()

      // provide views under baseUrl
      // already routed, makes a new path, or "always on"
      const baseUrl = match?.url ?? path ? scope.base + path : scope.base
      const [routing, providedViews] = useViews(baseUrl, config.views)

      // don't override the base if there is no match
      const render = ({ match }) => (
        <Base>
          <Boundary fallback={config.placeholder} recovery={config.recovery}>
            <Scope
              base={match?.url}
              views={providedViews}
              elements={config.elements}
            >
              <Switch>
                {routing}
                {children}
              </Switch>
            </Scope>
          </Boundary>
        </Base>
      )

      useEffect(() => {
        app.registerModels(config.models)
      })

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
