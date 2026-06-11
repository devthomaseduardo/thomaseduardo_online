import { Request, Response, NextFunction } from "express";
import { extractBearer, verifyAdminToken } from "../lib/jwt.js";

/**
 * Middleware: Require valid admin JWT (Bearer token).
 * Replaces the insecure x-admin-key check.
 */
export function requireAdminJWT(req: Request, res: Response, next: NextFunction) {
  const token = extractBearer(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ error: "Autenticação necessária." });
  }

  const payload = verifyAdminToken(token);

  if (!payload || payload.role !== "admin" || payload.type !== "admin") {
    return res.status(401).json({ error: "Token inválido ou expirado." });
  }

  next();
}

/**
 * Admin authentication middleware (Strict Bearer JWT).
 */
export function adminAuth(req: Request, res: Response, next: NextFunction) {
  const bearerToken = extractBearer(req.headers.authorization);
  
  if (bearerToken) {
    const payload = verifyAdminToken(bearerToken);
    if (payload?.role === "admin") {
      (req as any).user = payload;
      return next();
    }
  }

  return res.status(401).json({ error: "Não autorizado.", details: "Invalid or missing Bearer token" });
}
