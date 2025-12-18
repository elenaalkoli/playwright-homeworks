import { expect, Locator, Page } from '@playwright/test';
import { SalesPortalPage } from './salesPortal.page';
import { logStep } from 'utils/report/logStep.utils';

export abstract class Modal extends SalesPortalPage {
  abstract readonly uniqueElement: Locator;
  abstract readonly closeButton: Locator;

  @logStep('Click on Close button')
  async clickClose() {
    await this.closeButton.click();
  }

  @logStep('Wait modal to close')
  async waitForClose() {
    await expect(this.uniqueElement).toBeHidden();
  }
}
