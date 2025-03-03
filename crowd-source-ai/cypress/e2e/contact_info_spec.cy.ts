describe('Contact Info Feature in Create Post', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Ensure correct URL
  });

  it('should toggle the contact info input when clicking the button', () => {
    // Ensure the Contact Info input is NOT visible initially
    cy.get('[data-testid="contact-info-modal"]').should('not.exist');

    // Click "Contact Info" button
    cy.get('[data-testid="contact-info-button"]').click();

    // Now, the Contact Info input should appear
    cy.get('[data-testid="contact-info-modal"]').should('exist');
  });

  it('should allow user to enter contact info', () => {
    cy.get('[data-testid="contact-info-button"]').click();

    cy.get('[data-testid="contact-info-input"]').type('123-456-7890');

    cy.get('[data-testid="contact-info-input"]').should('have.value', '123-456-7890');
  });

  it('should close contact info input when clicking "Cancel"', () => {
    cy.get('[data-testid="contact-info-button"]').click(); // Open the input box

    cy.get('[data-testid="contact-info-modal"]').should('exist');

    cy.get('[data-testid="cancel-button"]').click(); // Click Cancel

    // The input box should disappear
    cy.get('[data-testid="contact-info-modal"]').should('not.exist');
  });

  it('should save and close contact info input when clicking "Save"', () => {
    cy.get('[data-testid="contact-info-button"]').click();

    cy.get('[data-testid="contact-info-input"]').type('test@example.com');

    cy.get('[data-testid="save-button"]').click();

    // After saving, the input box should close
    cy.get('[data-testid="contact-info-modal"]').should('not.exist');

    // The input field should be empty after closing
    cy.get('[data-testid="contact-info-input"]').should('not.exist');
  });
});
