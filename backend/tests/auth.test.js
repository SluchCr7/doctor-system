const request = require('supertest');
const app = require('../src/app');

describe('Auth API', () => {
  it('should return welcome message for root route', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });

  // Example test for register (would require DB connection/mocking)
  /*
  it('should fail to login with no credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({});
    expect(res.statusCode).toEqual(400);
  });
  */
});
