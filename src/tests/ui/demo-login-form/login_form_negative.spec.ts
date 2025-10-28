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
import { invalidCredentials } from './login_form_negative.data';

test.describe('[demo-login-form][registration with invalid credentials]', () => {
  const url = 'https://anatoly-karpovich.github.io/demo-login-form/';
  test.beforeEach(async ({ page }) => {
    await page.goto(url);
    await page.evaluate(() => localStorage.clear());
  });

  for (const { title, username, password, expectedError } of invalidCredentials) {
    test(title, async ({ page }) => {
      const registerButtonLoginForm = page.locator('#registerOnLogin');
      const usernameInput = page.locator('#userNameOnRegister');
      const passwordInput = page.locator('#passwordOnRegister');
      const registerButtonRegistrationForm = page.locator('#register');
      const errorMessage = page.locator('#errorMessageOnRegister');

      await registerButtonLoginForm.click();
      await usernameInput.fill(username);
      await passwordInput.fill(password);
      await registerButtonRegistrationForm.click();
      await expect(errorMessage).toHaveText(expectedError);
    });
  }
});
