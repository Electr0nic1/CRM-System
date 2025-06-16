import { API_URL } from '@helpers/config'
import axios from 'axios'

const url = API_URL

export async function getTasks(status = 'all') {
  try {
    const response = await axios(`${url}/todos`, {
      params: { filter: status },
    })

    return response.data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function createTask(title) {
  try {
    const response = await axios.post(`${url}/todos`, {
      isDone: false,
      title: title,
    })

    return response.data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function deleteTask(id) {
  try {
    const response = await axios.delete(`${url}/todos/${id}`)

    return response.text
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function updateTask(task) {
  try {
    const response = await axios.put(`${url}/todos/${task.id}`, {
      isDone: task.isDone,
      title: task.title,
    })

    return response.data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}
