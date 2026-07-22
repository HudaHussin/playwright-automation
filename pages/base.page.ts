import { type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async open(path: string): Promise<void> {
    await this.page.goto(path);
  }
}