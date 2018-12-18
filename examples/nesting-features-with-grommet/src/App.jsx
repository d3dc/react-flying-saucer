import { Mothership } from '@@'

import Main from '@/features/Main'
import Start from '@/features/Start'
import Account from '@/features/Account'
import FloatingNav from '@/features/FloatingNav'

function App() {
  return (
    <Mothership>
      <Main>
        <Start path="/" exact />
        <Account path="/account" />
        <FloatingNav />
      </Main>
    </Mothership>
  )
}

export default App
