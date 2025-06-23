import { Page } from "playwright";
import { LoginPage } from "../../pageObject/login/login.page";
import { expect } from "playwright/test";

export class LoginController {
    private loginPage: LoginPage;

    constructor(private page: Page) {
        this.loginPage = new LoginPage(page);
    }
    async inputUsername(username: string) {
        await this.loginPage.fieldUsernamePassword("text").fill(username);
    }

    async inputPassword(password: string) {
        await this.loginPage.fieldUsernamePassword("password").fill(password);
    }

    async clickLoginButton() {
        await this.loginPage.buttonLogin().click();
    }

    async verifyErrorMessage(errorMessage: string | RegExp) {
        await expect(this.loginPage.errorText()).toContainText(errorMessage);
    }

    async verifyHeaderNotVisible() {
        await expect(this.loginPage.headerProduct()).not.toBeVisible();
    }

    async verifyHeaderVisible() {
        await expect(this.loginPage.headerProduct()).toBeVisible();
    }
}