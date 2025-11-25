import { expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { SALES_PORTAL_URL } from 'config/env';

export abstract class SalesPortalPage extends BasePage {
  readonly spinner = this.page.locator('.spinner-border');
  readonly toast = this.page.locator('.toast.show').last();
  readonly toastMessage = this.toast.locator('.toast-body');
  readonly toastCloseButton = this.toast.locator('button.btn-close');
  abstract readonly uniqueElement: Locator;

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible({ timeout: 10000 });
    await this.waitForSpinners();
  }

  async waitForSpinners() {
    await expect(this.spinner).toHaveCount(0, { timeout: 10000 });
  }

  async open(route?: string) {
    const url = SALES_PORTAL_URL + (route ?? '/');
    await this.page.goto(url);
  }

  async closeNotification() {
    await this.toastCloseButton.click();
  }
}
