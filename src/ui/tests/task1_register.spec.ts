/*  
Разработайте смоук тест-сьют с тестами на REGISTER на странице 
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

test.describe('[demo-login-form][Smoke_Registration form]', () => {
  const url = 'https://anatoly-karpovich.github.io/demo-login-form/';

  interface ICredentials {
    username: string;
    password: string;
  }

  const validCredentials: ICredentials = {
    username: 'ValidUser',
    password: 'ValidPass123',
  };

  const validBoundaryCredentials: [ICredentials, ICredentials] = [
    //tuple of 2 {}
    {
      username: 'val', //3 symbols minimum
      password: 'Validpas', // 8 symbols minimum, contains upper and lower
    },
    {
      username: 'V'.repeat(40), //40 symbols maximum
      password: 'V' + 'a'.repeat(19), //20 symbols maximum, contains upper and lower
    },
  ];

  const [minBoundaryCredentials, maxBoundaryCredentials] = validBoundaryCredentials;

  test('Should register with valid credentials', async ({ page }) => {
    const registerButtonLoginForm = page.locator('//input[@id="registerOnLogin"]');
    const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
    const registerButtonRegistrationForm = page.locator('//input[@id="register"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');

    await page.goto(url);
    await registerButtonLoginForm.click();
    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButtonRegistrationForm.click();
    await expect(successMessage).toHaveText(
      'Successfully registered! Please, click Back to return on login page'
    );
  });

  test('Should register with minimum boundary username/password', async ({ page }) => {
    const registerButtonLoginForm = page.locator('//input[@id="registerOnLogin"]');
    const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
    const registerButtonRegistrationForm = page.locator('//input[@id="register"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');

    await page.goto(url);
    await registerButtonLoginForm.click();
    await usernameInput.fill(minBoundaryCredentials!.username);
    await passwordInput.fill(minBoundaryCredentials!.password);
    await registerButtonRegistrationForm.click();
    await expect(successMessage).toHaveText(
      'Successfully registered! Please, click Back to return on login page'
    );
  });

  test('Should register with maximum boundary username/password', async ({ page }) => {
    const registerButtonLoginForm = page.locator('//input[@id="registerOnLogin"]');
    const usernameInput = page.locator('//input[@id="userNameOnRegister"]');
    const passwordInput = page.locator('//input[@id="passwordOnRegister"]');
    const registerButtonRegistrationForm = page.locator('//input[@id="register"]');
    const successMessage = page.locator('//h4[@id="errorMessageOnRegister"]');

    await page.goto(url);
    await registerButtonLoginForm.click();
    await usernameInput.fill(maxBoundaryCredentials.username);
    await passwordInput.fill(maxBoundaryCredentials.password);
    await registerButtonRegistrationForm.click();
    await expect(successMessage).toHaveText(
      'Successfully registered! Please, click Back to return on login page'
    );
  });
});
