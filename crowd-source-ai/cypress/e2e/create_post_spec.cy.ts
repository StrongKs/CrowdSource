describe('Create Post Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Adjust if needed
  });

  it('should allow typing in the textarea', () => {
    cy.get('[data-testid="post-textarea"]').should('exist').type('Hello Cypress!');
    cy.get('[data-testid="post-textarea"]').should('have.value', 'Hello Cypress!');
  });

  it('should enable the Post button when text is entered', () => {
    cy.get('[data-testid="post-button"]').should('be.disabled'); // Initially disabled

    cy.get('[data-testid="post-textarea"]').type('Hello Cypress!');
    
    cy.get('[data-testid="post-button"]').should('not.be.disabled'); // Should be enabled
  });

  it('should trigger the post creation on clicking Post button', () => {
    cy.get('[data-testid="post-textarea"]').type('This is a test post');
    
    cy.intercept('POST', '/api/posts', { statusCode: 200 }).as('createPost'); // Mock API call
    
    cy.get('[data-testid="post-button"]').click();

    cy.wait('@createPost'); // Wait for API call
  });
});
