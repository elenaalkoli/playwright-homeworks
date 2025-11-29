import { Page } from '@playwright/test';
import { ProductsListPage } from 'ui/pages/products/productsList.page';
import { HomeModuleButton, HomePage } from 'ui/pages/home.page';
import { logStep } from 'utils/report/logStep.utils';
export class HomeUIService {
  homePage: HomePage;
  productsListPage: ProductsListPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  @logStep('Open Home Page')
  async open() {
    await this.homePage.open('/#/home');
    await this.homePage.waitForOpened();
  }

  @logStep('Open Modul on Home Page')
  async openModule(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModule(moduleName);

    if (moduleName === 'Products') {
      await this.productsListPage.waitForOpened();
    }

    if (moduleName === 'Customers') {
      await this.productsListPage.waitForOpened();
    }
  }
}
