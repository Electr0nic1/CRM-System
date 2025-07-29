import React, { useState, useEffect } from 'react'
import { message } from 'antd'

import TaskAdd from '../../components/TaskAdd/TaskAdd.tsx'
import TaskSwitch from '../../components/TaskSwitch/TaskSwitch.tsx'
import TaskList from '../../components/TaskList/TaskList.tsx'
import { getTasks } from '../../api/api.ts'
import { TIMEOUT } from '../../helpers/constants.ts'
import type { Todo, TodoInfo, TaskCategory } from '../../types/index.ts'

const TodoListPage: React.FC = () => {
  const [category, setCategory] = useState<TaskCategory>('all')
  const [tasks, setTasks] = useState<Todo[]>([])
  const [filter, setFilter] = useState<TodoInfo>({
    all: 0,
    inWork: 0,
    completed: 0,
  })
  const [messageApi, contextHolder] = message.useMessage()

  const fetchTasks = async () => {
    try {
      const response = await getTasks(category)
      setTasks(response.data)
      setFilter(response.info)
    } catch (error) {
      console.error(error)
      messageApi.open({
        type: 'error',
        content: 'Failed to fetch tasks. Please try again.',
      })
    }
  }

  useEffect(() => {
    fetchTasks()

    const interval = setInterval(() => {
      fetchTasks()
    }, TIMEOUT)

    return () => clearInterval(interval)
  }, [category])

  return (
    <>
      {contextHolder}
      <TaskAdd updateTasks={fetchTasks} />
      <TaskSwitch filter={filter} updateTasks={(category) => setCategory(category)} category={category} />
      <TaskList tasks={tasks} updateTasks={fetchTasks} />
    </>
  )
}

export default TodoListPage
