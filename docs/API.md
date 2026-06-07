# Documentação da API

A API do backend foi desenvolvida em Express.js e segue princípios RESTful, retornando respostas em formato JSON.

## Base URL
Ambiente Local: `http://localhost:3000/api` (Exemplo, o porto pode variar conforme as configurações no `.env`).

## Autenticação e Autorização

A maioria das rotas públicas (como as que recebem Leads ou recuperam Projetos para exibição no portfólio) não exige autenticação. 

Rotas administrativas do "Centro de Operações" (como edição e deleção de dados de clientes, financeiro e projetos) são protegidas e requerem autenticação baseada em JWT (JSON Web Token) ou mecanismos de sessão configurados no backend.

**Padrão de Requisição Autenticada:**
O token deve ser enviado no header da requisição, na propriedade `Authorization`:
```http
Authorization: Bearer <seu_token_jwt>
```

## Endpoints Principais (Exemplos)

### 1. Sistema de Contato / Leads

**Criar novo Contato/Lead**
- **URL**: `/api/contact` ou `/api/leads`
- **Método**: `POST`
- **Descrição**: Recebe dados do formulário de contato do portfólio, salva no banco via Prisma e aciona o Resend para envio de e-mail.
- **Body Request**:
  ```json
  {
    "name": "Nome do Usuário",
    "email": "usuario@exemplo.com",
    "message": "Mensagem de teste para contato."
  }
  ```
- **Response `201 Created`**:
  ```json
  {
    "success": true,
    "message": "Contato enviado com sucesso."
  }
  ```
- **Response `400 Bad Request`** (Validação Falha):
  ```json
  {
    "success": false,
    "error": "O campo email é obrigatório e deve ser válido."
  }
  ```

---
*Nota: Esta documentação deve ser atualizada (ou gerada via Swagger/OpenAPI) à medida que novos endpoints forem adicionados ao sistema para gerenciamento do portfólio, como endpoints para autenticação de admin, gerenciamento de projetos do portfólio, entre outros.*
