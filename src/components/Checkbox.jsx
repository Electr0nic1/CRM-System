import { useState } from 'react'

function Checkbox({ content }) {
  const [checked, setChecked] = useState(content.isDone)
  return (
    <label className="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <span></span>
    </label>
  )
}

export default Checkbox
