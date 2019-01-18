import { Router } from 'react-router'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as AppProvider } from '../context'
import { Scope } from '../scope'

import createApp from './createApp'

export default function Mothership({ app = createApp(), children, ...rest }) {
  return (
    <AppProvider value={app}>
      <StoreProvider store={app.store}>
        <Scope name="root" basePath="/" hoist={children} provides={rest}>
          <Router history={app.history}>{children}</Router>
        </Scope>
      </StoreProvider>
    </AppProvider>
  )
}
