//FSO Part 5.17-5.21

describe('Blog app', function() {

  beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')

      cy.request('POST', 'http://localhost:3003/api/users/', {
      username: 'formula',
      name:'Formula 1',
      password: 'one'
      })

      cy.visit('http://localhost:3000')
  })

  describe('login', function () {
    it('Successful Login', function() {
      cy.get('#username').type('formula')
      cy.get('#password').type('one')
      cy.get('#loginButton').click()
      cy.contains('Formula 1 is logged in')
    })

    it('Unsuccessful Login', function() {
      cy.get('#username').type('formula')
      cy.get('#password').type('two')
      cy.get('#loginButton').click()
      cy.get('.redNotif').contains('Wrong Credential')
    })
  })

  // Part 5.19
  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('formula')
      cy.get('#password').type('one')
      cy.get('#loginButton').click()

      cy.contains('Create a New Blog Here!').click()
      cy.get('#title').type('RX350')
      cy.get('#author').type('Lexus')
      cy.get('#url').type('Lexus.com')
      cy.get('#saveButton').click()
    })

    it('A blog can be created', function() {
      cy.contains('RX350')
    })

    // Part 5.20
    it('A blog can be liked', function() {
      cy.contains('view').click()
      cy.get('.likeButton').click()
      cy.get('.likeSpan').contains('Likes: 1')
    })

    // Part 5.21
    it('A blog can be deleted', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.get('.blogList').should('not.contain', 'Spanish GP')
    })

    // Part 5.22
    it.only('Blogs listed by likes', function() {
      //Authorization issues when posting directly

      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: 'POST',
        body: {
          title: 'Rav4',
          author: "Toyota",
          url: 'Toyota.com',
          likes: 5
        },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: 'POST',
        body: {
          title: 'Corolla',
          author: "Toyota",
          url: 'Toyota.com',
          likes: 1
        },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })
      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: 'POST',
        body: {
          title: '4Runner',
          author: "Toyota",
          url: 'Toyota.com',
          likes: 25
        },
        headers: {
          'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
      })

      cy.request({
        url: "http://localhost:3003/api/blogs",
        method: 'GET'
      }).then(response => {
        const blogs = response.body
        console.log("blogs", blogs);

        const likes = blogs.map(blog => blog.likes)
        console.log(likes);

        })

      cy.get(".blog")
        .then(blogs => {
        cy.wrap(blogs[0]).contains("4Runner")
        cy.wrap(blogs[1]).contains("Rav4")
        cy.wrap(blogs[2]).contains("Corolla")
        cy.wrap(blogs[3]).contains("RX250")
      })
    })
  })
})
