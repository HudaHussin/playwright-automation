import { test, expect } from '../fixtures/pages.fixture';
import { users } from '../test-data/users';

test.describe('SauceDemo Shopping Cart', () => {
  test('should allow a user to add a product to the cart', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    const productName = 'Sauce Labs Backpack';

    await loginPage.goto();
    await loginPage.login(
      users.standard.username,
      users.standard.password
    );

    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.addProductToCart(productName);

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();

    await expect(page).toHaveURL(/cart/);
    await expect(cartPage.getProduct(productName)).toBeVisible();
  });
});