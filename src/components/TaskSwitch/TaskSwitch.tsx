import React from 'react'
import { STATUS } from '../../helpers/status.ts'
import { Button, Col, Row } from 'antd'
import type { TodoInfo, TaskCategory } from '../../types'

type TaskSwitchProps = {
  filter: TodoInfo
  updateTasks: (category: TaskCategory) => void
  category: TaskCategory
}

const TaskSwitch: React.FC<TaskSwitchProps> = ({ filter, updateTasks, category }) => {
  return (
    <nav className="tabs">
      <Row>
        <Col span={6} offset={3}>
          <Button
            color="primary"
            variant="link"
            className={`tab-link ${category === STATUS.ALL ? 'active' : ''}`}
            onClick={() => updateTasks(STATUS.ALL)}
          >
            All({filter.all})
          </Button>
        </Col>
        <Col span={6}>
          <Button
            color="primary"
            variant="link"
            className={`tab-link ${category === STATUS.INWORK ? 'active' : ''}`}
            onClick={() => updateTasks(STATUS.INWORK)}
          >
            At work({filter.inWork})
          </Button>
        </Col>
        <Col span={6}>
          <Button
            color="primary"
            variant="link"
            className={`tab-link ${category === STATUS.COMPLETED ? 'active' : ''}`}
            onClick={() => updateTasks(STATUS.COMPLETED)}
          >
            Done({filter.completed})
          </Button>
        </Col>
      </Row>
    </nav>
  )
}

export default TaskSwitch
