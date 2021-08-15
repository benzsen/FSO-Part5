import React from 'react'
import Togglable from './Togglable'
import DeleteButton from './DeleteButton'

const Blog = ({user, blog, handleLike, handleDelete}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
        <div>{blog.title + " "}
          <Togglable buttonLabel="view">
            <br></br>
            <span>{blog.url}</span>
            <br></br>
            <span>
              Likes: {blog.likes + " "}
              <button onClick={()=>handleLike(blog.id)}>like</button>

            </span>
            <br></br>
            <span>by: {blog.author}</span>
            <DeleteButton
              blog={blog}
              user={user}
              handleDelete={handleDelete}
            />
          </Togglable>
        </div>
    </div>
  )
}

export default Blog
