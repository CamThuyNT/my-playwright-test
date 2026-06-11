import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test('C_CO_04: Kiểm tra tính đồng nhất của tên và giá sản phẩm', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);

  // Khai báo biến hứng dữ liệu ở phạm vi ngoài để các step dùng chung
  let expectedName = '';
  let expectedPrice = '';

  await test.step('Bước 1: Đăng nhập vào hệ thống Saucedemo', async () => {
    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  await test.step('Bước 2: Chọn sản phẩm và lấy thông tin gốc', async () => {
    await inventoryPage.addBackpackToCart();
    expectedName = await inventoryPage.getFirstItemName();
    expectedPrice = await inventoryPage.getFirstItemPrice();
    console.log(`Thông tin gốc: ${expectedName} - ${expectedPrice}`);
  });

  await test.step('Bước 3: Đi đến giỏ hàng và nhập thông tin Checkout', async () => {
    await inventoryPage.goToCart();
    await checkoutPage.clickCheckout();
    await checkoutPage.fillInformation('Mike', 'Brown', '67890');
  });

  await test.step('Bước 4: Xác minh thông tin hiển thị tại trang Tổng quan (Overview)', async () => {
    const actualName = await checkoutPage.getOverviewItemName();
    const actualPrice = await checkoutPage.getOverviewItemPrice();
    
    // Web-first Assertions
    expect(actualName).toBe(expectedName);
    expect(actualPrice).toBe(expectedPrice);
  });
  
  await test.step('Bước 5: Hoàn tất đơn hàng', async () => {
    await checkoutPage.clickFinish();
  });
});
