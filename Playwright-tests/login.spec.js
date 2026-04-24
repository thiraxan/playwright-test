import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  test('TC-LOGIN-001: Login success', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page).toHaveURL(/inventory/);
  });

  test('TC-LOGIN-002: Invalid username', async ({ page }) => {
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username and password do not match/);
  });

  test('TC-LOGIN-003: Invalid password', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username and password do not match/);
  });

  test('TC-LOGIN-004: Invalid username & password', async ({ page }) => {
    await page.fill('#user-name', 'wrong_user');
    await page.fill('#password', 'wrong_password');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username and password do not match/);
  });

  test('TC-LOGIN-005: Empty username', async ({ page }) => {
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username is required/);
  });

  test('TC-LOGIN-006: Empty password', async ({ page }) => {
    await page.fill('#user-name', 'standard_user');
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Password is required/);
  });

  test('TC-LOGIN-007: Empty both fields', async ({ page }) => {
    await page.click('#login-button');

    await expect(page.locator('[data-test="error"]'))
      .toHaveText(/Username is required/);
  });

});