export const getWelcomeEmailTemplate = (clientName: string, portalLink: string) => `
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
      background-color: #050505;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #E5E5E5;
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
    }
    img { max-width: 100%; height: auto; display: block; border: 0; }
    a { text-decoration: none; }

    /* Layout Principal */
    .wrapper {
      width: 100%;
      background-color: #050505;
      padding: 40px 0;
    }
    .container {
      max-width: 520px;
      margin: 0 auto;
      background-color: #111111;
      border: 1px solid #222222;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    }

    /* Cabeçalho com Foto */
    .header {
      text-align: center;
      padding: 40px 30px 20px;
    }
    .profile-img-container {
      margin-bottom: 24px;
    }
    .profile-img {
      width: 88px;
      height: 88px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid #333333;
      padding: 4px;
      background-color: #050505;
      margin: 0 auto;
    }
    .brand-name {
      font-size: 14px;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-bottom: 8px;
    }
    .brand-subtitle {
      font-size: 12px;
      color: #6366F1;
      font-weight: 500;
      letter-spacing: 1px;
      text-transform: uppercase;
    }

    /* Conteúdo */
    .content {
      padding: 20px 40px 40px;
      text-align: center;
    }
    .title {
      font-size: 26px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 16px;
      letter-spacing: -0.5px;
    }
    .message {
      font-size: 16px;
      color: #A1A1AA;
      line-height: 1.7;
      margin-bottom: 32px;
    }
    .highlight-text {
      color: #FFFFFF;
      font-weight: 500;
    }

    /* Botão Moderno */
    .cta-wrapper {
      margin-top: 10px;
      margin-bottom: 40px;
    }
    .cta-button {
      display: inline-block;
      background-color: #FFFFFF;
      color: #000000;
      font-size: 15px;
      font-weight: 600;
      padding: 16px 36px;
      border-radius: 50px;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Assinatura / Rodapé */
    .signature {
      border-top: 1px solid #222222;
      padding-top: 30px;
      text-align: left;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    .sig-name {
      font-size: 16px;
      font-weight: 600;
      color: #FFFFFF;
      margin-bottom: 2px;
    }
    .sig-role {
      font-size: 13px;
      color: #6366F1;
    }

    /* Footer Externo */
    .external-footer {
      text-align: center;
      padding: 30px 20px;
      font-size: 12px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      
      <!-- Cabeçalho -->
      <div class="header">
        <div class="profile-img-container">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=150&h=150&q=80" alt="Thomas Eduardo" class="profile-img" />
        </div>
        <div class="brand-name">Thomas Eduardo</div>
        <div class="brand-subtitle">Engenharia que gera lucro</div>
      </div>

      <!-- Conteúdo do Email -->
      <div class="content">
        <h1 class="title">Olá, \${clientName}.</h1>
        <p class="message">
          Seu projeto está oficialmente <span class="highlight-text">pronto para iniciar</span>. <br><br>
          Eu criei um ambiente digital exclusivo para você acompanhar o progresso das entregas, gerenciar faturas e ter acesso a todos os arquivos do seu ecossistema.
        </p>

        <!-- Botão Call to Action -->
        <div class="cta-wrapper">
          <a href="\${portalLink}" class="cta-button">Acessar Meu Portal</a>
        </div>

        <!-- Assinatura minimalista -->
        <div class="signature">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=80&h=80&q=80" style="width:48px;height:48px;border-radius:50%;object-fit:cover;" alt="Thomas">
          <div style="text-align: left;">
            <div class="sig-name">Thomas Eduardo</div>
            <div class="sig-role">Software Engineer</div>
          </div>
        </div>

      </div>
    </div>

    <!-- Footer Externo -->
    <div class="external-footer">
      <p>&copy; \${new Date().getFullYear()} Thomas Eduardo. Todos os direitos reservados.</p>
      <p style="margin-top: 8px;">Este e-mail foi enviado porque você é cliente ativo da agência.</p>
    </div>
  </div>
</body>
</html>
`;
