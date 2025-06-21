import request from 'supertest';
import app from '../src/app';
import { describe, expect, it } from '@jest/globals';

describe('Product Routes', () => {
  it('should reject access without token', async () => {
    const res = await request(app).get('/products');
    expect(res.status).toBe(401);
  });
});
