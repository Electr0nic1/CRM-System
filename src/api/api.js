import { API_URL } from '@helpers/config'

const url = API_URL

export async function getTasks(status = 'all') {
  try {
    const response = await fetch(`${url}/todos?filter=${status} `, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = response.json()
    return json
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function createTask(title) {
  try {
    const response = await fetch(`${url}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isDone: false,
        title: title,
      }),
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function deleteTask(id) {
  try {
    const response = await fetch(`${url}/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const text = await response.text()
    return text
  } catch (error) {
    console.error(error.message)
    throw error
  }
}

export async function updateTask(task) {
  try {
    const response = await fetch(`${url}/todos/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        isDone: task.isDone,
        title: task.title,
      }),
    })

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`)
    }

    const json = await response.json()
    return json
  } catch (error) {
    console.error(error.message)
    throw error
  }
}
