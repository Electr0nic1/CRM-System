import TaskItem from './TaskItem'
import api from '../api/api.js'

function TaskList({ data, updateTasks }) {
  const handleUpdate = async (title, id, isDone) => {
    try {
      await api.updateTask(title, id, isDone)
      await updateTasks()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteTask(id)
      await updateTasks()
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <main>
      {data.data.map((task) => (
        <TaskItem key={task.id} content={task} onDelete={handleDelete} onUpdate={handleUpdate} />
      ))}
    </main>
  )
}

export default TaskList