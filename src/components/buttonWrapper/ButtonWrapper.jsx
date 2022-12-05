import React from 'react'
import './buttonWrapper.css'

const ButtonWrapper  = ({children}) => {
  return (
    <div className='btn-wrapper'>
      {children}
    </div>
  )
}

export default ButtonWrapper;