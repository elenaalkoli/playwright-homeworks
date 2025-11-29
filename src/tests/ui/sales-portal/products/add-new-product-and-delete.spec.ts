import { test, expect } from 'fixtures/business.fixture';
import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import _ from 'lodash';
import { TAGS } from 'data/tags';
import { STATUS_CODES } from 'data/types/statusCodes.types';

test.describe('[Sales Portal] [Products]', async () => {
  test.skip(
    'OLD: Add new product and then remove it from the products list',
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {
      //login
      await loginPage.open();
      await expect(loginPage.uniqueElement).toBeVisible();
      await loginPage.login(credentials);

      //open products
      await homePage.waitForOpened();
      await homePage.clickOnViewModule('Products');

      //products list - add new product
      await productsListPage.waitForOpened();
      await productsListPage.clickAddNewProduct();
      await addNewProductPage.waitForOpened();
      const productData = generateProductData();
      await addNewProductPage.fillForm(productData);
      await addNewProductPage.clickSave();

      //asserts add product
      await productsListPage.waitForOpened();
      await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_CREATED);
      await productsListPage.closeNotification();
      await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();

      //delete product
      const modalDelete = await productsListPage.openDeleteModal(productData.name);
      await modalDelete.waitForOpened();
      await modalDelete.clickDelete();
      await modalDelete.waitForClose();
      await productsListPage.waitForOpened();

      //asserts delete product
      await expect(productsListPage.toastMessage).toHaveText(NOTIFICATIONS.PRODUCT_DELETED);
      await productsListPage.closeNotification();
      await expect(productsListPage.tableRowByName(productData.name)).not.toBeVisible();
    }
  );
  test(
    'Add new product and then remove it with services',
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ productsListUIService, productsApiService, productsListPage, productsApi }) => {
      const token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.createProduct(token);
      await productsListUIService.open();
      await productsListUIService.deleteProduct(createdProduct.name);
      const deleted = await productsApi.getById(createdProduct._id, token);
      expect(deleted.status).toBe(STATUS_CODES.NOT_FOUND);
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).not.toBeVisible();
    }
  );
});
