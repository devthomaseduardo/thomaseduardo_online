
<h1 align="center">Portfólio Editorial & SaaS | Plataforma de Alta Performance</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Versão-1.0.0-blue.svg" alt="Versão">
  <img src="https://img.shields.io/badge/Licença-MIT-green.svg" alt="Licença">
  <img src="https://img.shields.io/badge/Arquitetura-Monorepo-orange.svg" alt="Arquitetura">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6.svg?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Node.js-Backend-339933.svg?logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB.svg?logo=react&logoColor=black" alt="React">
</p>

## 🚀 Visão Geral de Negócio

Este repositório abriga o ecossistema completo do meu **Portfólio Profissional**, concebido com uma estética editorial e foco em conversão e usabilidade de alto nível. Além de exibir projetos, ele opera como uma plataforma "Centro de Operações" completa, que conta com um painel de administração completo para gerenciar Leads, Projetos, Clientes, Propostas e Finanças.

O objetivo do projeto é demonstrar capacidade técnica *end-to-end* (Fullstack), do design de interface pixel-perfect à engenharia de software robusta, modelagem de banco de dados e automação de APIs.

## 🛠 Principais Tecnologias

Este projeto utiliza uma arquitetura de monorepo estruturada para escalar:

**Frontend (SPA)**
- [React.js](https://reactjs.org/) + [Vite](https://vitejs.dev/) - Performance e experiência imersiva de UI.
- [TypeScript](https://www.typescriptlang.org/) - Escalabilidade e tipagem segura.
- [Tailwind CSS](https://tailwindcss.com/) - Design utility-first para interfaces premium e flexíveis.

**Backend (API)**
- [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/) - Motor do servidor escalável e não-bloqueante.
- [Prisma ORM](https://www.prisma.io/) - Mapeamento objeto-relacional robusto e type-safe.
- [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/)) - Persistência de dados confiável.
- [Resend](https://resend.com/) - Integração para envio assíncrono de notificações transacionais (Emails).

## 📁 Estrutura de Pastas

A arquitetura do projeto segue uma divisão modular para manter escalabilidade e facilidade de manutenção:

```text
.github/             # Configurações de CI/CD (GitHub Actions)
backend/             # Aplicação Node.js / Express
  ├── server/
  │   ├── controllers/ # Lógica de apresentação da API
  │   ├── lib/         # Serviços, integrações e utilitários
  │   ├── routes/      # Definição de rotas da API REST
  │   └── index.ts     # Ponto de entrada do servidor
  └── prisma/        # Schemas e migrações do banco de dados
frontend/            # Aplicação React / Vite SPA
  ├── src/
  │   ├── components/  # Componentes reutilizáveis
  │   ├── pages/       # Views de página inteira
  │   └── lib/         # Utilitários do frontend
docs/                # Documentação detalhada
scripts/             # Scripts de automação
tests/               # Suíte de testes (unitários, integração, E2E)
```

## 📖 Documentação Detalhada

A documentação estendida do projeto se encontra no diretório `/docs`:

- [Arquitetura (ARCHITECTURE.md)](docs/ARCHITECTURE.md) - Visão geral da arquitetura, fluxo de dados e decisões técnicas.
- [Documentação da API (API.md)](docs/API.md) - Contratos, endpoints, autenticação e payloads do Backend.
- [Guia de Deploy (DEPLOYMENT.md)](docs/DEPLOYMENT.md) - Instruções para publicação da infraestrutura nos ambientes.
- [Operações e Monitoramento (OPERATIONS.md)](docs/OPERATIONS.md) - Resolução de problemas, logs e gerenciamento.

## 💻 Como Rodar Localmente

**Pré-requisitos:** Node.js v18+ e uma instância PostgreSQL (ou configuração do Neon).

1. **Instale as dependências na raiz do monorepo:**
   ```bash
   npm install
   ```

2. **Configure as Variáveis de Ambiente:**
   Duplique o arquivo `.env.example` e `.env.neon.example` para `.env` na raiz, preenchendo as chaves necessárias (especialmente `DATABASE_URL`, `DIRECT_URL` e `RESEND_API_KEY`).

3. **Inicie os servidores de Desenvolvimento:**
   Execute o script unificado que inicializa o Frontend e o Backend simultaneamente:
   ```bash
   npm run dev
   ```

   *Se preferir executar individualmente:*
   - Backend: `npm run dev:backend`
   - Frontend: `npm run dev:frontend`

## 🧪 Como Testar

Scripts de linting já estão pré-configurados no ambiente:
```bash
```bash
# Roda a análise estática
npm run lint

# Executa a suíte de testes unitários (Vitest)
npm run test
```

A suíte de testes utiliza **Vitest** para testes unitários e de integração, e está preparada para **Playwright** para testes E2E.

## 🤝 Contribuição

Contribuições são bem-vindas e ajudam a manter este projeto robusto! Por favor, leia nosso [Guia de Contribuição (CONTRIBUTING.md)](CONTRIBUTING.md) para detalhes do nosso processo e padrões de código.

Consulte o [Changelog](CHANGELOG.md) para ver as últimas novidades e correções.

## 📜 Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
