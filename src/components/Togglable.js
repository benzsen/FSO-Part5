import React, { useState } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <span>
      <a style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>

      </a>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility}>hide</button>
        {props.children}
      </span>
    </span>
  )
}

export default Togglable
