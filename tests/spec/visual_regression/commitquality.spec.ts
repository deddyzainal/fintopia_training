import test, { expect } from "playwright/test";

test.describe('Visual Regression', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://commitquality.com/');
    })

    test("Take snapshot", async ({ page }) => {
        // await SharedController.visualRegression("take_snapshot.png");
        expect(await page.screenshot()).toMatchSnapshot("take_snapshot.png");
    })

    test("Take HTML snapshot whole page", async ({ page }) => {
        // await SharedController.htmlVisualRegression("whole-page.html");
        expect(await page.content()).toMatchSnapshot("whole-page.html");
    })

    test("Take HTML snapshot table", async ({ page }) => {
        // await SharedController.htmlVisualRegression("table.html", '.product-list-table');
        const ELEMENT = await page.locator('.product-list-table').innerHTML();
        expect(ELEMENT).toMatchSnapshot("table.html");
    })

    test("Take screenshot", async ({ page }) => {
        // await SharedController.modifyVisualRegression({fileName: "take_screenshot.png"});
        await expect(page).toHaveScreenshot("take_screenshot.png");
    })

    test("Take full page screenshot", async ({ page }) => {
        // await SharedController.modifyVisualRegression({fileName:"take_fullpage_screenshot.png", 
        //     options:{ 
        //         fullPage: true 
        //     }
        // });
        await expect(page).toHaveScreenshot("take_fullpage_screenshot.png", { fullPage: true });
    })

    test("Take masking screenshot", async ({ page }) => {
        // await SharedController.modifyVisualRegression({fileName: "take_masking_screenshot.png", options:{ 
        //     mask: [
        //         page.locator('//table[@class="product-list-table"]//td[@data-testid="dateStocked"]'),
        //         page.locator('//table[@class="product-list-table"]//td[@data-testid="price"]')
        //     ] }
        // });

        await expect(page).toHaveScreenshot("take_masking_screenshot.png", { 
            mask: [
                page.locator('//table[@class="product-list-table"]//td[@data-testid="name"]'),
                page.locator('//table[@class="product-list-table"]//td[@data-testid="dateStocked"]'),
                page.locator('//table[@class="product-list-table"]//td[@data-testid="price"]')
        ] });
    })

    test("Take table screenshot", async ({ page }) => {
        // await SharedController.modifyVisualRegression({
        //     fileName: "take_table_screenshot.png",
        //     element: '.product-list-table',});

        const ELEMENT = page.locator('.product-list-table')
        await expect(ELEMENT).toHaveScreenshot("take_table_screenshot.png");
    })

    test.only("Take small difference screenshot", async ({ page }) => {
        // await SharedController.modifyVisualRegression({
        //     fileName: "take_small_difference_screenshot.png",
        //     options: {
        //         maxDiffPixelRatio: 0.01,
        //         maxDiffPixels: 84,
        //         threshold: 0.1
        //     }});

        await expect(page).toHaveScreenshot("take_small_difference_screenshot.png", { 
            maxDiffPixelRatio: 0.01,    // Min 0 - Max 1, 0.01 artinya 1 persen
            // maxDiffPixels: 84,          // Jumlah pixel yang berbeda
            threshold: 0.1              // Min 0 - Max 1, 0.1 artinya 10 persen
        });
    })
})







