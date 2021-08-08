//Completed 5.1-5.4

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updateList, triggerUpdateList] = useState("")
  const [notifClass, setNotifClass] = useState('')
  const [notifMessage, setNotifMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      setBlogs(blogs)
      triggerUpdateList("")
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
     console.log(user);
   } catch (exception) {
       setNotifClass("redNotif")
       setNotifMessage("Wrong Credentials")
       setTimeout(() => {
         setNotifMessage(null)
       }, 5000)
     }
  }

  const handleCreate = (event) => {
    event.preventDefault()

    try {
     const user = blogService.create({
       title, author, url
     }).then(res=>{
       triggerUpdateList(res)
       setNotifClass("greenNotif")
       setNotifMessage("Added " + title + "by " + author + "!")
     })
     .then(setTimeout(() => {
       setNotifMessage(null)
     }, 5000))
   } catch (exception) {
       setNotifClass("redNotif")
       setNotifMessage("Error Creating Blog Post")
       setTimeout(() => {
          setNotifMessage(null)
      }, 5000)
   }}

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

   const Notification = (props) => {
     if (props.message === null){
       return null;
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
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

  const logout = () => {
    setUser(null)
    return window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogList = () => (
    <div>
    <p>
      {user.name} is logged in
      <button onClick={logout}>Logout</button>
    </p>

      <h2>Create a New Blog: </h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
            <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
            <input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <p>
        <button type="submit"> Create </button>
        </p>
      </form>

    {blogs.map(blog =>{
      return <Blog key={blog.id} blog={blog} />
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
