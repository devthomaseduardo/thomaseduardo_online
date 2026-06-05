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
] as const;

function validateEnv() {
  const missing: string[] = [];

  for (const key of REQUIRED) {
    if (!process.env[key]) {
      missing.push(key);
    }
  }

  if (missing.length > 0) {
    console.warn("\n⚠️ AVISO: Variáveis de ambiente faltando:");
    missing.forEach(k => console.warn(`   → ${k}`));
    console.warn("\nO servidor pode apresentar erros se o banco de dados não estiver configurado.\n");
  }
}

validateEnv();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/portfolio",
  JWT_SECRET: process.env.JWT_SECRET || "5b8a6f4e2d9c1b3a5f7e9d2c4b6a8f0e1d3c5b7a9f2e4d6c8b0a2f4e6d8c1b3a",
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || "placeholder",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "3001", 10),
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS ?? "http://localhost:3000,http://localhost:5173,https://portfolio-novo-frontend.onrender.com").split(",").map(s => s.trim()),
  SEED_SECRET: process.env.SEED_SECRET ?? null,
} as const;
