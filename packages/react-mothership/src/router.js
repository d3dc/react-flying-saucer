import { useContext, useMemo } from 'use-react-hooks'
import { mapValues } from 'lodash'
import { useScope } from './Scope'

const RouterContext = require('react-router').__RouterContext

export { withRouter } from 'react-router'

export const useRouter = ~useContext(RouterContext)

export const useNavigator = () => {
  const { history } = useRouter()
  const { views } = useScope()

  return useMemo(~mapValues(views, v => history.push(v(..._))), [
    history,
    views,
  ])
}
