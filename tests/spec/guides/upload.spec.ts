import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('upload', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://davidwalsh.name/demo/multiple-file-upload.php');
    })

    test('upload file', async ({ page }) => {
        const fileName = 'sampleFile.jpeg';
        const fileName2 = 'sampleFile copy.jpeg';
        const directory = process.cwd();
        const filePath = path.join(directory, 'snapshots', fileName);
        const filePath2 = path.join(directory, 'snapshots', fileName2);

        await page.locator('#uploadFile').setInputFiles([filePath,filePath2]);
        await expect(page.locator('#uploadedFilePath')).toContainText(fileName)
    })
})