import { useState } from 'react'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'
import api from '../api/api.js'

function TaskItem({ content, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [inputValue, setInputValue] = useState(content.title)

  const handleUpdate = (title) => {
    if (title === '') {
      setEditing(false)
      setInputValue(content.title)
      return
    }
    if (title.trim().length < 2 || title.trim().length > 64) {
      alert('Please enter a valid task title')
      return
    }
    setInputValue(title.trim())
    onUpdate(title.trim(), content.id, content.isDone)
    setEditing(false)
  }

  return (
    <div className="task">
      <Checkbox
        content={content}
        onClick={() => onUpdate(content.title, content.id, !content.isDone)}
      />
      {editing ? (
        <>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="edit-input"
          />
          <span className="task-edit">
            <Button content={'save'} onClick={() => handleUpdate(inputValue)} />
            <Button content={'cancel'} onClick={() => handleUpdate('')} />
          </span>
        </>
      ) : (
        <>
          <p>{content.title}</p>
          <Button content={'edit'} onClick={() => setEditing(true)} />
        </>
      )}
      <Button content={'delete'} onClick={() => onDelete(content.id)} />
    </div>
  )
}

export default TaskItem