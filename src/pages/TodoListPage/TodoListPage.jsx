import { useState, useEffect } from 'react'
import TaskAdd from '../../components/TaskAdd/TaskAdd.jsx'
import TaskSwitch from '../../components/TaskSwitch/TaskSwitch.jsx'
import TaskList from '../../components/TaskList/TaskList.jsx'
import { getTasks } from '../../api/api.js'

function TodoListPage() {
  const [category, setCategory] = useState('all')
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState({
    all: 0,
    inWork: 0,
    completed: 0,
  })

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks for category:', category)
      const response = await getTasks(category)
      setTasks(response.data)
      setFilter(response.info)
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to fetch tasks. Please try again.')
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [category])

  return (
    <>
      <TaskAdd updateTasks={fetchTasks} />
      <TaskSwitch filter={filter} updateTasks={setCategory} category={category} />
      <TaskList tasks={tasks} updateTasks={fetchTasks} />
    </>
  )
}

export default TodoListPage
