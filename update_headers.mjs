import fs from 'fs';
import path from 'path';

const dir = '/home/thomas/Documentos/Github/portfolio_novo/frontend/src/components/admin/';
const files = [
  'ContratosModule.tsx',
  'UploadsModule.tsx',
  'DeploysModule.tsx',
  'ProjectsKanban.tsx',
  'ClientesModule.tsx',
  'AnalyticsModule.tsx',
  'FinanceiroModule.tsx'
];

const replacement = `const hdrs = () => {
  const t = localStorage.getItem("adminToken") || localStorage.getItem("adminAuth") || "";
  return { "Content-Type": "application/json", ...(t ? { "Authorization": \`Bearer \${t}\`, "x-admin-key": t } : {}) };
};`;

for (const f of files) {
  const p = path.join(dir, f);
  let content = fs.readFileSync(p, 'utf8');
  content = content.replace(/const hdrs = \(\) => \(\{[^\}]+x-admin-key[^\}]+\}\);/, replacement);
  fs.writeFileSync(p, content, 'utf8');
}
console.log('Updated headers in all files');
