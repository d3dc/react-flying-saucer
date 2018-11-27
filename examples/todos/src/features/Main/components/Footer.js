import { $$, useHooks, useProvided } from '@@'
import pluralize from 'pluralize'

import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../models'

const enhance = $$(
  select => ({
    count: select.todos.activeCount,
    completedCount: select.todos.completedCount,
  }),
  dispatch => ({
    clearCompleted: dispatch.todos.clearCompleted,
  })
)

const Footer = useHooks(() => {
  const { NavLink } = useProvided()
  const activeTodoWord = pluralize(this.props.count, 'item')

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{this.props.count}</strong> {activeTodoWord} left
      </span>
      <ul className="filters">
        <li>
          <NavLink view="all" activeClassName="selected">
            All
          </NavLink>
        </li>{' '}
        <li>
          <NavLink view="active" activeClassName="selected">
            Active
          </NavLink>
        </li>{' '}
        <li>
          <NavLink view="completed" activeClassName="selected">
            Completed
          </NavLink>
        </li>
      </ul>
      {this.props.completedCount > 0 ? (
        <button className="clear-completed" onClick={this.props.clearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  )
})

export default enhance(Footer)
