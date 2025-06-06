import { useState, useEffect } from 'react'
import Checkbox from '@ui/Checkbox/Checkbox.jsx'
import Button from '@ui/Button/Button.jsx'
import { updateTask, deleteTask } from '@api/api.js'
import saveImg from '@assets/save.png'
import editImg from '@assets/edit.png'
import deleteImg from '@assets/trash.png'
import cancelImg from '@assets/cancel.png'

function TaskItem({ task, updateTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(task.title)
  const [isChecked, setIsChecked] = useState(task.isDone)

  const handleSave = async (title) => {
    const trimmedTitle = title.trim()
    if (trimmedTitle.length < 2 || trimmedTitle.length > 64) {
      alert('Please enter a valid task title')
      return
    }

    try {
      await updateTask({ ...task, title: trimmedTitle })
      await updateTasks()
      setTitleValue(trimmedTitle)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
      alert('Failed to update task. Please try again.')
    }
  }

  const handleCancel = () => {
    setTitleValue(task.title)
    setIsEditing(false)
  }

  const handleCheckboxClick = async () => {
    try {
      setIsChecked(!isChecked)
      await updateTask({ ...task, isDone: !task.isDone })
      await updateTasks()
    } catch (error) {
      console.error('Error updating task status:', error)
      alert('Failed to update task status. Please try again.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      await updateTasks()
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to delete task. Please try again.')
    }
  }

  return (
    <div className="task">
      <Checkbox onClick={handleCheckboxClick} checked={isChecked} />
      {isEditing ? (
        <>
          <input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="edit-input"
          />
          <span className="task-edit">
            <Button onClick={() => handleSave(titleValue)} color="success">
              <img src={saveImg} alt="Save" />
            </Button>
            <Button onClick={() => handleCancel()} color="cancel">
              <img src={cancelImg} alt="Cancel" />
            </Button>
          </span>
        </>
      ) : (
        <>
          <p>{task.title}</p>
          <Button onClick={() => setIsEditing(true)} color="primary">
            <img src={editImg} alt="Edit" />
          </Button>
        </>
      )}
      <Button onClick={() => handleDelete(task.id)} color="danger">
        <img src={deleteImg} alt="Delete" />
      </Button>
    </div>
  )
}

export default TaskItem
