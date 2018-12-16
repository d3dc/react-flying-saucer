import { $$, NavLink } from '@@'
import pluralize from 'pluralize'

const enhance = $$(
  select => ({
    count: select.todos.activeCount,
    completedCount: select.todos.completedCount,
  }),
  dispatch => ({
    clearCompleted: dispatch.todos.clearCompleted,
  })
)

function Footer(props) {
  const activeTodoWord = pluralize('item', props.count)

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{props.count}</strong> {activeTodoWord} left
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
      {props.completedCount > 0 ? (
        <button className="clear-completed" onClick={props.clearCompleted}>
          Clear completed
        </button>
      ) : null}
    </footer>
  )
}

export default Footer |> enhance
