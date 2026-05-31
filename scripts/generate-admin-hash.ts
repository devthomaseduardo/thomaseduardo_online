#!/usr/bin/env tsx
/**
 * Script: generate-admin-hash
 *
 * Generates a bcrypt hash for the admin password.
 * The hash should be stored in the ADMIN_PASSWORD_HASH env variable.
 *
 * Usage:
 *   npx tsx scripts/generate-admin-hash.ts
 *   or
 *   npm run generate:admin-hash
 */

import bcrypt from "bcrypt";
import readline from "readline";

const BCRYPT_ROUNDS = 12;

function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  console.log("\n🔐 Admin Password Hash Generator\n");
  console.log("This generates a bcrypt hash to store in your .env as ADMIN_PASSWORD_HASH\n");

  const password = await prompt("Enter admin password: ");

  if (!password || password.length < 8) {
    console.error("\n❌ Password must be at least 8 characters.\n");
    process.exit(1);
  }

  console.log("\nGenerating hash (this may take a moment)...");
  const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  console.log("\n✅ Add this to your .env file:\n");
  console.log(`ADMIN_PASSWORD_HASH="${hash}"`);
  console.log("\n⚠️  Keep this hash secret. Never commit it to git.\n");
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
