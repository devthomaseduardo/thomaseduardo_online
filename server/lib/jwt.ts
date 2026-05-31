import jwt from "jsonwebtoken";
import { env } from "./env.js";

export interface AdminTokenPayload {
  role: "admin";
  type: "admin";
  iat?: number;
  exp?: number;
}

const ADMIN_TOKEN_EXPIRY = "4h";

/**
 * Sign a JWT for admin access. Never includes password or hash.
 */
export function signAdminToken(): string {
  const payload: Omit<AdminTokenPayload, "iat" | "exp"> = {
    role: "admin",
    type: "admin",
  };
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: ADMIN_TOKEN_EXPIRY });
}

/**
 * Verify a JWT and return the payload if valid, null otherwise.
 */
export function verifyAdminToken(token: string): AdminTokenPayload | null {
  try {
    return jwt.verify(token, env.JWT_SECRET) as AdminTokenPayload;
  } catch {
    return null;
  }
}

/**
 * Extract Bearer token from Authorization header.
 */
export function extractBearer(authHeader?: string): string | null {
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7).trim();
  return token.length > 0 ? token : null;
}
