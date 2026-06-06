import { Resend } from 'resend';
import { env } from '../lib/env.js';

// Usar a chave fornecida ou pegar do .env
const apiKey = env.RESEND_API_KEY || 're_fdQpTiCV_84Sr7TfDn1vsmHoxa3YcTUMi';
const resend = new Resend(apiKey);

export const emailService = {
  async sendTestEmail() {
    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'devthomasnascimento@gmail.com',
        subject: 'Hello World - Teste de Integração',
        html: '<p>Congrats on sending your <strong>first email</strong> via Resend!</p>'
      });
      console.log('Email enviado com sucesso:', data);
      return data;
    } catch (error) {
      console.error('Falha ao enviar email:', error);
      throw error;
    }
  },

  async sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
    try {
      const data = await resend.emails.send({
        from: 'onboarding@resend.dev', // Lembre-se de verificar seu domínio no Resend depois
        to,
        subject,
        html
      });
      return data;
    } catch (error) {
      console.error('Erro ao enviar email customizado:', error);
      throw error;
    }
  }
};
