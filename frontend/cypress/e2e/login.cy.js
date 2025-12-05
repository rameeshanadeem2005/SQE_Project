describe('Login UI Test', () => {

  it('User can access login page', () => {
    cy.visit('http://localhost:3000'); // your frontend URL
    cy.contains('Sign In').should('exist');
  });

  it('User can login with valid credentials', () => {
    cy.visit('http://localhost:3000/login');
    cy.get('#normal_login_email').clear().type('admin@admin.com');
    cy.get('#normal_login_password').clear().type('admin123');
    cy.get('#normal_login_remember').click();
    cy.get('#normal_login > div.ant-form-item.css-dev-only-do-not-override-k9r92e > div > div > div > div > button').click();
    cy.contains('Dashboard').should('be.visible');
  });

});
