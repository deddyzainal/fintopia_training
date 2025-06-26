import { Page } from "@playwright/test";

export class DashboardPokemonElements {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    buttonMenu (menu:string) {
        return this.page.getByRole('button', { name: menu });
    }

    resultField() {
        return this.page.locator('#site-content');
    }

    headerText() {
        return this.page.locator('//h2[contains(@class,"message")]');
    }
}