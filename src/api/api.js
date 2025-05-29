const url = 'https://easydev.club/api/v1'

const api = {
  async getTasks() {
    let response
    try {
      response = await fetch(`${url}/todos`, {
        method: 'GET',
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
  },

  async createTask(task) {
    let response
    try {
      response = await fetch(`${url}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isDone: false,
          title: task,
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
  },

  async deleteTask(id) {
    let response
    try {
      response = await fetch(`${url}/todos/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }
      return response.text()
    } catch (error) {
      console.error(error.message)
      throw error
    }
  },
}

export default api
