import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../ui/pages/login.page';
import { HomePage } from '../ui/pages/home.page';
import { ProductsListPage } from '../ui/pages/products/productsList.page';
import { AddNewProductPage } from '../ui/pages/products/addNewProduct.page';
import { EditProductPage } from '../ui/pages/products/editProduct.page';
import { HomeUIService } from 'ui/services/home.ui-service';
import { AddNewProductUIService } from 'ui/services/addNewProduct.ui-service';
import { LoginUIService } from 'ui/services/login.ui-service';
import { ProductsListUIService } from 'ui/services/productsList.ui-service';

export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
}

export const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  editProductPage: async ({ page }, use) => {
    await use(new EditProductPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
});

export { expect };
