
const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SETUSERS':
    return action.content

  default:
    return state
  }
}

export const setUsers = (content) => (
  {
    type: 'SETUSERS',
    content
  }
)

export default reducer
