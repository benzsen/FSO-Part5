import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
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
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store
