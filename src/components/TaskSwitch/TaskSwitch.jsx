import { useState } from 'react'
import { STATUS } from '@helpers/status.js'

function TaskSwitch({ filter, updateTasks, category }) {
  return (
    <nav className="tabs">
      <button
        className={`tab-link ${category === STATUS.ALL ? 'active' : ''}`}
        onClick={() => updateTasks(STATUS.ALL)}
      >
        All({filter.all})
      </button>
      <button
        className={`tab-link ${category === STATUS.INWORK ? 'active' : ''}`}
        onClick={() => updateTasks(STATUS.INWORK)}
      >
        At work({filter.inWork})
      </button>
      <button
        className={`tab-link ${category === STATUS.COMPLETED ? 'active' : ''}`}
        onClick={() => updateTasks(STATUS.COMPLETED)}
      >
        Done({filter.completed})
      </button>
    </nav>
  )
}

export default TaskSwitch
