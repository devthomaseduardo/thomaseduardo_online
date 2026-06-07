# Guia de Deployment

Este documento descreve os passos e as boas práticas para realizar o deploy do portfólio em ambientes de produção. Como o projeto é dividido em Frontend (Vite/React) e Backend (Express/Node), os deploys podem ser feitos em serviços separados para maior flexibilidade.

## 1. Variáveis de Ambiente

Antes de realizar o deploy, garanta que as seguintes variáveis de ambiente estejam configuradas no seu provedor:

**Backend:**
- `DATABASE_URL`: URL de conexão de produção do banco PostgreSQL (ex: Neon).
- `RESEND_API_KEY`: Chave de API do Resend para envio de emails.
- `PORT`: Porta exposta pelo servidor web (geralmente injetada automaticamente, ex: Heroku/Render).
- `NODE_ENV`: Deve ser definido como `production`.
- *Qualquer outra chave de API necessária.*

**Frontend:**
- `VITE_API_URL`: A URL pública de onde o Backend está hospedado (ex: `https://meu-backend.onrender.com`).

## 2. Estratégias Recomendadas

### Frontend (Hospedagem Estática)
Plataformas recomendadas: **Vercel**, **Netlify** ou **Cloudflare Pages**.
- **Comando de Build**: `npm run build` (dentro da pasta `frontend` ou utilizando workspaces: `npm --workspace=frontend run build`).
- **Output Directory**: `frontend/dist`.
- Nestas plataformas, o deploy é tipicamente feito através da integração direta com a branch `main` do GitHub.

### Backend (Node.js)
Plataformas recomendadas: **Render**, **Railway**, **Heroku** ou **DigitalOcean App Platform**.
- **Comando de Build/Setup**: `npm install` e `npx prisma generate` && `npx prisma deploy` (para rodar migrações pendentes).
- **Comando de Start**: `npm --workspace=backend run start` (Certifique-se de configurar um script `start` no package.json do backend).
- Lembre-se de configurar a Health Check Route (ex: `/api/health`) para que o load balancer saiba que a aplicação está de pé.

### Banco de Dados (Neon PostgreSQL)
- Recomenda-se utilizar as "Branches" do Neon para separar o banco de desenvolvimento do banco de produção.
- Aplique as migrações no banco de produção usando `npx prisma migrate deploy`. Nunca use `migrate dev` em produção.

## 3. Docker (Alternativa)
O projeto contém um `docker-compose.yml` na raiz. Isso pode ser usado para provisionar o ambiente em uma VPS (ex: AWS EC2, DigitalOcean Droplet).
- O `docker-compose` atual deve ser inspecionado para garantir que ele faz o build do backend e serve o frontend (seja via Nginx ou através do próprio Node.js servindo arquivos estáticos).
