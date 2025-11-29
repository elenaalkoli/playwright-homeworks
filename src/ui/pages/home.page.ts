import { Locator } from '@playwright/test';
import { SalesPortalPage } from './salesPortal.page';
import { logStep } from 'utils/report/logStep.utils';

export type HomeModuleButton = 'Products' | 'Customers' | 'Orders';

export class HomePage extends SalesPortalPage {
  readonly welcomeText = this.page.locator('.welcome-text');
  readonly productsButton = this.page.locator('#products-from-home');
  readonly customersButton = this.page.locator('#customers-from-home');
  readonly ordersButton = this.page.locator('#orders-from-home');
  readonly orderThisYearMetric = this.page.locator('#total-orders-container p.card-text');
  readonly totalRevenueMetric = this.page.locator('#total-revenue-container p.card-text');
  readonly newCustomerMetric = this.page.locator('#total-customers-container p.card-text');
  readonly avgOrdersValue = this.page.locator('#avg-orders-value-container p.card-text');
  readonly canceledOrdersMetric = this.page.locator('#canceled-orders-container p.card-text');
  readonly uniqueElement = this.welcomeText;

  @logStep('Click View Module Button on Home page')
  async clickOnViewModule(module: HomeModuleButton) {
    const moduleButtons: Record<HomeModuleButton, Locator> = {
      Products: this.productsButton,
      Customers: this.customersButton,
      Orders: this.ordersButton,
    };

    await moduleButtons[module].click();
  }
}
