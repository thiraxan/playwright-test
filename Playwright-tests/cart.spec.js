import { test, expect } from '@playwright/test';

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  });

  test('Add item to cart', async ({ page }) => {
    await page.click('text=Add to cart');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  test('Remove item', async ({ page }) => {
    await page.click('text=Add to cart');
    await page.click('text=Remove');

    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });

});