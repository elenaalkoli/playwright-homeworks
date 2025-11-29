import { IProduct } from 'data/types/product.types';
import { SalesPortalPage } from '../salesPortal.page';
import { expect } from 'fixtures';
import { logStep } from 'utils/report/logStep.utils';
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

  @logStep('Fill Edit Product Form with new data')
  async fillFormWithNewData(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer)
      await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price) await this.priceInput.fill(productData.price.toString());
    if (productData.amount) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes) await this.notesInput.fill(productData.notes);
  }

  @logStep('Click Save Changes button on Edit Product form')
  async clickSaveChanges() {
    await expect(this.saveChangesButton).toBeEnabled({ timeout: 5000 });
    await this.saveChangesButton.click();
  }

  @logStep('Click Delete Product button on Edit Product form')
  async clickDeleteProduct() {
    await this.deleteProductButton.click();
  }
}
