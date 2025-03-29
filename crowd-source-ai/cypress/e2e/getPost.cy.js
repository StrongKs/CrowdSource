describe("Sidebar Component", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    // Test to check if original posts are displayed by default
    it("should display recent original posts by default", () => {
      cy.contains("Recent Posts").should("be.visible");
      cy.get("li").should("exist"); // Ensure posts are displayed
    });
  
    // Test to check AI summarization and display with extended timeout
    it("should generate and display AI summaries when clicking 'AI Summarization'", () => {
      cy.contains("AI Summarization").click();
      
      // Check for progress bar
      cy.get("p").contains("Summarizing...").should("be.visible");
  
      // Wait up to 60 seconds for summarization to complete
      cy.get("p").contains("Summarizing...").should("not.exist", { timeout: 60000 });
  
      // Ensure summaries are displayed
      cy.contains("Summaries (AI Rerun)").should("be.visible");
      cy.get("li").should("exist");
    });
  
    // Test to check if Refresh works and displays posts
    it("should display original posts when clicking 'Refresh'", () => {
      cy.contains("Refresh").click();
      
      // Ensure Recent Posts is visible
      cy.contains("Recent Posts").should("be.visible");
  
      // Confirm that posts are displayed
      cy.get("li").should("exist");
    });
  });
  