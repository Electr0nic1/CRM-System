import { API_URL } from '../helpers/config.ts'
import axios from 'axios'
import type { Todo, TodoInfo, TaskCategory } from '../types/index.ts'

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
})

export async function getTasks(status: TaskCategory = 'all'): Promise<{ data: Todo[]; info: TodoInfo }> {
  try {
    const response = await api.get('/todos', {
      params: { filter: status },
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function createTask(title: string): Promise<Todo> {
  try {
    const response = await api.post('/todos', {
      isDone: false,
      title: title,
    })

    return response.data
  } catch (error) {
    throw error
  }
}

export async function deleteTask(id: number): Promise<string> {
  try {
    const response = await api.delete(`/todos/${id}`)

    return response.data
  } catch (error) {
    throw error
  }
}

export async function updateTask(task: { id: number; isDone: boolean; title: string }) : Promise<Todo> {
  try {
    const response = await api.put(`/todos/${task.id}`, {
      isDone: task.isDone,
      title: task.title,
    })

    return response.data
  } catch (error) {
    throw error
  }
}
