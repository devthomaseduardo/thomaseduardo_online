# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: homepage.spec.ts >> portfolio projects section is loaded
- Location: tests/e2e/homepage.spec.ts:8:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: /projetos/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: /projetos/i })

```

```yaml
- navigation:
  - link "Logo Thomas Eduardo":
    - /url: /
    - img "Logo"
    - text: Thomas Eduardo
  - link "Filosofia":
    - /url: "#sobre"
  - link "Operação":
    - /url: "#metodologia"
  - link "Estudos":
    - /url: "#casos"
  - link "Contato":
    - /url: "#contato"
  - button "EN"
  - link "rocket Iniciar Projeto":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20iniciar%20um%20projeto.
    - img "rocket"
    - text: Iniciar Projeto
- link "Instagram":
  - /url: https://instagram.com/devthomaseduardo
  - img
  - text: Instagram
- link "LinkedIn":
  - /url: https://linkedin.com/in/devthomaseduardo
  - img
  - text: LinkedIn
- link "GitHub":
  - /url: https://github.com/devthomaseduardo
  - img
  - text: GitHub
- main:
  - img "Visualização técnica de arquitetura de software premium"
  - heading "Transformo gargalos em ativos de escala." [level=1]
  - img "Thomas"
  - text: Olá, boa tarde, eu sou o Thomas
  - img "waving hand"
  - paragraph: Desenvolvo arquiteturas de software, automações e ecossistemas privados para empresas que buscam previsibilidade e eficiência operacional absoluta.
  - link "EXPLORAR CASES":
    - /url: "#casos"
  - link "rocket INICIAR PROJETO":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20estruturar%20um%20projeto%20e%20resolver%20meus%20gargalos.
    - img "rocket"
    - text: INICIAR PROJETO
  - img "Thomas Eduardo"
  - text: Soluções
  - heading "Soluções que eliminam gargalos." [level=2]
  - paragraph: Engenharia de software focada em governança de dados, eliminação de fricção operacional e infraestrutura preparada para o crescimento exponencial.
  - text: "01"
  - heading "Sistema Operacional" [level=3]
  - paragraph: Centralize processos, equipe, clientes, estoque, financeiro e ordens de serviço em uma única plataforma.
  - list:
    - listitem: Ordens de Serviço
    - listitem: CRM
    - listitem: Gestão Operacional
    - listitem: Financeiro
    - listitem: Estoque
  - link "Saiba Mais":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20saber%20mais%20sobre%20sistema%20operacional
  - text: "02"
  - heading "Automações Inteligentes" [level=3]
  - paragraph: Automatize tarefas repetitivas, integrações, mensagens, notificações e fluxos internos.
  - list:
    - listitem: WhatsApp
    - listitem: Telegram
    - listitem: E-mail
    - listitem: APIs
    - listitem: Workflows
  - link "Saiba Mais":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20saber%20mais%20sobre%20automa%C3%A7%C3%B5es%20inteligentes
  - text: "03"
  - heading "Plataformas Privadas" [level=3]
  - paragraph: Portais do cliente, áreas restritas, dashboards, pagamentos, contratos e arquivos.
  - list:
    - listitem: Portal do Cliente
    - listitem: Área Restrita
    - listitem: Dashboards
    - listitem: Contratos
    - listitem: Pagamentos
  - link "Saiba Mais":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20saber%20mais%20sobre%20plataformas%20privadas
  - text: "04"
  - heading "Aplicações Web" [level=3]
  - paragraph: Landing pages, e-commerces, SaaS, portais e sistemas web performáticos.
  - list:
    - listitem: SaaS
    - listitem: Landing Pages
    - listitem: E-commerce
    - listitem: Websites
    - listitem: Portais
  - link "Saiba Mais":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20saber%20mais%20sobre%20aplica%C3%A7%C3%B5es%20web
  - text: Sobre
  - heading "Sistemas complexos exigem soluções simples." [level=2]
  - paragraph: Minha especialidade é arquitetar fluxos que eliminam a fricção operacional, substituindo processos manuais por código robusto, escalável e de baixa manutenção.
  - img "Thomas Eduardo"
  - text: +3 anos Experiência +18 Projetos Entregues 100% Proprietário 12+ Parceiros Legitimidade Técnica
  - img "Next.js"
  - text: Next.js
  - img "React"
  - text: React
  - img "Node.js"
  - text: Node.js
  - img "PostgreSQL"
  - text: PostgreSQL
  - img "Prisma"
  - text: Prisma
  - img "Vercel"
  - text: Vercel Dores Operacionais
  - heading "Sistemas de alta escala e previsibilidade" [level=2]
  - paragraph: Desenho arquiteturas focadas em resolver gargalos específicos do seu negócio.
  - link "rocket Quero Evoluir":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20conversar%20sobre%20a%20minha%20opera%C3%A7%C3%A3o.
    - img "rocket"
    - text: Quero Evoluir
  - text: Gargalo 01
  - heading "Centralização Total" [level=3]
  - paragraph: Dados e processos em um só lugar, sem burocracia desnecessária.
  - text: 01 Gargalo 02
  - heading "Conversão Máxima" [level=3]
  - paragraph: Checkouts ultra-rápidos projetados para não perder vendas.
  - text: 02 Gargalo 03
  - heading "Automação Pura" [level=3]
  - paragraph: Substitua tarefas repetitivas por fluxos que trabalham por você.
  - text: 03 Gargalo 04
  - heading "Infra de Elite" [level=3]
  - paragraph: Sistemas robustos que sustentam picos de tráfego sem oscilar.
  - text: 04 Sistemas
  - heading "Sistemas que reduzem gargalos." [level=2]
  - button "Previous Project":
    - img
  - text: 01 / 12
  - button "Next Project":
    - img
  - text: Projetos de Clientes SITES & LANDING PAGES Novo
  - img "BACKEND CHALLENGES logo"
  - heading "BACKEND CHALLENGES" [level=3]
  - paragraph
  - paragraph: Repositório focado em desafios de backend, APIs, arquitetura, bancos de dados e engenharia de software.
  - button "Detalhes do Projeto pointing right":
    - text: Detalhes do Projeto
    - img "pointing right"
  - link "rocket Discutir Projeto":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20estruturar%20um%20projeto.
    - img "rocket"
    - text: Discutir Projeto
  - link "Explorar Todos os Cases":
    - /url: /cases
  - link "Acessar ao Vivo eyes":
    - /url: https://github.com/devthomaseduardo/backend-challenges
    - text: Acessar ao Vivo
    - img "eyes"
  - button "Desktop View"
  - img "BACKEND CHALLENGES Desktop"
  - text: Maturidade
  - heading "Previsibilidade Institucional" [level=2]
  - link "rocket Começar Agora":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20conversar%20sobre%20a%20minha%20opera%C3%A7%C3%A3o.
    - img "rocket"
    - text: Começar Agora
  - text: Fase 01
  - heading "Entendimento Operacional" [level=3]
  - paragraph: Onde estão os gargalos e perdas de tempo.
  - text: 01 Fase 02
  - heading "Estruturação do Sistema" [level=3]
  - paragraph: Transformando processo manual em fluxo digital.
  - text: 02 Fase 03
  - heading "Execução e Escala" [level=3]
  - paragraph: Sistemas preparados para crescer sem travar.
  - text: 03 Contato
  - heading "Vamos estruturar a sua operação?" [level=2]
  - paragraph: Software focado em destravar o crescimento do seu negócio.
  - link "rocket WhatsApp":
    - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20conversar%20sobre%20um%20projeto.
    - img "rocket"
    - text: WhatsApp
  - link "handshake E-mail Direto":
    - /url: mailto:devthomaseduardo@gmail.com
    - img "handshake"
    - text: E-mail Direto
  - text: Nome
  - textbox "Seu nome"
  - text: E-mail
  - textbox "seu@email.com"
  - text: WhatsApp (Opcional)
  - textbox "+55 11 90000-0000"
  - text: Como posso ajudar?
  - textbox "Descreva seu projeto ou necessidade..."
  - button "Iniciar Conversa"
- contentinfo:
  - heading "Sistemas desenhados para escalar." [level=2]
  - link "LinkedIn":
    - /url: https://linkedin.com/in/devthomaseduardo
  - link "GitHub":
    - /url: https://github.com/devthomaseduardo
  - link "Instagram":
    - /url: https://instagram.com/devthomaseduardo
  - link "Email":
    - /url: mailto:devthomaseduardo@gmail.com
  - text: Thomas Eduardo. Premium Digital Assets.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('landing page has title', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   await expect(page).toHaveTitle(/Thomas Eduardo/);
  6  | });
  7  | 
  8  | test('portfolio projects section is loaded', async ({ page }) => {
  9  |   await page.goto('/');
  10 |   // Checking for a link that leads to projects page or a section.
  11 |   // Based on App.tsx, path is /cases
  12 |   const projectsLink = page.getByRole('link', { name: /projetos/i });
> 13 |   await expect(projectsLink).toBeVisible();
     |                              ^ Error: expect(locator).toBeVisible() failed
  14 | });
  15 | 
```