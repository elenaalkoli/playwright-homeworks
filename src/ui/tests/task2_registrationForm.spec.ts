/* 
Создайте ОДИН смоук тест со следующими шагами:
1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
2. Заполните форму регистрации
3. Проверьте, что пользователь успешно зарегистрирован 
*/

import { test, expect } from '@playwright/test';

test.describe('[demo-registration-form][Smoke_Register form]', () => {
  const url = 'https://anatoly-karpovich.github.io/demo-registration-form/';

  interface IDateOfBirth {
    year: string;
    month: string;
    day: string;
  }

  interface ICredentials {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    country: string;
    language: string;
    skills: string;
    dateOfBirth: IDateOfBirth;
    password: string;
    confirmPassword: string;
  }

  const credentials: ICredentials = {
    firstName: 'Name',
    lastName: 'Lastname',
    address: 'Address',
    email: 'test@test.com',
    phone: '12345678910',
    country: 'USA',
    language: 'english',
    skills: 'JavaScript',
    dateOfBirth: {
      year: '1999',
      month: 'December',
      day: '10',
    },
    password: 'ValidPassword123',
    confirmPassword: 'ValidPassword123',
  };

  test('Should register with credentials', async ({ page }) => {
    const nameInput = page.locator('//input[@id="firstName"]');
    const lastNameInput = page.locator('//input[@id="lastName"]');
    const addressText = page.locator('//textarea[@id="address"]');
    const emailInput = page.locator('//input[@id="email"]');
    const phoneInput = page.locator('//input[@id="phone"]');
    const countrySelect = page.locator('//select[@id="country"]');
    const genderRadioButton = page.locator('//input[@value="male"]');
    const hobbyCheckbox = page.locator('//input[@type="checkbox"] [@value="Travelling"]');
    const languageInput = page.locator('//input[@id="language"]');
    const skillsSelect = page.locator('//option[@value="JavaScript"]');
    const yearOfBirthDropdown = page.locator('//select[@id="year"]');
    const monthOfBirthDropdown = page.locator('//select[@id="month"]');
    const dayOfBirthDropdown = page.locator('//select[@id="day"]');
    const passwordInput = page.locator('//input[@id="password"]');
    const confirmPasswordInput = page.locator('//input[@id="password-confirm"]');
    const submitButton = page.locator('//button[@type="submit"]');
    const registrationDetaislHeader = page.locator('//h2[text()="Registration Details"]');

    await page.goto(url);
    await nameInput.fill(credentials.firstName);
    await lastNameInput.fill(credentials.lastName);
    await addressText.fill(credentials.address);
    await emailInput.fill(credentials.email);
    await phoneInput.fill(credentials.phone);
    await countrySelect.selectOption(credentials.country);
    await genderRadioButton.check();
    await hobbyCheckbox.check();
    await languageInput.fill(credentials.language);
    await skillsSelect.click();
    await yearOfBirthDropdown.selectOption(credentials.dateOfBirth.year);
    await monthOfBirthDropdown.selectOption(credentials.dateOfBirth.month);
    await dayOfBirthDropdown.selectOption(credentials.dateOfBirth.day);
    await passwordInput.fill(credentials.password);
    await confirmPasswordInput.fill(credentials.confirmPassword);
    await submitButton.click();

    await expect(registrationDetaislHeader).toBeVisible();
    await expect(registrationDetaislHeader).toHaveText('Registration Details');
  });
});
