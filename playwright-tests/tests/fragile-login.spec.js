// // Test dùng selector dễ gãy — sẽ được cải thiện
// const { test, expect } = require('@playwright/test');

// test('Login với selector fragile', async ({ page }) => {
//   await page.goto('https://the-internet.herokuapp.com/login');
  
//   // ❌ Dùng CSS class — dễ gãy
//   await page.locator('input[class*="form"]').first().fill('tomsmith');
//   await page.locator('input[type="password"]').fill('SuperSecretPassword!');
//   await page.locator('button').click();
  
//   await expect(page).toHaveURL(/.*secure/);
// });

const { test, expect } = require('@playwright/test');

test('Login successfully', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // Username
  await page.locator('#username').fill('tomsmith');

  // Password
  await page.locator('#password').fill('SuperSecretPassword!');

  // Login button
  await page.getByRole('button', { name: 'Login' }).click();

  // Verify URL
  await expect(page).toHaveURL(/\/secure$/);

  // Verify success message
  await expect(page.locator('#flash'))
    .toContainText('You logged into a secure area!');
});