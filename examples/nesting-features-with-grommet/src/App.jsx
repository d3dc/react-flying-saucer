import { Mothership } from '@@'

import Main from '@/features/Main'
import Start from '@/features/Start'
import Account from '@/features/Account'
import FourOhFour from '@/features/FourOhFour'
import FloatingNav from '@/features/FloatingNav'

function App() {
  return (
    <Mothership>
      <Main>
        <Start exact path="/" />
        <Account path="/account" />
        <FourOhFour path="*" />
        <FloatingNav />
      </Main>
    </Mothership>
  )
}

export default App
