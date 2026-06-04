import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { env } from '../lib/env.js';
import { signAdminToken } from '../lib/jwt.js';
import { audit, getClientIp } from '../lib/audit.js';
import { authenticateToken } from '../lib/auth.js';

const prisma = new PrismaClient();
const router = express.Router();

const adminLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => {
    await audit({ action: 'rate.limit.exceeded', actorType: 'anonymous', ip: getClientIp(req as any), userAgent: req.headers['user-agent'], metadata: { route: '/api/admin/login' } });
    res.status(429).json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' });
  },
});

const clientLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: async (req, res) => res.status(429).json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' }),
});

// Admin login
router.post('/admin/login', adminLoginLimiter, async (req: any, res: any) => {
  const { password } = req.body;
  const ip = getClientIp(req);

  if (!password || typeof password !== 'string') {
    return res.status(400).json({ error: 'Credenciais inválidas.' });
  }

  try {
    const hash = env.ADMIN_PASSWORD_HASH;
    const isValidHash = hash && !hash.includes('placeholder')
      ? await bcrypt.compare(password, hash)
      : password === process.env.ADMIN_PASSWORD;

    if (!isValidHash) {
      await audit({ action: 'admin.login.failed', actorType: 'anonymous', ip, userAgent: req.headers['user-agent'] });
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = signAdminToken();
    await audit({ action: 'admin.login.success', actorType: 'admin', ip, userAgent: req.headers['user-agent'] });

    return res.json({ token });
  } catch (err) {
    console.error('[admin/login]', err);
    return res.status(500).json({ error: 'Erro interno.' });
  }
});

// Client login
router.post('/auth/login', clientLoginLimiter, async (req: any, res: any) => {
  try {
    const { identifier, password } = req.body;

    const client = await prisma.client.findFirst({
      where: {
        OR: [
          { email: identifier },
          { cnpj: identifier }
        ]
      }
    });

    if (!client) return res.status(401).json({ error: 'Credenciais inválidas' });

    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = jwt.sign({ id: client.id, email: client.email }, env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login bem-sucedido', token, client: { id: client.id, name: client.name, email: client.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to authenticate' });
  }
});

// Client self info
router.get('/clients/me', authenticateToken, async (req: any, res: any) => {
  try {
    const prismaClient = prisma;
    const client = await prismaClient.client.findUnique({
      where: { id: req.user.id },
      include: {
        projects: {
          include: { invoices: { orderBy: { createdAt: 'desc' } }, files: { orderBy: { createdAt: 'desc' } } }
        }
      }
    });
    if (!client) return res.status(404).json({ error: 'Cliente não encontrado' });
    const { password: _pw, ...safeClient } = client as any;
    res.json(safeClient);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch client data' });
  }
});

// Seed route for development
if (env.NODE_ENV !== 'production') {
  router.get('/seed-clients', async (req, res) => {
    try {
      // re-use existing seed logic from index
      // Keep this minimal here; heavy seeding is handled by scripts/seed.ts
      res.json({ success: true, message: 'Seed route (stub) — use scripts/seed.ts for full seeding.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to seed clients' });
    }
  });
}

export default router;
