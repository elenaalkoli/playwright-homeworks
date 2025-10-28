export type TableRow = Record<string, string>;
import { type Page } from '@playwright/test';

export async function getTableRow(page: Page, email: string): Promise<TableRow | undefined> {
  const table = page.locator('table.MuiTable-root');
  const headers = await table.locator('thead tr th').allInnerTexts();
  const rows = await table.locator('tbody tr').all();

  for (const row of rows) {
    const cells = await row.locator('td').allInnerTexts();
    const rowInObject: TableRow = {};
    headers.forEach((header, index) => {
      rowInObject[header] = cells[index] ?? '';
    });
    if (rowInObject['Email'] === email) {
      console.log(rowInObject);
      return rowInObject;
    }
  }
  return undefined;
}
