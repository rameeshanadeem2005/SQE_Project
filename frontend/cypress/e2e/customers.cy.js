describe('Customers Module', () => {

  beforeEach(() => {
    // Visit login page
    cy.visit('http://localhost:3000/login', { timeout: 10000 });

    // Fill login form
    cy.get('#normal_login_email', { timeout: 10000 }).clear().type('admin@admin.com');
    cy.get('#normal_login_password', { timeout: 10000 }).clear().type('admin123');
    cy.get('#normal_login_remember', { timeout: 10000 }).click();

    // Click login button
    cy.get('#normal_login button[type="submit"]', { timeout: 10000 }).click();

    // Wait for dashboard to appear
    cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
  });



//describe("add new client customer form", () => {
  it("tests add new client customer form", () => {
    cy.viewport(796, 633);
    cy.visit("http://localhost:3000/customer");
    cy.get("div:nth-of-type(3) span").click();
    cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").click();
    cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(1) input").type("abc");
    cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").click();
    cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(2) input").type("Pakistan");
    cy.get("div.rc-virtual-list > div > div > div > div").click();
    cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").click();
    cy.get("div.collapseBox form > div:nth-of-type(1) > div:nth-of-type(3) input").type("Pakistan");
    cy.get("div.collapseBox div:nth-of-type(4) input").click();
    cy.get("div.collapseBox div:nth-of-type(4) input").type("43235435345343");
    cy.get("div.collapseBox div:nth-of-type(5) input").click();
    cy.get("div.collapseBox div:nth-of-type(5) input").type("test@email.com");
    cy.get("div.collapseBox form > div.ant-form-item span").click();
  });
});





