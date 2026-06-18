# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: contact.spec.ts >> contact form submits successfully
- Location: tests/e2e/contact.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('textbox', { name: /Seu nome/i })

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e4]:
    - link "Logo Thomas Eduardo" [ref=e5] [cursor=pointer]:
      - /url: /
      - generic [ref=e6]:
        - img "Logo"
      - generic [ref=e7]: Thomas Eduardo
    - generic [ref=e8]:
      - link "Manifesto" [ref=e9] [cursor=pointer]:
        - /url: "#sobre"
      - link "Framework" [ref=e10] [cursor=pointer]:
        - /url: "#metodologia"
      - link "Cases" [ref=e11] [cursor=pointer]:
        - /url: "#casos"
      - link "Direct" [ref=e12] [cursor=pointer]:
        - /url: "#contato"
    - generic [ref=e13]:
      - button "EN" [ref=e14] [cursor=pointer]
      - link "rocket Iniciar Projeto" [ref=e15] [cursor=pointer]:
        - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20iniciar%20um%20projeto.
        - img "rocket"
        - text: Iniciar Projeto
  - generic [ref=e16]:
    - link "Instagram" [ref=e18] [cursor=pointer]:
      - /url: https://instagram.com/devthomaseduardo
      - img [ref=e19]
      - generic: Instagram
    - link "LinkedIn" [ref=e23] [cursor=pointer]:
      - /url: https://linkedin.com/in/devthomaseduardo
      - img [ref=e24]
      - generic: LinkedIn
    - link "GitHub" [ref=e27] [cursor=pointer]:
      - /url: https://github.com/devthomaseduardo
      - img [ref=e28]
      - generic: GitHub
  - main [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e33]:
        - img "Visualização técnica de arquitetura de software premium"
      - generic [ref=e37]:
        - generic [ref=e38]:
          - heading "Transformo gargalos em ativos de escala." [level=1] [ref=e39]:
            - text: Transformo gargalos
            - text: em ativos de escala.
          - generic [ref=e41]:
            - img "Thomas"
            - generic [ref=e42]:
              - generic [ref=e43]: Thomas Eduard|
              - img "waving hand"
          - paragraph [ref=e44]: Desenvolvo arquiteturas de software, automações e ecossistemas privados para empresas que buscam previsibilidade e eficiência operacional absoluta.
          - generic [ref=e45]:
            - link "EXPLORAR CASES" [ref=e46] [cursor=pointer]:
              - /url: "#casos"
            - link "rocket INICIAR PROJETO" [ref=e47] [cursor=pointer]:
              - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20estruturar%20um%20projeto%20e%20resolver%20meus%20gargalos.
              - img "rocket"
              - generic [ref=e48]: INICIAR PROJETO
        - generic [ref=e50]:
          - img "Thomas Eduardo"
    - generic [ref=e53]:
      - generic [ref=e54]:
        - generic [ref=e56]:
          - img [ref=e57]
          - generic [ref=e59]: Soluções
        - heading "Soluções que eliminam gargalos." [level=2] [ref=e61]
        - paragraph [ref=e62]: Engenharia de software focada em governança de dados, eliminação de fricção operacional e infraestrutura preparada para o crescimento exponencial.
      - generic [ref=e64]:
        - generic [ref=e65] [cursor=pointer]:
          - generic [ref=e75]: Module_01
          - generic [ref=e77]:
            - generic [ref=e78]:
              - img [ref=e80]
              - img [ref=e85]
            - heading "Sistema Operacional" [level=3] [ref=e87]
            - paragraph [ref=e88]: Centralize processos, equipe, clientes, estoque, financeiro e ordens de serviço em uma única plataforma.
        - generic [ref=e89] [cursor=pointer]:
          - generic [ref=e99]: Module_02
          - generic [ref=e101]:
            - generic [ref=e102]:
              - img [ref=e104]
              - img [ref=e106]
            - heading "Automações Inteligentes" [level=3] [ref=e108]
            - paragraph [ref=e109]: Automatize tarefas repetitivas, integrações, mensagens, notificações e fluxos internos.
        - generic [ref=e110] [cursor=pointer]:
          - generic [ref=e120]: Module_03
          - generic [ref=e122]:
            - generic [ref=e123]:
              - img [ref=e125]
              - img [ref=e127]
            - heading "Plataformas Privadas" [level=3] [ref=e129]
            - paragraph [ref=e130]: Portais do cliente, áreas restritas, dashboards, pagamentos, contratos e arquivos.
        - generic [ref=e131] [cursor=pointer]:
          - generic [ref=e141]: Module_04
          - generic [ref=e143]:
            - generic [ref=e144]:
              - img [ref=e146]
              - img [ref=e150]
            - heading "Aplicações Web" [level=3] [ref=e152]
            - paragraph [ref=e153]: Landing pages, e-commerces, SaaS, portais e sistemas web performáticos.
    - generic [ref=e156]:
      - generic [ref=e157]:
        - generic [ref=e158]: Sobre
        - heading "Sistemas complexos exigem soluções simples." [level=2] [ref=e159]:
          - text: Sistemas complexos
          - generic [ref=e160]: exigem soluções
          - text: simples.
        - paragraph [ref=e161]: Minha especialidade é arquitetar fluxos que eliminam a fricção operacional, substituindo processos manuais por código robusto, escalável e de baixa manutenção.
      - generic:
        - generic:
          - img "Thomas Eduardo"
      - generic [ref=e162]:
        - generic [ref=e163]:
          - generic [ref=e164]:
            - generic [ref=e165]: +3 anos
            - generic [ref=e166]: Experiência
          - generic [ref=e167]:
            - generic [ref=e168]: "+18"
            - generic [ref=e169]: Projetos Entregues
          - generic [ref=e170]:
            - generic [ref=e171]: 100%
            - generic [ref=e172]: Proprietário
          - generic [ref=e173]:
            - generic [ref=e174]: 12+
            - generic [ref=e175]: Parceiros
        - generic [ref=e176]:
          - generic [ref=e177]: Legitimidade Técnica
          - generic [ref=e178]:
            - generic [ref=e179]:
              - img "Next.js"
              - generic [ref=e180]: Next.js
            - generic [ref=e181]:
              - img "React"
              - generic [ref=e182]: React
            - generic [ref=e183]:
              - img "Node.js"
              - generic [ref=e184]: Node.js
            - generic [ref=e185]:
              - img "PostgreSQL"
              - generic [ref=e186]: PostgreSQL
            - generic [ref=e187]:
              - img "Prisma"
              - generic [ref=e188]: Prisma
            - generic [ref=e189]:
              - img "Vercel"
              - generic [ref=e190]: Vercel
    - generic [ref=e192]:
      - generic [ref=e193]:
        - generic [ref=e194]:
          - generic [ref=e195]: Dores Operacionais
          - heading "Sistemas de alta escala e previsibilidade" [level=2] [ref=e196]:
            - generic [ref=e197]:
              - generic [ref=e199]: Sistemas
              - generic [ref=e201]: de
              - generic [ref=e203]: alta
            - generic [ref=e205]:
              - generic [ref=e207]: escala
              - generic [ref=e209]: e
              - generic [ref=e211]: previsibilidade
          - paragraph [ref=e212]: Desenho arquiteturas focadas em resolver gargalos específicos do seu negócio.
        - link "rocket Quero Evoluir" [ref=e214] [cursor=pointer]:
          - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20conversar%20sobre%20a%20minha%20opera%C3%A7%C3%A3o.
          - img "rocket"
          - generic [ref=e215]: Quero Evoluir
      - generic [ref=e216]:
        - generic [ref=e217]:
          - generic [ref=e227]: Gargalo 01
          - generic [ref=e229]:
            - heading "Centralização Total" [level=3] [ref=e230]
            - paragraph [ref=e231]: Dados e processos em um só lugar, sem burocracia desnecessária.
            - generic: "01"
        - generic [ref=e232]:
          - generic [ref=e242]: Gargalo 02
          - generic [ref=e244]:
            - heading "Conversão Máxima" [level=3] [ref=e245]
            - paragraph [ref=e246]: Checkouts ultra-rápidos projetados para não perder vendas.
            - generic: "02"
        - generic [ref=e247]:
          - generic [ref=e257]: Gargalo 03
          - generic [ref=e259]:
            - heading "Automação Pura" [level=3] [ref=e260]
            - paragraph [ref=e261]: Substitua tarefas repetitivas por fluxos que trabalham por você.
            - generic: "03"
        - generic [ref=e262]:
          - generic [ref=e272]: Gargalo 04
          - generic [ref=e274]:
            - heading "Infra de Elite" [level=3] [ref=e275]
            - paragraph [ref=e276]: Sistemas robustos que sustentam picos de tráfego sem oscilar.
            - generic: "04"
    - generic [ref=e278]:
      - generic [ref=e279]:
        - generic [ref=e280]:
          - generic [ref=e281]: Sistemas
          - heading "Projetos de Clientes" [level=2] [ref=e282]
        - generic [ref=e284]:
          - button "Previous Project" [ref=e285] [cursor=pointer]:
            - img [ref=e286]
          - generic [ref=e288]:
            - generic [ref=e289]: "01"
            - generic [ref=e290]: /
            - generic [ref=e291]: "12"
          - button "Next Project" [ref=e292] [cursor=pointer]:
            - img [ref=e293]
      - generic [ref=e297]:
        - generic [ref=e298]:
          - generic [ref=e299]:
            - generic [ref=e300]:
              - text: SITES & LANDING PAGES
              - generic [ref=e301]: Novo
            - heading "BACKEND CHALLENGES" [level=3] [ref=e303]
            - paragraph [ref=e304]: DEV
          - generic [ref=e305]:
            - paragraph [ref=e306]: Repositório focado em desafios de backend, APIs, arquitetura, bancos de dados e engenharia de software.
            - generic [ref=e307]:
              - button "> Detalhes do Projeto_ pointing right" [ref=e308] [cursor=pointer]:
                - generic [ref=e309]: "> Detalhes do Projeto_"
                - img "pointing right"
              - generic [ref=e310]:
                - link "rocket Discutir Projeto" [ref=e311] [cursor=pointer]:
                  - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20estruturar%20um%20projeto.
                  - img "rocket"
                  - generic [ref=e312]: Discutir Projeto
                - link "Explorar Todos os Cases" [ref=e313] [cursor=pointer]:
                  - /url: /cases
                  - generic [ref=e314]: Explorar Todos os Cases
                  - img [ref=e315]
        - generic [ref=e317]:
          - link "Acessar ao Vivo eyes" [ref=e318] [cursor=pointer]:
            - /url: https://github.com/devthomaseduardo/backend-challenges
            - generic [ref=e319]: Acessar ao Vivo
            - img "eyes"
          - generic [ref=e321]:
            - generic [ref=e327]: bash — backend-challenges.sh
            - generic [ref=e328]:
              - generic [ref=e329]:
                - generic [ref=e330]: ➜
                - generic [ref=e331]: ~/projects
                - generic [ref=e332]: cat backend_challenges.json
              - generic [ref=e333]:
                - generic [ref=e334]: // Arquitetura e Estrutura de Lógica
                - generic [ref=e335]: "const ProjectStructure = {"
                - generic [ref=e336]:
                  - generic [ref=e337]:
                    - text: "\"core\":"
                    - generic [ref=e338]: "\"infra\""
                    - text: ","
                  - generic [ref=e339]:
                    - text: "\"objective\":"
                    - generic [ref=e340]: "\"DEV\""
                    - text: ","
                  - generic [ref=e341]:
                    - text: "\"stack\": ["
                    - generic [ref=e342]:
                      - generic [ref=e343]: "\"Node.js\""
                      - text: ","
                    - generic [ref=e344]:
                      - generic [ref=e345]: "\"TypeScript\""
                      - text: ","
                    - generic [ref=e347]: "\"PostgreSQL\""
                    - text: "],"
                  - generic [ref=e348]:
                    - text: "\"features\": ["
                    - generic [ref=e349]:
                      - generic [ref=e350]: "\"Arquitetura de sistemas\""
                      - text: ","
                    - generic [ref=e352]: "\"APIs robustas\""
                    - text: "]"
                - generic [ref=e353]: "};"
              - generic [ref=e354]:
                - generic [ref=e355]: ➜
                - generic [ref=e356]: ~/projects
                - generic [ref=e357]: _
    - generic [ref=e359]:
      - generic [ref=e360]:
        - generic [ref=e361]:
          - generic [ref=e362]: Maturidade
          - heading "Previsibilidade Institucional" [level=2] [ref=e363]:
            - generic [ref=e366]: Previsibilidade
            - generic [ref=e370]: Institucional
        - generic [ref=e372]:
          - img [ref=e374]
          - img [ref=e381]
          - img [ref=e388]
        - link "rocket Começar Agora" [ref=e391] [cursor=pointer]:
          - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20gostaria%20de%20conversar%20sobre%20a%20minha%20opera%C3%A7%C3%A3o.
          - img "rocket"
          - generic [ref=e392]: Começar Agora
      - generic [ref=e393]:
        - generic [ref=e394]:
          - generic [ref=e404]: Fase 01
          - generic [ref=e406]:
            - heading "Entendimento Operacional" [level=3] [ref=e407]
            - paragraph [ref=e408]: Onde estão os gargalos e perdas de tempo.
            - generic: "01"
        - generic [ref=e409]:
          - generic [ref=e419]: Fase 02
          - generic [ref=e421]:
            - heading "Estruturação do Sistema" [level=3] [ref=e422]
            - paragraph [ref=e423]: Transformando processo manual em fluxo digital.
            - generic: "02"
        - generic [ref=e424]:
          - generic [ref=e434]: Fase 03
          - generic [ref=e436]:
            - heading "Execução e Escala" [level=3] [ref=e437]
            - paragraph [ref=e438]: Sistemas preparados para crescer sem travar.
            - generic: "03"
    - generic [ref=e441]:
      - generic [ref=e442]:
        - generic [ref=e443]: Agenda
        - generic [ref=e445]: Indisponível agora
        - heading "Disponibilidade" [level=2] [ref=e446]
        - paragraph [ref=e447]: Agenda fechada para o mês vigente. Slots abertos exclusivamente para o próximo ciclo de produção.
        - generic [ref=e448]:
          - generic [ref=e451]: Disponível
          - generic [ref=e454]: Ocupado
        - link "Reservar Slot" [ref=e455] [cursor=pointer]:
          - /url: /r?to=https%3A%2F%2Fwa.me%2F5511977070209%3Ftext%3DOl%C3%A1%20Thomas%2C%20vi%20sua%20disponibilidade%20no%20site%20e%20gostaria%20de%20reservar%20um%20slot.
          - img [ref=e456]
          - text: Reservar Slot
      - generic [ref=e458]:
        - generic [ref=e459]:
          - heading "julho 2026" [level=3] [ref=e460]
          - img [ref=e461]
        - generic [ref=e463]:
          - generic [ref=e464]: Dom
          - generic [ref=e465]: Seg
          - generic [ref=e466]: Ter
          - generic [ref=e467]: Qua
          - generic [ref=e468]: Qui
          - generic [ref=e469]: Sex
          - generic [ref=e470]: Sáb
          - generic [ref=e474]: "01"
          - generic [ref=e475]: "02"
          - generic [ref=e476]: "03"
          - generic [ref=e477]: "04"
          - generic [ref=e478]: "05"
          - generic [ref=e479]: "06"
          - generic [ref=e480]: "07"
          - generic [ref=e481]: "08"
          - generic [ref=e482]: "09"
          - generic [ref=e483]: "10"
          - generic [ref=e484]: "11"
          - generic [ref=e485]: "12"
          - generic [ref=e486]: "13"
          - generic [ref=e487]: "14"
          - generic [ref=e488]: "15"
          - generic [ref=e489]: "16"
          - generic [ref=e490]: "17"
          - generic [ref=e491]: "18"
          - generic [ref=e492]: "19"
          - generic [ref=e493]: "20"
          - generic [ref=e494]: "21"
          - generic [ref=e495]: "22"
          - generic [ref=e496]: "23"
          - generic [ref=e497]: "24"
          - generic [ref=e498]: "25"
          - generic [ref=e499]: "26"
          - generic [ref=e500]: "27"
          - generic [ref=e501]: "28"
          - generic [ref=e502]: "29"
          - generic [ref=e503]: "30"
          - generic [ref=e504]: "31"
  - contentinfo [ref=e505]:
    - generic [ref=e506]:
      - link "devthomaseduardo@gmail.com" [ref=e507] [cursor=pointer]:
        - /url: mailto:devthomaseduardo@gmail.com
        - heading "devthomaseduardo@gmail.com" [level=2] [ref=e508]
      - generic [ref=e509]:
        - generic [ref=e510]:
          - link "LinkedIn" [ref=e511] [cursor=pointer]:
            - /url: https://linkedin.com/in/devthomaseduardo
          - link "GitHub" [ref=e512] [cursor=pointer]:
            - /url: https://github.com/devthomaseduardo
          - link "Instagram" [ref=e513] [cursor=pointer]:
            - /url: https://instagram.com/devthomaseduardo
          - link "Email" [ref=e514] [cursor=pointer]:
            - /url: mailto:devthomaseduardo@gmail.com
        - generic [ref=e515]: Thomas Eduardo. Premium Digital Assets.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('contact form submits successfully', async ({ page }) => {
  4  |   await page.goto('/');
  5  |   
  6  |   // Assuming the form is in the contact section
> 7  |   await page.getByRole('textbox', { name: /Seu nome/i }).fill('Test User');
     |                                                          ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  8  |   await page.getByRole('textbox', { name: /E-mail/i }).fill('test@example.com');
  9  |   await page.getByRole('textbox', { name: /Como posso ajudar/i }).fill('This is a test message');
  10 |   
  11 |   // Click submit (assuming button text)
  12 |   await page.getByRole('button', { name: /Iniciar Conversa/i }).click();
  13 |   
  14 |   // Check for success message
  15 |   await expect(page.locator('text=Mensagem Transmitida')).toBeVisible();
  16 | });
  17 | 
```