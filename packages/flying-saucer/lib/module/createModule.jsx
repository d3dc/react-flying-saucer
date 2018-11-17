import { memo } from 'react'
import { withRouter } from 'react-router'
import { useHooks, useEffect, useContext } from 'use-react-hooks'
import createRoutes from './createRoutes'
import Boundary from './Boundary'
import context from '../context'

export default function createModule(config = {}) {
  const Routes = createRoutes(config.routes)

  return Base => {
    const name = config.name || Base.displayName || Base.name

    const component = useHooks(function Module({ match }) {
      const app = useContext(context)

      useEffect(() => {
        app.registerModels(config.models)
      })

      return (
        <Base>
          <Boundary fallback={config.placeholder} recovery={config.recovery}>
            <Routes baseUrl={match?.url || ''} />
          </Boundary>
        </Base>
      )
    })

    component.displayName = `Module(${name})`

    return withRouter(memo(component))
  }
}
