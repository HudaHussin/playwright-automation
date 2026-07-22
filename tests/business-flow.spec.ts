import { test, expect } from '../fixtures/pages.fixture';
import { users } from '../test-data/users';

test.describe('Reusable Business Flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();

    await loginPage.login(
      users.standard.username,
      users.standard.password
    );
  });

  test('should add multiple products to the cart', async ({
    inventoryPage,
  }) => {
    const products = [
      'Sauce Labs Backpack',
      'Sauce Labs Bike Light',
      'Sauce Labs Bolt T-Shirt',
    ];

    await inventoryPage.addProducts(products);

    await expect(inventoryPage.cartBadge).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText('3');
  });
});