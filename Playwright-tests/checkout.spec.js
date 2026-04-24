import { test, expect } from '@playwright/test';

test('Checkout flow', async ({ page }) => {

  await page.goto('/');

  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  await page.click('text=Add to cart');
  await page.click('.shopping_cart_link');

  await page.click('text=Checkout');

  await page.fill('#first-name', 'Test');
  await page.fill('#last-name', 'User');
  await page.fill('#postal-code', '12345');

  await page.click('text=Continue');

  await expect(page.locator('text=Checkout: Overview')).toBeVisible();

  // ตรวจราคา
  await expect(page.locator('.summary_subtotal_label')).toContainText('$');
  await expect(page.locator('.summary_total_label')).toContainText('$');

  await page.click('text=Finish');

  await expect(page.locator('text=Thank you for your order')).toBeVisible();
});