import { test, expect } from 'fixtures/business.fixture';
import { generateMetricsResponse } from 'data/sales-portal/generateMetricsResponse';
import { convertNumberToFormat } from 'utils/validation/convertNumbers';
import { TAGS } from 'data/tags';

test.describe('[Integration] [Sales Portal] [Home] [Metrics]', () => {
  test(
    'Check Orders This Year metric',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homePage, homeUIService, mock }) => {
      const totalOrders = 50;
      const expectedResponse = generateMetricsResponse({
        Metrics: { orders: { totalOrders } },
      });
      await mock.homePageMetrics(expectedResponse);

      await homeUIService.open();
      await expect(homePage.orderThisYearMetric).toHaveText(totalOrders.toString());
    }
  );

  test(
    'Check New Customers metric',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homePage, homeUIService, mock }) => {
      const totalNewCustomers = 150;
      const expectedResponse = generateMetricsResponse({
        Metrics: { customers: { totalNewCustomers } },
      });
      await mock.homePageMetrics(expectedResponse);

      await homeUIService.open();
      await expect(homePage.newCustomerMetric).toHaveText(totalNewCustomers.toString());
    }
  );

  test(
    'Check Canceled Orders metric',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homePage, homeUIService, mock }) => {
      const totalCanceledOrders = 17;
      const expectedResponse = generateMetricsResponse({
        Metrics: { orders: { totalCanceledOrders } },
      });
      await mock.homePageMetrics(expectedResponse);

      await homeUIService.open();
      await expect(homePage.canceledOrdersMetric).toHaveText(totalCanceledOrders.toString());
    }
  );

  test(
    'Check Total Revenue metric',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homePage, homeUIService, mock }) => {
      const totalRevenue = 165000;
      const expectedResponse = generateMetricsResponse({
        Metrics: { orders: { totalRevenue } },
      });
      await mock.homePageMetrics(expectedResponse);

      await homeUIService.open();
      const formatted = '$' + convertNumberToFormat(totalRevenue, '0.0a');
      await expect(homePage.totalRevenueMetric).toHaveText(formatted);
    }
  );

  test(
    'Check Avg Order Value metric',
    { tag: [TAGS.UI, TAGS.REGRESSION] },
    async ({ homePage, homeUIService, mock }) => {
      const avgOrderValue = 180;
      const expectedResponse = generateMetricsResponse({
        Metrics: { orders: { averageOrderValue: avgOrderValue } },
      });
      await mock.homePageMetrics(expectedResponse);

      await homeUIService.open();
      const formatted = '$' + convertNumberToFormat(avgOrderValue, '0.0a');
      await expect(homePage.avgOrdersValue).toHaveText(formatted);
    }
  );
});
