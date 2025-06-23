import { Page } from "playwright";
import { expect } from "playwright/test";

export class SharedController {
    constructor(private page: Page) {}

    async accessUrl(url: string): Promise<void> {
        await this.page.goto(url);
        await this.page.waitForLoadState();
    }
}