import { createContext } from 'react'
import { useHooks, useContext } from 'use-react-hooks'
import { merge } from 'lodash'

export const context = createContext({
  views: {},
  provides: {},
})

export const useScope = ~useContext(context)

export const useProvided = ~useContext(context).provides

export const Scope = useHooks(({ children, ...rest }) => (
  <context.Provider value={merge({}, useScope(), rest)} children={children} />
))

Scope.displayName = 'Scope'

export default Scope
