import { useState, useEffect } from 'react'
import Button from '../components/Button.jsx'
import api from '../api/api.js'
import Task from '../components/Task.jsx'

function Home() {
  const [category, setCategory] = useState('')
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
    let response
    const fetchData = async () => {
      try {
        response = await api.createTask(task)
        setData((prevData) => ({
          ...prevData,
          data: [...prevData.data, response],
        }))
        setInputValue('')
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getTasks()
        console.log('Data from API:', response)
        setData(response)
        setTasks(response.data.map((task) => <Task key={task.id} content={task} />))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleClick = (category) => {
    setCategory(category)
    if (category === 'all') {
      setTasks(data.data.map((task) => <Task key={task.id} content={task} />))
    } else if (category === 'inWork') {
      setTasks(
        data.data
          .filter((task) => task.isDone === false)
          .map((task) => <Task key={task.id} content={task} />),
      )
    } else if (category === 'done') {
      setTasks(
        data.data
          .filter((task) => task.isDone === true)
          .map((task) => <Task key={task.id} content={task} />),
      )
    }
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
        <a onClick={() => handleClick('all')}>All({data.info.all})</a>
        <a onClick={() => handleClick('inWork')}>At work({data.info.inWork})</a>
        <a onClick={() => handleClick('done')}>Done({data.info.completed})</a>
      </div>
      <div>{tasks}</div>
    </>
  )
}

export default Home
