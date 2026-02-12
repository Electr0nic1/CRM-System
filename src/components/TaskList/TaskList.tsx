import React from 'react'
import { List } from 'antd'

import TaskItem from '../../components/TaskItem/TaskItem.tsx'
import type { Todo } from '../../types/task.ts'

type TaskListProps = {
  tasks: Todo[]
  updateTasks: () => Promise<void>
}

const TaskList: React.FC<TaskListProps> = ({ tasks, updateTasks }) => {
  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item key={task.id}>
          <TaskItem task={task} updateTasks={updateTasks} />
        </List.Item>
      )}
    ></List>
  )
}

export default TaskList
