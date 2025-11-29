import { Page } from '@playwright/test';
import { IResponse } from 'data/types/core.types';

export abstract class BasePage {
  constructor(protected page: Page) {}

  async interceptRequest<T extends unknown[]>(
    url: string,
    triggerAction: (...args: T) => Promise<void>,
    ...args: T
  ) {
    const [request] = await Promise.all([
      this.page.waitForRequest((request) => request.url().includes(url)),
      triggerAction(...args),
    ]);
    return request;
  }

  //функция ждёт сетевой ответ от страницы (waitForResponse - встроенный метод page,
  //ждет http ответ от страницы) после того, как выполняется какое-то действие на UI (triggerAction).
  async interceptResponse<U extends object | null, T extends unknown[]>(
    url: string,
    triggerAction: (...args: T) => Promise<void>,
    ...args: T
  ): Promise<IResponse<U>> {
    const [response] = await Promise.all([
      this.page.waitForResponse((response) => response.url().includes(url)),
      triggerAction(...args),
    ]);
    return {
      status: response.status(),
      headers: response.headers(),
      body: (await response.json()) as U,
    };
  }
}
