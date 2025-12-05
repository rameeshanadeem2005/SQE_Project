describe('Navigation Test', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

it('User can login with valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('#normal_login_remember').click();
    cy.get('#normal_login > div.ant-form-item.css-dev-only-do-not-override-k9r92e > div > div > div > div > button').click();

    cy.contains('Customers', { timeout: 10000 }).should('be.visible').click();
cy.url({ timeout: 10000 }).should('include', '/customer');
cy.contains('Add New Client', { timeout: 10000 }).should('exist');


    cy.contains('Invoices', { timeout: 10000 }).should('be.visible').click();
    cy.url({ timeout: 10000 }).should('include', '/invoice');
    cy.contains('Add New Invoice', { timeout: 10000 }).should('exist');

});
});