// backend/server/lib/messages.ts

interface ErrorMessages {
  [key: string]: string;
}

export const messages: ErrorMessages = {
  // Mensagens de Autenticação
  AUTH_INVALID_CREDENTIALS: "Credenciais inválidas. Verifique seu identificador e chave de acesso.",
  AUTH_TOKEN_MISSING: "Token de autenticação não fornecido.",
  AUTH_TOKEN_INVALID: "Token de autenticação inválido ou expirado.",
  AUTH_UNAUTHORIZED: "Você não tem permissão para realizar esta ação.",

  // Mensagens de Recursos (Projetos, Faturas, etc.)
  RESOURCE_NOT_FOUND: "O recurso solicitado não foi encontrado.",
  PROJECT_NOT_FOUND: "Projeto não encontrado.",
  INVOICE_NOT_FOUND: "Fatura não encontrada.",
  CONTRACT_NOT_FOUND: "Contrato não encontrado.",
  CREDENTIAL_NOT_FOUND: "Credencial não encontrada.",

  // Mensagens Gerais
  VALIDATION_ERROR: "Erro de validação. Verifique os dados enviados.",
  INTERNAL_SERVER_ERROR: "Ocorreu um erro interno no servidor. Tente novamente mais tarde.",
  DATABASE_ERROR: "Erro de banco de dados. Tente novamente mais tarde.",
  EMAIL_SEND_FAILED: "Falha ao enviar e-mail. Tente novamente mais tarde.",
  UPLOAD_FAILED: "Falha ao fazer upload do arquivo.",
  GENERIC_ERROR: "Ocorreu um erro inesperado.",
};

export const getErrorMessage = (code: string): string => {
  return messages[code] || messages.GENERIC_ERROR;
};