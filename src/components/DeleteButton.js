import React, { useState, useEffect } from 'react'

const DeleteButton = ({user, blog, handleDelete}) => {

  const [visibility, setVisible] = useState({display: 'none'})

  const blogUserId = blog.user.username
  const currentUserId = user.username

  useEffect(() => {
    if (blogUserId === currentUserId){
      setVisible({display: ""})
    }
  }, [blogUserId, currentUserId])

  return(
    <div>
      <span style={visibility}>
      <button onClick={()=>handleDelete(blog.id)}>delete</button>
      </span>
    </div>
  )
}

export default DeleteButton
