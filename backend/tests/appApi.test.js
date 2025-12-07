// tests/appApi.test.js
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/app'); // your existing app.js

let token;

beforeAll(async () => {
  // Connect to DB if not already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });
  }

  // Login and get token
  const res = await request(app)
    .post('/api/login') // adjust if your login route differs
    .send({ username: 'admin', password: 'password123' });

  token = res.body.token;
});

afterAll(async () => {
  // Optional: clean up test data if needed
  await mongoose.connection.close();
});

describe('App API dynamic routes', () => {
  const entities = ['taxes', 'quote', 'paymentmode', 'payment', 'invoice', 'client'];

  entities.forEach((entity) => {
    describe(`Entity: ${entity}`, () => {
      const uniqueName = `${entity}-${Date.now()}`; // unique name per run

      let createdId;

      test(`POST /${entity}/create returns 201`, async () => {
        const res = await request(app)
          .post(`/api/${entity}/create`)
          .set('Authorization', `Bearer ${token}`) // add token if protected
          .send({ name: uniqueName })
          .expect(201); // expect created

        expect(res.body).toHaveProperty('success', true);
        expect(res.body).toHaveProperty('id');
        createdId = res.body.id; // store for GET test
      });

      test(`GET /${entity}/read/:id returns 200 and id`, async () => {
        const res = await request(app)
          .get(`/api/${entity}/read/${createdId}`)
          .set('Authorization', `Bearer ${token}`)
          .expect(200);

        expect(res.body).toHaveProperty('id', createdId);
        expect(res.body).toHaveProperty('name', uniqueName);
      });
    });
  });
});
