import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

  test('Updates parent state and calls onSubmit', () => {
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

    fireEvent.change(author, {
      target: { value: 'author test' }
    })
    fireEvent.change(title, {
      target: { value: 'title test' }
    })
    fireEvent.change(url, {
      target: { value: 'url test' }
    })
    fireEvent.submit(form)

    expect(createBlog.mock.calls[0][0].author).toBe('author test')
    expect(createBlog.mock.calls[0][0].title).toBe('title test')
    expect(createBlog.mock.calls[0][0].url).toBe('url test')

    // component.debug()
  })

})
