import { Modal } from '../modal.page';
import { expect, Locator } from '@playwright/test';

export class DeleteModal extends Modal {
  readonly modal = this.page.locator('.modal-content');
  readonly uniqueElement = this.modal.locator('.modal-title');
  readonly closeButton = this.modal.locator('button.btn-close.hover-danger');
  readonly modalMessage = this.modal.locator('p');
  readonly deleteButton = this.modal.locator('button[type="submit"].btn-danger');
  readonly cancelButton = this.modal.locator('button.btn-secondary');

  async clickDelete() {
    await this.deleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}
