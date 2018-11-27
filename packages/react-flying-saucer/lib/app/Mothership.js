import { BrowserRouter } from 'react-router-dom'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as AppProvider } from './context'
import Scope from '../Scope'

import createApp from './createApp'
import elements from './elements'

export default function Mothership({ app = createApp(), children }) {
  return (
    <AppProvider value={app}>
      <StoreProvider store={app.store}>
        <Scope base="/" elements={elements}>
          <BrowserRouter>{children}</BrowserRouter>
        </Scope>
      </StoreProvider>
    </AppProvider>
  )
}
