#!/bin/bash
# Executar na raiz do projeto: /home/thomas/Documentos/Github/portfolio_novo

echo "📦 1. Instalando dependências novas (multer + uuid)..."
npm install multer @types/multer uuid @types/uuid

echo ""
echo "🗄️  2. Rodando migration do banco (adiciona ProjectFile, repoUrl, etc)..."
npx prisma migrate dev --name "add_project_files_and_invoice_fields"

echo ""
echo "🔧 3. Regenerando o Prisma Client..."
npx prisma generate

echo ""
echo "✅ Tudo pronto! Reinicie o servidor:"
echo "   npm run server"
echo ""
echo "📂 A pasta /uploads será criada automaticamente na primeira execução."
echo ""
echo "🔐 Senha padrão do admin: admin2024"
echo "   Altere via variável de ambiente: ADMIN_PASSWORD=suasenha npm run server"
