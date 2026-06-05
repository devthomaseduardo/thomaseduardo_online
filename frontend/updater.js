import fs from 'fs';
import path from 'path';

const frontendDir = '/home/thomas/Documentos/Github/portfolio_novo/frontend/src';

const apiRegex = /(?:http:\/\/localhost:3001\/api|http:\/\/127\.0\.0\.1:3001\/api|\/api(?!\/))/g;

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (stat.isFile() && /\.(tsx|ts|jsx|js)$/.test(file)) {
            // Skip config.ts itself
            if (file === 'config.ts') continue;
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let originalContent = content;
            let modified = false;

            // If the file uses /api/ or localhost:3001/api/
            if (content.match(apiRegex)) {
                // Ensure import { API_URL } from '@/config'; is present
                // We use relative or absolute alias depending on what's available, let's use relative to be safe or just standard
                // Actually, since I don't know the exact depth, I'll just check if they are using fetch or axios
                
                // Replace all API occurrences with `${API_URL}/api`
                // But we have to be careful with template literals and strings.
                // Simple approach: we'll look for strings and template literals containing these.
                content = content.replace(/['"`]http:\/\/(?:localhost|127\.0\.0\.1):3001\/api(.*?)(?:['"`])/g, '`${API_URL}/api$1`');
                
                // Also handle simple /api/ calls
                // If it starts with /api/, change to `${API_URL}/api/`
                content = content.replace(/['"`]\/api(.*?)(?:['"`])/g, '`${API_URL}/api$1`');

                if (content !== originalContent) {
                    // Inject import
                    if (!content.includes('API_URL')) {
                        // wait, if I replaced it, it DOES contain API_URL now.
                        // I need to check if the import is there.
                        if (!content.includes("from '../config'") && !content.includes("from '@/config'") && !content.includes("from '../../config'")) {
                            // find depth to src
                            const depth = fullPath.substring(frontendDir.length).split('/').length - 2;
                            const relativePath = depth === 0 ? './config' : '../'.repeat(depth) + 'config';
                            const importStatement = `import { API_URL } from '${relativePath}';\n`;
                            content = importStatement + content;
                        }
                    } else {
                        if (!content.includes('from') || !content.match(/import\s+.*API_URL/)) {
                            const depth = fullPath.substring(frontendDir.length).split('/').length - 2;
                            const relativePath = depth === 0 ? './config' : '../'.repeat(depth) + 'config';
                            const importStatement = `import { API_URL } from '${relativePath}';\n`;
                            content = importStatement + content;
                        }
                    }

                    fs.writeFileSync(fullPath, content, 'utf8');
                    console.log(`Updated: ${fullPath}`);
                }
            }
        }
    }
}

processDirectory(frontendDir);
console.log('Update complete.');
