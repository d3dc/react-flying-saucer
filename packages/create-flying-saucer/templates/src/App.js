import { Mothership, createApp } from 'flying-saucer'

import Main from '@/modules/Main'

const app = createApp()

function App() {
  return (
    <Mothership app={app}>
      <Main />
    </Mothership>
  )
}

export default App
export const { store, inject, routing } = app
