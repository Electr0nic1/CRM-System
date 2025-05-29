import { useState } from 'react'

function Checkbox({ content, onClick }) {
  const [checked, setChecked] = useState(content.isDone)
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        onClick={onClick}
      />
      <span></span>
    </label>
  )
}

export default Checkbox
