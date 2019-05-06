import { _ } from 'param.macro'
import { memo, createElement, useEffect } from 'react'
import { connect, useStore, useSelector } from 'react-redux'

export { connect } from 'react-redux'

export const withDispatch = connect(
  null,
  _
)

export const useAppEffect = (mapDispatch, watch) => {
  const store = useStore()
  useEffect(() => {
    mapDispatch(store.dispatch)
  }, watch)
}

export const useAppSelector = mapSelect => {
  const store = useStore()
  // setup happens in component
  // no extra memoization
  return useSelector(mapSelect(store.select))
}

export const sconnect = (mapSelect, mapDispatch) => Base => {
  const c = memo(props => {
    const store = useStore()
    // memoizes setup
    const enhance = connect(
      store.select(mapSelect),
      mapDispatch
    )

    return createElement(enhance(Base), props)
  })

  c.displayName = `sconnect(${Base.displayName || Base.name || 'Component'})`

  return c
}

export const $$ = sconnect
export const _$ = withDispatch
