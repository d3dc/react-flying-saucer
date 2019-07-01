import { _ } from 'param.macro'
import { memo, createElement, useEffect } from 'react'
import { connect, useStore, useSelector, ReactReduxContext } from 'react-redux'

export { connect, useSelector, useDispatch, useStore } from 'react-redux'

export const withStore = connect

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

export const useAppSelector = (mapSelect, payload) => {
  const store = useStore()
  return useSelector(state => mapSelect(store.select)(state, payload))
}

export const sconnect = (mapSelect, mapDispatch) => Base => {
  // memoizes setup
  const c = memo(props => {
    return (
      <ReactReduxContext.Consumer>
        {store => {
          const enhance = connect(
            store.select(mapSelect),
            mapDispatch
          )

          return createElement(enhance(Base), props)
        }}
      </ReactReduxContext.Consumer>
    )
  })

  c.displayName = `sconnect(${Base.displayName || Base.name || 'Component'})`

  return c
}

export const withStoreSelection = sconnect

export const $$ = sconnect
export const _$ = withDispatch
