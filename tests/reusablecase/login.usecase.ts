import { Page } from "@playwright/test";
import { LoginController } from "../controller/login/login.controller";

export class LoginUseCases {
    constructor(private page: Page) {}

    async login_success(username: string, password: string) {
        const loginController = new LoginController(this.page);

        await loginController.inputUsername(username);
        await loginController.inputPassword(password);
        await loginController.clickLoginButton();
        await loginController.verifyHeaderVisible();
    }
}