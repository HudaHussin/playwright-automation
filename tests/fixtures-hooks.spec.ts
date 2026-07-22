import { test, expect } from '../fixtures/pages.fixture';
import { users } from '../test-data/users';

test.describe('Lesson 9 - Fixtures and Hooks', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });

  test('should provide page objects through custom fixtures', async ({
    page,
    inventoryPage,
  }) => {
    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.productsTitle).toBeVisible();
    await expect(inventoryPage.productsTitle).toHaveText('Products');
  });

  test('should run the login hook before every test', async ({
    inventoryPage,
  }) => {
    await expect(inventoryPage.products).toHaveCount(6);
    await expect(inventoryPage.cartLink).toBeVisible();
  });

  test('should use multiple page object fixtures in one test', async ({
    inventoryPage,
    cartPage,
  }) => {
    await inventoryPage.addProductToCart('Sauce Labs Backpack');

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(cartPage.cartItems).toHaveCount(1);
  });
});