import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders content', () => {
  const user = {
    name: "Dil",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRpbHlzY2hvdyIsImlkIjoiNjEwNWFkNWMxNmYyMjMxOWE0YzVmYjBkIiwiaWF0IjoxNjI5MDM5NjczfQ.uGdtmWxSd2GL295D2a2XBgqssoV-kFIbpWkvS8dp0wg",
    username: "dilyschow"
  }

  const blog = {
  author: "hello",
  id: "6118244aabc61457749cd5ae",
  likes: 0,
  title: "frontendidtest",
  url: "wqeq",
    user:{
      id: "610d86962935ad5a7cf38a61",
      name: "Benny",
      username: "bennyluo"
    }
  }
  
  let component = render(
    <Blog buttonLabel="view"
      user = {user}
      blog = {blog}
    />
  )

  expect(component.container).toHaveTextContent(
    'frontendidtest'
  )

  // beforeEach(() => {
  //     component = render(
  //       <Blog buttonLabel="view">
  //         <div className="testDiv" />
  //       </Blog >
  //     )
  //   })
  //
  //   test('renders its children', () => {
  //     expect(
  //       component.container.querySelector('.testDiv')
  //     ).toBeDefined()
  //   })

    // test('at start the children are not displayed', () => {
    //   const div = component.container.querySelector('.togglableContent')
    //
    //   expect(div).toHaveStyle('display: none')
    // })
    //
    // test('after clicking the button, children are displayed', () => {
    //   const button = component.getByText('show...')
    //   fireEvent.click(button)
    //
    //   const div = component.container.querySelector('.togglableContent')
    //   expect(div).not.toHaveStyle('display: none')
    // })

})
