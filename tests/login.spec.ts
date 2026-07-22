import { test, expect } from '../fixtures/pages.fixture';
import { invalidLoginCases } from '../test-data/login-cases';
import { users } from '../test-data/users';

test.describe('SauceDemo Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should display the login page', async ({ loginPage }) => {
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should allow a valid user to log in', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.productsTitle).toBeVisible();
  });

  invalidLoginCases.forEach(
    ({ name, username, password, expectedError }) => {
      test(`should display an error for ${name}`, async ({
        loginPage,
      }) => {
        await loginPage.login(username, password);

        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toContainText(
          expectedError
        );
      });
    }
  );
});