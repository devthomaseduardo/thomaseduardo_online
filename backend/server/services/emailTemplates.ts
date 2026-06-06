export const getWelcomeEmailTemplate = (clientName: string, portalLink: string, email?: string, password?: string) => `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Acesso ao seu Portal</title>
  <style>
    /* Reset & Base */
    body, p, h1, h2, h3, h4, h5, h6 { margin: 0; padding: 0; }
    body {
      background-color: #09090B;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #A1A1AA;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
      padding: 0;
      margin: 0;
      width: 100%;
      height: 100%;
    }
    img { max-width: 100%; height: auto; display: block; border: 0; }
    a { text-decoration: none; }

    /* Layout Principal - Full Width */
    .wrapper {
      width: 100%;
      background-color: #09090B;
      padding: 60px 20px;
      box-sizing: border-box;
    }
    .container {
      max-width: 640px;
      margin: 0 auto;
      background-color: transparent;
    }

    /* Animações para Emojis */
    @keyframes wave {
      0% { transform: rotate(0deg); }
      10% { transform: rotate(14deg); }
      20% { transform: rotate(-8deg); }
      30% { transform: rotate(14deg); }
      40% { transform: rotate(-4deg); }
      50% { transform: rotate(10deg); }
      60% { transform: rotate(0deg); }
      100% { transform: rotate(0deg); }
    }
    .emoji-wave {
      display: inline-block;
      animation: wave 2s infinite;
      transform-origin: 70% 70%;
    }
    
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }
    .emoji-bounce {
      display: inline-block;
      animation: bounce 2s ease-in-out infinite;
    }

    /* Logo no Topo */
    .header {
      margin-bottom: 80px;
    }
    .brand-logo {
      width: 48px;
      height: auto;
      margin-bottom: 24px;
      /* Removido o filter: invert(1) para preservar as cores originais da logo */
    }
    /* Conteúdo Principal */
    .content {
      text-align: left;
    }
    .title {
      font-size: 36px;
      font-weight: 600;
      color: #FAFAFA;
      margin-bottom: 32px;
      letter-spacing: -0.03em;
      line-height: 1.2;
    }
    .title span.name {
      color: #A1A1AA;
    }
    .message {
      font-size: 18px;
      color: #D4D4D8;
      margin-bottom: 56px;
      font-weight: 400;
      line-height: 1.7;
    }
    .highlight {
      color: #FAFAFA;
      font-weight: 600;
    }

    /* Dados de Acesso e Funcionalidades */
    .info-section {
      background-color: #18181B;
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 32px;
      margin-bottom: 56px;
    }
    .info-label {
      font-size: 11px;
      font-weight: 600;
      color: #71717A;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 16px;
      font-family: monospace;
      color: #FAFAFA;
      margin-bottom: 24px;
      font-weight: 500;
    }
    .features-list {
      margin-top: 32px;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding-top: 32px;
    }
    .feature-item {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      font-size: 15px;
      color: #A1A1AA;
    }
    .feature-check {
      color: #10B981;
      margin-right: 12px;
      font-weight: bold;
    }

    /* Call to Action */
    .cta-wrapper {
      margin-bottom: 80px;
    }
    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: #FAFAFA;
      color: #09090B;
      font-size: 14px;
      font-weight: 600;
      padding: 18px 42px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: background-color 0.3s ease;
      border-radius: 4px;
    }

    /* Assinatura */
    .signature-container {
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 48px;
    }
    .sig-img {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
    }
    .sig-info {
      text-align: left;
    }
    .sig-name {
      font-size: 16px;
      font-weight: 600;
      color: #FAFAFA;
      margin-bottom: 2px;
      letter-spacing: -0.01em;
    }
    .sig-role {
      font-size: 14px;
      color: #A1A1AA;
      font-weight: 400;
    }

    /* Rodapé Externo */
    .footer {
      margin-top: 80px;
      font-size: 12px;
      color: #71717A;
      line-height: 1.6;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      padding-top: 40px;
    }
    .footer p {
      margin-bottom: 12px;
    }
    .footer-links {
      margin-top: 24px;
    }
    .footer-links a {
      color: #A1A1AA;
      margin-right: 16px;
      text-decoration: underline;
    }

    /* Responsividade */
    @media only screen and (max-width: 600px) {
      .title { font-size: 28px; }
      .message { font-size: 16px; }
      .wrapper { padding: 40px 20px; }
      .cta-button { width: 100%; box-sizing: border-box; text-align: center; }
      .info-section { padding: 24px; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- Cabeçalho com Logo -->
      <div class="header">
        <img src="https://thomaseduardo.online/logo.png" alt="Thomas Eduardo Logo" class="brand-logo">
      </div>

      <!-- Conteúdo -->
      <div class="content">
        <h1 class="title">Bem-vindo(a), <span class="emoji-wave">👋</span><br><span class="name">\${clientName}</span>.</h1>
        <p class="message">
          Seu portal de gerenciamento foi <span class="highlight">oficialmente ativado</span> <span class="emoji-bounce">🚀</span><br><br>
          Este ambiente exclusivo foi desenhado para garantir total transparência sobre o andamento do seu projeto. Através dele, você poderá acompanhar atualizações em tempo real, gerenciar documentos, faturas e validar etapas de desenvolvimento com máxima eficiência e sofisticação <span class="emoji-bounce">✨</span>
        </p>

        \${email && password ? \`
        <!-- Dados de Acesso e Funcionalidades -->
        <div class="info-section">
          <p class="info-label">E-MAIL DE ACESSO</p>
          <p class="info-value">\${email}</p>
          
          <p class="info-label" style="margin-top: 16px;">SENHA PROVISÓRIA</p>
          <p class="info-value">\${password}</p>

          <div class="features-list">
            <p class="info-label" style="margin-bottom: 16px;">O QUE VOCÊ ENCONTRARÁ NO PORTAL</p>
            <div class="feature-item"><span class="feature-check">✓</span> Acompanhamento de Projetos em Tempo Real</div>
            <div class="feature-item"><span class="feature-check">✓</span> Gestão de Faturas e Pagamentos Seguros</div>
            <div class="feature-item"><span class="feature-check">✓</span> Central de Arquivos e Documentos</div>
            <div class="feature-item"><span class="feature-check">✓</span> Cronograma Detalhado das Entregas</div>
          </div>
        </div>
        \` : ''}

        <!-- CTA -->
        <div class="cta-wrapper">
          <a href="\${portalLink}" class="cta-button">Acessar o Portal</a>
        </div>

        <!-- Assinatura -->
        <div class="signature-container">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="80" valign="middle">
                <img src="https://thomaseduardo.online/avatar.webp" alt="Thomas Eduardo" class="sig-img">
              </td>
              <td valign="middle" class="sig-info">
                <div class="sig-name">Thomas Eduardo</div>
                <div class="sig-role">Software Engineer</div>
              </td>
            </tr>
          </table>
        </div>

      </div>

      <!-- Rodapé -->
      <div class="footer">
        <p>Você está recebendo este e-mail por ser um cliente ativo em nosso sistema. Este é um canal de comunicação confidencial.</p>
        <p>&copy; \${new Date().getFullYear()} Thomas Eduardo. Todos os direitos reservados.</p>
        <div class="footer-links">
          <a href="https://thomaseduardo.online">Website</a>
          <a href="mailto:contato@thomaseduardo.online">Suporte</a>
        </div>
      </div>

    </div>
  </div>
</body>
</html>
`;
