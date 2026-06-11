import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type AuditAction =
  | "admin.login.success"
  | "admin.login.failed"
  | "client.login.failed"
  | "client.created"
  | "client.updated"
  | "client.deleted"
  | "project.created"
  | "project.updated"
  | "project.deleted"
  | "invoice.created"
  | "invoice.updated"
  | "invoice.deleted"
  | "payment.recorded"
  | "contract.created"
  | "contract.updated"
  | "contract.deleted"
  | "deploy.created"
  | "deploy.updated"
  | "deploy.deleted"
  | "file.uploaded"
  | "file.deleted"
  | "lead.created"
  | "lead.updated"
  | "lead.deleted"
  | "proposal.created"
  | "proposal.updated"
  | "proposal.deleted"
  | "task.created"
  | "task.updated"
  | "task.deleted"
  | "milestone.created"
  | "milestone.updated"
  | "milestone.deleted"
  | "integration.created"
  | "integration.updated"
  | "integration.deleted"
  | "credential.created"
  | "credential.updated"
  | "credential.deleted"
  | "team.member.created"
  | "team.member.updated"
  | "team.member.deleted"
  | "seed.blocked"
  | "access.denied"
  | "rate.limit.exceeded";

interface AuditEntry {
  action: AuditAction;
  actorType: "admin" | "client" | "system" | "anonymous";
  actorId?: string;
  ip?: string;
  userAgent?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Record a security audit event.
 * Never logs passwords, tokens, or hashes.
 */
export async function audit(entry: AuditEntry): Promise<void> {
  try {
    // Sanitize: never store sensitive fields in metadata
    const safeMetadata = entry.metadata
      ? sanitizeMetadata(entry.metadata)
      : undefined;

    await (prisma as any).securityLog.create({
      data: {
        action: entry.action,
        actorType: entry.actorType,
        actorId: entry.actorId ?? null,
        ip: entry.ip ?? null,
        userAgent: entry.userAgent ?? null,
        metadata: safeMetadata ? JSON.stringify(safeMetadata) : null,
      },
    });
  } catch (err) {
    // Log to stderr but never crash the app due to audit failure
    console.error("[AUDIT] Failed to write log:", err);
  }
}

const FORBIDDEN_KEYS = new Set([
  "password", "senha", "token", "secret", "hash",
  "key", "accessKey", "apiKey", "authorization", "cookie",
]);

function sanitizeMetadata(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (FORBIDDEN_KEYS.has(k.toLowerCase())) {
      result[k] = "[REDACTED]";
    } else {
      result[k] = v;
    }
  }
  return result;
}

export function getClientIp(req: { headers: Record<string, any>; connection?: any; socket?: any }): string {
  return (
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    "unknown"
  );
}
