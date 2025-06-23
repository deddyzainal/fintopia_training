import { test, expect, Page } from '@playwright/test';

let page: Page;

test.describe.configure({
    mode: 'serial'
})

test.describe('E2E Transaction', {tag: '@regression'}, () => {
    test.beforeAll(async ({ browser }) => {
        const contex = await browser.newContext();
        page = await contex.newPage();
        await page.goto('https://www.saucedemo.com/');
    })
    
    test('login success', async () => {
        await page.locator('//*[@id="user-name"]').fill('standard_user');
        await page.locator('//*[@id="password"]').fill('secret_sauce');
        await page.locator('//*[@id="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });
 
    test('choose product', async () => {
        await page.locator('//div[contains(text(),"Light")]/ancestor::div[1]/following-sibling::div/button').click();
        await page.locator('//div[contains(text(),"Backpack")]/ancestor::div[1]/following-sibling::div/button').click();
        await page.locator('//div[contains(text(),"Bolt")]/ancestor::div[1]/following-sibling::div/button').click();
        await page.locator('//*[@id="shopping_cart_container"]/a').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Your Cart');
    })

    test('order success', async () => {
        await page.locator('//*[@id="checkout"]').click();
        await expect(page.locator('[data-test="title"]')).toContainText('Checkout: Your Information');
    })

    test('your information page', async () => {
        await page.locator('//*[@id="first-name"]').fill('Deddy');
        await page.locator('//*[@id="last-name"]').fill('Zainal');
        await page.locator('//*[@id="postal-code"]').fill('55555');
        await page.locator('//*[@id="continue"]').click();
        await page.locator('//*[@id="finish"]').click();
        await expect(page.locator('//h2[contains(text(),"Thank you for your order!")]')).toBeVisible();
    })
})
