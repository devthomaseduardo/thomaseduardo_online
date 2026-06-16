import { test, expect } from '@playwright/test';

test('contact form submits successfully', async ({ page }) => {
  await page.goto('/');
  
  // Assuming the form is in the contact section
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('textarea[name="message"]', 'This is a test message');
  
  // Click submit (assuming button text)
  await page.click('button[type="submit"]');
  
  // Check for success message
  await expect(page.locator('text=Mensagem Transmitida')).toBeVisible();
});
