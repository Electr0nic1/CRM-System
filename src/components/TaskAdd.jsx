import { useState } from 'react'
import Button from './Button.jsx'
import api from '../api/api.js'

function TaskAdd({ updateTasks }) {
  const [inputValue, setInputValue] = useState('')

  const handleCreate = (task) => {
    if (task.trim().length < 2 || task.trim().length > 64) {
      alert('Please enter a task')
      return
    }
    const fetchData = async () => {
      try {
        await api.createTask(task.trim())
        await updateTasks()
        setInputValue('')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  return (
    <header className="new-task">
      <input
        placeholder="Task To Be Done..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <Button content="Add" onClick={() => handleCreate(inputValue)} />
    </header>
  )
}

export default TaskAdd