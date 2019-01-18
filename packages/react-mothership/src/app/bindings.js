import { useMemo } from 'use-react-hooks'

import { useApp } from '../context'
import { useScope } from '../scope'

export const useNavigator = () => {
  const app = useApp()
  const { views } = useScope()

  return useMemo(~app.navigate(views), [app, views])
}
