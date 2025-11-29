import { test, expect } from 'fixtures/pages.fixtures';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import _ from 'lodash';
import { credentials } from 'config/env';

test.describe('[Sales Portal] [Products]', () => {
  //test with fixtures version 1
  test('Product Details', async ({ loginPage, homePage, productsListPage, addNewProductPage }) => {
    //login page
    // const emailInput = page.locator("#emailinput");
    // const passwordInput = page.locator("#passwordinput");
    // const loginButton = page.locator("button[type='submit']");
    // await homePage.open();
    // await expect(emailInput).toBeVisible();
    // await emailInput.fill(credentials.username);
    // await passwordInput.fill(credentials.password);
    // await loginButton.click();
    // await homePage.waitForOpened();
    await loginPage.open();
    await expect(loginPage.uniqueElement).toBeVisible();
    await loginPage.login(credentials);
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
  });

  //test with fixtures version 2
  // test("Product Details", async ({ page, pages }) => {
  //   const { homePage, productsListPage, addNewProductPage } = pages;
  //   //login page
  //   const emailInput = page.locator("#emailinput");
  //   const passwordInput = page.locator("#passwordinput");
  //   const loginButton = page.locator("button[type='submit']");
  //   await homePage.open();
  //   await expect(emailInput).toBeVisible();
  //   await emailInput.fill(credentials.username);
  //   await passwordInput.fill(credentials.password);
  //   await loginButton.click();
  //   await homePage.waitForOpened();
  //   await homePage.clickOnViewModule("Products");
  //   await productsListPage.waitForOpened();
  //   await productsListPage.clickAddNewProduct();
  //   await addNewProductPage.waitForOpened();
  //   const productData = generateProductData();
  //   await addNewProductPage.fillForm(productData);
  //   await addNewProductPage.clickSave();
  //   await productsListPage.waitForOpened();
  //   await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
  //   await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  //   await productsListPage.detailsButton(productData.name).click();
  //   const { detailsModal } = productsListPage;
  //   await detailsModal.waitForOpened();
  //   const actual = await detailsModal.getData();
  //   expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  // });
});
