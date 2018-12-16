import { memo, Children } from 'react'
import { withRouter, Route } from 'react-router'
import { useHooks, useMemo } from 'use-react-hooks'

import { Scope, useScope } from '../scope'
import { useApp } from '../context'
import { createRouting, pathJoin } from '../views'
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
    function Feature({ path, exact, match, children }) {
      const basePath = pathJoin(match.path, path)
      const routing = useRouting(name, basePath, config.views)

      const render = () => (
        <Boundary fallback={config.placeholder} recovery={config.recovery}>
          <Scope
            name={name}
            basePath={basePath}
            provides={config.provides}
            mounted={children}
          >
            <Base>
              {routing}
              {children}
            </Base>
          </Scope>
        </Boundary>
      )

      return path ? (
        // Wait to mount the Base, children and routing
        // and run any effects they have
        <Route path={basePath} exact={exact} render={render} />
      ) : (
        // "always on"
        render()
      )
    }

    const Wrapper = Feature |> useHooks |> memo |> withRouter

    Wrapper.displayName = `Feature(${name || 'Component'})`
    Wrapper.WrappedComponent = Base
    Wrapper.featureConfig = {
      ...config,
      name,
    }

    return Wrapper
  }
}

function useRouting(name, basePath, views = []) {
  // we know name and views won't change
  // and only need to update when paths change
  return useMemo(() => createRouting(basePath, views), [basePath])
}
