import request from 'supertest';
import app from '../src/app';
import { describe, expect, it } from '@jest/globals';

describe('User Data Routes', () => {
  it('should reject cart access without token', async () => {
    const res = await request(app).get('/user/cart');
    expect(res.status).toBe(401);
  });
});
