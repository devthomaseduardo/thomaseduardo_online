import { test, expect } from '@playwright/test';

test('landing page has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Thomas Eduardo/);
});

test('portfolio projects section is loaded', async ({ page }) => {
  await page.goto('/');
  // Checking for a link that leads to projects page.
  // The link text in the application is 'Explorar Todos os Cases'
  const projectsLink = page.getByRole('link', { name: /Explorar Todos os Cases/i });
  await expect(projectsLink).toBeVisible();
});
