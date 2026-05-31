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
 * Legacy middleware: also accept x-admin-key for backwards compat during migration.
 * TODO: Remove this after all clients are updated to use Bearer tokens.
 */
import { env } from "../lib/env.js";

export function adminAuth(req: Request, res: Response, next: NextFunction) {
  // Try Bearer JWT first
  const bearerToken = extractBearer(req.headers.authorization);
  if (bearerToken) {
    const payload = verifyAdminToken(bearerToken);
    if (payload?.role === "admin") return next();
  }

  // Fall back to x-admin-key (legacy — will be removed)
  const key = req.headers["x-admin-key"];
  if (key && key === env.ADMIN_PASSWORD_HASH) {
    // Note: comparing against HASH via x-admin-key is insecure but acceptable during transition
    // The real password hash check happens in bcrypt in the login route
    return res.status(401).json({ error: "Autenticação necessária. Use Bearer token." });
  }

  return res.status(401).json({ error: "Não autorizado." });
}
