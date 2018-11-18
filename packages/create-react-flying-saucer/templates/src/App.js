import { Mothership, createApp } from 'react-flying-saucer'

import Main from '@/modules/Main'

export const app = createApp()
export const { store, inject, routing } = app

export default function App() {
  return (
    <Mothership app={app}>
      <Main />
    </Mothership>
  )
}
