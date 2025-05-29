import { useState } from 'react'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'
import api from '../api/api.js'

function Task({ content, onDelete }) {
  return (
    <div className="task">
      <Checkbox content={content} />
      <p>{content.title}</p>
      <Button content={'edit'} />
      <Button content={'delete'} onClick={() => onDelete(content.id)} />
    </div>
  )
}

export default Task
