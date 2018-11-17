import context from './context'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

const AppProvider = context.Provider

export default function Mothership({ app, children }) {
  return (
    <AppProvider value={app}>
      <StoreProvider store={app.store}>
        <BrowserRouter>{children}</BrowserRouter>
      </StoreProvider>
    </AppProvider>
  )
}
