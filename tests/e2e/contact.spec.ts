import { test, expect } from '@playwright/test';

test('contact form submits successfully', async ({ page }) => {
  await page.goto('/');
  
  // Assuming the form is in the contact section
  await page.getByRole('textbox', { name: /Seu nome/i }).fill('Test User');
  await page.getByRole('textbox', { name: /E-mail/i }).fill('test@example.com');
  await page.getByRole('textbox', { name: /Como posso ajudar/i }).fill('This is a test message');
  
  // Click submit (assuming button text)
  await page.getByRole('button', { name: /Iniciar Conversa/i }).click();
  
  // Check for success message
  await expect(page.locator('text=Mensagem Transmitida')).toBeVisible();
});
