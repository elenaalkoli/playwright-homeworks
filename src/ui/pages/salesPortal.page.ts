import { expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { SALES_PORTAL_URL } from 'config/env';
import { logStep } from 'utils/report/logStep.utils';
export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator('.spinner-border');
  readonly toast = this.page.locator('.toast.show').last();
  readonly toastMessage = this.toast.locator('.toast-body');
  readonly toastCloseButton = this.toast.locator('button.btn-close');
  abstract readonly uniqueElement: Locator;

  @logStep('Wait for page to open')
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
    await this.waitForSpinners();
  }

  @logStep('Wait for all spinners to disappear')
  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }

  @logStep('Open page')
  async open(route?: string) {
    const url = SALES_PORTAL_URL + (route ?? '/');
    await this.page.goto(url);
  }

  @logStep('Click Close Notification')
  async closeNotification() {
    await this.toastCloseButton.click();
  }
}
