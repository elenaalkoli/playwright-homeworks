import { SalesPortalPage } from '../salesPortal.page';
import { expect } from '@playwright/test';

export class DeleteModal extends SalesPortalPage {
  readonly modal = this.page.locator('.modal-content');
  readonly uniqueElement = this.modal.locator('.modal-title');
  readonly closeButton = this.modal.locator('button.btn-close.hover-danger');
  readonly modalMessage = this.modal.locator('p');
  readonly deleteButton = this.modal.locator('button[type="submit"].btn-danger');
  readonly cancelButton = this.modal.locator('button.btn-secondary');

  async clickCloseButton() {
    await this.closeButton.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }

  async waitForClose() {
    await expect(this.uniqueElement).toBeHidden();
  }
}
