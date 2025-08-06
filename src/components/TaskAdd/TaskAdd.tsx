import React from 'react'
import { Button, Col, Row, Input, message, Form } from 'antd'

import styles from './taskAdd.module.scss'
import { createTask } from '../../api/task.ts'
import { TASK_INPUT_LENGTH } from '../../helpers/constants.ts'

type TaskAddProps = {
  updateTasks: () => Promise<void>
}

const TaskAdd: React.FC<TaskAddProps> = ( {updateTasks} ) =>  {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const handleCreate = async (values: { title: string }) => {
    const title = values.title

    try {
      await createTask(title)
      await updateTasks()
      form.resetFields()
    } catch (error) {
      console.error(error)
      messageApi.open({
        type: 'error',
        content: 'Failed to create task. Please try again.',
      })
    }
  }

  return (
    <Form className={styles.newTask} form={form} onFinish={handleCreate}>
      {contextHolder}
      <Row>
        <Col span={18}>
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
          >
            <Input placeholder="Task To Be Done..." count={{ show: true, max: TASK_INPUT_LENGTH.MAX }} />
          </Form.Item>
        </Col>
        <Col span={4} offset={2}>
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TaskAdd