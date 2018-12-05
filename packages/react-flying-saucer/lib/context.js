import { createContext } from 'react'
import { useContext, useMemo } from 'use-react-hooks'

export const context = createContext(null)
export const useApp = ~useContext(context)
export const useModels = models => {
  const app = useContext(context)
  // TODO: this should work in 16.7
  // useLayoutEffect(() =>
  useMemo(() => models && app.registerModels(models))
}
export const { Provider } = context

export default context
