import express from 'express';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import portalOnboardingHandler from '../../api/portal_onboarding.ts';
import { env } from '../lib/env.js';
import { authenticateToken } from '../lib/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/onboarding', portalOnboardingHandler);

router.post('/login', async (req: any, res: any) => {
  try {
    const { cnpj, email, password, identifier } = req.body;
    const loginId = identifier || cnpj || email;

    if (!loginId || !password) {
      return res.status(400).json({ error: 'Identificador (email/cnpj) e senha são obrigatórios.' });
    }

    const client = await prisma.client.findFirst({
      where: {
        OR: [
          { cnpj: loginId },
          { email: loginId }
        ],
        portalActive: true
      }
    });

    if (!client) {
      return res.status(401).json({ error: 'Credenciais inválidas ou portal desativado.' });
    }

    const bcrypt = await import('bcrypt');
    let isMatch = false;
    try {
      isMatch = await bcrypt.default.compare(password, client.password);
    } catch (e) {}

    if (!isMatch && password === client.password) {
      isMatch = true;
    }

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    await prisma.client.update({ where: { id: client.id }, data: { lastLogin: new Date() } });

    const token = jwt.sign({ id: client.id, email: client.email }, env.JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      client: { id: client.id, name: client.name, email: client.email, cnpj: client.cnpj },
      message: 'Login do portal realizado com sucesso.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro interno no login do portal.' });
  }
});

router.get('/dashboard', authenticateToken, async (req: any, res: any) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.user.id },
      include: {
        projects: {
          include: {
            invoices: { orderBy: { createdAt: 'desc' } },
            files: { orderBy: { createdAt: 'desc' } },
            timeline: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            tasks: { where: { visivelCliente: true }, orderBy: { ordem: 'asc' } },
            credentials: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            milestoneApprovals: { orderBy: { createdAt: 'desc' } },
            contracts: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } },
            integrations: { where: { visivelCliente: true }, orderBy: { createdAt: 'desc' } }
          }
        }
      }
    });

    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    const { password: _pw, ...safeClient } = client as any;
    res.json({ client: safeClient });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao carregar dashboard do portal.' });
  }
});

export default router;
