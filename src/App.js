//Completed 5.1-5.10
//Completed 7.9-7.13

import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom"
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import UsersPage from './components/UsersPage'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useSelector, useDispatch } from 'react-redux'
import { setUsername, setPassword, clearLogin } from "./reducers/loginReducer"
import { setNotif, clearNotif } from "./reducers/notifReducer"
import { setBlogs } from "./reducers/blogReducer"
import { setUser } from "./reducers/userReducer"
import { setUsers } from "./reducers/usersReducer"


const App = () => {
  const dispatch = useDispatch()
  const username = useSelector(state => state.login.username)
  const password = useSelector(state => state.login.password)
  const notifClass = useSelector(state => state.notif.class)
  const notifMessage = useSelector(state => state.notif.message)
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  console.log("users", users);
  //const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  //const [updateList, triggerUpdateList] = useState('')
  //const [notifClass, setNotifClass] = useState('')
  //const [notifMessage, setNotifMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      //blogs.sort((a,b) => b.likes-a.likes)
      dispatch(setBlogs(blogs))
    })
  }, [user, dispatch])

  //Check user saved in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    userService.getAll().then(res=>{
      //onsole.log(res);
      dispatch(setUsers(res))
    })
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user))
      dispatch(clearLogin())
      //console.log(user)
    } catch (exception) {
      // setNotifClass('redNotif')
      // setNotifMessage('Wrong Credentials')
      dispatch(setNotif({
        message:'Wrong Credentials',
        class:'redNotif'
      }))
      setTimeout(() => {
        dispatch(clearNotif())
        //setNotifMessage(null)

      }, 5000)
    }
  }

  const handleLike = async(blogId) => {
    //event.preventDefault()
    const likedBlog = await blogService.getByBlogId(blogId)
    const blogToLike = {...likedBlog, likes: likedBlog.likes +1, user: likedBlog.user._id}
    await blogService.updateBlog(blogToLike)
    dispatch(setBlogs(blogs.map(b => b.id === blogId ? {...likedBlog, likes: likedBlog.likes + 1 } : b)))
    //triggerUpdateList(blogToLike)
  }

  const handleCreate = (blogObject) => {
    try {
      blogService.create(blogObject)
        .then(res => {
          //triggerUpdateList(res)
          dispatch(setBlogs(blogs.concat(res)))
          // setNotifClass('greenNotif')
          // setNotifMessage('Added ' + blogObject.title + ' by ' + blogObject.author + '!')
          dispatch(setNotif({
            message:'greenNotif',
            class:'Added ' + blogObject.title + ' by ' + blogObject.author + '!'
          }))
        })
        .then(setTimeout(() => {
          //setNotifMessage(null)
          dispatch(clearNotif())
        }, 5000))
    } catch (exception) {
      // setNotifClass('redNotif')
      // setNotifMessage('Error Creating Blog Post')
      dispatch(setNotif({
        message:'redNotif',
        class:'Error Creating Blog Post'
      }))
      setTimeout(() => {
        // setNotifMessage(null)
        dispatch(clearNotif())
      }, 5000)
    }
  }

  const handleDelete = async(blogId) => {
    const blogToRemove = blogs.find(b => b.id === blogId)
    if(window.confirm("Are you sure you want to delete:"+ blogToRemove.title +"?"))
    {
      const removeBlog = await blogService.remove(blogId)
      //triggerUpdateList(removeBlog)
      dispatch(setBlogs(blogs.filter(b => b.id !== blogId)))
      window.confirm('Blog Deleted')
    }
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
          onChange={({ target }) => dispatch(setUsername(target.value))}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          id="password"
          onChange={({ target }) => dispatch(setPassword(target.value))}
        />
      </div>
      <button type="submit" id="loginButton">login</button>
    </form>

  )

  const logout = () => {
    dispatch(setUser(null))
    return window.localStorage.removeItem('loggedBlogappUser')
  }

  const blogList = () => {
  return (
    <div className="blogList">
      <p>
        {user.name} is logged in
        <button onClick={logout}>Logout</button>
      </p>

      <Togglable buttonLabel="Create a New Blog Here!">
        <BlogForm
          handleCreate={handleCreate}
        />
      </Togglable>
      {blogs && blogs.map(blog => {
        return(
          <Blog
            user={user}
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleDelete={handleDelete}
          />
        )
      })
      }
    </div>
  )}

  return (
    <div className="container">
      <Router>
        <h2>blogs</h2>
        {notification()}
        <div>
          {user === null ?
            loginForm() :
            blogList()
          }
        </div>

        {users !== null ?
          <UsersPage
          /> : null
        }
      </Router>
    </div>
  )
}

export default App
