import { createContext, useContext } from 'react'

export const context = createContext(null)
export const useApp = ~useContext(context)
export const { Provider } = context

export default context
