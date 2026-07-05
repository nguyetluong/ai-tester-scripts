import { expect } from '@playwright/test';

// Lớp này đại diện cho trang sau khi đăng nhập thành công.
export class SecurePage {
    constructor(page) {
        this.page = page;

        // ==========================
        // Khai báo selectors
        // ==========================

        // Tiêu đề sau khi đăng nhập
        this.pageTitle = page.locator('h2');

        // Thông báo thành công
        this.flashMessage = page.locator('#flash');

        // Nút Logout
        this.logoutButton = page.getByRole('link', {
            name: 'Logout'
        });
    }

    /**
     * Kiểm tra đã chuyển sang trang Secure Area
     */
    async verifyLoginSuccess() {
        await expect(this.pageTitle).toHaveText('Secure Area');
        await expect(this.flashMessage).toContainText(
            'You logged into a secure area!'
        );
    }

    /**
     * Logout
     */
    async logout() {
        await this.logoutButton.click();
    }
}
