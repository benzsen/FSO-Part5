
const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SETUSER':
    return action.content

  default:
    return state
  }
}

export const setUser = (content) => (
  {
    type: 'SETUSER',
    content
  }
)

export default reducer
