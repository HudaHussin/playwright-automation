import { type Locator, type Page } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productsTitle: Locator;
  readonly products: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsTitle = page.getByText('Products', {
      exact: true,
    });
    this.products = page.getByTestId('inventory-item');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.products.filter({
      hasText: productName,
    });

    await product
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}