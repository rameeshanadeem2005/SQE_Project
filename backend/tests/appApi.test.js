// -------------------- MOCK AUTH MIDDLEWARE --------------------
// Make sure this path matches your project structure or alias
jest.mock('@/middlewares/authMiddleware', () => ({
  requireAuth: (req, res, next) => next(), // bypass auth
}));

// -------------------- IMPORT APP AFTER MOCK --------------------
const request = require('supertest');
const app = require('../src/app'); // adjust path if needed

// -------------------- DYNAMIC ROUTE TESTS --------------------
describe('App API dynamic routes', () => {
  // Use plural entities as your routes are like /taxes, /quotes, etc.
  const entities = ['taxes', 'quotes', 'paymentmodes', 'payments', 'invoices', 'clients'];

  entities.forEach((entity) => {
    describe(`Entity: ${entity}`, () => {

      it(`POST /${entity}/create returns 201`, async () => {
        const res = await request(app)
          .post(`/api/${entity}/create`)
          .send({ name: 'abc' })
          .expect(201);

        expect(res.body).toHaveProperty('success', true);
      });

      it(`GET /${entity}/read/:id returns 200 and id`, async () => {
        const res = await request(app)
          .get(`/api/${entity}/read/123`)
          .expect(200);

        expect(res.body).toHaveProperty('id', '123');
      });

    });
  });
});
