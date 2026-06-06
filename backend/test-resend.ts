import { Resend } from 'resend';
import { getWelcomeEmailTemplate } from './server/services/emailTemplates.js';
import dotenv from 'dotenv';

// Carrega as variáveis do .env (busca na pasta atual ou na pasta pai)
import path from 'path';
dotenv.config({ path: path.resolve(process.cwd(), '../.env') });
dotenv.config();

async function testEmail() {
  if (!process.env.RESEND_API_KEY) {
    console.error("ERRO: Variável RESEND_API_KEY não foi encontrada.");
    console.error("Adicione a chave no arquivo .env (na raiz ou em backend/) antes de rodar.");
    process.exit(1);
  }

  // Inicializa o Resend com a chave válida
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Gera o HTML usando o template que criamos
  const html = getWelcomeEmailTemplate("Thomas (Teste)", "https://portal.thomaseduardo.online");

  try {
    console.log("Enviando e-mail de teste...");
    const data = await resend.emails.send({
      // Se o seu domínio thomaseduardo.online ainda não estiver verificado no Resend,
      // você PRECISA usar o e-mail de teste deles: onboarding@resend.dev
      from: 'Thomas Eduardo <onboarding@resend.dev>', 
      
      // Altere aqui para o SEU e-mail pessoal (o mesmo que criou a conta no Resend)
      to: 'devthomasnascimento@gmail.com', 
      
      subject: 'Acesso ao seu Portal - Thomas Eduardo',
      html: html,
    });
    console.log("✅ E-mail enviado com sucesso!");
    console.log("ID do disparo:", data);
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
  }
}

testEmail();
