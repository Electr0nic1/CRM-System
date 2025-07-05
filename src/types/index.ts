export interface TodoRequest {
  title?: string
  isDone?: boolean
}

export interface Todo {
  id: number
  title: string
  created: string
  isDone: boolean
}

export interface TodoInfo {
  all: number
  completed: number
  inWork: number
}

export interface MetaResponse<T, N> {
  data: T[]
  info?: N
  meta: {
    totalAmount: number
  }
}

export type TaskAddProps = {
  updateTasks: () => Promise<void>
}

export type TaskItemProps = {
  task: Todo
  updateTasks: () => Promise<void>
}

export type TaskListProps = {
  tasks: Todo[]
  updateTasks: () => Promise<void>
}

export type TaskSwitchProps = {
  filter: TodoInfo
  updateTasks: (category: "all" | 'inWork' | 'completed') => void
  category: string
}