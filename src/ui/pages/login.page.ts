// Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method

import { ICredentials } from 'data/types/credentials.types';
import { SalesPortalPage } from './salesPortal.page';
import { logStep } from 'utils/report/logStep.utils';
export class LoginPage extends SalesPortalPage {
  readonly emailInput = this.page.locator('#emailinput');
  readonly passwordInput = this.page.locator('#passwordinput');
  readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  readonly title = this.page.locator('p.lead');
  readonly uniqueElement = this.title;

  @logStep('Fill Login Form')
  async fillCredentials({ username, password }: ICredentials) {
    await this.emailInput.fill(username);
    await this.passwordInput.fill(password);
  }

  @logStep('Click Login Button')
  async clickLoginButton() {
    await this.loginButton.click();
  }

  @logStep('Login')
  async login(credentials: ICredentials) {
    await this.fillCredentials(credentials);
    await this.clickLoginButton();
  }
}
