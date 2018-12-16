export * from './app'
export * from './feature'
export * from './router'
export * from './scope'
export * from './store'

export { useApp } from './context'

// its like a polyfill
// TODO: move to barrel
// has module state that this code uses
// directly depending on it created new state
export * from 'use-react-hooks'
