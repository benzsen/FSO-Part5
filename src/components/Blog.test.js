import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
  const user = {
    name: 'Dil',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbHlzY2hvdyIsImlkIjoiNjEwNWFkNWMxNmYyMjMxOWE0YzVmYjBkIiwiaWF0IjoxNjI5MDM5NjczfQ.uGdtmWxSd2GL295D2a2XBgqssoV-kFIbpWkvS8dp0wg',
    username: 'dilyschow'
  }
  const blog = {
    author: 'hello',
    id: '6118244aabc61457749cd5ae',
    likes: 0,
    title: 'title test input',
    url: 'URL test input',
    user:{
      id: '610d86962935ad5a7cf38a61',
      name: 'Benny',
      username: 'bennyluo'
    }
  }

  let component
  let titleSpan
  let togglableDiv
  let mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        user = {user}
        blog = {blog}
        handleLike = {mockHandler}
      />
    )

    titleSpan = component.container.querySelector('.titleSpan')
    togglableDiv = component.container.querySelector('.togglableContent')
  })

  test('Initial visible render', () => {
    //Check if title is shown initially
    expect(titleSpan).not.toHaveStyle('display: none')

    //Check if additional blog info is hidden initially
    expect(togglableDiv).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.container.querySelector('.toggleButton')
    fireEvent.click(button)

    expect(titleSpan).not.toHaveStyle('display: none')
    expect(togglableDiv).not.toHaveStyle('display: none')
  })

  test('clicking the button twice calls event handler twice', () => {
    const button = component.container.querySelector('.likeButton')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
