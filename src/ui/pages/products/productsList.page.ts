import { IProductInTable } from 'data/types/product.types';
import { SalesPortalPage } from '../salesPortal.page';
import { MANUFACTURERS } from 'data/sales-portal/products/manufacturers';
import { DeleteModal } from './deleteModal.page';

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator('h2.fw-bold');
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly uniqueElement = this.productsPageTitle;
  readonly tableRows = this.page.locator('table tbody tr');
  readonly firstRow = this.tableRows.first();
  readonly tableRowByName = (productName: string) =>
    this.page.locator('table tbody tr', { has: this.page.locator('td', { hasText: productName }) });
  readonly detailsButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle('Details');
  readonly editButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle('Edit');
  readonly deleteButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle('Delete');

  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  async getProductData(productName: string): Promise<IProductInTable> {
    //Variant 1
    // return {
    //   name: await this.nameCell(productName).innerText(),
    //   price: +(await this.priceCell(productName).innerText()).replace("$", ""),
    //   manufacturer: (await this.manufacturerCell(productName).innerText()) as MANUFACTURERS,
    //   createdOn: await this.createdOnCell(productName).innerText(),
    // };

    //variant 2
    // const [name, price, manufacturer, createdOn] = await Promise.all([
    //   this.nameCell(productName).textContent(),
    //   this.priceCell(productName).textContent(),
    //   this.manufacturerCell(productName).textContent(),
    //   this.createdOnCell(productName).textContent(),
    // ]);
    // return {
    //   name: name!,
    //   price: +price!.replace("$", ""),
    //   manufacturer: manufacturer! as MANUFACTURERS,
    //   createdOn: createdOn!,
    // };

    //variant 3
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(productName)
      .locator('td')
      .allInnerTexts();
    return {
      name: name!,
      price: +price!.replace('$', ''),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    };
  }

  async clickDeleteButton(productName: string) {
    await this.deleteButton(productName).click();
  }

  async openDeleteModal(productName: string) {
    await this.deleteButton(productName).click();
    return new DeleteModal(this.page);
  }
}
