import { test, expect } from '@playwright/test';

test('landing page has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Thomas Eduardo/);
});

test('portfolio projects section is loaded', async ({ page }) => {
  await page.goto('/');
  // Checking for a link that leads to projects page or a section.
  // Based on App.tsx, path is /cases
  const projectsLink = page.getByRole('link', { name: /projetos/i });
  await expect(projectsLink).toBeVisible();
});
