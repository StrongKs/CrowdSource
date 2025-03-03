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
  });

  it('should send a POST request when clicking the Post button', () => {
    cy.intercept('POST', '/api/posts', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 1,
          author_name: 'Test User',
          content: 'This is a test post',
        },
      });
    }).as('createPost'); // Alias for the API call

    cy.get('[data-testid="post-textarea"]').type('This is a test post');

    cy.get('[data-testid="post-button"]').click();

    // Wait for API request to be sent and validate request body
    cy.wait('@createPost').its('request.body').should('deep.equal', {
      author_name: 'Test User', // Ensure this matches the actual request payload
      content: 'This is a test post',
    });

    // Optional: Ensure the textarea is cleared after posting
    cy.get('[data-testid="post-textarea"]').should('have.value', '');
  });

  it('should handle API failure gracefully', () => {
    cy.intercept('POST', '/api/posts', {
      statusCode: 500,
      body: { error: 'Internal Server Error' },
    }).as('createPostFail');

    cy.get('[data-testid="post-textarea"]').type('This is a failing test post');

    cy.get('[data-testid="post-button"]').click();

    // Wait for API request and check for failure
    cy.wait('@createPostFail');

    // Verify that the text area is NOT cleared on failure
    cy.get('[data-testid="post-textarea"]').should('have.value', 'This is a failing test post');

    // Optionally, check for an error message if your UI handles failures
    cy.contains('Failed to create post').should('exist');
  });
});
