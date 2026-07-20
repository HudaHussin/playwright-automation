import { test, expect } from '@playwright/test';

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow a valid user to log in', async ({ page }) => {
    await page.getByTestId('username').fill('standard_user');
    await page.getByTestId('password').fill('secret_sauce');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await page.getByTestId('username').fill('invalid_user');
    await page.getByTestId('password').fill('invalid_password');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error')).toContainText(
      'Username and password do not match'
    );

    await expect(page).toHaveURL('/');
  });
});