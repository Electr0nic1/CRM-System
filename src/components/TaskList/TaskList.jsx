import TaskItem from '@components/TaskItem/TaskItem'

function TaskList({ tasks, updateTasks }) {
  return (
    <main>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} updateTasks={updateTasks} />
      ))}
    </main>
  )
}

export default TaskList
