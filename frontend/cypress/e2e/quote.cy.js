// describe('Customers Module', () => {

// beforeEach(() => {
//     // Visit login page
//     cy.visit('http://localhost:3000/login', { timeout: 10000 });

//     // Fill login form
//     cy.get('#normal_login_email', { timeout: 10000 }).clear().type('admin@admin.com');
//     cy.get('#normal_login_password', { timeout: 10000 }).clear().type('admin123');
//     cy.get('#normal_login_remember', { timeout: 10000 }).click();

//     // Click login button
//     cy.get('#normal_login button[type="submit"]', { timeout: 10000 }).click();

//     // Wait for dashboard to appear
//     cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
//   });

// it("tests quote", () => {
//     cy.viewport(915, 633);
//     cy.visit("http://localhost:3000/");
//     cy.get("li.ant-menu-item-active a").click();
//     cy.get("div:nth-of-type(3) span:nth-of-type(2)").click();
//     cy.get("#rc_select_5").click();
//     cy.get("div.ant-select-item-option-active > div").click();
//     cy.get("#notes").click();
//     cy.get("#notes").type("testing");
//     cy.get("#year").click();
//     cy.get("div:nth-of-type(1) > div:nth-of-type(3) span.ant-input-number-handler-up").click();
//     cy.get("div:nth-of-type(4) span.ant-select-selection-item").click();
//     cy.get("div:nth-of-type(3) div.ant-select-item-option-active > div").click();
//     cy.get("#items_0_itemName").click();
//     cy.get("#items_0_itemName").type("abc product");
//     cy.get("#items_0_description").click();
//     cy.get("#items_0_description").type("good product");
//     cy.get("div:nth-of-type(4) span.ant-input-number-handler-down").click();
//     cy.get("div:nth-of-type(4) span.ant-input-number-handler-up svg").dblclick();
//     cy.get("div:nth-of-type(4) span.ant-input-number-handler-up svg").click();
//     cy.get("div:nth-of-type(4) span.ant-input-number-handler-up svg").click();
//     cy.get("#items_0_price").click();
//     cy.get("#items_0_price").type("45");
//     cy.get("div:nth-of-type(7) > div:nth-of-type(1) span:nth-of-type(2)").click();
//     cy.get("#rc_select_7").click();
//     cy.get("div.ant-select-item-option-active > div > span").click();
//     cy.get("div:nth-of-type(7) > div:nth-of-type(1) span:nth-of-type(2)").click();
//   });

//   });