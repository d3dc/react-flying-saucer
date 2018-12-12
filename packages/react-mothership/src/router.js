import { useMemo } from 'use-react-hooks'
import { mapValues } from 'lodash'
import { useScope } from './Scope'

export { withRouter } from 'react-router'

export const useRouter = ~useScope().router

export const useNavigator = () => {
  const { views, router } = useScope()

  return useMemo(~mapValues(views, v => router.history.push(v(..._))), [
    router,
    views,
  ])
}
