
const reducer = (state = {username:"",password:""}, action) => {
  switch (action.type) {
  case 'SETUSERNAME':{
    const loginCred = state
    const updatedCred = {
      ...state,
      username: action.content
    }
    return updatedCred
  }
  case 'SETPASSWORD':{
    const updatedCred = {
      ...state,
      password: action.content
    }
    return updatedCred
  }
  case 'CLEARLOGIN':{
    const updatedCred = {
      username: "",
      password: ""
    }
    return updatedCred
  }
  default:
    return state
  }
}

export const setUsername = (content) => (
  {
    type: 'SETUSERNAME',
    content
  }
)

export const setPassword = (content) => (
  {
    type: 'SETPASSWORD',
    content
  }
)

export const clearLogin = () => (
  {
    type: 'CLEARLOGIN'
  }
)

export default reducer
