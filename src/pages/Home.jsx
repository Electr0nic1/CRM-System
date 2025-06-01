import { useState, useEffect } from 'react'
import Task from '../components/Task.jsx'
import Button from '../components/Button.jsx'
import api from '../api/api.js'
import { STATUS } from '../helpers/status.js'

function Home() {
  const [category, setCategory] = useState('all')
  const [inputValue, setInputValue] = useState('')
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
  const [tasks, setTasks] = useState([])

  const handleCreate = (task) => {
    if (task.trim().length < 2 || task.trim().length > 64) {
      alert('Please enter a task')
      return
    }
    const fetchData = async () => {
      try {
        await api.createTask(task.trim())
        getTasks()
        setInputValue('')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  const handleUpdate = (title, id, isDone) => {
    const fetchData = async () => {
      try {
        await api.updateTask(title, id, isDone)
        getTasks()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  const handleDelete = (id) => {
    const fetchData = async () => {
      try {
        await api.deleteTask(id)
        getTasks()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  const handleUpdateTabs = async (category) => {
    setCategory(category)
  }

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
        getTasks()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [category])

  return (
    <>
      <header className="new-task">
        <input
          placeholder="Task To Be Done..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <Button content="Add" onClick={() => handleCreate(inputValue)} />
      </header>
      <nav className="tabs">
        <a
          className={category === STATUS.ALL ? 'active' : ''}
          onClick={() => handleUpdateTabs(STATUS.ALL)}
        >
          All({data.info.all})
        </a>
        <a
          className={category === STATUS.INWORK ? 'active' : ''}
          onClick={() => handleUpdateTabs(STATUS.INWORK)}
        >
          At work({data.info.inWork})
        </a>
        <a
          className={category === STATUS.COMPLETED ? 'active' : ''}
          onClick={() => handleUpdateTabs(STATUS.COMPLETED)}
        >
          Done({data.info.completed})
        </a>
      </nav>
      <main>
        {data.data.map((task) => (
          <Task key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
        ))}
      </main>
    </>
  )
}

export default Home
