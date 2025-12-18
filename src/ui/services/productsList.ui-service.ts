import { expect, Page } from '@playwright/test';
import { IProduct, IProductDetails, IProductInTable } from 'data/types/product.types';
import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page';
import { EditProductPage } from 'ui/pages/products/editProduct.page';
import { ProductsListPage } from 'ui/pages/products/productsList.page';
import { convertToFullDateAndTime } from 'utils/date.utils';
import _ from 'lodash';
import { logStep } from 'utils/report/logStep.utils';
export class ProductsListUIService {
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;

  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
    this.editProductPage = new EditProductPage(page);
  }

  // Navigation
  @logStep('Open Add New Product Page via URL')
  async open() {
    await this.productsListPage.open('/#/products');
    await this.productsListPage.waitForOpened();
  }

  @logStep('Open Add New Product Page via UI')
  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
    return this.addNewProductPage;
  }

  @logStep('Open Details Modal by product name')
  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  @logStep('Open Edit Modal by product name')
  async openEditModal(productName: string) {
    await this.productsListPage.editButton(productName).click();
    await this.editProductPage.waitForOpened();
    return this.editProductPage;
  }
  @logStep('Open Delete Modal by product name')
  async openDeleteModal(productName: string) {
    await this.productsListPage.clickAction(productName, 'delete');
    await this.productsListPage.deleteModal.waitForOpened();
  }
  @logStep('Delete product from Products List')
  async deleteProduct(productName: string) {
    await this.openDeleteModal(productName);
    await this.productsListPage.deleteModal.clickDelete();
    await this.productsListPage.deleteModal.waitForClose();
  }
  @logStep('Search on Product List Page')
  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  // Assertions
  // Проверяем, что строка продукта отображается в таблице (видимость)
  @logStep('Assert product row visibility in table')
  async assertProductVisibleInTable(productName: string, visible = true) {
    const row = this.productsListPage.tableRowByName(productName);
    if (visible) {
      await expect(row).toBeVisible();
    } else {
      await expect(row).not.toBeVisible();
    }
  }

  // Проверяем детали продукта в модалке Details (полная сверка UI-модалки с объектом из UI)
  @logStep('Assert Details Modal data matches API product response')
  async assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(actual).toEqual({
      ..._.omit(expected, ['_id']),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  // Проверка данных таблицы (actual) в соотв. со сгенерированными для создания продукта (expected)
  @logStep('Assert table row matches generated product data')
  async assertTableProductDataToGenerated(actual: IProductInTable, expected: IProduct) {
    expect(_.omit(actual, ['createdOn'])).toEqual(
      _.pick(expected, ['name', 'price', 'manufacturer'])
    );
  }

  // Проверяем детали продукта в модалке Details(сравнение UI с тем, что сгенерировали, игнорируя createdOn)
  @logStep('Assert Details Modal matches generated product data')
  async assertDetailsDataToGenerated(actual: IProductDetails, expected: IProduct) {
    expect(_.omit(actual, ['createdOn'])).toEqual(expected);
  }

  // Полная проверка продукта: видимость + данные в таблице
  @logStep('Assert full product data in table matches generated product')
  async assertProductMatches(productName: string, expected: IProduct) {
    await this.assertProductVisibleInTable(productName);
    const actual = await this.productsListPage.getProductData(productName);
    this.assertTableProductDataToGenerated(actual, expected);
  }
}
