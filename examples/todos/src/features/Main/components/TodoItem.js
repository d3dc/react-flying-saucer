import { $$ } from '@@'
import { useState, useRef, useEffect } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'

const ESCAPE_KEY = 27
const ENTER_KEY = 13

const enhance = $$(
  select => ({
    todo: (state, props) => select.todos.byId(state, props.id),
    isEditing: (state, props) => state.todos.editing === props.id,
  }),
  (dispatch, props) => ({
    save: dispatch.todos.save,
    onCancel: ~dispatch.todos.edit({ canceled: true }),
    onEdit: ~dispatch.todos.edit({ id: props.id }),
    onDestroy: ~dispatch.todos.destroy({ id: props.id }),
    onToggle: ~dispatch.todos.toggle({ id: props.id }),
  })
)

function TodoItem(props) {
  const editFieldEl = useRef()
  const [editText, updateEditText] = useState(props.todo.title)

  const handleSubmit = event => {
    const title = editText.trim()
    if (title) {
      props.save({ todo: { ...props.todo, title } })
      updateEditText(title)
    } else {
      props.onDestroy(props.todo)
    }
  }

  const handleEdit = () => {
    props.onEdit()
    updateEditText(props.todo.title)
  }

  const handleKeyDown = event => {
    if (event.which === ESCAPE_KEY) {
      updateEditText(props.todo.title)
      props.onCancel()
    } else if (event.which === ENTER_KEY) {
      handleSubmit(event)
    }
  }

  const handleChange = event => {
    if (props.isEditing) {
      updateEditText(event.target.value)
    }
  }

  /**
   * Safely manipulate the DOM after updating the state when invoking
   * `props.onEdit()` in the `handleEdit` method above.
   * For more info refer to notes at https://facebook.github.io/react/docs/component-api.html#setstate
   * and https://facebook.github.io/react/docs/component-specs.html#updating-componentdidupdate
   */
  useEffect(() => {
    if (editFieldEl.current && props.isEditing) {
      // Put the cursor at the end of existing element
      var node = findDOMNode(editFieldEl.current)
      node.focus()
      node.setSelectionRange(node.value.length, node.value.length)
    }
  }, [props.isEditing])

  return (
    <li
      className={classNames({
        completed: props.todo.completed,
        editing: props.isEditing,
      })}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={props.todo.completed}
          onChange={props.onToggle}
        />
        <label onDoubleClick={handleEdit}>{props.todo.title}</label>
        <button className="destroy" onClick={props.onDestroy} />
      </div>
      <input
        ref={editFieldEl}
        className="edit"
        value={editText}
        onBlur={handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}

/**
 * The original demo makes a note of an optional performance enhancement.
 * Using connect already makes components pure (memo).
 */
export default TodoItem |> enhance
