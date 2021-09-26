import React from 'react'
import ReactDOM from 'react-dom'

  const Notification = (props) => {
    if (props.message === null){
      return null
    }
    return (
      <div className={props.notifClass}>
        {props.message}
      </div>
    )
  }

export default Notification
