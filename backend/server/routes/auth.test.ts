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

describe('PostHog Proxy Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Stub do fetch global para não fazer requisições reais
    vi.stubGlobal('fetch', vi.fn());
  });

  it('all /api/ingest* - deve encaminhar requisições POST com corpo e headers para o PostHog', async () => {
    const mockResponse = { status: 'ok', task_id: '123' };
    
    (fetch as any).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve(mockResponse)
    });

    const testBody = { event: 'button_clicked', properties: { distinct_id: 'user_1' } };

    const response = await request(app)
      .post('/api/ingest/e/')
      .set('Content-Type', 'application/json')
      .set('X-Forwarded-For', '203.0.113.195')
      .send(testBody);

    expect(fetch).toHaveBeenCalledWith(
      'https://us.i.posthog.com/e/',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
          'X-Forwarded-For': '203.0.113.195'
        }),
        body: JSON.stringify(testBody)
      })
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockResponse);
  });

  it('all /api/ingest* - deve encaminhar requisições GET sem corpo', async () => {
    (fetch as any).mockResolvedValue({
      status: 200,
      json: () => Promise.resolve({ config: {} })
    });

    const response = await request(app).get('/api/ingest/decide/?v=3');

    expect(fetch).toHaveBeenCalledWith(
      'https://us.i.posthog.com/decide/?v=3',
      expect.objectContaining({
        method: 'GET',
        body: undefined
      })
    );
    expect(response.status).toBe(200);
  });

  it('all /api/ingest* - deve retornar 500 se o fetch falhar', async () => {
    // Simula um erro de rede ou DNS
    (fetch as any).mockRejectedValue(new Error('DNS Lookup failed'));

    const response = await request(app)
      .post('/api/ingest/e/')
      .send({ some: 'data' });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal proxy error');
  });
});