import { test, expect } from 'fixtures/business.fixture';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import _ from 'lodash';
import { TAGS } from 'data/tags';

test.describe('[Sales Portal] [Products]', () => {
  let id = '';
  let token = '';

  // OLD: Product Details (skipped)
  test.skip(
    'OLD: Product Details',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ loginAsAdmin, homePage, productsListPage, addNewProductPage }) => {
      await loginAsAdmin();
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
      await productsListPage.detailsButton(productData.name).click();
      const { detailsModal } = productsListPage;
      await detailsModal.waitForOpened();
      const actual = await detailsModal.getData();
      expect(_.omit(actual, ['createdOn'])).toEqual(productData);
    }
  );
  // Product Details with services
  test(
    'Product Details with services',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ productsListUIService, productsApiService, productsListPage }) => {
      token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.createProduct(token);
      console.log('Created product:', createdProduct);
      id = createdProduct._id;
      await productsListUIService.open();
      await productsListUIService.openDetailsModal(createdProduct.name);
      const actual = await productsListPage.detailsModal.getData();
      await productsListUIService.assertDetailsData(actual, createdProduct);
    }
  );

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });
});
