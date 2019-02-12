import { _$ } from '@@'
import { useState } from 'react'

const ENTER_KEY = 13

const enhance = _$(dispatch => ({
  addTodo: dispatch.todos.addTodo,
}))

function Header(props) {
  const [newTodo, updateTodo] = useState('')

  const handleChange = event => updateTodo(event.target.value)
  const handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return
    }

    event.preventDefault()

    const title = newTodo.trim()

    if (title) {
      props.addTodo({ title })
      updateTodo('')
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref="newField"
        className="new-todo"
        placeholder="What needs to be done?"
        value={newTodo}
        onKeyDown={handleNewTodoKeyDown}
        onChange={handleChange}
        autoFocus={true}
      />
    </header>
  )
}

export default Header |> enhance
