import { Router } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as AppProvider } from '../context'
import { Scope } from '../scope'

import createApp from './createApp'

export default function Mothership({ app = createApp(), children }) {
  const history = createBrowserHistory()
  return (
    <AppProvider value={app}>
      <StoreProvider store={app.store}>
        <Scope
          name="root"
          basePath="/"
          provides={{ history }}
          mounted={children}
        >
          <Router history={history}>{children}</Router>
        </Scope>
      </StoreProvider>
    </AppProvider>
  )
}
