import { IProductDetails } from 'data/types/product.types';
import { MANUFACTURERS } from 'data/sales-portal/products/manufacturers';
import { Modal } from '../modal.page';
import { logStep } from 'utils/report/logStep.utils';
export class ProductDetailsModal extends Modal {
  readonly uniqueElement = this.page.locator('#details-modal-container');
  readonly title = this.uniqueElement.locator('h5');
  readonly closeButton = this.uniqueElement.locator('button.btn-close');
  readonly editButton = this.uniqueElement.locator('button.btn-primary');
  readonly cancelButton = this.uniqueElement.locator('button.btn-secondary');
  readonly productValue = this.uniqueElement.locator('#details-modal-body-container p');

  @logStep("Click Cancel button on Product's Details Modal")
  async clickCancel() {
    await this.cancelButton.click();
  }

  @logStep("Click Edit Product button on Product's Details Modal")
  async clickEdit() {
    await this.editButton.click();
  }

  @logStep('Click Close button on Product Details Modal')
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep('Get product data from Details Modal')
  async getData(): Promise<IProductDetails> {
    await this.waitForOpened(); //ждем открытия модалки
    const [name, amount, price, manufacturer, createdOn, notes] =
      await this.productValue.allInnerTexts();

    return {
      name: name!,
      amount: +amount!,
      price: +price!,
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
      notes: notes === '-' ? '' : notes!,
    };
  }
}
