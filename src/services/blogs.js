import axios from 'axios'
const baseUrl = '/api/blogs/'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request
  .then(response => {
    return response.data})
}

const getByBlogId = (blogId) => {
  const request = axios.get(baseUrl + blogId);
  return request
    .then(response => response.data)
}

const updateBlog = (blogId, body) => {
  const request = axios.put(baseUrl + blogId, body);
  return request
    .then(response => response.data)
}

const create = async ({title, author, url}) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = await axios.post(baseUrl, {title, author, url}, config);
}

export default { getAll, getByBlogId, create, setToken, updateBlog}
