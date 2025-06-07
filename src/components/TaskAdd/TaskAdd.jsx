import { useState } from 'react'
import Button from '@ui/Button/Button.jsx'
import { createTask } from '@api/api.js'

function TaskAdd({ updateTasks }) {
  const [inputValue, setInputValue] = useState('')

  const handleCreate = async (title) => {
    const trimmedTitle = title.trim()
    if (trimmedTitle.length < 2 || trimmedTitle.length > 64) {
      alert('Please enter a task')
      return
    }

    try {
      await createTask(trimmedTitle)
      await updateTasks()
      setInputValue('')
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Failed to create task. Please try again.')
    }
  }

  return (
    <form
      className="new-task"
      onSubmit={(e) => {
        e.preventDefault()
        handleCreate(inputValue)
      }}
    >
      <input
        placeholder="Task To Be Done..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></input>
      <Button color="primary" type="submit">
        Add
      </Button>
    </form>
  )
}

export default TaskAdd