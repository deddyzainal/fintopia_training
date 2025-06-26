import test, { expect } from "playwright/test";
import { AxeBuilder } from '@axe-core/playwright';


test.describe('Accessibility Test', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://ajaib.co.id');
    })

    test('Check Accessibility Entire Page', async ({ page }, testInfo) => {
        const results = await new AxeBuilder({ page }).analyze();

        await testInfo.attach('accessibility-report', {
            body: JSON.stringify(results, null, 2),
            contentType: 'application/json',
        });
        
        expect(results.violations.length).toEqual(0);
    })    
})
