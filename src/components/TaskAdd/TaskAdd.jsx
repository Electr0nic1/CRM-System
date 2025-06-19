import { useState } from 'react'
import { Button, Col, Row, Input, message, Form } from 'antd'

import { createTask } from '@api/api.js'

function TaskAdd({ updateTasks }) {
  const [messageApi, contextHolder] = message.useMessage()
  const [form] = Form.useForm()

  const handleCreate = async (values) => {
    const title = values.title

    try {
      await createTask(title)
      await updateTasks()
      form.resetFields()
    } catch (error) {
      console.error('Error fetching data:', error)
      messageApi.open({
        type: 'error',
        content: 'Failed to create task. Please try again.',
      })
    }
  }

  return (
    <Form className="new-task" form={form} onFinish={handleCreate}>
      {contextHolder}
      <Row>
        <Col span={18}>
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
            <Input placeholder="Task To Be Done..." count={{ show: true, min: 2, max: 64 }} />
          </Form.Item>
        </Col>
        <Col span={4} offset={2}>
          <Button type="primary" htmlType="submit" block="true">
            Add
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default TaskAdd