import { memo } from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { useHooks, useLayoutEffect } from 'use-react-hooks'

import Scope, { useScope } from '../Scope'
import { useModels } from '../context'
import useViews from './useViews'
import Boundary from './Boundary'

export default function createFeature(config = {}) {
  return Base => {
    const name = config.name || Base.displayName || Base.name

    const Feature = useHooks(({ match, path, children }) => {
      useModels(config.models)
      const scope = useScope()
      // provide views under baseUrl
      //makes a new path, or "always on"
      const baseUrl = path ? scope.base + path : scope.base
      const [routing, providedViews] = useViews(baseUrl, config.views)
      // don't override the base if there is no match
      const render = ({ match }) => (
        <Boundary fallback={config.placeholder} recovery={config.recovery}>
          <Scope
            base={match?.url}
            views={providedViews}
            provides={config.provides}
          >
            <Base>
              <Switch>
                {routing}
                {children}
              </Switch>
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
