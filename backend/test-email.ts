import { Resend } from 'resend';

const resend = new Resend('re_fdQpTiCV_84Sr7TfDn1vsmHoxa3YcTUMi');

async function sendTestEmail() {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'devthomasnascimento@gmail.com',
      subject: 'Hello World',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
    });
    console.log('Email sent successfully!', data);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

sendTestEmail();
