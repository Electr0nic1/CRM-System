import { useState } from 'react'
import { STATUS } from '../helpers/status.js'

function TaskSwitch({ data, updateTasks, category }) {
  return (
    <nav className="tabs">
      <button
        className={`tab-link ${category === STATUS.ALL ? 'active' : ''}`}
        onClick={() => updateTasks(STATUS.ALL)}
      >
        All({data.info.all})
      </button>
      <button
        className={`tab-link ${category === STATUS.INWORK ? 'active' : ''}`}
        onClick={() => updateTasks(STATUS.INWORK)}
      >
        At work({data.info.inWork})
      </button>
      <button
        className={`tab-link ${category === STATUS.COMPLETED ? 'active' : ''}`}
        onClick={() => updateTasks(STATUS.COMPLETED)}
      >
        Done({data.info.completed})
      </button>
    </nav>
  )
}

export default TaskSwitch