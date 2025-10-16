import { test, expect } from '@playwright/test';
test.describe('Mercado Livre - Busca de produtos', () => {
  test('deve buscar um produto e exibir resultados relevantes', async ({ page }) => {
    // Acessa o site principal
    await page.goto('https://www.mercadolivre.com.br/');
    // Localiza o campo de busca e digita o produto
    await page.getByPlaceholder('Buscar produtos, marcas e muito mais…').fill('notebook');
    await page.keyboard.press('Enter');
    // Aguarda carregar os resultados
    await page.waitForSelector('li.ui-search-layout__item');
    // Verifica se há resultados na lista
    const results = page.locator('li.ui-search-layout__item');
    const count = await results.count();
    expect(count).toBeGreaterThan(0);
    // Pega o primeiro resultado e verifica se o título contém "Notebook"
    const firstTitle = await results.nth(0).locator('h2').innerText();
    expect(firstTitle.toLowerCase()).toContain('notebook');
    // Clica no primeiro resultado
    await results.nth(0).locator('a').first().click();
    // Espera a página do produto abrir
    await page.waitForLoadState('domcontentloaded');
    // Valida que o título do produto está visível
    const productTitle = page.locator('h1.ui-pdp-title');
    await expect(productTitle).toBeVisible();
    console.log(':marca_de_verificação_branca: Teste finalizado com sucesso!');
  });
});









