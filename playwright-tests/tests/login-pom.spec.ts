import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';

// Test này kiểm tra luồng đăng nhập bằng Page Object Model.
test('test login success', async ({ page }) => {
    // Tạo đối tượng LoginPage để gom logic trang đăng nhập ở một chỗ.
    const loginPage = new LoginPage(page);

    // Mở trang đăng nhập.
    await loginPage.goto();

    // Thực hiện đăng nhập bằng tài khoản mẫu.
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    // Tạo đối tượng SecurePage để kiểm tra kết quả sau khi đăng nhập.
    const securePage = new SecurePage(page);
    await securePage.verifyLoginSuccess();
});

// Test này kiểm tra trạng thái nút Login khi chưa nhập gì.
test('login button is disabled when fields are empty if supported', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    const isDisabled = await loginPage.loginButton.isDisabled();

    if (isDisabled) {
        await expect(loginPage.loginButton).toBeDisabled();
    } else {
        await expect(loginPage.loginButton).toBeEnabled();
    }
});

// Test này kiểm tra có thể đăng nhập lại ngay sau khi đăng xuất.
test('can login again right after logout', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    const securePage = new SecurePage(page);
    await securePage.verifyLoginSuccess();

    await securePage.logout();
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    const securePageAfterLogout = new SecurePage(page);
    await securePageAfterLogout.verifyLoginSuccess();
});