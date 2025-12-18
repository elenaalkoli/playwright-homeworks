import { test, expect } from 'fixtures/business.fixture';
import { generateMetricsResponse } from 'data/sales-portal/generateMetricsResponse';
import numeral from 'numeral';

// Создайте 3 интеграционных теста для проверки следующих метрик на странице Home:
// 1. Orders This Year
// 2. New Customers
// 3. Canceled Orders

// Для реализации подмокивайте респонс эндпоинта metrics

//   - Orders This Year: Metrics.orders.totalOrders
//   - New Customers: Metrics.customers.totalNewCustomers
//   - Canceled Orders: Metrics.orders.totalCanceledOrders

// Остальной объект оставьте как есть сейчас в респонсе, замените просто на ваши данные в метриках
// нужных

// Добавьте в Task 1 еще 2 теста, на проверку следующих метрик:
// 1. Total Revenue
// 2. Avg Order Value

// Для пребразования цифр в формат как на юайке - используйте библиотеку numeral, формат - "0.0a"
// https://www.npmjs.com/package/numeral

test.describe('[Integration] [Sales Portal] [Home] Metrics', () => {
  const metricsMock = generateMetricsResponse({
    Metrics: {
      orders: {
        totalOrders: 25,
        totalRevenue: 125,
        averageOrderValue: 500,
        totalCanceledOrders: 3,
      },
      customers: {
        totalNewCustomers: 7,
      },
    },
  });

  const {
    orders: { totalOrders, totalRevenue, averageOrderValue, totalCanceledOrders },
    customers: { totalNewCustomers },
  } = metricsMock.Metrics;

  test.beforeEach(async ({ homePage, mock, loginAsAdmin }) => {
    await mock.homePageMetrics(metricsMock);
    await loginAsAdmin();
    await homePage.waitForOpened();
  });

  test('Orders This Year metric', async ({ homePage }) => {
    await expect(homePage.orderThisYearMetric).toHaveText(totalOrders.toString());
  });

  test('New Customers metric', async ({ homePage }) => {
    await expect(homePage.newCustomerMetric).toHaveText(totalNewCustomers.toString());
  });

  test('Canceled Orders metric', async ({ homePage }) => {
    await expect(homePage.canceledOrdersMetric).toHaveText(totalCanceledOrders.toString());
  });

  test('Total Revenue metric', async ({ homePage }) => {
    const formattedRevenue = '$' + numeral(totalRevenue).format('0.0a');
    await expect(homePage.totalRevenueMetric).toHaveText(formattedRevenue);
  });

  test('Avg Order Value metric', async ({ homePage }) => {
    const formattedAvgValue = '$' + numeral(averageOrderValue).format('0.0a');
    await expect(homePage.avgOrdersValue).toHaveText(formattedAvgValue);
  });
});
