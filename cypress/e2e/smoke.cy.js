describe('Smoke Test', () => {
  it('loads the app', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Bug Tracker');
  });
});
