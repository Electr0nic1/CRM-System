import { useState, useEffect } from 'react'
import { Checkbox, Button, Input, Col, Row, message, Form } from 'antd'

import { updateTask, deleteTask } from '@api/api.js'
import saveImg from '@assets/save.png'
import editImg from '@assets/edit.png'
import deleteImg from '@assets/trash.png'
import cancelImg from '@assets/cancel.png'

function TaskItem({ task, updateTasks }) {
  const [isEditing, setIsEditing] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const handleSave = async (values) => {
    const title = values.title

    try {
      await updateTask({ ...task, title: title })
      await updateTasks()
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
    form.setFieldsValue({ title: task.title })
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
    <Form className="task" form={form} initialValues={{ title: task.title }} onFinish={handleSave}>
      <Checkbox onChange={handleCheckboxClick} checked={task.isDone} />
      {contextHolder}
      {isEditing ? (
        <>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Task title is required',
                validator: (_, value) => {
                  if (!value || value.trim().length === 0) {
                    return Promise.reject('Task title is required')
                  }
                  if (value.trim().length < 2) {
                    return Promise.reject('Title must be at least 2 characters')
                  }
                  if (value.trim().length > 64) {
                    return Promise.reject('Title must be at most 64 characters')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <Input
              className="edit-input"
              count={{
                show: true,
                min: 2,
                max: 64,
              }}
            />
          </Form.Item>
          <span className="task-edit">
            <Button
              color="green"
              variant="solid"
              style={{ padding: 0, width: 40, height: 40 }}
              size="large"
              htmlType="submit"
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
    </Form>
  )
}

export default TaskItem
