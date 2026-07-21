import { test, expect } from '../fixtures/pages.fixture';
import { invalidCheckoutCases } from '../test-data/checkout-cases';
import { customers } from '../test-data/customers';
import { users } from '../test-data/users';

test.describe('SauceDemo Checkout', () => {
  const productName = 'Sauce Labs Backpack';

  test.beforeEach(async ({
    page,
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
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

    await cartPage.proceedToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);
  });

  test('should complete an order successfully', async ({
    page,
    cartPage,
    checkoutPage,
  }) => {
    await checkoutPage.enterCustomerInformation(
      customers.valid.firstName,
      customers.valid.lastName,
      customers.valid.postalCode
    );

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(cartPage.getProduct(productName)).toBeVisible();

    await checkoutPage.finishOrder();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutPage.completeMessage).toHaveText(
      'Thank you for your order!'
    );
  });

  invalidCheckoutCases.forEach(
    ({ name, customer, expectedError }) => {
      test(`should display the correct error for ${name}`, async ({
        page,
        checkoutPage,
      }) => {
        await checkoutPage.enterCustomerInformation(
          customer.firstName,
          customer.lastName,
          customer.postalCode
        );

        await expect(checkoutPage.errorMessage).toHaveText(expectedError);
        await expect(page).toHaveURL(/checkout-step-one/);
      });
    }
  );
});