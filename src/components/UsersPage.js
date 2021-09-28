import React from 'react'
import ReactDOM from 'react-dom'
import {Link} from "react-router-dom"
import { useSelector} from 'react-redux'

const UsersPage = () => {
  const users = useSelector(state => state.users)

  return(
    <div>
      <h2>Users</h2>
      <table>
        <thead>
        <tr>
          <th>User</th>
          <th># of Blogs</th>
        </tr>
        </thead>
        <tbody>
        {users.map(u =>
          <tr key={u.id}>
            <td><Link to={"/users/"+u.id}>{u.name}</Link></td>
            <td>{u.blogs.length}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}

export default UsersPage
