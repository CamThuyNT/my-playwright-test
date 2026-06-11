import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Tách biệt dữ liệu kiểm thử (Test Data) theo chuẩn DoD
const TEST_DATA = {
  credential: { username: 'standard_user', password: 'secret_sauce' },
  validCustomer: { firstName: 'Mike', lastName: 'Brown', zipCode: '67890' },
  invalidCustomer: { firstName: '', lastName: 'Doe', zipCode: '12345' }, // Data test cho TC_CO_04
  errorMessage: 'Error: First Name is required'
};

test.describe('GIAI ĐOẠN 2: XÂY DỰNG FRAMEWORK VỚI POM - TUẦN 4', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    await test.step('Pre-condition: Đăng nhập hệ thống và thêm sản phẩm vào giỏ hàng', async () => {
      await loginPage.navigate();
      await loginPage.login(TEST_DATA.credential.username, TEST_DATA.credential.password);
      await inventoryPage.addBackpackToCart();
      await inventoryPage.goToCart();
      await checkoutPage.clickCheckout();
    });
  });

  test('TC_CO_04: Xác minh hệ thống báo lỗi khi First Name để trống', async ({ page }) => {
    await test.step('Bước 1: Để trống First Name và nhập các trường còn lại', async () => {
      // Gọi hàm điền thông tin với firstName là chuỗi rỗng ''
      await checkoutPage.fillInformation(
        TEST_DATA.invalidCustomer.firstName,
        TEST_DATA.invalidCustomer.lastName,
        TEST_DATA.invalidCustomer.zipCode
      );
    });

    await test.step('Bước 2: Kiểm tra thông báo lỗi hiển thị chính xác', async () => {
      // Sử dụng Web-first Assertion trực tiếp qua thuộc tính page của BasePage/Page con
      const errorLocator = page.locator('[data-test="error"]');
      await expect(errorLocator).toBeVisible();
      await expect(errorLocator).toHaveText(TEST_DATA.errorMessage);
    });
  });

  test('TC_CO_03: Xác minh tính đồng nhất của tên và giá sản phẩm từ Cart đến Overview', async () => {
    let expectedName = '';
    let expectedPrice = '';

    await test.step('Bước 1: Quay lại trang sản phẩm lấy thông tin gốc (Giả lập kiểm tra)', async () => {
      expectedName = await inventoryPage.getFirstItemName();
      expectedPrice = await inventoryPage.getFirstItemPrice();
    });

    await test.step('Bước 2: Điền đầy đủ thông tin khách hàng hợp lệ', async () => {
      await checkoutPage.fillInformation(
        TEST_DATA.validCustomer.firstName,
        TEST_DATA.validCustomer.lastName,
        TEST_DATA.validCustomer.zipCode
      );
    });

    await test.step('Bước 3: So sánh dữ liệu thực tế tại trang Overview', async () => {
      const actualName = await checkoutPage.getOverviewItemName();
      const actualPrice = await checkoutPage.getOverviewItemPrice();

      // Nghiêm túc áp dụng Web-first Assertions
      expect(actualName).toBe(expectedName);
      expect(actualPrice).toBe(expectedPrice);
    });

    await test.step('Bước 4: Hoàn tất đơn hàng', async () => {
      await checkoutPage.clickFinish();
    });
  });
});
