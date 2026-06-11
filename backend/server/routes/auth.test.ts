import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import authRouter from './auth';

// Mocks para dependências do auth.ts
vi.mock('../lib/audit.js', () => ({
  audit: vi.fn().mockResolvedValue(undefined),
  getClientIp: vi.fn(() => '127.0.0.1')
}));

vi.mock('../lib/jwt.js', () => ({
  signAdminToken: vi.fn(() => 'mocked-admin-token')
}));

vi.mock('../lib/env.js', () => ({
  env: {
    ADMIN_PASSWORD_HASH: null,
    NODE_ENV: 'test',
    JWT_SECRET: 'test-secret'
  }
}));

const app = express();
app.use(express.json());
app.use('/api', authRouter);

describe('Admin Auth Routes', () => {
  const originalEnv = process.env.ADMIN_PASSWORD;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.ADMIN_PASSWORD = 'password123';
  });

  it('POST /api/admin/login - deve retornar 200 e o token com a senha correta', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({ password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token', 'mocked-admin-token');
  });

  it('POST /api/admin/login - deve retornar 401 com senha incorreta', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({ password: 'wrong_password' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Credenciais inválidas.');
  });

  it('POST /api/admin/login - deve retornar 400 se a senha não for enviada', async () => {
    const response = await request(app)
      .post('/api/admin/login')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Credenciais inválidas.');
  });
});