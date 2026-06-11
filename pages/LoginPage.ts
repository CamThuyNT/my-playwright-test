import { Page } from '@playwright/test';
import { BasePage } from './BasePage'; // 1. Import BasePage của em

export class LoginPage extends BasePage {
  // 2. Chuyển đổi các thuộc tính thành chuỗi Selector (Encapsulation)
  // Dùng private để đảm bảo các file test không thể gọi trực tiếp các selector này
  private readonly usernameInp: string;
  private readonly passwordInp: string;
  private readonly loginBtn: string;

  constructor(page: Page) {
    super(page); // 3. Gọi constructor của BasePage để khởi tạo thực thể page

    // Định nghĩa selector dạng chuỗi
    this.usernameInp = '[data-test="username"]';
    this.passwordInp = '[data-test="password"]';
    this.loginBtn = '[data-test="login-button"]';
  }

  /**
   * Điều hướng trực tiếp tới trang Login bằng cách tái sử dụng openUrl từ BasePage
   */
  async navigate(): Promise<void> {
    await this.openUrl('https://www.saucedemo.com/');
  }

  /**
   * Thực hiện luồng đăng nhập hệ thống
   * @param username Tên đăng nhập
   * @param pass Mật khẩu mã hóa/clear text
   */
  async login(username: string, pass: string): Promise<void> {
    // 4. Tái sử dụng triệt để hàm fillField và clickElement từ lớp cha BasePage
    await this.fillField(this.usernameInp, username);
    await this.fillField(this.passwordInp, pass);
    await this.clickElement(this.loginBtn);
  }
}
