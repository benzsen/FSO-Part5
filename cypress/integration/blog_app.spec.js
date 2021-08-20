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
