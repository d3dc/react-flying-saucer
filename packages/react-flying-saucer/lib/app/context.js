import { createContext } from 'react'
import { useContext } from 'use-react-hooks'

export const context = createContext(null)
export const useApp = useContext(context)
export const { Provider } = context

export default context
