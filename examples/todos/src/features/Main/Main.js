import { $$ } from '@@'

import Footer from './components/Footer'
import Header from './components/Header'
import List from './components/List'

const enhance = $$(select => ({
  count: select.todos.count,
}))

function Main({ count, children }) {
  return (
    <div className="todoapp">
      <Header />
      {count > 0 ? (
        <>
          <List />
          <Footer />
        </>
      ) : null}
      {children}
    </div>
  )
}

Main.displayName = 'Main'

export default Main |> enhance
