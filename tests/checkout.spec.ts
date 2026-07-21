import { test, expect } from '../fixtures/pages.fixture';
import { customers } from '../test-data/customers';
import { users } from '../test-data/users';

test.describe('SauceDemo Checkout', () => {
  test('should complete an order successfully', async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    const productName = 'Sauce Labs Backpack';

    await test.step('Log in as a valid user', async () => {
      await loginPage.goto();
      await loginPage.login(
        users.standard.username,
        users.standard.password
      );

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
        customers.valid.firstName,
        customers.valid.lastName,
        customers.valid.postalCode
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