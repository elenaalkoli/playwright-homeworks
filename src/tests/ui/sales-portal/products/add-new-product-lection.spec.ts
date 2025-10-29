import test, { expect } from '@playwright/test';
import { credentials } from 'config/env';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
// import { MANUFACTURERS } from "data/salesPortal/products/manufacturers";
// import { IProduct } from "data/types/product.types";
import { HomePage } from 'ui/pages/home.page';
import { AddNewProductPage } from 'ui/pages/products/addNewProduct.page';
import { ProductsListPage } from 'ui/pages/products/productsList.page';
import { LoginPage } from 'ui/pages/login.page';

test.describe('[Sales Portal] [Products]', async () => {
  test('Add new product', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProductPage = new AddNewProductPage(page);

    await loginPage.open();
    await loginPage.waitForOpened();
    await loginPage.login(credentials.username, credentials.password);

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
  });
});

//locators !
//waiterForPage !
//product data generator
//teardown
