import { Page } from '@playwright/test';
import { credentials } from 'config/env';
import { ICredentials } from 'data/types/credentials.types';
import { HomePage } from 'ui/pages/home.page';
import { LoginPage } from 'ui/pages/login.page';

export class LoginUIService {
  homePage: HomePage;
  loginPage: LoginPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.loginPage = new LoginPage(page);
  }

  async loginAsAdmin() {
    return await this.login(credentials);
  }

  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickLoginButton();
    await this.homePage.waitForOpened();
    const cookies: { name: string; value: string }[] = await this.page.context().cookies();
    const token = cookies.find((c) => c.name === 'Authorization');
    if (!token) throw new Error('Authorization token was not found after login');
    return token.value;
  }
}
