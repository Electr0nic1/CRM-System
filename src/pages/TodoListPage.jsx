import { useState, useEffect } from 'react'
import TaskAdd from '../components/TaskAdd.jsx'
import TaskSwitch from '../components/TaskSwitch.jsx'
import TaskList from '../components/TaskList.jsx'
import api from '../api/api.js'

function TodoListPage() {
  const [category, setCategory] = useState('all')
  const [data, setData] = useState({
    data: [],
    info: {
      all: 0,
      inWork: 0,
      completed: 0,
    },
    meta: {
      totalAmount: 0,
    },
  })

  const getTasks = async () => {
    try {
      const response = await api.getTasks(category)
      setData(response)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getTasks()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [category])

  return (
    <>
      <TaskAdd updateTasks={getTasks} />
      <TaskSwitch data={data} updateTasks={setCategory} category={category} />
      <TaskList data={data} updateTasks={getTasks} />
    </>
  )
}

export default TodoListPage
