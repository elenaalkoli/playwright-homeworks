import { IProductInTable, ProductsTableHeader } from 'data/types/product.types';
import { SalesPortalPage } from '../salesPortal.page';
import { MANUFACTURERS } from 'data/sales-portal/products/manufacturers';
import { DeleteModal } from './deleteModal.page';
import { ProductDetailsModal } from './detailsModal.page';
import { logStep } from 'utils/report/logStep.utils';
export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailsModal(this.page);
  readonly deleteModal = new DeleteModal(this.page);

  readonly productsPageTitle = this.page.locator('h2.fw-bold');
  readonly addNewProductButton = this.page.locator('[name="add-button"]');
  readonly uniqueElement = this.productsPageTitle;
  readonly tableRows = this.page.locator('table tbody tr');
  readonly firstRow = this.tableRows.first();
  readonly searchInput = this.page.locator('#search');
  readonly searchButton = this.page.locator('#search-products');
  readonly tableRowByName = (productName: string) =>
    this.page.locator('table tbody tr', { has: this.page.locator('td', { hasText: productName }) });
  readonly detailsButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle('Details');
  readonly editButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle('Edit');
  readonly deleteButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle('Delete');
  readonly nameCell = (productName: string) =>
    this.tableRowByName(productName).locator('td').nth(0);
  readonly priceCell = (productName: string) =>
    this.tableRowByName(productName).locator('td').nth(1);
  readonly manufacturerCell = (productName: string) =>
    this.tableRowByName(productName).locator('td').nth(2);
  readonly createdOnCell = (productName: string) =>
    this.tableRowByName(productName).locator('td').nth(3);
  readonly tableHeader = this.page.locator('thead th div[current]');
  // readonly nameHeader = this.tableHeader.nth(0);
  readonly tableHeaderNamed = (name: ProductsTableHeader) =>
    this.tableHeader.filter({ hasText: name });
  readonly tableHeaderArrow = (
    name: ProductsTableHeader,
    { direction }: { direction: 'asc' | 'desc' }
  ) =>
    this.page
      .locator('thead th', { has: this.page.locator('div[current]', { hasText: name }) })
      .locator(`i.${direction === 'asc' ? 'bi-arrow-down' : 'bi-arrow-up'}`);

  @logStep('Click Add New Product button')
  async clickAddNewProduct() {
    await this.addNewProductButton.click();
  }

  @logStep('Get row data from the Products List by product name')
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

  @logStep('Get all product data from Products List')
  async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[] = [];
    const rows = await this.tableRows.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row.locator('td').allInnerTexts();
      data.push({
        name: name!,
        price: +price!.replace('$', ''),
        manufacturer: manufacturer! as MANUFACTURERS,
        createdOn: createdOn!,
      });
    }
    return data;
  }

  @logStep('Click Delete button on Products List page')
  async clickDeleteButton(productName: string) {
    await this.deleteButton(productName).click();
  }

  @logStep('Open Delete Modal on Products List page')
  async openDeleteModal(productName: string) {
    await this.deleteButton(productName).click();
    return new DeleteModal(this.page);
  }

  @logStep('Click Action Button on Products List page')
  async clickAction(productName: string, button: 'edit' | 'delete' | 'details') {
    if (button === 'edit') await this.editButton(productName).click();
    if (button === 'delete') await this.deleteButton(productName).click();
    if (button === 'details') await this.detailsButton(productName).click();
  }

  @logStep('Click Table Header on Products List page')
  async clickTableHeader(name: ProductsTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  @logStep('Fill Search Input on Product List page')
  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  @logStep('Click Search Button on Product List page')
  async clickSearch() {
    await this.searchButton.click();
  }
}
