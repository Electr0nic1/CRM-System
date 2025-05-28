import { useState } from 'react'
import Checkbox from './Checkbox.jsx'
import Button from './Button.jsx'

function Task({ content }) {
  return (
    <div className="task">
      <Checkbox content={content} />
      <p>{content.title}</p>
      <Button content={'edit'} />
      <Button content={'delete'} />
    </div>
  )
}

export default Task
