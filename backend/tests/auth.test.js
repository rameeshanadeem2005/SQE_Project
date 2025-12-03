const path = require('path');
const request = require('supertest');

// Mock adminAuth controller
jest.mock('@/controllers/coreControllers/adminAuth', () => ({
  login: jest.fn((req, res) => res.status(200).json({ success: true, message: 'logged in' })),
  forgetPassword: jest.fn((req, res) => res.status(200).json({ success: true })),
  resetPassword: jest.fn((req, res) => res.status(200).json({ success: true })),
  logout: jest.fn((req, res) => res.status(200).json({ success: true })),
  isValidAuthToken: jest.fn((req, res, next) => next()), // allow protected routes
}));

const app = require(path.join(__dirname, '..', 'src', 'app.js'));

describe('Auth routes', () => {
  it('POST /api/login returns success', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'test@example.com', password: '12345' })
      .expect(200);

    expect(res.body).toHaveProperty('success', true);
  });

  it('POST /api/logout requires token middleware and returns success', async () => {
    const res = await request(app)
      .post('/api/logout')
      .send()
      .expect(200);

    expect(res.body).toHaveProperty('success', true);
  });
});
