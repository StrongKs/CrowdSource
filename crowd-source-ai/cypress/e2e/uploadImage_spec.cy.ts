describe('Image Upload in CreatePost', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000'); // Adjust if you're testing on a different route
    });
  
    it('opens the image upload area when Photo button is clicked', () => {
      cy.contains('Photo').click();
      cy.get('input[type="file"]').should('exist');
    });
  
    it('uploads and displays image preview', () => {
      // Intercept the UploadThing API or mock image upload behavior
      cy.intercept('POST', '**/uploadthing**', {
        statusCode: 200,
        body: {
          fileUrl: 'https://mock-image.com/photo.png',
        },
      }).as('mockUpload');
  
      // Click to open upload area
      cy.contains('Photo').click();
  
      // Simulate a fake upload (since file uploads are restricted in Cypress)
      const imageFixture = 'example.png'; // Must be inside /cypress/fixtures/
  
      cy.get('input[type="file"]').selectFile(`cypress/fixtures/${imageFixture}`, {
        force: true,
      });
  
      // Wait for the fake "upload"
      cy.wait('@mockUpload');
  
      // Confirm image preview is displayed
      cy.get('img')
        .should('have.attr', 'src')
        .and('include', 'mock-image.com/photo.png');
    });
  
    it('removes the uploaded image when close button is clicked', () => {
      cy.contains('Photo').click();
  
      // Simulate manually setting the image via JS if upload is not functional
      cy.window().then((win) => {
        const imageUrl = 'https://mock-image.com/photo.png';
        win.document.querySelector<HTMLImageElement>('img')?.setAttribute('src', imageUrl);
      });
  
      // Simulate clicking remove (X icon)
      cy.get('button').contains(/^×$|^X$/i).click({ force: true });
  
      //
  