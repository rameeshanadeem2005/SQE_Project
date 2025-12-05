// describe("invoice 5", () => {
//     beforeEach(() => {
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
//   it("tests invoice 5", () => {
//     cy.viewport(867, 633);
//     cy.visit("http://localhost:3000/invoice");
//     cy.get(".ant-btn.css-dev-only-do-not-override-k9r92e.ant-btn-primary", { timeout: 15000 }).contains("Add New Invoice").click();
//     //cy.visit('http://localhost:3000/invoice/create');
//     //cy.get(".ant-select-selection-search-input").click();
//     //cy.get(".ant-select-selection-search-input").select('abc');
//     cy.get('.ant-select-selection-search-input')        // ID of the input or dropdown trigger
//   .click({ force: true });

// // 2️⃣ Wait for options to appear and select by text
// cy.get('div[role="option"]', { timeout: 10000 })
//   .contains('abc')           // the option text
//   .click({ force: true });
//     //cy.get(".ant-select-selection-search-input").select("abc");
//     //cy.get("#rc_select_35_list").click();
//     //cy.get("#root > div > div > main > main > div.ant-spin-nested-loading.css-dev-only-do-not-override-k9r92e > div > form > div:nth-child(1) > div:nth-child(1) > div > div > div.ant-col.ant-form-item-control.css-dev-only-do-not-override-k9r92e > div > div > div").select("Add New Client");
//     //cy.type("{enter}");
//     //cy.get("#rc_select_27").click();
//     //cy.get("div.ant-select-item-option-active > div").click();
//     cy.get("#notes").click();
//     cy.get("#notes").type("testing");
//     cy.get("#items_0_itemName").click();
//     cy.get("#items_0_itemName").type("abc");
//     cy.get("#items_0_description").click();
//     cy.get("#items_0_description").type("def");
//     cy.get("#items_0_quantity").click();
//     cy.get("#items_0_quantity").type("1");
//     cy.get("#items_0_price").click();
//     cy.get("#items_0_price").type("2");
//     cy.get("#rc_select_29").click();
//     cy.get("div.ant-select-item-option-active > div > span").click();
//     cy.get("div:nth-of-type(7) > div:nth-of-type(1) span:nth-of-type(2)").click();
//   });
// });






















