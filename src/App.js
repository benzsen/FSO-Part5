//Completed 5.1-5.4
//Completed 5.5-5.10

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updateList, triggerUpdateList] = useState('')
  const [notifClass, setNotifClass] = useState('')
  const [notifMessage, setNotifMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes-a.likes)
      setBlogs(blogs)
      //triggerUpdateList("")
    })
  }, [user, updateList])

  //Check user saved in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      //console.log(user)
    } catch (exception) {
      setNotifClass('redNotif')
      setNotifMessage('Wrong Credentials')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const handleLike = async(blogId) => {
    //event.preventDefault()
    const likedBlog = await blogService.getByBlogId(blogId)
    likedBlog.likes += 1
    const user = likedBlog.user._id
    likedBlog.user =  user
    const updateLike = await blogService.updateBlog(blogId, likedBlog)
    triggerUpdateList(updateLike)
  }

  const handleCreate = (blogObject) => {

    try {
      blogService.create({
        blogObject
      }).then(res => {
        triggerUpdateList(res)
        setNotifClass('greenNotif')
        setNotifMessage('Added ' + blogObject.title + 'by ' + blogObject.author + '!')
      })
        .then(setTimeout(() => {
          setNotifMessage(null)
        }, 5000))
    } catch (exception) {
      setNotifClass('redNotif')
      setNotifMessage('Error Creating Blog Post')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const handleDelete = async(blogId) => {
    if(window.confirm('Are you sure you want to delete the blog?'))
    {
      const removeBlog = await blogService.remove(blogId)
      triggerUpdateList(removeBlog)
      window.confirm('Blog Deleted')
    }
  }

  //Async/Await Attempt
  {
  //Attemp to switch to async/await
  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //
  //   try {
  //    const user = await loginService.login({
  //      username, password,
  //    })
  //    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  //    blogService.setToken(user.token)
  //    setUser(user)
  //    setUsername('')
  //    setPassword('')
  //    console.log(user);
  //  } catch (exception) {
  //      setNotifClass("redNotif")
  //      setNotifMessage("Wrong Credentials")
  //      setTimeout(() => {
  //        setNotifMessage(null)
  //      }, 5000)
  //    }
  // }
  }

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

  const notification = () => (
    <Notification
      message={notifMessage}
      notifClass={notifClass}
    />
  )

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="loginButton">login</button>
    </form>

  )

  const logout = () => {
    setUser(null)
    return window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogList = () => (
    <div className="blogList">
      <p>
        {user.name} is logged in
        <button onClick={logout}>Logout</button>
      </p>

      <Togglable buttonLabel="Create a New Blog Here!">
        <BlogForm
          handleCreate={handleCreate}
          // title={title}
          // author={author}
          // url={url}
          // handleTitleChange={({ target }) => setTitle(target.value)}
          // handleAuthorChange={({ target }) => setAuthor(target.value)}
          // handleUrlChange={({ target }) => setUrl(target.value)}
        />
      </Togglable>
      {blogs.map(blog => {
        return(
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        )
      })}
    </div>
  )

  return (
    <div>
      <h2>blogs</h2>
      {notification()}
      <div>
        {user === null ?
          loginForm() :
          blogList()
        }
      </div>
    </div>
  )
}

export default App
