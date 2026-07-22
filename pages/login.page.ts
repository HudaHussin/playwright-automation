import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');

    this.loginButton = page.getByRole('button', {
      name: 'Login',
    });

    this.errorMessage = page.getByTestId('error');
  }

  async goto(): Promise<void> {
    await this.open('/');
  }

  async login(
    username: string,
    password: string
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}