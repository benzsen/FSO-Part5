import React, {useState} from 'react'

const BlogForm = ({handleCreate, title, author, url,handleTitleChange, handleAuthorChange, handleUrlChange}) =>{

  return(
  <div>
    <h2>Create a New Blog: </h2>

    <form onSubmit={handleCreate}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitleChange}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={handleUrlChange}
        />
      </div>
      <p>
      <button type="submit"> Create </button>
      </p>
    </form>
  </div>
  )
}

export default BlogForm
