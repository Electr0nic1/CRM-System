import React, { useState } from 'react'
import { Checkbox, Button, Input, message, Form } from 'antd'

import styles from './taskItem.module.scss'
import { updateTask, deleteTask } from '../../api/task.ts'
import { TASK_INPUT_LENGTH } from '../../helpers/constants.ts'
import type { Todo } from '../../types/task.ts'

import saveImg from '@assets/save.png'
import editImg from '@assets/edit.png'
import deleteImg from '@assets/trash.png'
import cancelImg from '@assets/cancel.png'

type TaskItemProps = {
  task: Todo
  updateTasks: () => Promise<void>
}

const TaskItem: React.FC<TaskItemProps> =  ({ task, updateTasks }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const handleSave = async (values: { title: string }) => {
    const title = values.title

    try {
      await updateTask({ ...task, title: title })
      await updateTasks()
      setIsEditing(false)
    } catch (error) {
      console.error(error)
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
      console.error(error)
      messageApi.open({
        type: 'error',
        content: 'Failed to update task. Please try again.',
      })
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id)
      await updateTasks()
    } catch (error) {
      console.error(error)
      messageApi.open({
        type: 'error',
        content: 'Failed to delete task. Please try again.',
      })
    }
  }

  return (
    <Form className={styles.task} form={form} initialValues={{ title: task.title }} onFinish={handleSave}>
      <Checkbox onChange={handleCheckboxClick} checked={task.isDone} className={styles.checkbox}/>
      {contextHolder}
      {isEditing ? (
        <>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: 'Task title is required',
              },
              {
                min: TASK_INPUT_LENGTH.MIN,
                message: `Task title must be at least ${TASK_INPUT_LENGTH.MIN} characters`,
              },
              {
                max: TASK_INPUT_LENGTH.MAX,
                message: `Task title cannot exceed ${TASK_INPUT_LENGTH.MAX} characters`,
              },
            ]}
            className={styles.formItem}
          >
            <Input
              className={styles.editInput}
              count={{
                show: true,
                max: TASK_INPUT_LENGTH.MAX,
              }}
            />
          </Form.Item>
          <span className={styles.taskEdit}>
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
