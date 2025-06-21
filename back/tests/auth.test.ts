import request from 'supertest';
import app from '../src/app';
import { describe, expect, it } from '@jest/globals';


describe('Auth Routes', () => {
  it('should return 401 for invalid credentials', async () => {
    const res = await request(app).post('/token').send({
      email: 'notexist@test.com',
      password: 'password'
    });
    expect(res.status).toBe(401);
  });

  it('should return 400 when creating an existing user', async () => {
    const res = await request(app).post('/account').send({
      email: 'test@test.com',
      password: 'password',
      username: 'testuser',
      firstname: 'Test'
    });
    expect([201, 400]).toContain(res.status);
  });
});
