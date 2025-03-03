describe('Theme Toggle Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Adjust if needed
  });

  it('should toggle between light and dark themes', () => {
    // Ensure theme toggle button exists
    cy.get('button[data-testid="theme-toggle"]').should('exist');

    // Check initial theme (assuming default is light)
    cy.get('html').should('not.have.class', 'dark');

    // Click to switch to dark mode
    cy.get('button[data-testid="theme-toggle"]').click();

    // Verify dark mode is applied
    cy.get('html').should('have.class', 'dark');

    cy.wait(1000);
    // Click again to switch back to light mode
    cy.get('button[data-testid="theme-toggle"]').click();

    // Verify light mode is applied again
    cy.get('html').should('not.have.class', 'dark');
  });
});
