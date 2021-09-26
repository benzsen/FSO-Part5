import { createStore, combineReducers } from 'redux'
import loginReducer from './reducers/loginReducer'
import notifReducer from "./reducers/notifReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import usersReducer from "./reducers/usersReducer"

const reducer = combineReducers({
  login: loginReducer,
  notif: notifReducer,
  blog: blogReducer,
  user: userReducer,
  users: usersReducer
})

const store= createStore(
  reducer
)

export default store
