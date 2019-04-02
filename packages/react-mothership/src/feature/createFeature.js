import { it } from 'param.macro'
import { useMemo, memo, Children } from 'react'
import { partition } from 'lodash'
import { withRouter, Switch, Route } from 'react-router'

import { Scope, useScope } from '../scope'
import { useApp } from '../context'
import { pathJoin } from '../path'
import createRoutes from './createRoutes'
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
    function Feature(props) {
      const { provides, path, exact, match, children } = props
      const basePath = pathJoin(match.path, path)
      const routes = useRoutes(name, basePath, config.views)
      const [withPath, nested] = usePartition(children)

      const render = () => (
        <Boundary fallback={config.placeholder} recovery={config.recovery}>
          <Scope
            name={name}
            basePath={basePath}
            provides={{
              ...config.provides,
              ...provides,
            }}
            hoist={children}
          >
            <Base {...props}>
              <Switch>
                {routes}
                {withPath}
              </Switch>
              {nested}
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

    const Wrapper = Feature |> memo |> withRouter

    Wrapper.displayName = `Feature(${name || 'Component'})`
    Wrapper.WrappedComponent = Base
    Wrapper.featureConfig = {
      ...config,
      name,
    }

    return Wrapper
  }
}

function useRoutes(name, basePath, views = []) {
  // we know name and views won't change
  // and only need to update when paths change
  return useMemo(() => createRoutes(basePath, views), [basePath])
}

function usePartition(children) {
  return useMemo(() => partition(Children.toArray(children), it.props.path), [
    children,
  ])
}
