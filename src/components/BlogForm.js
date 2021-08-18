import React, {useState} from 'react'

const BlogForm = ({setNotifClass}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = (event) => {
    event.preventDefault()

    try {
      blogService.create({
        title, author, url
      }).then(res => {
        triggerUpdateList(res)
        setNotifClass('greenNotif')
        setNotifMessage('Added ' + title + 'by ' + author + '!')
      })
        .then(setTimeout(() => {
          setNotifMessage(null)
        }, 5000))
    } catch (exception) {
      setNotifClass('redNotif')
      setNotifMessage('Error Creating Blog Post')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }


  return(
    <div className="formDiv">
      <h2>Create a New Blog: </h2>

      <form onSubmit={handleCreate}>
        <div>
        title:
          <input
            id="title"
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
        author:
          <input
            id="author"
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
        url:
          <input
            id="url"
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <p>
          <button type="submit"> Create </button>
        </p>
      </form>
    </div>
  )
}

export default BlogForm
