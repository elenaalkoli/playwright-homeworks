import { Page } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { IProductResponse, IProductsSortedResponse } from 'data/types/product.types';
import { IMetricsResponse } from 'api/apiClients/typesApi';

export class Mock {
  constructor(private page: Page) {}

  async productsPage(body: IProductsSortedResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    this.page.route(/\/api\/products(\?.*)?$/, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });
  }

  async productDetailsModal(body: IProductResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    await this.page.route(
      apiConfig.baseUrl + apiConfig.endpoints.productById(body.Product._id),
      async (route) => {
        await route.fulfill({
          status: statusCode,
          contentType: 'application/json',
          body: JSON.stringify(body),
        });
      }
    );
  }

  async homePageMetrics(body: IMetricsResponse, statusCode: STATUS_CODES = STATUS_CODES.OK) {
    await this.page.route(apiConfig.baseUrl + apiConfig.endpoints.metrics, async (route) => {
      await route.fulfill({
        status: statusCode,
        contentType: 'application/json',
        body: JSON.stringify(body),
      });
    });
  }
}
