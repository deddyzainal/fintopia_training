import { test, expect } from '@playwright/test';

test.describe('table', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://demoqa.com/webtables');
    })

    test('search table', async ({ page }) => {
        const search: string = '2000'

        await page.locator('#searchBox').fill(search);
        const tableRow = await page.locator('//div[@class="rt-tr-group"]').all();
        let columnValue: string[] = [];

        for (let row = 0 ; row < tableRow.length ; row++) {
            const baris = tableRow[row];
            const column = await baris.locator('//div[@class="rt-td"]').all();

            for (let field = 0 ; field < column.length ; field++) {
                const getText = await column[field].innerText();
                
                if (getText.trim() !== '') {
                    columnValue.push(getText);
                } else {
                    break;
                }
            }
        }

        console.log(columnValue);
        expect(columnValue.some(value => value.includes(search))).toBeTruthy();
    })
})