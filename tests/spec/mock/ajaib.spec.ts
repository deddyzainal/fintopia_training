import { test, expect } from '@playwright/test';
import { MockAjaibRequest } from '../../../mock/request/ajaib.mock';
import { interceptAjaibLoginRoute, interceptChangeAjaibLoginRoute } from '../../../mock/routes/ajaib.route';

test.beforeEach(async ({ page }) => {
    await page.goto('https://login.ajaib.co.id/login');
})

test('intercept request', async ({ page, request }) => {
    await interceptAjaibLoginRoute(page, request);

    await page.getByRole('textbox', { name: 'Masukkan email' }).fill('candra@kode.id');
    await page.getByRole('textbox', { name: 'Masukkan password' }).fill('rahasia');
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page.getByText('Email dan/atau password salah')).toBeVisible();
});

test('intercept username and password', async ({ page, request}) => {
    await interceptChangeAjaibLoginRoute(page, request, MockAjaibRequest);
    
    await page.getByRole('textbox', { name: 'Masukkan email' }).fill('candra@kode.id');
    await page.getByRole('textbox', { name: 'Masukkan password' }).fill('rahasia');
    await page.getByRole('button', { name: 'Masuk' }).click();
    
    await expect(page.getByTestId('pin-title')).toContainText('Masukkan PIN');

})
