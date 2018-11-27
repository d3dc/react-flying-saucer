import { $ } from '@@'

import Footer from './components/Footer'
import Header from './components/Header'
import List from './components/List'

const enhance = $(select => ({
  list: select.todos.list,
}))

function Main({ list, children }) {
  return (
    <div>
      <Header />
      {list.length && (
        <>
          <List />
          <Footer />
        </>
      )}
      {children}
    </div>
  )
}

export default enhance(Main)
