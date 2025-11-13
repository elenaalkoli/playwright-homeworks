/* 
//Task 2

Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
Например:

getTableRow(page, 'jsmith@gmail.com') => {
  "Last Name": "Smith",
  "First Name": "John",
  "Email": "jsmith@gmail.com",
  "Due": "$50.00",
  "Web Site": "http://www.jsmith.com"
}

Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2.
Сайт: https://the-internet.herokuapp.com/tables
*/

import { test, expect } from '@playwright/test';
import { getTableRow } from './sandbox_sortable-table.function';

test('Check getTableRow function', async ({ page }) => {
  const urlSandbox = 'https://anatoly-karpovich.github.io/test-automation-sandbox/';
  const sortableTableLink = page.getByRole('link', { name: 'Sortable Table' });
  const table = page.locator('table.MuiTable-root');

  const emails = [
    'john.doe@example.com',
    'sarah.smith@example.com',
    'alex.johnson@example.com',
    'linda.williams@example.com',
    'michael.brown@example.com',
  ];

  await page.goto(urlSandbox);
  await Promise.all([sortableTableLink.click(), table.waitFor({ state: 'visible' })]);

  for (const email of emails) {
    const row = await getTableRow(page, email);
    console.log(`Row for ${email}:`, row);
    expect(row).toBeDefined();
    expect(row?.Email).toBe(email);
  }
});
