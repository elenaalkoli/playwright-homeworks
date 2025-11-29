import { Modal } from '../modal.page';
import { expect, Locator } from '@playwright/test';
import { logStep } from 'utils/report/logStep.utils';
export class DeleteModal extends Modal {
  readonly modal = this.page.locator('.modal-content');
  readonly uniqueElement = this.modal.locator('.modal-title');
  readonly closeButton = this.modal.locator('button.btn-close.hover-danger');
  readonly modalMessage = this.modal.locator('p');
  readonly deleteButton = this.modal.locator('button[type="submit"].btn-danger');
  readonly cancelButton = this.modal.locator('button.btn-secondary');

  @logStep('Click Close button on Delete Modal')
  async clickDelete() {
    await this.deleteButton.click();
  }

  @logStep('Click Delete button on Delete Modal')
  async clickCancel() {
    await this.cancelButton.click();
  }

  @logStep('Click Cancel button on Delete Modal')
  async clickClose() {
    await this.closeButton.click();
  }
}
