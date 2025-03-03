describe('Scrolling Feed Test', () => {
  beforeEach(() => {
    // Intercept the API request and delay it to ensure the loading state appears
    cy.intercept('GET', '/api/posts', (req) => {
      req.on('response', (res) => {
        res.setDelay(1000); // Simulate network delay to trigger loading text
      });
    }).as('fetchPosts');

    // Visit the page before each test
    cy.visit('http://localhost:3000');
  });

  it('should display the loading state before posts load', () => {
    // Ensure loading text is visible before data loads
    cy.get('[data-testid="loading-text"]').should('exist');

    // Wait for API response
    cy.wait('@fetchPosts');

    // Ensure the loading text disappears after data loads
    cy.get('[data-testid="loading-text"]').should('not.exist');

  });

  
});
