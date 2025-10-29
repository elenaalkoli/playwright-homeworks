// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { SalesPortalPage } from './salesPortal.page';
export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator('#emailinput');
  readonly passwordInput = this.page.locator('#passwordinput');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly title = this.page.locator('p.lead');
  readonly uniqueElement = this.title;

  async fillCredentials(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email: string, password: string) {
    await this.fillCredentials(email, password);
    await this.clickLoginButton();
  }
}
