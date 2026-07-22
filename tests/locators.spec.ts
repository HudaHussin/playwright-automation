import { test, expect } from '../fixtures/pages.fixture';
import { users } from '../test-data/users';

test.describe('Lesson 8 - Locator Deep Dive', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should locate elements using user-facing information', async ({
    page,
  }) => {
    // Locate elements by placeholder
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');

    // Locate elements by role and accessible name
    const loginButton = page.getByRole('button', {
      name: 'Login',
    });

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('should locate elements using test IDs', async ({ page }) => {
    const usernameInput = page.getByTestId('username');
    const passwordInput = page.getByTestId('password');
    const loginButton = page.getByTestId('login-button');

    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
    await expect(loginButton).toBeVisible();
  });

  test('should locate text after a successful login', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    const productsTitle = page.getByText('Products', {
      exact: true,
    });

    await expect(productsTitle).toBeVisible();
  });

  test('should use filter to locate a specific product card', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    const productCard = page
      .getByTestId('inventory-item')
      .filter({
        hasText: 'Sauce Labs Backpack',
      });

    await expect(productCard).toBeVisible();

    const addToCartButton = productCard.getByRole('button', {
      name: 'Add to cart',
    });

    await expect(addToCartButton).toBeVisible();
  });

  test('should demonstrate first, last, and nth locators', async ({
    page,
    loginPage,
  }) => {
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    const products = page.getByTestId('inventory-item');

    await expect(products).toHaveCount(6);

    const firstProduct = products.first();
    const secondProduct = products.nth(1);
    const lastProduct = products.last();

    await expect(firstProduct).toBeVisible();
    await expect(secondProduct).toBeVisible();
    await expect(lastProduct).toBeVisible();
  });
});