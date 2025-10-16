import {test, expect} from '@playwright/test'

test('webapp deve estar online', async ({ page }) => {
await page.goto('https://playwright.dev/')
await expect(page).toHaveTitle(/Playwright/)
})