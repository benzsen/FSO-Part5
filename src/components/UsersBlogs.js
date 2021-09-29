import React from 'react'
import ReactDOM from 'react-dom'

const UsersBlogs = ({user}) => {

  return(
    <div>
      <h2>{user.name+"'s Blogs:"}</h2>
      <div>
        {user.blogs.map(b =>
          <li key={b.id}>
            {b.title}
          </li>
        )}
      </div>
    </div>
  )
}

export default UsersBlogs
