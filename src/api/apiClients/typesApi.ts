import { ICreatedOn, IProduct } from 'data//types/product.types';
import { ID } from 'data/types/core.types';

export interface IApiClient {
  send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>>;
}

export interface IResponseFields {
  IsSuccess: boolean;
  ErrorMessage: string | null;
}

export interface IRequestOptions {
  baseURL: string;
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: object;
  headers?: Record<string, string>;
}

export interface IResponse<T extends object | null> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

export interface ILoginResponse extends IResponseFields {
  User: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    roles: string[];
    createdOn: string;
  };
}

export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}

// Для даты внутри customerGrowth
export interface IMetricDate {
  year: number;
  month: number;
  day: number;
}

// Для growth по кастомерам
export interface ICustomerGrowth {
  date: IMetricDate;
  count: number;
}

// Заказы
export interface IOrdersMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: any[];
  ordersCountPerDay: any[];
}

// Клиенты
export interface ICustomersMetrics {
  totalNewCustomers: number;
  topCustomers: any[];
  customerGrowth: ICustomerGrowth[];
}

// Продукты
export interface IProductsMetrics {
  topProducts: any[];
}

// Основная структура Metrics
export interface IMetrics {
  orders: IOrdersMetrics;
  customers: ICustomersMetrics;
  products: IProductsMetrics;
}

// Полный ответ API
export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

//тип для параметра мок-запроса для подмена api/metrics
export type IMetricsResponseMockParams = Partial<{
  Metrics: Partial<{
    orders: Partial<IOrdersMetrics>;
    customers: Partial<ICustomersMetrics>;
    products: Partial<IProductsMetrics>;
  }>;
  IsSuccess: boolean;
  ErrorMessage: string | null;
}>;
