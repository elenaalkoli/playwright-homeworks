import { SALES_PORTAL_API_URL } from './env';

export const apiConfig = {
  baseUrl: SALES_PORTAL_API_URL,
  endpoints: {
    // Auth
    login: '/api/login',

    // Products
    productsAll: '/api/products/all',
    products: '/api/products',
    productById: (id: string) => `/api/products/${id}/`,

    // Customers
    customersAll: '/api/customers/all',
    customers: '/api/customers',
    customerById: (id: string) => `/api/customers/${id}/`,

    // Metrics
    metrics: '/api/metrics',
  },
};
