


const reducer = (state = [], action) => {
  switch (action.type) {
  case 'SETNOTIF':{
    const updatedNotif = {
      message: action.content.message,
      class: action.content.class
    }
    return updatedNotif
  }
  case 'CLEARNOTIF':{
    const updatedNotif = {
      message: null
    }
    return updatedNotif
  }
  default:
    return state
  }
}

export const setNotif = (content) => (
  {
    type: 'SETNOTIF',
    content
  }
)

export const clearNotif = () => (
  {
    type: 'CLEARNOTIF'
  }
)

export default reducer
