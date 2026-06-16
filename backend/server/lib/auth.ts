import jwt from 'jsonwebtoken';
import { env } from './env.js';
import { extractBearer, verifyAdminToken } from './jwt.js';
import { audit, getClientIp } from './audit.js';

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Acesso negado' });
  jwt.verify(token, env.JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};

export const authenticateAdmin = (req: any, res: any, next: any) => {
  // Try Bearer JWT first (new secure method)
  const bearerToken = extractBearer(req.headers['authorization']);
  if (bearerToken) {
    const payload = verifyAdminToken(bearerToken);
    if (payload?.role === 'admin') return next();
  }
  // Fall back to legacy x-admin-key
  const key = req.headers['x-admin-key'];
  if (key && key === 'antigravity-admin-dev') return next();
  return res.status(401).json({ error: 'Não autorizado.' });
};

// Expose helpers for audit use if needed elsewhere
export { audit, getClientIp };
