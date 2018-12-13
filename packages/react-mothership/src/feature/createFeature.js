import { memo, Children } from 'react'
import { withRouter, Route } from 'react-router'
import { useHooks, useMemo } from 'use-react-hooks'

import Scope from '../Scope'
import { useApp } from '../context'
import { createRouting, createLinks, pathJoin } from './views'
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
    function Feature({ path, exact, match, location, history, children }) {
      useModelRegistration(config.models)

      const baseUrl = pathJoin(match.path, path)
      const nested = useNestedLinks(name, path, children)

      const [routing, links] = useRouting(baseUrl, nested, config.views)

      const render = () => (
        <Boundary fallback={config.placeholder} recovery={config.recovery}>
          <Scope
            views={links}
            provides={config.provides}
            router={{ location, history }}
          >
            <Base>
              {routing}
              {children}
            </Base>
          </Scope>
        </Boundary>
      )

      return path ? (
        // conditional new path
        <Route path={baseUrl} exact={exact} render={render} />
      ) : (
        // "always on"
        render()
      )
    }

    const Wrapper = Feature |> useHooks |> memo |> withRouter

    Wrapper.displayName = `Feature(${name || 'Component'})`
    Wrapper.wrappedName = name
    Wrapper.WrappedComponent = Base

    return Wrapper
  }
}

function useNestedLinks(name, path, cs) {
  // only update when paths change
  const paths = Children.map(cs, _.props.path)?.filter(Boolean) ?? []
  return useMemo(
    () => {
      const list = []

      if (name) {
        list.push({
          name: name.toLowerCase(),
          path: '/',
        })
      }

      Children.forEach(cs, c => {
        if (c.type.wrappedName) {
          list.push({
            name: c.type.wrappedName.toLowerCase(),
            path: c.props.path,
          })
        }
      })

      return list
    },
    [path, ...paths]
  )
}

function useModelRegistration(models) {
  const app = useApp()
  // TODO: layout effect
  return useMemo(() => models && app.registerModels(models), [app])
}

function useRouting(baseUrl, nested, views = []) {
  // we know views won't change
  // and only need to update when paths change
  return useMemo(
    () => {
      return [
        createRouting(baseUrl, views),
        createLinks(baseUrl, [...nested, ...views]),
      ]
    },
    [baseUrl, nested]
  )
}
