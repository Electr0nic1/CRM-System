import { useState } from 'react'
import { Button, Col, Row, Input, message, Form } from 'antd'
import { createTask } from '@api/api.js'

function TaskAdd({ updateTasks }) {
  const [inputValue, setInputValue] = useState('')
  const [messageApi, contextHolder] = message.useMessage()

  const handleCreate = async (title) => {
    const trimmedTitle = title.trim()
    if (trimmedTitle.length < 2 || trimmedTitle.length > 64) {
      messageApi.open({
        type: 'error',
        content: 'Please enter a task title between 2 and 64 characters.',
      })
      return
    }

    try {
      await createTask(trimmedTitle)
      await updateTasks()
      setInputValue('')
    } catch (error) {
      console.error('Error fetching data:', error)
      messageApi.open({
        type: 'error',
        content: 'Failed to create task. Please try again.',
      })
    }
  }

  return (
    <Form className="new-task" onFinish={() => handleCreate(inputValue)}>
      {contextHolder}
      <Row>
        <Col span={18}>
          <Input
            placeholder="Task To Be Done..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            count={{
              show: true,
              min: 2,
              max: 64,
            }}
          ></Input>
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