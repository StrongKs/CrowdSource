describe('Scrolling Feed Test', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/posts', {
      statusCode: 200,
      body: [
        {
          id: '1',
          author_name: 'John Doe',
          content: 'Hello Cypress!',
          image: 'https://via.placeholder.com/500',
          createdAt: '2024-03-01T12:00:00Z'
        },
        {
          id: '2',
          author_name: 'Jane Smith',
          content: 'Another test post',
          createdAt: '2024-03-02T14:30:00Z'
        }
      ]
    }).as('fetchPosts');

    cy.visit('http://localhost:3000'); // Update URL if necessary
  });

  it('should display the loading state before posts load', () => {
    cy.get('[data-testid="loading-text"]').should('exist');
  });

  it('should fetch and display posts', () => {
    cy.wait('@fetchPosts');

    // Ensure the loading text disappears
    cy.get('[data-testid="loading-text"]').should('not.exist');

    // Check that posts are displayed
    cy.get('[data-testid="post-item"]').should('have.length', 2);

    // Verify post details
    cy.get('[data-testid="post-author"]').first().should('contain', 'John Doe');
    cy.get('[data-testid="post-content"]').first().should('contain', 'Hello Cypress!');
    cy.get('[data-testid="post-date"]').first().should('contain', '2024'); // Year check

    // Verify the second post
    cy.get('[data-testid="post-author"]').eq(1).should('contain', 'Jane Smith');
    cy.get('[data-testid="post-content"]').eq(1).should('contain', 'Another test post');
  });

  it('should display an image if a post has one', () => {
    cy.wait('@fetchPosts');

    // Ensure image container is visible
    cy.get('[data-testid="post-image-container"]').should('exist');

    // Ensure the image src is correct
    cy.get('[data-testid="post-image-container"] img')
      .should('have.attr', 'src')
      .and('include', 'https://via.placeholder.com/500');
  });

  it('should not display an image if a post has no image', () => {
    cy.wait('@fetchPosts');

    // The second post does not have an image
    cy.get('[data-testid="post-item"]').eq(1).within(() => {
      cy.get('[data-testid="post-image-container"]').should('not.exist');
    });
  });
});
