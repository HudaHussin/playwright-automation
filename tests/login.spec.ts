import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { users } from '../test-data/users';

test.describe('SauceDemo Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('should display a usable login form', async () => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEditable();

    await expect(loginPage.passwordInput).toHaveAttribute(
      'type',
      'password'
    );

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
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

  test('should require a username', async ({ page }) => {
    await loginPage.login('', users.standard.password);

    await expect(loginPage.errorMessage).toContainText(
      'Username is required'
    );

    await expect(page).toHaveURL('/');
  });

  test('should require a password', async ({ page }) => {
    await loginPage.login(users.standard.username, '');

    await expect(loginPage.errorMessage).toContainText(
      'Password is required'
    );

    await expect(page).toHaveURL('/');
  });

  test('should prevent a locked-out user from logging in', async ({ page }) => {
    await loginPage.login(
      users.lockedOut.username,
      users.lockedOut.password
    );

    await expect(loginPage.errorMessage).toContainText(
      'Sorry, this user has been locked out'
    );

    await expect(page).toHaveURL('/');
  });
});