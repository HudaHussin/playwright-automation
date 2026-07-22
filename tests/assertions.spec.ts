import { test, expect } from '../fixtures/pages.fixture';
import { users } from '../test-data/users';

test.describe('Lesson 7 - Playwright Assertions', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should verify the login page elements', async ({
    page,
    loginPage,
  }) => {
    // Verify that the elements are visible to the user
    await expect(loginPage.usernameInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();

    // Verify that the input fields are editable
    await expect(loginPage.usernameInput).toBeEditable();
    await expect(loginPage.passwordInput).toBeEditable();

    // Verify that the login button is enabled
    await expect(loginPage.loginButton).toBeEnabled();

    // Verify that the password field has the type="password" attribute
    await expect(loginPage.passwordInput).toHaveAttribute(
      'type',
      'password'
    );

    // Verify that the user is still on the login page
    await expect(page).toHaveURL('/');
  });

  test('should verify the page after a successful login', async ({
    page,
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    // Verify that the URL contains "inventory"
    await expect(page).toHaveURL(/inventory/);

    // Verify that the Products title is visible
    await expect(inventoryPage.productsTitle).toBeVisible();

    // Verify that the title text matches exactly
    await expect(inventoryPage.productsTitle).toHaveText('Products');
  });

  test('should verify the error message after an invalid login', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login('wrong_user', 'wrong_password');

    // Verify that the error message is visible
    await expect(loginPage.errorMessage).toBeVisible();

    // Verify that the error message contains the expected text
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match'
    );

    // Verify that the user remains on the login page
    await expect(page).toHaveURL('/');
  });
});