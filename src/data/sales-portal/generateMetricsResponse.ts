import { faker } from '@faker-js/faker';
import { IMetricsResponse, IMetricsResponseMockParams } from 'api/apiClients/typesApi';

//генерация мок-ответа в отдельную функцию
export function generateMetricsResponse(params?: IMetricsResponseMockParams): IMetricsResponse {
  return {
    Metrics: {
      orders: {
        totalRevenue: faker.number.int({ min: 0, max: 100 }),
        totalOrders: faker.number.int({ min: 0, max: 100 }),
        averageOrderValue: faker.number.int({ min: 0, max: 100 }),
        totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
        recentOrders: [],
        ordersCountPerDay: [],
        ...params?.Metrics?.orders,
      },
      customers: {
        totalNewCustomers: faker.number.int({ min: 0, max: 100 }),
        topCustomers: [],
        customerGrowth: [],
        ...params?.Metrics?.customers,
      },
      products: {
        topProducts: [],
        ...params?.Metrics?.products,
      },
    },
    ErrorMessage: null,
    IsSuccess: true,
  };
}
