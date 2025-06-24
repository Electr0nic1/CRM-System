import TaskItem from '@components/TaskItem/TaskItem'
import { List } from 'antd'

function TaskList({ tasks, updateTasks }) {
  return (
    <List
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item key={task.id}>
          <TaskItem task={task} updateTasks={updateTasks} />
        </List.Item>
      )}
    ></List>
  )
}

export default TaskList
