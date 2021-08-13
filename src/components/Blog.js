import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog, handleLike}) => {
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
            <a>{blog.url}</a>
            <br></br>
            <a>
              Likes: {blog.likes + " "}
              <button onClick={()=>handleLike(blog.id)}>like</button>

            </a>
            <br></br>
            <a>by: {blog.author}</a>
          </Togglable>
        </div>
    </div>
  )
}

export default Blog
