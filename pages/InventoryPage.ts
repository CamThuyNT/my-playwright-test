import { Page } from '@playwright/test';
import { BasePage } from './BasePage'; // Khai báo kế thừa từ BasePage mới

export class InventoryPage extends BasePage {
  // Thay đổi: Lưu locator dưới dạng chuỗi string (private để bảo mật dữ liệu của trang)
  private readonly backpackAddToCartBtn: string;
  private readonly firstItemNameLabel: string;
  private readonly firstItemPriceLabel: string;
  private readonly cartBtn: string;

  constructor(page: Page) {
    super(page); // Bắt buộc gọi constructor của lớp cha

    // Gán các chuỗi selector (Có thể dùng data-test trực tiếp)
    this.backpackAddToCartBtn = '[data-test="add-to-cart-sauce-labs-backpack"]';
    this.firstItemNameLabel = '[data-test="inventory-item-name"]';
    this.firstItemPriceLabel = '[data-test="inventory-item-price"]';
    this.cartBtn = '[data-test="shopping-cart-link"]';
  }

  async addBackpackToCart(): Promise<void> {
    // Gọi hàm clickElement từ BasePage và truyền chuỗi selector vào
    await this.clickElement(this.backpackAddToCartBtn);
  }

  async getFirstItemName(): Promise<string> {
    // Vì BasePage mới chưa có hàm lấy text, ta có thể dùng trực tiếp qua page của BasePage kết hợp .first()
    return await this.page.locator(this.firstItemNameLabel).first().innerText();
  }

  async getFirstItemPrice(): Promise<string> {
    return await this.page.locator(this.firstItemPriceLabel).first().innerText();
  }

  async goToCart(): Promise<void> {
    await this.clickElement(this.cartBtn);
  }
}
