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

async function getTableRow(page: unknown, email: string) {}

test('Get table rows by email', async ({ page }) => {
  const url = 'https://the-internet.herokuapp.com/tables';

  await page.goto(url);
});
