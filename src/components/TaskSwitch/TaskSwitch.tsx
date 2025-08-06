import React from 'react'
import { Button, Col, Row } from 'antd'

import styles from './taskSwitch.module.scss'
import { STATUS } from '../../helpers/status.ts'
import type { TodoInfo, TaskCategory } from '../../types/task.ts'

type TaskSwitchProps = {
  filter: TodoInfo
  updateTasks: (category: TaskCategory) => void
  category: TaskCategory
}

const TaskSwitch: React.FC<TaskSwitchProps> = ({ filter, updateTasks, category }) => {
  return (
    <nav className={styles.tabs}>
      <Row>
        <Col span={6} offset={3}>
          <Button
            color="primary"
            variant="link"
            className={`${styles.tabLink} ${category === STATUS.ALL ? styles.active : null}`}
            onClick={() => updateTasks(STATUS.ALL)}
          >
            All({filter.all})
          </Button>
        </Col>
        <Col span={6}>
          <Button
            color="primary"
            variant="link"
            className={`${styles.tabLink} ${category === STATUS.INWORK ? styles.active : null}`}
            onClick={() => updateTasks(STATUS.INWORK)}
          >
            At work({filter.inWork})
          </Button>
        </Col>
        <Col span={6}>
          <Button
            color="primary"
            variant="link"
            className={`${styles.tabLink} ${category === STATUS.COMPLETED ? styles.active : null}`}
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
