//Completed 5.1-5.10
//Completed 7.9-7.16

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from "react-router-dom"

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UsersPage from './components/UsersPage'
import UsersBlogs from './components/UsersBlogs'
import BlogView from './components/BlogView'

import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

import { setUsername, setPassword, clearLogin } from "./reducers/loginReducer"
import { setNotif, clearNotif } from "./reducers/notifReducer"
import { initBlogs, setBlogs } from "./reducers/blogReducer"
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
  console.log("blogs", blogs);

  useEffect(() => {
    //Check user saved in local storage
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }

    userService.getAll().then(res=>{
      dispatch(setUsers(res))
    })

    blogService.getAll().then(blogs => {
      dispatch(initBlogs())
    })
  }, [dispatch])

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
    } catch (exception) {
      dispatch(setNotif({
        message:'Wrong Credentials',
        class:'redNotif'
      }))
      setTimeout(() => {
        dispatch(clearNotif())
      }, 5000)
    }
  }

  const handleLike = async(blogId) => {
    const likedBlog = await blogService.getByBlogId(blogId)
    const blogToLike = {...likedBlog, likes: likedBlog.likes +1, user: likedBlog.user._id}
    await blogService.updateBlog(blogToLike)
    dispatch(setBlogs(blogs.map(b => b.id === blogId ? {...likedBlog, likes: likedBlog.likes + 1 } : b)))
  }

  const handleCreate = (blogObject) => {
    try {
      blogService.create(blogObject)
        .then(res => {
          dispatch(setBlogs(blogs.concat(res)))
          dispatch(setNotif({
            message:'greenNotif',
            class:'Added ' + blogObject.title + ' by ' + blogObject.author + '!'
          }))
        })
        .then(setTimeout(() => {
          dispatch(clearNotif())
        }, 5000))
    } catch (exception) {
      dispatch(setNotif({
        message:'redNotif',
        class:'Error Creating Blog Post'
      }))
      setTimeout(() => {
        dispatch(clearNotif())
      }, 5000)
    }
  }

  const handleDelete = async(blogId) => {
    const blogToRemove = blogs.find(b => b.id === blogId)
    if(window.confirm("Are you sure you want to delete:"+ blogToRemove.title +"?"))
    {
      const removeBlog = await blogService.remove(blogId)
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
        <div>
          <Link to="/">Home</Link>
          <Link to="/users">Users</Link>

        </div>

        <Switch>
          { users !== null ?
            users.map(u =>
            <Route path={"/users/"+u.id} key={u.id}>
              <UsersBlogs user = {u}/>
            </Route>) :
            null
          }
          <Route path="/users">
            {users !== null ?
              <UsersPage
              /> : null
            }
          </Route>
          <Route path={"/blogs/:id"}>
            {blogs.length !== 0 ?
              <BlogView
                blog={blogs[0]}
              /> : null
            }

          </Route>
          <Route path="/">
            <h2>blogs</h2>
            {notification()}
            <div>
              {user === null ?
                loginForm() :
                blogList()
              }
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
