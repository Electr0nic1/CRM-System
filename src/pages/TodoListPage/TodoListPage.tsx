import React, { useState, useEffect } from 'react'
import { message } from 'antd'

import TaskAdd from '../../components/TaskAdd/TaskAdd'
import TaskSwitch from '../../components/TaskSwitch/TaskSwitch'
import TaskList from '../../components/TaskList/TaskList'
import Sidebar from '../../components/Sidebar/Sidebar'

import { getTasks } from '../../api/api.js'
import { TIMEOUT } from '../../helpers/constants.js'
import type { Todo, TodoInfo, TaskCategory } from '../../types/index.js'

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
      console.error('Error fetching data:', error)
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
      <Sidebar />
      <TaskAdd updateTasks={fetchTasks} />
      <TaskSwitch filter={filter} updateTasks={(category) => setCategory(category)} category={category} />
      <TaskList tasks={tasks} updateTasks={fetchTasks} />
    </>
  )
}

export default TodoListPage
