import { it } from 'param.macro'
import { memo, createElement, useEffect } from 'react'
import { connect } from 'react-redux'
import { useApp } from '../context'

export { connect } from 'react-redux'

export const withDispatch = connect(
  null,
  it
)

export const useAppEffect = (mapDispatch, watch) => {
  const app = useApp()
  useEffect(() => {
    mapDispatch(app.store.dispatch)
  }, watch)
}

export const sconnect = (mapSelect, mapDispatch) => Base => {
  const c = memo(props => {
    const app = useApp()
    const enhance = connect(
      app.store.select(mapSelect),
      mapDispatch
    )

    return createElement(enhance(Base), props)
  })

  c.displayName = `sconnect(${Base.displayName || Base.name || 'Component'})`

  return c
}

export const $$ = sconnect
export const _$ = withDispatch
