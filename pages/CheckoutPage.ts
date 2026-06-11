import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage'; 

export class CheckoutPage extends BasePage {
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly zipCodeInput: Locator;
  readonly continueButton: Locator;
  readonly overviewItemName: Locator;
  readonly overviewItemPrice: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page); 
    // Giữ nguyên khởi tạo locator bằng getByTestId cho chuẩn chỉ
    this.checkoutButton = this.page.getByTestId('checkout');
    this.firstNameInput = this.page.getByTestId('firstName');
    this.lastNameInput = this.page.getByTestId('lastName');
    this.zipCodeInput = this.page.getByTestId('postalCode');
    this.continueButton = this.page.getByTestId('continue');
    this.overviewItemName = this.page.getByTestId('inventory-item-name');
    this.overviewItemPrice = this.page.getByTestId('inventory-item-price');
    this.finishButton = this.page.getByTestId('finish');
  }

  // GỌI CÁC HÀM TỪ BASEPAGE QUA TỪ KHÓA 'this'
  async clickCheckout(): Promise<void> {
    await this.clickOn(this.checkoutButton); // Thay vì .click()
  }

  async fillInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.typeTo(this.firstNameInput, firstName); // Thay vì .fill()
    await this.typeTo(this.lastNameInput, lastName);
    await this.typeTo(this.zipCodeInput, zipCode);
    await this.clickOn(this.continueButton);
  }

  async getOverviewItemName(): Promise<string> {
    return await this.getTextOf(this.overviewItemName); // Thay vì .innerText()
  }

  async getOverviewItemPrice(): Promise<string> {
    return await this.getTextOf(this.overviewItemPrice);
  }

  async clickFinish(): Promise<void> {
    await this.clickOn(this.finishButton);
  }
}
