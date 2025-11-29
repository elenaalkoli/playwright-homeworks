import { expect, Page } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { IProduct } from 'data/types/product.types';
import { IProductResponse } from 'api/apiClients/typesApi';
import _ from 'lodash';
import { AddNewProductPage, ProductsListPage } from 'ui/pages/products/';
import { logStep } from 'utils/report/logStep.utils';
export class AddNewProductUIService {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;

  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  @logStep('Open Add Product Page')
  async open() {
    await this.addNewProductPage.open('/#/products/add');
    //или через кнопку для симуляции действий пользователя
    // await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  @logStep('Create product via UI')
  async createProduct(productData?: Partial<IProduct>) {
    const data = generateProductData(productData);
    await this.addNewProductPage.fillForm(data);
    const response = await this.addNewProductPage.interceptResponse<IProductResponse, any>(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, '_id', 'createdOn')).toEqual(data);
    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }
}
