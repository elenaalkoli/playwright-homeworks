import { SALES_PORTAL_API_URL } from './env';

export const apiConfig = {
  baseUrl: SALES_PORTAL_API_URL,
  endpoints: {
    login: '/api/login',
    productsAll: '/api/products/all',
    products: '/api/products',
    productById: (id: string) => `/api/products/${id}/`,
    metrics: '/api/metrics',
  },
};
