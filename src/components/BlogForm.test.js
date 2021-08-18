import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  //
  // let title = "testTitle"
  // let author = "testAuthor"
  // let url = "testUrl"
  //
  // let component = render(
  //     <BlogForm
  //       title = {title}
  //       author = {author}
  //       url = {url}
  //     />
  // )

  test('<BlogForm /> updates parent state and calls onSubmit', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm
        handleCreate={createBlog} 
      />
    )

    const form = component.container.querySelector('form')
    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    console.log(author);

    fireEvent.change(author, {
      target: { value: 'author test' }
    })
    console.log(author);
    fireEvent.change(title, {
      target: { value: 'title test' }
    })

    fireEvent.change(url, {
      target: { value: 'url test' }
    })
    //component.debug()
    fireEvent.submit(form)


    // console.log("form", form);
    //console.log("mock call", createBlog.mock.calls);
    //expect(createBlog.mock.calls).toHaveLength(3)

    // expect(createBlog.mock.calls[0][0].content).toBe('author test')
    // expect(createBlog.mock.calls[0][0].content).toBe('title test')
    // expect(createBlog.mock.calls[0][0].content).toBe('url test')


    // component.debug()
  })

})
