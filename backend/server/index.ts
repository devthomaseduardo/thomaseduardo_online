import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import portalRouter from './routes/portal.ts';
import paymentsRouter from './routes/payments.ts';
import authRouter from './routes/auth.ts';
import apiRouter from './routes/api.ts';
import projectsRouter from './routes/projects.ts';
import rateLimit from 'express-rate-limit';
import { env } from './lib/env.js';
import { audit, getClientIp } from './lib/audit.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();

const JWT_SECRET = env.JWT_SECRET;
// ADMIN_PASSWORD kept for legacy seed compatibility only — remove in v2
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? '';


// ─── Uploads directory ───────────────────────────────────────────────────────
const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });

// ─── Multer storage ──────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req: any, file, cb) => {
    const { projectId } = req.params;
    const dir = path.join(UPLOADS_DIR, projectId || 'general');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e6);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// ─── Rate Limiters ────────────────────────────────────────────────────────────
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
  handler: async (req, res) => {
    res.status(429).json({ error: 'Muitas tentativas. Tente novamente em 15 minutos.' });
  },
});

const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Middleware ───────────────────────────────────────────────────────────────
import helmet from 'helmet';

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // handled by vite in dev; configure per-deploy in prod
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow CDN fonts/images
}));

// CORS — whitelist only
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser (curl, server-to-server) and whitelisted origins
    if (!origin || env.ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`[CORS] Rejected origin: ${origin}`);
      // In development, we might want to be more permissive or at least not return a raw Error that Express turns into HTML
      if (env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error(`CORS: Origin "${origin}" is not allowed.`));
      }
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));

app.use(generalLimiter);
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(UPLOADS_DIR));

// Mount newly extracted routers (non-destructive mount alongside existing handlers)
app.use('/api/v2', apiRouter);
app.use('/api', authRouter);
app.use('/api/projects', projectsRouter(upload));

// ─── Global Error Handler ───────────────────────────────────────────────────
app.use((err: any, req: any, res: any, next: any) => {
  console.error('[Global Error]', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Erro interno do servidor',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ─── Auth middlewares ─────────────────────────────────────────────────────────

const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acesso negado' });

  jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET as string) as any;
      if (decoded.role === 'admin') {
        req.user = decoded;
        return next();
      }
    } catch (e) {
      // JWT failed, try legacy key
    }
  }

  const key = req.headers['x-admin-key'];
  if (key === ADMIN_PASSWORD && ADMIN_PASSWORD !== '') {
    req.user = { role: 'admin' };
    return next();
  }
  
  return res.status(401).json({ error: 'Acesso administrativo negado' });
};

// ─── Legacy Routes (to be migrated) ───────────────────────────────────────────

if (process.env.NODE_ENV !== 'production') {
  app.use('/api/portal', portalRouter);
  app.use('/api/payments', authenticateAdmin, paymentsRouter);
}

// ─── Server start ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads dir: ${UPLOADS_DIR}`);
});
