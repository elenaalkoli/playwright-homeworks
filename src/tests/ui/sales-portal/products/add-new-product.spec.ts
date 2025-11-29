import { test, expect } from 'fixtures';
import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import { HomePage } from 'ui/pages/home.page';
import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page';
import { ProductsListPage } from 'ui/pages/products/productsList.page';
import { LoginPage } from 'ui/pages/login.page';
import _ from 'lodash';
import { TAGS } from 'data/tags';

test.describe('[Sales Portal] [Products]', async () => {
  let id = '';
  let token = '';

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test.skip(
    'OLD: Add new product and check that it occupies the top position in the products list',
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ page }) => {
      const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
      const productsListPage = new ProductsListPage(page);
      const addNewProductPage = new AddNewProductPage(page);

      await loginPage.open();
      await expect(loginPage.uniqueElement).toBeVisible();
      await loginPage.login(credentials);

      await homePage.waitForOpened();
      await homePage.clickOnViewModule('Products');

      await productsListPage.waitForOpened();
      await productsListPage.clickAddNewProduct();

      await addNewProductPage.waitForOpened();
      const productData = generateProductData();
      await addNewProductPage.fillForm(productData);
      await addNewProductPage.clickSave();
      await productsListPage.waitForOpened();
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
      const productFromTable = await productsListPage.getProductData(productData.name);
      const actualProductFromTable = _.omit(productFromTable, ['createdOn']);
      const expectedProduct = _.omit(productData, ['notes', 'amount']);
      //or without lodash
      // const { createdOn, ...actualProductFromTable } = productFromTable;
      // const { notes, amount, ...expectedProduct } = productData;
      await expect(actualProductFromTable).toEqual(expectedProduct);
      await expect(productsListPage.firstRow).toContainText(productData.name);
    }
  );
  test(
    'Add new product with services',
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ addNewProductUIService, productsListPage }) => {
      // token = await loginUIService.loginAsAdmin(); - не нужно, так как логин через ui.setup
      await addNewProductUIService.open();
      const createdProduct = await addNewProductUIService.createProduct();
      id = createdProduct._id;
      token = await productsListPage.getAuthToken();
      await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
      await expect(productsListPage.tableRowByName(createdProduct.name)).toBeVisible();
    }
  );
});
