import { expect } from '@playwright/test';

// Lớp này đại diện cho trang đăng nhập.
export class LoginPage {
    constructor(page) {
        this.page = page;

        // ==========================
        // Khai báo các selectors
        // ==========================

        // Ô nhập Username
        this.usernameTextbox = page.getByRole('textbox', {
            name: 'Username'
        });

        // Ô nhập Password
        this.passwordTextbox = page.getByRole('textbox', {
            name: 'Password'
        });

        // Nút Login
        this.loginButton = page.getByRole('button', {
            name: ' Login'
        });
    }

    /**
     * Mở trang Login
     */
    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/login');
        await expect(this.usernameTextbox).toBeVisible();
    }

    /**
     * Nhập Username
     * @param {string} username
     */
    async enterUsername(username) {
        await this.usernameTextbox.click();
        await this.usernameTextbox.fill(username);
    }

    /**
     * Nhập Password
     * @param {string} password
     */
    async enterPassword(password) {
        await this.passwordTextbox.click();
        await this.passwordTextbox.fill(password);
    }

    /**
     * Click nút Login
     */
    async clickLogin() {
        await this.loginButton.click();
    }

    /**
     * Thực hiện đầy đủ thao tác đăng nhập
     * @param {string} username
     * @param {string} password
     */
    async login(username, password) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }
}
