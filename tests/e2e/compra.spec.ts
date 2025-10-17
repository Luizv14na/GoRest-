// Teste Tecnico 
/**
 * Testes de front - Realizar teste de fluxo de compra em um ecommerce publico.
 * 
 * Site utilizado: https://www.saucedemo.com/
 *
 * Objetivo:
 * Validar login, adicionar produto ao carrinho e finalizar a compra no SauceDemo
 *
 * Ferramenta: Playwright Test
 * Linguagem: TypeScript
 */

import { test, expect } from '@playwright/test';

test('Devo realizar fluxo de compra completo em e-commerce', async ({ page }) => {
// 1. Acessar o site da loja
  await page.goto('https://www.saucedemo.com/')
//2. Realizar login na loja 
  await page.fill('#user-name', 'standard_user')
  await page.fill('#password', 'secret_sauce')
  await page.click('#login-button');
  
  await expect(page).toHaveURL(/.*inventory.html/);
// 3. Adicionar o produto ao carrinho
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
// 4. Validar checkout  
  await expect(page.getByText('Checkout: Your Information')).toBeVisible();

})