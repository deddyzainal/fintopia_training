import { test, expect } from '@playwright/test';

test('dialog', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    page.on('dialog', async dialog => {
        const message = dialog.message();
        console.log(dialog.message());

        if (message.includes('Alert')) {
            await dialog.accept();
        } 
        else if (message.includes('Confirm')) {
            await dialog.dismiss();
        }
        else if (message.includes('prompt')) {
            await dialog.accept('This is a prompt');
        }
    });

    await page.getByRole('button', { name: 'Click for JS Alert' }).click();
    await page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
})
