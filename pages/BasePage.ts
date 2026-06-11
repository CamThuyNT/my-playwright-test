import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async openUrl(url: string): Promise<void> {
    await this.page.goto(url);
  }
// truyền thẳng Selector chuỗi/role và data
  async fillField(selector: string, value: string): Promise<void> {
    const locator = this.page.locator(selector);
    await locator.fill(value);
  }

  async clickElement(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }
}
