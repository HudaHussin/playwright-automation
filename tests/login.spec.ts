import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users } from '../test-data/users';

test.describe('SauceDemo Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should allow a valid user to log in', async ({ page }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
);

    await expect(page).toHaveURL(/inventory/);
    await expect(loginPage.productsTitle).toBeVisible();
  });

  test('should display an error for invalid credentials', async ({ page }) => {
    await loginPage.login(
      users.invalid.username,
      users.invalid.password
    );

    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );

    await expect(page).toHaveURL('/');
  });
});