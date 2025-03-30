describe("Sidebar Component", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Test if original posts are displayed by default
  it("should display recent original posts by default", () => {
    cy.contains("Recent Posts").should("be.visible");
    cy.get("li").should("exist"); // Ensure posts are displayed
  });

  // Test AI summarization and ensure summaries are displayed
  it("should generate and display AI summaries when AI Summarization is clicked", () => {
    cy.contains("AI Summarization").click();
    
    // Wait for progress to finish
    cy.get("p").contains("Summarizing...").should("not.exist", { timeout: 60000 });

    // Ensure summaries are displayed
    cy.contains("Generated Summaries").should("be.visible");
    cy.get("li").should("exist");
  });

  // Simple test to check if Refresh is disabled when viewing summaries
  it("should disable the Refresh button in summary mode", () => {
    cy.contains("AI Summarization").click();

    // Wait for progress to finish
    cy.get("p").contains("Summarizing...").should("not.exist", { timeout: 60000 });

    // Click to view the summaries
    cy.contains("Generated Summary").click();

    // Verify if the Refresh button has the disabled attribute
    cy.contains("Refresh").should("have.attr", "disabled");
  });
});
