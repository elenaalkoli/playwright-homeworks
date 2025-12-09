import { expect, Page } from '@playwright/test';
import { ICustomer, ICustomerInTable } from 'data/types/customers.types';
import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page';
import { CustomersListPage } from 'ui/pages/customers/customersList.page';
import _ from 'lodash';
import { logStep } from 'utils/report/logStep.utils';
export class CustomersListUIService {
  customerListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customerListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  // Navigation
  @logStep('Open Add New Customer Page')
  async openAddNewCustomerPage() {
    this.customerListPage.clickAddCustomerButton();
    this.addNewCustomerPage.waitForOpened();
  }

  @logStep('Open Customers List Page')
  async open() {
    await this.customerListPage.open('/#/customers');
    await this.customerListPage.waitForOpened();
  }

  // Assertions:
  // Проверяем, что строка кастомера отображается в таблице (видимость)
  @logStep('Assert customer row visibility in table')
  async assertCustomerInTable(customersEmail: string, { visible }: { visible: boolean }) {
    await expect(this.customerListPage.tableRowByEmail(customersEmail)).toBeVisible({ visible });
  }

  // Проверка данных таблицы (actual) в соотв. со сгенерированными для создания кастомера (expected)
  @logStep('Assert customer table data matches generated data')
  async assertCustomerInTableToGenerated(actual: ICustomerInTable, expected: ICustomer) {
    expect(_.omit(actual, 'createdOn')).toEqual(_.pick(expected, ['email', 'name', 'country']));
  }

  // Полная проверка кастомера: видимость + данные в таблице
  @logStep('Assert customer row visibility in table and data matches generated data')
  async assertCustomerMatches(customersEmail: string, expected: ICustomer) {
    await this.assertCustomerInTable(customersEmail, { visible: true });
    const actual = await this.customerListPage.getCustomerData(customersEmail);
    this.assertCustomerInTableToGenerated(actual, expected);
  }
}
