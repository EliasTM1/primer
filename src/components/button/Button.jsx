import React from 'react'
import './button.css'
import { v4 } from 'uuid'

const Button = ({value, id, style, onClick}) => {

  return (
    <div className={`calc-button ${style}`}  key={v4()} onClick={onClick}>{value}</div>
  )
}

export default Button