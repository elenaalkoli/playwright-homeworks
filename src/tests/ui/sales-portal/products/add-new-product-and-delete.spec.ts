import { test, expect } from 'fixtures/pages.fixtures';
import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import _ from 'lodash';

test.describe('[Sales Portal] [Products]', async () => {
  test('Add a new product and then remove it from the products list', async ({
    loginPage,
    homePage,
    productsListPage,
    addNewProductPage,
  }) => {
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
  });
});

//locators
//waiterForPage !
//product data generator
//teardown
