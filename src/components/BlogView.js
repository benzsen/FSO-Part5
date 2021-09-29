import React from 'react'
import ReactDOM from 'react-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const BlogView = () => {
  const id = useParams().id
  const blog = useSelector(state => state.blog.find(b => b.id === id))

  return(
    <div>
      <h2>{blog.title}</h2>
        <div>{"Link: "+blog.url}</div>
        <div>{blog.likes + " likes"}</div>
        <div>{"added by" + blog.author}</div>
    </div>
  )
}

export default BlogView
