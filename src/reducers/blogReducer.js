
import blogService from '../services/blogs'
//const initBlogs = blogService.getAll().then(blogs => blogs)

const sortedBlog = (blogs) => blogs.sort((a,b) => b.likes-a.likes)

const reducer = (state = [], action) => {
  switch (action.type) {
  case 'INITBLOGS':
    return sortedBlog(action.data)
  case 'SETBLOGS':
    return sortedBlog(action.content)

  default:
    return state
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
        type: 'INITBLOGS',
        data: blogs
      })
  }
}


export const setBlogs = (content) => (
  {
    type: 'SETBLOGS',
    content
  }
)

export default reducer
