describe('Create Bug Flow', () => {
  it('creates a bug successfully', () => {
    cy.visit('http://localhost:3000');

    cy.get('input#title').type('Cypress Bug');
    cy.get('textarea#description').type('This bug was created by Cypress');

    cy.contains('Create Bug').click();

    cy.contains('Cypress Bug').should('exist');
  });
});
