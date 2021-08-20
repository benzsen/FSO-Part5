//FSO Part 5.17-5.18

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'formula', name:"Formula 1", password: "one"
    }).then(response => {
      console.log(response);
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    })
    cy.visit('http://localhost:3000')
  })

  desribe("login", function () =>{
    it('Successful Login', function() {
      cy.get('#username').type('formula')
      cy.get('#password').type('one')
      cy.get("#loginButton").click()
      cy.contains("Formula 1 is logged in")
    })

    it('Unsuccessful Login', function() {
      cy.get('#username').type('formula')
      cy.get('#password').type('two')
      cy.get("#loginButton").click()
      cy.get(".redNotif").contains('Wrong Credential')
    })
  })

// Part 5.19
  describe('When logged in', function() {
      beforeEach(function() {
        cy.get('#username').type('formula')
        cy.get('#password').type('one')
        cy.get("#loginButton").click()
      })

      it('A blog can be created', function() {
        cy.get("Create a New Blog Here!").click()
        cy.get("#title").type("Spanish GP")
        cy.get("#author").type("FIA")
        cy.get("#url").type("formula1.com")
        cy.get("#saveButton").click()
        cy.contains("Spanish GP")
      })

// Part 5.20
      it('A blog can be liked', function() {
        cy.get("like").click()
        cy.get(".likeSpan").contains("Likes: 1")
      })

// Part 5.21
      it('A blog can be deleted', function() {
        cy.get("#deleteButton").click()
        cy.get(".blogList").should('not.contain', "Spanish GP")
      })

// Part 5.22
      it('Blogs listed by likes', function() {
        cy.request('POST', 'http://localhost:3003/api/blogs', {
          title: "Rav4",
          author: Toyota,
          url: "Toyota.com",
          likes: 5
        })
        cy.request('POST', 'http://localhost:3003/api/blogs', {
          title: "Corolla",
          author: Toyota,
          url: "Toyota.com",
          likes: 0
        })
        cy.request('POST', 'http://localhost:3003/api/blogs', {
          title: "4Runner",
          author: Toyota,
          url: "Toyota.com",
          likes: 25
        })

        //Incomplete
        cy.request('GET', 'http://localhost:3003/api/blogs', {})
          .then(({res}) => {
            console.log(res);
            //res[0].likes
          })
      })

  })







})
