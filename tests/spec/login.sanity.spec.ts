import { test } from '@playwright/test';
import { LoginController } from '../controller/login/login.controller';
import { SharedController } from '../controller/shared/share.controller';

test.describe('Login', () => {
  let loginController: LoginController;
  let sharedController: SharedController;

  test.beforeEach(async ({ page }) => {
  loginController = new LoginController(page);
  sharedController = new SharedController(page);
  sharedController.accessUrl('https://www.saucedemo.com/');
})

  test('login with valid credentials', {tag: '@smoke'} , async ({ page }) => {
    await loginController.inputUsername('standard_user');
    await loginController.inputPassword('secret_sauce');
    await loginController.clickLoginButton();
    await loginController.verifyHeaderVisible();
  });

  test('login with random password', {tag: '@negative'} , async ({ page }) => {
    await loginController.inputUsername('standard_user');
    await loginController.inputPassword('randompassword');
    await loginController.clickLoginButton();
    await loginController.verifyErrorMessage('Username and password do not match any user in this service');
    });

  test('login with random username', {tag: '@negative'}, async ({ page }) => {
    await loginController.inputUsername('randomusername');
    await loginController.inputPassword('secret_sauce');
    await loginController.clickLoginButton();
    await loginController.verifyErrorMessage('Username and password do not match any user in this service');
  });

  test('login with empty username', {tag: '@negative'}, async ({ page }) => {
    await loginController.inputPassword('secret_sauce');
    await loginController.clickLoginButton();
    await loginController.verifyErrorMessage('Username is required');
  });

  test('login with empty password', {tag: '@negative'}, async ({ page }) => {
    await loginController.inputUsername('standard_user');
    await loginController.clickLoginButton();
    await loginController.verifyErrorMessage('Password is required');
  });

  test('login with empty username and password', {tag: '@negative'}, async ({ page }) => {
    await loginController.clickLoginButton();
    await loginController.verifyErrorMessage('Username is required');
  });
})

