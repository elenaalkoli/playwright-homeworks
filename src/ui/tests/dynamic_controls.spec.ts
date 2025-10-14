/*
Разработать тест со следующими шагами:
  - открыть https://the-internet.herokuapp.com/
  - перейти на страницу Dynamic Controls
  - Дождаться появления кнопки Remove
  - Завалидировать текста в заголовке страницы
  - Чекнуть чекбокс
  - Кликнуть по кнопке Remove
  - Дождаться исчезновения чекбокса
  - Проверить наличие кнопки Add
  - Завалидировать текст It's gone!
  - Кликнуть на кнопку Add
  - Дождаться появления чекбокса
  - Завалидировать текст It's back!
*/

import { test, expect } from '@playwright/test';

test.describe('[https://the-internet.herokuapp.com] [Dynamic Controls]', () => {
  test('Dynamic Controls validation', async ({ page }) => {
    const url = 'https://the-internet.herokuapp.com/';
    const dynamicControlsLinkPage = page.getByRole('link', { name: 'Dynamic Controls' });
    const removeButton = page.getByRole('button', { name: 'Remove' });
    const heading = page.getByRole('heading', { name: 'Dynamic Controls' });
    const headingText = page.locator('div.example > h4');
    const headingPText = page.locator('div.example > p');
    const checkbox = page.locator('//form[@id="checkbox-example"]//input[@type="checkbox"]');
    const addButton = page.getByRole('button', { name: 'Add' });
    const loading = page.locator('(//*[@id="loading"])[1]');
    const message = page.locator('//*[@id="message"]');

    await page.goto(url);
    await dynamicControlsLinkPage.click();
    await expect(removeButton).toBeVisible();
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Dynamic Controls');
    await expect(headingPText).toHaveText(
      'This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.'
    );
    await expect(checkbox).toBeVisible();
    //Remove
    await removeButton.click();
    await expect(loading).toBeVisible();
    await expect(loading).toBeHidden();
    await expect(checkbox).toBeHidden();
    await expect(addButton).toBeVisible();
    await expect(message).toHaveText(/It's gone!/);
    //Add
    await addButton.click();
    await expect(loading).toBeVisible();
    await expect(loading).toBeHidden();
    await expect(checkbox).toBeVisible({ timeout: 10000 });
    await expect(message).toHaveText(/It's back!/);
  });
});
