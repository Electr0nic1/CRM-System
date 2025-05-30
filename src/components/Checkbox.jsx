import { useState } from 'react'
import checkImg from '../assets/check.png'

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
      <img src={checkImg} alt="checkbox" />
    </label>
  )
}

export default Checkbox
