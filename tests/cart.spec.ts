import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { users } from '../test-data/users';

test.describe('SauceDemo Shopping Cart', () => {
  test('should allow a user to add a product to the cart', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

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