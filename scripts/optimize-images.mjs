/**
 * optimize-images.mjs
 * Converte todas as imagens PNG/JPG para WebP usando sharp.
 * Execute: node scripts/optimize-images.mjs
 * Requer: npm install --save-dev sharp
 */

import sharp from 'sharp';
import { readdir, stat, mkdir } from 'fs/promises';
import { join, extname, basename, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = join(__dirname, '..', 'public');

const TASKS = [
  // Imagens de projetos: reduzir para max 1200px de largura, qualidade 80
  {
    dir: join(PUBLIC_DIR, 'projetos'),
    maxWidth: 1200,
    quality: 80,
  },
  // Imagens de clientes: max 400px
  {
    dir: join(PUBLIC_DIR, 'clientes'),
    maxWidth: 400,
    quality: 80,
  },
  // Imagens de produtos: max 800px
  {
    dir: join(PUBLIC_DIR, 'produtos'),
    maxWidth: 800,
    quality: 82,
  },
  // Avatar principal: max 400px
  {
    dir: PUBLIC_DIR,
    include: ['avatar.png', 'avatar-linkbio.png', 'og.png', 'og-linkbio.png', 'logo.png'],
    maxWidth: 800,
    quality: 85,
  },
];

const EXTS = ['.png', '.jpg', '.jpeg'];

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function convertFile(filePath, maxWidth, quality) {
  const ext = extname(filePath).toLowerCase();
  if (!EXTS.includes(ext)) return null;

  const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

  const before = (await stat(filePath)).size;

  await sharp(filePath)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality })
    .toFile(outPath);

  const after = (await stat(outPath)).size;
  const saved = ((before - after) / before * 100).toFixed(1);

  return { filePath, outPath, before, after, saved };
}

async function processTask(task) {
  const { dir, maxWidth, quality, include } = task;

  let files;
  try {
    files = await readdir(dir);
  } catch {
    console.warn(`  ⚠️  Diretório não encontrado: ${dir}`);
    return;
  }

  if (include) {
    files = files.filter(f => include.includes(f));
  }

  for (const file of files) {
    const filePath = join(dir, file);
    try {
      const result = await convertFile(filePath, maxWidth, quality);
      if (result) {
        const status = result.after < result.before ? '✅' : '⚠️';
        console.log(
          `  ${status} ${basename(result.outPath)} | ${formatBytes(result.before)} → ${formatBytes(result.after)} (${result.saved}% menor)`
        );
      }
    } catch (err) {
      console.error(`  ❌ Erro em ${file}: ${err.message}`);
    }
  }
}

async function main() {
  console.log('🖼️  Iniciando otimização de imagens...\n');

  let totalBefore = 0;
  let totalAfter = 0;

  for (const task of TASKS) {
    console.log(`📁 ${task.dir.replace(PUBLIC_DIR, '/public')}`);
    await processTask(task);
    console.log('');
  }

  console.log('✅ Otimização concluída!');
  console.log('');
  console.log('⚠️  IMPORTANTE: Após converter, atualize as referências no código:');
  console.log('   .png → .webp em todos os componentes que referenciam imagens de /projetos/, /clientes/, /produtos/');
  console.log('   Ou use a tag <picture> para servir WebP com fallback PNG.');
}

main().catch(console.error);
