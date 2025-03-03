describe('Create Post Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Ensure the correct URL
  });

  it('should allow typing in the textarea', () => {
    cy.get('[data-testid="post-textarea"]').should('exist').type('Hello Cypress!');
    cy.get('[data-testid="post-textarea"]').should('have.value', 'Hello Cypress!');
  });

  it('should enable the Post button when text is entered', () => {
    cy.get('[data-testid="post-button"]').should('be.disabled'); // Initially disabled

    cy.get('[data-testid="post-textarea"]').type('Hello Cypress!');

    cy.get('[data-testid="post-button"]').should('not.be.disabled'); // Should be enabled



    cy.get('[data-testid="post-textarea"]').type('This is a test post');

    cy.get('[data-testid="post-button"]').click();

    // Optional: Ensure the textarea is cleared after posting
    cy.get('[data-testid="post-textarea"]').should('have.value', '');
  });
});


