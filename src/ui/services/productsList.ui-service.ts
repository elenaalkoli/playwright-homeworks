import { expect, Page } from '@playwright/test';
import { IProduct, IProductDetails, IProductInTable } from 'data/types/product.types';
import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page';
import { EditProductPage } from 'ui/pages/products/editProduct.page';
import { ProductsListPage } from 'ui/pages/products/productsList.page';
import { convertToFullDateAndTime } from 'utils/date.utils';
import _ from 'lodash';

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
  async open() {
    await this.productsListPage.open('/#/products');
    await this.productsListPage.waitForOpened();
  }

  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
    return this.addNewProductPage;
  }

  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  async openEditModal(productName: string) {
    await this.productsListPage.editButton(productName).click();
    await this.editProductPage.waitForOpened();
    return this.editProductPage;
  }

  async openDeleteModal(productName: string) {
    await this.productsListPage.clickAction(productName, 'delete');
    await this.productsListPage.deleteModal.waitForOpened();
  }

  async deleteProduct(productName: string) {
    await this.openDeleteModal(productName);
    await this.productsListPage.deleteModal.clickDelete();
    await this.productsListPage.deleteModal.waitForClose();
  }

  async search(text: string) {
    await this.productsListPage.fillSearchInput(text);
    await this.productsListPage.clickSearch();
    await this.productsListPage.waitForOpened();
  }

  // Assertions
  // Проверяем, что строка продукта отображается в таблице (видимость)
  async assertProductVisibleInTable(productName: string, visible = true) {
    const row = this.productsListPage.tableRowByName(productName);
    if (visible) {
      await expect(row).toBeVisible();
    } else {
      await expect(row).not.toBeVisible();
    }
  }

  // Проверяем детали продукта в модалке Details (полная сверка UI-модалки с объектом из UI)
  assertDetailsData(actual: IProductDetails, expected: IProductDetails) {
    expect(_.omit(actual, ['_id'])).toEqual({
      ..._.omit(expected, ['createdOn']),
      createdOn: convertToFullDateAndTime(expected.createdOn),
    });
  }

  // Проверка данных таблицы (actual) в соотв. со сгенерированными для создания продукта (expected)
  assertTableProductDataToGenerated(actual: IProductInTable, expected: IProduct) {
    expect(_.omit(actual, ['createdOn'])).toEqual(_.omit(expected, ['amount', 'notes']));
  }

  // Проверяем детали продукта в модалке Details(сравнение UI с тем, что сгенерировали, игнорируя createdOn)
  assertDetailsDataToGenerated(actual: IProductDetails, expected: IProduct) {
    expect(_.omit(actual, ['createdOn'])).toEqual(expected);
  }

  // Полная проверка продукта: видимость + данные в таблице
  async assertProductMatches(productName: string, expected: IProduct) {
    await this.assertProductVisibleInTable(productName);
    const actual = await this.productsListPage.getProductData(productName);
    this.assertTableProductDataToGenerated(actual, expected);
  }
}
