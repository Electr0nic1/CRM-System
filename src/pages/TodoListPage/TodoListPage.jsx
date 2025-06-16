import { useState, useEffect } from 'react'
import { message } from 'antd'

import TaskAdd from '@components/TaskAdd/TaskAdd.jsx'
import TaskSwitch from '@components/TaskSwitch/TaskSwitch.jsx'
import TaskList from '@components/TaskList/TaskList.jsx'

import { getTasks } from '@api/api.js'

function TodoListPage() {
  const [category, setCategory] = useState('all')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState({
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
  }, [category])

  return (
    <>
      {contextHolder}
      <TaskAdd updateTasks={fetchTasks} />
      <TaskSwitch filter={filter} updateTasks={setCategory} category={category} />
      <TaskList tasks={tasks} updateTasks={fetchTasks} />
    </>
  )
}

export default TodoListPage
