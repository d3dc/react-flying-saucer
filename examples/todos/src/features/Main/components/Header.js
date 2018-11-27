import { _$ } from '@@'
import { Component } from 'react'
import { ALL_TODOS } from '../models'

const ENTER_KEY = 13

const enhance = _$(dispatch => ({
  addTodo: dispatch.todos.addTodo,
}))

class Header extends Component {
  state = {
    newTodo: '',
  }

  handleChange = event => {
    this.setState({ newTodo: event.target.value })
  }

  handleNewTodoKeyDown = event => {
    if (event.keyCode !== ENTER_KEY) {
      return
    }

    event.preventDefault()

    const val = this.state.newTodo.trim()

    if (val) {
      this.props.addTodo(val)
      this.setState({ newTodo: '' })
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <input
          ref="newField"
          className="new-todo"
          placeholder="What needs to be done?"
          value={this.state.newTodo}
          onKeyDown={this.handleNewTodoKeyDown}
          onChange={this.handleChange}
          autoFocus={true}
        />
      </header>
    )
  }
}

export default enhance(Header)
