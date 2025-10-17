import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

  await page.goto('https://www.saucedemo.com/')

  // Realizar login na loja 
  await page.fill('#user-name', 'standard_user')
  await page.fill('#password', 'secret_sauce')
  await page.click('#login-button');

   await expect(page).toHaveURL(/.*inventory.html/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();

  await expect(page.getByText('Checkout: Your Information')).toBeVisible();

})