import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test.describe('SauceDemo Checkout', () => {
  test('should complete an order successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const productName = 'Sauce Labs Backpack';

    await test.step('Log in as a valid user', async () => {
      await loginPage.goto();
      await loginPage.login('standard_user', 'secret_sauce');

      await expect(page).toHaveURL(/inventory/);
    });

    await test.step('Add a product to the cart', async () => {
      await inventoryPage.addProductToCart(productName);

      await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    await test.step('Open the cart and verify the product', async () => {
      await inventoryPage.openCart();

      await expect(page).toHaveURL(/cart/);
      await expect(cartPage.getProduct(productName)).toBeVisible();
    });

    await test.step('Enter checkout information', async () => {
      await cartPage.proceedToCheckout();

      await expect(page).toHaveURL(/checkout-step-one/);

      await checkoutPage.enterCustomerInformation(
        'Huda',
        'Luna',
        '42300'
      );

      await expect(page).toHaveURL(/checkout-step-two/);
      await expect(cartPage.getProduct(productName)).toBeVisible();
    });

    await test.step('Complete the order', async () => {
      await checkoutPage.finishOrder();

      await expect(page).toHaveURL(/checkout-complete/);
      await expect(checkoutPage.completeMessage).toHaveText(
        'Thank you for your order!'
      );
    });
  });
});