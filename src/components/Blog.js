import React from 'react'
import Togglable from './Togglable'
import DeleteButton from './DeleteButton'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from "react-router-dom"

const Blog = ({ user, blog, handleLike, handleDelete }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return (
    <div style={blogStyle} className="blogDiv">
      <div>
        <Link className="titleSpan" to={"/blogs/"+blog.id}>{blog.title + ' '}</Link>
        <Togglable buttonLabel="view">
          <br></br>
          <span>{blog.url}</span>
          <br></br>
          <span className="likeSpan">
              Likes: {blog.likes + ' '}
            <button onClick={() => handleLike(blog.id)} className="likeButton">like</button>

          </span>
          <br></br>
          <span>by: {blog.author}</span>
          <DeleteButton
            id="deleteButton"
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
