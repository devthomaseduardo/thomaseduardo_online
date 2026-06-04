import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';

/**
 * Load .env file into process.env before validation.
 * Search parent directories so backend can run from /backend while .env is at repo root.
 */
const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(process.cwd(), '../../.env'),
];
const envPath = envCandidates.find(p => fs.existsSync(p));
if (envPath) {
  config({ path: envPath });
} else {
  config();
}

/**
 * Environment validation — fails fast if any required variable is missing.
 * NEVER use fallback values for security-sensitive variables.
 */

const REQUIRED = [
  "DATABASE_URL",
  "JWT_SECRET",
  "ADMIN_PASSWORD_HASH",
] as const;

function validateEnv() {
  const missing: string[] = [];

  for (const key of REQUIRED) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.error("\n❌ FATAL: Missing required environment variables:");
    missing.forEach(k => console.error(`   → ${k}`));
    console.error("\nSet these in your .env file and restart.\n");
    process.exit(1);
  }

  // Warn about weak JWT secret in production
  if (process.env.NODE_ENV === "production") {
    const secret = process.env.JWT_SECRET!;
    if (secret.length < 32) {
      console.error("❌ FATAL: JWT_SECRET must be at least 32 characters in production.");
      process.exit(1);
    }
  }
}

validateEnv();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH!,
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "3001", 10),
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000").split(",").map(s => s.trim()),
  SEED_SECRET: process.env.SEED_SECRET ?? null,
} as const;
