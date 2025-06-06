import { useState } from 'react'
import checkImg from '../../assets/check.png'

function Checkbox({ onClick, checked }) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={onClick} />
      <span></span>
      <img src={checkImg} alt="" />
    </label>
  )
}

export default Checkbox
