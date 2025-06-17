import { useState, useEffect } from 'react'
import { Checkbox, Button, Input, Col, Row, message } from 'antd'
import { updateTask, deleteTask } from '@api/api.js'
import saveImg from '@assets/save.png'
import editImg from '@assets/edit.png'
import deleteImg from '@assets/trash.png'
import cancelImg from '@assets/cancel.png'

function TaskItem({ task, updateTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleValue, setTitleValue] = useState(task.title)
  const [messageApi, contextHolder] = message.useMessage()

  const handleSave = async (title) => {
    const trimmedTitle = title.trim()
    if (trimmedTitle.length < 2 || trimmedTitle.length > 64) {
      messageApi.open({
        type: 'error',
        content: 'Please enter a valid task title.',
      })
      return
    }

    try {
      await updateTask({ ...task, title: trimmedTitle })
      await updateTasks()
      setTitleValue(trimmedTitle)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating task:', error)
      messageApi.open({
        type: 'error',
        content: 'Failed to update task. Please try again.',
      })
    }
  }

  const handleCancel = () => {
    setTitleValue(task.title)
    setIsEditing(false)
  }

  const handleCheckboxClick = async () => {
    try {
      await updateTask({ ...task, isDone: !task.isDone })
      await updateTasks()
    } catch (error) {
      console.error('Error updating task status:', error)
      messageApi.open({
        type: 'error',
        content: 'Failed to update task. Please try again.',
      })
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
      await updateTasks()
    } catch (error) {
      console.error('Error fetching data:', error)
      messageApi.open({
        type: 'error',
        content: 'Failed to delete task. Please try again.',
      })
    }
  }

  return (
    <div className="task">
      <Checkbox onChange={handleCheckboxClick} checked={task.isDone} />
      {contextHolder}
      {isEditing ? (
        <>
          <Input
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="edit-input"
            count={{
              show: true,
              min: 2,
              max: 64,
            }}
          />
          <span className="task-edit">
            <Button
              onClick={() => handleSave(titleValue)}
              color="green"
              variant="solid"
              style={{ padding: 0, width: 40, height: 40 }}
              size="large"
            >
              <img
                src={saveImg}
                alt="Save"
                style={{ width: 20, height: 20, objectFit: 'contain' }}
              />
            </Button>
            <Button
              onClick={() => handleCancel()}
              color="yellow"
              variant="solid"
              style={{ padding: 0, width: 40, height: 40 }}
              size="large"
            >
              <img
                src={cancelImg}
                alt="Cancel"
                style={{ width: 20, height: 20, objectFit: 'contain' }}
              />
            </Button>
          </span>
        </>
      ) : (
        <>
          <p>{task.title}</p>
          <Button
            onClick={() => setIsEditing(true)}
            type="primary"
            style={{ padding: 0, width: 40, height: 40 }}
            size="large"
          >
            <img src={editImg} alt="Edit" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          </Button>
        </>
      )}
      <Button
        onClick={() => handleDelete(task.id)}
        type="primary"
        color="danger"
        variant="solid"
        size="large"
        style={{ padding: 0, width: 40, height: 40 }}
      >
        <img src={deleteImg} alt="Delete" style={{ width: 20, height: 20, objectFit: 'contain' }} />
      </Button>
    </div>
  )
}

export default TaskItem
