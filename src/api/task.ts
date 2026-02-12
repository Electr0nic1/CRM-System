import { api } from './axiosInstance'
import type { Todo, TodoInfo, TaskCategory } from '../types/task'

export async function getTasks(status: TaskCategory = 'all'): Promise<{ data: Todo[]; info: TodoInfo }> {
  try {
    const response = await api.get('/todos', {
      params: { filter: status },
    })

    return response.data
  } catch (error) {
    console.error(error)
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
    console.error(error)
    throw error
  }
}

export async function deleteTask(id: number): Promise<string> {
  try {
    const response = await api.delete(`/todos/${id}`)

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function updateTask(task: Todo): Promise<Todo> {
  try {
    const response = await api.put(`/todos/${task.id}`, {
      isDone: task.isDone,
      title: task.title,
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
