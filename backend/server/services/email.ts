import { Resend } from 'resend';
import { env } from '../lib/env.js';
import { getWelcomeEmailTemplate } from './emailTemplates.js';

// Initialize Resend with the API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

export const emailService = {
  /**
   * Sends a standard transactional email
   */
  async sendEmail(to: string, subject: string, html: string) {
    try {
      const data = await resend.emails.send({
        from: 'Thomas Eduardo <noreply@thomaseduardo.online>',
        to,
        subject,
        html,
      });
      return data;
    } catch (error) {
      console.error('Resend error:', error);
      throw error;
    }
  },

  /**
   * Generates the high-end architectural welcome template
   */
  generateWelcomeEmail(clientName: string, email: string, password: string) {
    return getWelcomeEmailTemplate(clientName, "https://thomaseduardo.online/portal", email, password);
  },

  /**
   * Generates the invoice notification template
   */
  generateInvoiceEmail(clientName: string, description: string, amount: number, dueDate?: string) {
    const formattedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
    const formattedDate = dueDate ? new Date(dueDate).toLocaleDateString('pt-BR') : 'A definir';

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { background-color: #000000; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 60px 40px; }
          .header { border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; padding: 20px 0; margin-bottom: 60px; }
          .header-text { font-size: 14px; font-weight: bold; letter-spacing: 0.2em; color: #ffffff; margin: 0; text-transform: uppercase; }
          .header-subtext { font-size: 10px; font-weight: normal; letter-spacing: 0.1em; color: #666666; margin-top: 4px; text-transform: uppercase; }
          .hero-img { width: 100%; max-width: 300px; display: block; margin: 0 auto 60px auto; }
          .title { font-size: 32px; font-weight: bold; letter-spacing: -0.02em; margin-bottom: 24px; color: #ffffff; }
          .greeting { font-size: 18px; color: #888888; margin-bottom: 8px; }
          .main-text { font-size: 18px; color: #ffffff; line-height: 1.5; margin-bottom: 40px; }
          .cta-button { display: inline-block; background-color: #ffffff; color: #000000; padding: 18px 36px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 60px; }
          .divider { height: 1px; background-color: #1a1a1a; margin: 40px 0; }
          .data-label { font-size: 10px; font-weight: bold; color: #666666; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px; }
          .data-value { font-size: 14px; font-family: monospace; color: #ffffff; margin-bottom: 24px; }
          .footer { margin-top: 80px; }
          .footer-name { font-size: 14px; font-weight: bold; color: #ffffff; margin-bottom: 4px; }
          .footer-title { font-size: 12px; color: #666666; margin-bottom: 24px; }
          .copyright { font-size: 10px; color: #333333; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p class="header-text">THOMAS EDUARDO</p>
            <p class="header-subtext">Engenharia de Software</p>
          </div>

          <p class="greeting">Olá, ${clientName}.</p>
          <h1 class="title">Novo lançamento disponível.</h1>
          
          <p class="main-text">
            Um novo faturamento foi gerado em sua conta. <br>
            Os detalhes da transação e o link para pagamento <br>
            já estão disponíveis no portal.
          </p>

          <a href="https://thomaseduardo.online/portal" class="cta-button">VER FATURA NO PORTAL</a>

          <div class="divider"></div>

          <p class="data-label">DESCRIÇÃO</p>
          <p class="data-value">${description}</p>

          <p class="data-label">VALOR LÍQUIDO</p>
          <p class="data-value">${formattedAmount}</p>

          <p class="data-label">VENCIMENTO</p>
          <p class="data-value">${formattedDate}</p>

          <div class="divider"></div>

          <div class="footer">
            <p class="footer-name">Thomas Eduardo</p>
            <p class="footer-title">Engenharia de Software</p>
            <p class="copyright">© 2026</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  /**
   * Generates the payment received confirmation template
   */
  generatePaymentReceivedEmail(clientName: string, description: string, amount: number) {
    const formattedAmount = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { background-color: #000000; color: #ffffff; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 60px 40px; }
          .header { border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; padding: 20px 0; margin-bottom: 60px; }
          .header-text { font-size: 14px; font-weight: bold; letter-spacing: 0.2em; color: #ffffff; margin: 0; text-transform: uppercase; }
          .header-subtext { font-size: 10px; font-weight: normal; letter-spacing: 0.1em; color: #666666; margin-top: 4px; text-transform: uppercase; }
          .hero-img { width: 100%; max-width: 300px; display: block; margin: 0 auto 60px auto; }
          .title { font-size: 32px; font-weight: bold; letter-spacing: -0.02em; margin-bottom: 24px; color: #10b981; }
          .greeting { font-size: 18px; color: #888888; margin-bottom: 8px; }
          .main-text { font-size: 18px; color: #ffffff; line-height: 1.5; margin-bottom: 40px; }
          .cta-button { display: inline-block; background-color: #10b981; color: #000000; padding: 18px 36px; border-radius: 8px; text-decoration: none; font-size: 12px; font-weight: bold; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 60px; }
          .divider { height: 1px; background-color: #1a1a1a; margin: 40px 0; }
          .data-label { font-size: 10px; font-weight: bold; color: #666666; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 4px; }
          .data-value { font-size: 14px; font-family: monospace; color: #ffffff; margin-bottom: 24px; }
          .footer { margin-top: 80px; }
          .footer-name { font-size: 14px; font-weight: bold; color: #ffffff; margin-bottom: 4px; }
          .footer-title { font-size: 12px; color: #666666; margin-bottom: 24px; }
          .copyright { font-size: 10px; color: #333333; margin-top: 40px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p class="header-text">THOMAS EDUARDO</p>
            <p class="header-subtext">Engenharia de Software</p>
          </div>

          <p class="greeting">Olá, ${clientName}.</p>
          <h1 class="title">Pagamento confirmado.</h1>
          
          <p class="main-text">
            Recebemos o seu pagamento referente a <br>
            <strong>${description}</strong>. <br>
            Obrigado pela confiança em nosso processo de engenharia.
          </p>

          <a href="https://thomaseduardo.online/portal" class="cta-button">VER DETALHES NO PORTAL</a>

          <div class="divider"></div>

          <p class="data-label">VALOR PROCESSADO</p>
          <p class="data-value">${formattedAmount}</p>

          <p class="data-label">DATA DE LIQUIDAÇÃO</p>
          <p class="data-value">${new Date().toLocaleDateString('pt-BR')}</p>

          <div class="divider"></div>

          <div class="footer">
            <p class="footer-name">Thomas Eduardo</p>
            <p class="footer-title">Engenharia de Software</p>
            <p class="copyright">© 2026</p>
          </div>
        </div>
      </body>
      </html>
    `;
  },

  /**
   * Domain Management (as requested by snippets)
   */
  async addDomain(name: string) {
    return await resend.domains.create({ name });
  },

  async verifyDomain(id: string) {
    return await resend.domains.verify(id);
  },

  async listDomains() {
    return await resend.domains.list();
  },

  async removeDomain(id: string) {
    return await resend.domains.remove(id);
  },

  /**
   * Fetches the full content of a received email
   */
  async getReceivedEmail(emailId: string) {
    try {
      const data = await resend.emails.get(emailId);
      return data;
    } catch (error) {
      console.error('Error fetching received email:', error);
      throw error;
    }
  }
};
