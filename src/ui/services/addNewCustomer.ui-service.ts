import { expect, Page } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import { generateCustomerData } from 'data/sales-portal/customers/generateCustomerData';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { ICustomer, ICustomerResponse } from 'data/types/customers.types';
import { AddNewCustomerPage } from 'ui/pages/customers/addNewCustomer.page';
import { CustomersListPage } from 'ui/pages/customers/customersList.page';
import _ from 'lodash';

export class AddNewCustomerUIService {
  customerListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customerListPage = new CustomersListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async createCustomer(customerData?: Partial<ICustomer>) {
    const data = generateCustomerData(customerData);
    await this.addNewCustomerPage.fillForm(data);
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
      apiConfig.endpoints.customers,
      this.addNewCustomerPage.clickSaveNewCustomer.bind(this.addNewCustomerPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer, '_id', 'createdOn')).toEqual(data);

    await this.customerListPage.waitForOpened();
    return response.body.Customer;
  }
}
