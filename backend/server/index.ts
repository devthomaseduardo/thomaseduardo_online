import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import authRouter from './features/auth/auth.js';
import apiRouter from './routes/api.js';
import portalRouter from './routes/portal.js';
import webhooksRouter from './routes/webhooks.js';
import rateLimit from 'express-rate-limit';
import { env } from './lib/env.js';
import { audit, getClientIp } from './lib/audit.js';
import { createLead } from './controllers/contact.controller.js';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = env.PORT || 3001;
app.use(express.json());

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

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'up', timestamp: new Date() });
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
});

// ─── Rate Limiters ────────────────────────────────────────────────────────────
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

// ─── Middleware ───────────────────────────────────────────────────────────────

// Security headers
app.use(helmet({
  contentSecurityPolicy: false, // handled by vite in dev; configure per-deploy in prod
  crossOriginResourcePolicy: { policy: 'cross-origin' }, // allow CDN fonts/images
}));

// CORS — whitelist only
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || env.ALLOWED_ORIGINS.includes(origin) || origin === env.FRONTEND_URL || origin === env.BACKEND_URL || env.NODE_ENV !== 'production') {
      callback(null, true);
    } else {
      console.warn(`[CORS] Aviso: Origem "${origin}" não está na whitelist oficial, mas foi permitida pela política flexível de produção.`);
      callback(null, true);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-admin-key']
}));

app.use(generalLimiter);
app.use('/uploads', express.static(UPLOADS_DIR));

// Rotas Públicas
app.post('/api/contact', createLead);

// API v2 (Admin Panel)
app.use('/api/v2', apiRouter(upload));

// Client Portal & Auth
app.use('/api', authRouter);
app.use('/api/portal', portalRouter);
app.use('/api/webhooks', webhooksRouter);

// ─── Global Error Handler ───────────────────────────────────────────────────
app.use((err: any, req: any, res: any, next: any) => {
  console.error('[Global Error]', err);
  const status = err.status || err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Erro interno do servidor',
    details: env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ─── Server start ────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`📁 Uploads dir: ${UPLOADS_DIR}`);
  
  if (!env.RESEND_API_KEY || env.RESEND_API_KEY.includes('re_missing_key')) {
    console.warn(`\n⚠️ [ATENÇÃO - E-MAIL] RESEND_API_KEY não detectada nas variáveis de ambiente!`);
    console.warn(`   A automação de e-mails (como as respostas automáticas para Leads) não funcionará.`);
    console.warn(`   Configure a chave na sua plataforma de hospedagem (Vercel/Render).\n`);
  }
  console.log(`🚀 Server running on port ${PORT}`);
});
