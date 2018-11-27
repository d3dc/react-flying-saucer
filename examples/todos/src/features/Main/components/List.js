import { $$ } from '@@'
import TodoItem from './TodoItem'

const enhance = $$(
  select => ({
    activeCount: select.todos.activeCount,
    list: select.todos.list,
  }),
  dispatch => ({
    toggleAll: dispatch.todos.toggleAll,
  })
)

function List({ list, activeCount, toggleAll }) {
  return (
    <section className="main">
      <input
        className="toggle-all"
        id="toggle-all"
        type="checkbox"
        onChange={e => toggleAll({ completed: e.target.value })}
        checked={activeCount === 0}
      />
      <label htmlFor="toggle-all" />
      <ul className="todo-list">
        {list.map((todo, index) => (
          <TodoItem key={index} todo={todo} />
        ))}
      </ul>
    </section>
  )
}

export default enhance(List)
