describe('Create Post Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Ensure correct URL
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
    cy.intercept('POST', '/api/posts', (req) => {
      req.reply({ statusCode: 200, body: { success: true } }); // Mock API response
    }).as('createPost');

    cy.get('[data-testid="post-textarea"]').type('This is a test post');

    cy.get('[data-testid="post-button"]').click();

    // Ensure API request was made
    cy.wait('@createPost').its('request.body').should('deep.equal', {
      author_name: 'author_name', // Ensure this matches the actual request
      content: 'This is a test post',
    });

    // Optional: Check if textarea is cleared after posting
    cy.get('[data-testid="post-textarea"]').should('have.value', '');
  });
});
