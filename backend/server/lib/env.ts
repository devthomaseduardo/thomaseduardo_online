import { config } from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * Load .env file into process.env before validation.
 * Search parent directories so backend can run from /backend while .env is at repo root.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envCandidates = [
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), '../.env'),
  path.resolve(process.cwd(), '../../.env'),
  // Absolute path relative to this file: backend/server/lib/ -> root
  path.resolve(__dirname, '../../../.env'),
  path.resolve(__dirname, '../../../../.env'),
];

const envPath = envCandidates.find(p => fs.existsSync(p));
if (envPath) {
  const result = config({ path: envPath, override: true });
  if (!result.error) {
    console.log(`✅ [env] Carregado: ${envPath}`);
  }
} else {
  console.warn('⚠️ [env] Arquivo .env não encontrado em nenhum candidato. Usando variáveis do sistema.');
  config({ override: true });
}

/**
 * Environment validation — fails fast if any required variable is missing.
 * NEVER use fallback values for security-sensitive variables.
 */

const REQUIRED_ENV_VARS = [
  "DATABASE_URL",
  "RESEND_API_KEY"
] as const;

const PLACEHOLDER_RESEND_API_KEY = "re_CzVpVh3V_EMohV75K9jQybnDLwsyBTjKc"; // Define the placeholder

function validateEnv() {
  const missing: string[] = [];
  const placeholderUsed: string[] = [];

  for (const key of REQUIRED_ENV_VARS) {
    const value = process.env[key];
    if (!value || value.trim() === "") {
      missing.push(key);
    } else if (key === "RESEND_API_KEY" && value === PLACEHOLDER_RESEND_API_KEY) {
      placeholderUsed.push(key);
    }
  }

  if (missing.length > 0) {
    console.error("\n❌ ERRO: Variáveis de ambiente obrigatórias faltando:");
    missing.forEach(k => console.error(`   → ${k}`));
    console.error("\nPor favor, configure as variáveis no seu arquivo .env ou no ambiente.\n");
    process.exit(1); // Exit if required variables are truly missing
  }

  if (process.env.NODE_ENV === 'production' && !process.env.CI) {
    console.warn("\n⚠️ AVISO: NODE_ENV está definido como 'production' em ambiente de desenvolvimento.");
    console.warn("Iso pode causar problemas com o Vite e ferramentas de hot-reload.\n");
  }

  if (placeholderUsed.length > 0) {
    console.error("\n❌ ERRO: Variáveis de ambiente obrigatórias usando valor placeholder:");
    placeholderUsed.forEach(k => console.error(`   → ${k} ainda está com o valor padrão. Por favor, substitua-o por uma chave válida.`));
    console.error("\nPor favor, configure as variáveis no seu arquivo .env ou no ambiente.\n");
    process.exit(1); // Exit if placeholder is used for critical keys
  }

  const port = process.env.PORT || "3001";
  console.log(`✅ Variáveis de ambiente validadas. Tentando iniciar na porta: ${port}`);
}

validateEnv();

export const env = {
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/portfolio",
  JWT_SECRET: process.env.JWT_SECRET || "5b8a6f4e2d9c1b3a5f7e9d2c4b6a8f0e1d3c5b7a9f2e4d6c8b0a2f4e6d8c1b3a",
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || "placeholder",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: parseInt(process.env.PORT ?? "3001", 10),
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:3001,http://localhost:3002,http://localhost:5173").split(",").map(s => s.trim()),
  SEED_SECRET: process.env.SEED_SECRET ?? null,
  RESEND_API_KEY: process.env.RESEND_API_KEY || PLACEHOLDER_RESEND_API_KEY, // Use the defined placeholder
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3001",
  VERCEL_TOKEN: process.env.VERCEL_TOKEN || null,
} as const;
