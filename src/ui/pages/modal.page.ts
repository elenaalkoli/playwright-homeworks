import { expect, Locator, Page } from '@playwright/test';
import { SalesPortalPage } from './salesPortal.page';

export abstract class Modal extends SalesPortalPage {
  abstract readonly uniqueElement: Locator;
  abstract readonly closeButton: Locator;

  async clickClose() {
    await this.closeButton.click();
  }

  async waitForClose() {
    await expect(this.uniqueElement).toBeHidden();
  }
}
