import { memo } from 'react'
import { withRouter } from 'react-router'
import createRoutes from './createRoutes'
import Boundary from './Boundary'

export default function createModule(module = {}, app = {}) {
  if (app.store && module.models) {
    module.models.forEach(app.store.model)
  }

  const Routes = createRoutes(module.routes, app)

  return Base => {
    const name = module.name || Base.displayName || Base.name

    function module({ match }) {
      return (
        <Base>
          <Boundary fallback={module.placeholder} recovery={module.recovery}>
            <Routes baseUrl={match?.url || ''} />
          </Boundary>
        </Base>
      )
    }

    module.displayName = `Module(${name})`

    return withRouter(memo(module))
  }
}
