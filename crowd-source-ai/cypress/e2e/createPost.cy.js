
describe("CreatePost Component", () => {
  beforeEach(() => {
    cy.visit("/"); //
  });

  it("should allow user to enter text and post the original message", () => {
    cy.get("textarea").type("This is a test post");
    cy.get('[data-testid="post-original-btn"]').should("not.be.disabled").click();
    cy.wait(500); 
  });

  it("should generate AI summary and allow posting summary", () => {
    cy.get("textarea").type("This is a test post for AI summarization.");
    
    // Click Summarize Button
    cy.contains("Summarize").click();
    
    // Wait for AI summary to appear
    cy.get(".p-3.bg-gray-100.border.rounded-md", { timeout: 30000 })
    .should("be.visible");
    
    // Ensure the summary is visible
    cy.get('[data-testid="post-summary-btn"]').should("not.be.disabled").click();
    cy.wait(500);
  });

  it("should disable the Post Summary button if no summary is generated", () => {
    cy.get('[data-testid="post-summary-btn"]').should("be.disabled");
  });
});
