import { createContext } from 'react'
import { useHooks, useContext } from 'use-react-hooks'

export const context = createContext({
  name: 'root',
  views: {},
  provides: {},
})

// toolkit
export const useScope = ~useContext(context)
// user
export const useProvided = ~useContext(context).provides
