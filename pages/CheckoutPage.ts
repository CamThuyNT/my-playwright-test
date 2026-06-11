import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly checkoutBtn: string;
  private readonly firstNameInp: string;
  private readonly lastNameInp: string;
  private readonly zipCodeInp: string;
  private readonly continueBtn: string;
  private readonly overviewItemNameLabel: string;
  private readonly overviewItemPriceLabel: string;
  private readonly finishBtn: string;

  constructor(page: Page) {
    super(page);
    
    this.checkoutBtn = '[data-test="checkout"]';
    this.firstNameInp = '[data-test="firstName"]';
    this.lastNameInp = '[data-test="lastName"]';
    this.zipCodeInp = '[data-test="postalCode"]';
    this.continueBtn = '[data-test="continue"]';
    this.overviewItemNameLabel = '[data-test="inventory-item-name"]';
    this.overviewItemPriceLabel = '[data-test="inventory-item-price"]';
    this.finishBtn = '[data-test="finish"]';
  }

  async clickCheckout(): Promise<void> {
    await this.clickElement(this.checkoutBtn);
  }

  async fillInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
    // Tái sử dụng hàm fillField từ BasePage rất gọn gàng
    await this.fillField(this.firstNameInp, firstName);
    await this.fillField(this.lastNameInp, lastName);
    await this.fillField(this.zipCodeInp, zipCode);
    await this.clickElement(this.continueBtn);
  }

  async getOverviewItemName(): Promise<string> {
    return await this.page.locator(this.overviewItemNameLabel).innerText();
  }

  async getOverviewItemPrice(): Promise<string> {
    return await this.page.locator(this.overviewItemPriceLabel).innerText();
  }

  async clickFinish(): Promise<void> {
    await this.clickElement(this.finishBtn);
  }
}
