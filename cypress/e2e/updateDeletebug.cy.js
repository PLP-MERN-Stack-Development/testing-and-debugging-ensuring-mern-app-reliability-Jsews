describe('Update & Delete Bug', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    // Create one bug first
    cy.get('#title').type('Temp Bug');
    cy.get('#description').type('To be updated & deleted');
    cy.contains('Create Bug').click();

    cy.contains('Temp Bug');
  });

  it('updates bug status', () => {
    cy.contains('Start').click();
    cy.contains(/in-progress/i);
  });

  it('deletes bug', () => {
    cy.contains('Delete').click();
    cy.contains('Temp Bug').should('not.exist');
  });
});
