import { Page } from "@playwright/test";

export class LoginPage {
    constructor (public page: Page) {}

    fieldUsernamePassword(field: string) {
        return this.page.locator(`//input[@type="${field}"]`);
    }

    buttonSubmit() {
        return this.page.locator('//input[@type="submit"]');
    }

    buttonLogin() {
        return this.page.getByRole('button', { name: 'Login' });
    }

    errorText() {
        return this.page.locator('[data-test="error"]');
    }

    headerProduct() {
        return this.page.locator('//*[text()="Products"]')
    }
}