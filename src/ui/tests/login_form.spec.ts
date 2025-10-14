/*
Разработать тест со следующими шагами:
  - открыть https://anatoly-karpovich.github.io/demo-login-form/
  - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
  - Залогиниться с данными что вы вставили в localStorage
  - Завалидировать успешный логин

  Рекоммендации:
  - Для доступа к localStorage используйте https://playwright.dev/docs/evaluating
*/

import { test, expect } from '@playwright/test';

test.describe('[demo-login-form][login with localStorage injected credentials]', () => {
  test('Should register with valid credentials', async ({ page }) => {
    const url = 'https://anatoly-karpovich.github.io/demo-login-form/';

    interface ICredentials {
      name: string;
      password: string;
    }
    const validCredentials: ICredentials = {
      name: 'test@gmail.com',
      password: 'SecretPw123!@#',
    };
    const { name, password } = validCredentials;
    const title = page.locator('//h2[@id="loginForm"]');
    const usernameInput = page.locator('//input[@id="userName"]');
    const passwordInput = page.locator('//input[@id="password"]');
    const submitButton = page.locator('//input[@id="submit"]');
    const successMessage = page.locator('//h4[@id="successMessage"]');
    const backButton = page.locator('//input[@id="backButton"]');

    await page.goto(url);
    await expect(title).toBeVisible();
    await page.evaluate((data) => {
      localStorage.setItem(data.name, JSON.stringify(data));
    }, validCredentials);

    await usernameInput.fill(name);
    await passwordInput.fill(password);
    await submitButton.click();
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toHaveText(`Hello, ${name}!`);
    await expect(backButton).toBeVisible();
  });
});
