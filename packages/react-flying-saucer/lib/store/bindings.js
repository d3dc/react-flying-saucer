import { memo, createElement } from 'react'
import { connect } from 'react-redux'
import { useApp } from '../app'

export { connect } from 'react-redux'

export const withDispatch = connect(
  null,
  _
)

export const useReduxEffect = (mapDispatch, watch) =>
  useEffect(() => mapDispatch(useApp().inject.dispatch), watch)

export const sconnect = (mapSelect, mapDispatch) => Base => {
  function SelectConnector(props) {
    const app = useApp()
    const enhance = connect(
      mapSelect(app.inject.select),
      mapDispatch
    )

    return createElement(enhance(Base), props)
  }

  return memo(SelectConnector)
}

export const $$ = sconnect
export const _$ = withDispatch
