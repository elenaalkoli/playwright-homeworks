/* 
//Task 1
Создать тест-сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
https://anatoly-karpovich.github.io/demo-login-form/
  Требования:
    Страница регистрации:
      Username: обязательное, от 3 до 40 символов включительно, 
      запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
      Password: обязательное, от 8 до 20 символов включительно, 
      необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
    Страница логина:
      Username: обязательное
      Password: обязательное
*/
import { test, expect } from '@playwright/test';
import { invalidCredentials } from './login_form_negative.data.js';

test.describe('[demo-login-form][login with invalid credentials]', () => {
  const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.evaluate(() => localStorage.clear());
  });

  for (const credential of invalidCredentials) {
    test(`Should not register with invalid credentials: username - ${credential.username} 
        and password - ${credential.password} `, async ({ page }) => {
      const registerButtonLoginForm = page.locator('//input[@id="registerOnLogin"]');
      const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
      const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
      const registerButtonRegistrationForm = page.locator('//input[@id="register"]');
      const errorMessage = page.locator('//h4[@id="errorMessageOnRegister"]');

      await page.goto(url);
      await registerButtonLoginForm.click();
      await usernameInput.fill(credential.username);
      await passwordInput.fill(credential.password);
      await registerButtonRegistrationForm.click();
      await expect(errorMessage).toHaveText(credential.expectedError);
    });
  }
});
