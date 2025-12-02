describe("Login Page", () => {
  it("Loads login page", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Login");
  });
});
