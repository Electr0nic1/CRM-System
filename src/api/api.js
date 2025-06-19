import { API_URL } from '@helpers/config'
import axios from 'axios'

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

export async function getTasks(status = 'all') {
  try {
    const response = await api.get('/todos', {
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
    const response = await api.post('/todos', {
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
    const response = await api.delete(`/todos/${id}`)

    return response.data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function updateTask(task) {
  try {
    const response = await api.put(`/todos/${task.id}`, {
      isDone: task.isDone,
      title: task.title,
    })

    return response.data
  } catch (error) {
    console.error(error.message)
    throw error
  }
}
