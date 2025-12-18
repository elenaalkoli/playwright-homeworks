import { IProduct } from 'data/types/product.types';
import { SalesPortalPage } from '../salesPortal.page';
import { expect } from 'fixtures';

export class EditProductPage extends SalesPortalPage {
  readonly title = this.page.locator('h2.page-title-text');
  readonly nameInput = this.page.locator('#inputName');
  readonly priceInput = this.page.locator('#inputPrice');
  readonly notesInput = this.page.locator('#textareaNotes');
  readonly manufacturerSelect = this.page.locator('#inputManufacturer');
  readonly amountInput = this.page.locator('#inputAmount');
  readonly saveChangesButton = this.page.locator('#save-product-changes');
  readonly deleteProductButton = this.page.locator('#delete-product-btn');
  readonly uniqueElement = this.title;

  async fillFormWithNewData(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer)
      await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  async clickSaveChanges() {
    await expect(this.saveChangesButton).toBeEnabled({ timeout: 5000 });
    await this.saveChangesButton.click();
  }

  async clickDeleteProduct() {
    await this.deleteProductButton.click();
  }
}
