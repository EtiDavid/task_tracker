const request = require('supertest');
const app = require('./index');

describe('GET /matches', () => {
  it('should return a list of matches', async () => {
    const res = await request(app).get('/matches');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe('GET /', () => {
  it('should return a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Welcome to the Football API');
  });
});

describe('GET /invalid-route', () => {
  it('should return 404 for unknown routes', async () => {
    const res = await request(app).get('/invalid-route');
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe('Not Found');
  });
});

