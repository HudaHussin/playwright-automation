import { test, expect } from '../fixtures/pages.fixture';
import { invalidLoginCases } from '../test-data/login-cases';
import { users } from '../test-data/users';

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display a usable login form', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.usernameInput).toBeEditable();

    await expect(loginPage.passwordInput).toHaveAttribute(
      'type',
      'password'
    );

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();
  });

  test('should allow a valid user to log in', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(loginPage.productsTitle).toBeVisible();
  });

  invalidLoginCases.forEach(
    ({ name, username, password, expectedError }) => {
      test(`should display the correct error for ${name}`, async ({
        page,
        loginPage,
      }) => {
        await loginPage.login(username, password);

        await expect(loginPage.errorMessage).toContainText(expectedError);
        await expect(page).toHaveURL('/');
      });
    }
  );
});