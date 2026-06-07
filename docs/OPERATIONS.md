# Guia de Operações e Monitoramento

Este documento define as diretrizes para garantir que o projeto continue operando de maneira saudável após o deploy.

## 1. Monitoramento (Logs e Métricas)
- **Backend Logs**: Recomenda-se o uso de uma biblioteca de logger (como Winston ou Pino) no lugar do `console.log` padrão. Isso permite injetar severidade (`info`, `error`, `warn`), timestamps, e exportar logs de forma estruturada (JSON) para plataformas como Datadog, Papertrail ou AWS CloudWatch.
- **Frontend Errors**: Integração com ferramentas como **Sentry** é aconselhada para capturar erros de runtime do React nos clientes e traçar stack traces, o que é vital para diagnosticar problemas visuais e bugs de UI sem depender de relatos de usuários.

## 2. Troubleshooting Comum

### A API não conecta ao banco de dados
- **Causa Possível:** A variável `DATABASE_URL` não está definida ou o IP do servidor não tem permissão de acesso no gerenciador do Neon.
- **Resolução:** Verifique as variáveis de ambiente na plataforma de hospedagem. Utilize a dashboard do Neon para verificar requisições e regras de firewall.

### O formulário de contato não envia o email
- **Causa Possível:** `RESEND_API_KEY` inválida ou limite de envios do plano gratuito alcançado.
- **Resolução:** Verifique os logs do backend. O Resend retorna códigos de erro precisos (como `403 Forbidden` ou `429 Too Many Requests`). Verifique o painel do Resend.

## 3. Backups
- O **Neon (PostgreSQL)** gerencia backups automáticos por padrão no plano gerenciado. Certifique-se de configurar a política de retenção desejada.
- Em caso de necessidade de restauração pontual, utilize as facilidades de "Branching" do Neon para inspecionar os dados de um instante passado antes de sobrescrever a produção.
