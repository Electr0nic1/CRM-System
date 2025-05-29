import { useState, useEffect } from 'react'
import Button from '../components/Button.jsx'
import api from '../api/api.js'
import Task from '../components/Task.jsx'

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
        const response = await api.getTasks(category)
        setData(response)
        setTasks(
          response.data.map((task) => (
            <Task key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          )),
        )
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
        const response = await api.getTasks(category)
        setData(response)
        setTasks(
          response.data.map((task) => (
            <Task key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          )),
        )
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
        const response = await api.getTasks(category)
        setData(response)
        setTasks(
          response.data.map((task) => (
            <Task key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          )),
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getTasks(category)
        setData(response)
        setTasks(
          response.data.map((task) => (
            <Task key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          )),
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [category])

  const handleClick = async (category) => {
    setCategory(category)
    const fetchData = async () => {
      try {
        const response = await api.getTasks(category)
        setData(response)
        setTasks(
          response.data.map((task) => (
            <Task key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
          )),
        )
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  return (
    <>
      <div className="new-task">
        <input
          placeholder="Task To Be Done..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <Button content="Add" onClick={() => handleCreate(inputValue)} />
      </div>
      <div className="tabs">
        <a id={category === 'all' ? 'active' : ''} onClick={() => handleClick('all')}>
          All({data.info.all})
        </a>
        <a id={category === 'inWork' ? 'active' : ''} onClick={() => handleClick('inWork')}>
          At work({data.info.inWork})
        </a>
        <a id={category === 'completed' ? 'active' : ''} onClick={() => handleClick('completed')}>
          Done({data.info.completed})
        </a>
      </div>
      <div>{tasks}</div>
    </>
  )
}

export default Home
