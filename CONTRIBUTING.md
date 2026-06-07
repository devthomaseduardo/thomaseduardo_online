# Guia de Contribuição

Obrigado por considerar contribuir para este projeto! Abaixo estão as diretrizes para ajudar você a configurar o ambiente e seguir nossos padrões.

## Configuração do Ambiente de Desenvolvimento

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd portfolio_novo
   ```

2. **Instale as dependências (Monorepo):**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   - Duplique o `.env.example` (ou `.env.neon.example`) para `.env` na raiz do projeto.
   - Preencha os valores localmente. Você precisará de uma string de conexão com o PostgreSQL e uma chave de API do Resend para testar emails.

4. **Inicie os servidores (Frontend e Backend):**
   ```bash
   npm run dev
   ```

## Padrões de Código

- Este projeto utiliza **TypeScript** extensivamente. Evite usar `any`.
- Utilizamos o **ESLint** e o **Prettier** para garantir formatação consistente. Certifique-se de que sua IDE está configurada para formatar ao salvar ou rode o comando de linting antes de comitar.
- Siga a arquitetura existente: mantenha a separação entre `frontend` e `backend`, bem como os diretórios de responsabilidade no backend.

## Padrão de Commits

Siga a especificação de **Conventional Commits**. Exemplos:
- `feat: adiciona nova seção de depoimentos no frontend`
- `fix: resolve problema no carregamento de env vars no backend`
- `docs: atualiza guia de arquitetura`
- `refactor: melhora performance da query de projetos`

## Como Enviar um Pull Request (PR)

1. Crie uma branch para a sua feature (`git checkout -b feat/minha-feature`).
2. Comite suas mudanças seguindo o padrão de commits.
3. Faça o push para a branch (`git push origin feat/minha-feature`).
4. Abra o Pull Request no GitHub descrevendo claramente as mudanças e qual problema você resolveu.
