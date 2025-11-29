// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров)
// со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

import test, { expect } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import { credentials } from 'config/env';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import { getAllProductsSchema } from 'data/schemas/products/getAllProducts.schema';
import {
  IProductFromResponse,
  IProductsSortedResponse,
  IProductResponse,
} from 'data/types/product.types';
import { validateJsonSchema } from 'utils/validation/schema.utils';
import { TAGS } from 'data/tags';

const { baseUrl, endpoints } = apiConfig;

test.describe('[API] [Sales Portal] [Products]', () => {
  let id = '';
  let token = '';

  //1 - login
  test.beforeEach(async ({ request }) => {
    const loginResponse = await request.post(`${baseUrl}${endpoints.login}`, {
      data: credentials,
      headers: {
        'content-type': 'application/json',
      },
    });
    token = loginResponse.headers()['authorization']!;
    expect(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect(token).toBeTruthy();
  });

  //2 - delete product afterAll tests
  test.afterAll(async ({ request }) => {
    if (id) {
      const deleteResponse = await request.delete(`${baseUrl}${endpoints.productById(id)}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      expect(deleteResponse.status()).toBe(STATUS_CODES.DELETED);
      expect(token).toBeTruthy();
    }
  });

  //3 - create a product, then get all products
  test('Get all products', { tag: [TAGS.API, TAGS.REGRESSION] }, async ({ request }) => {
    //create a product
    const product = generateProductData();
    console.log('Generated product:', product);
    const createProductResponse = await request.post(`${baseUrl}${endpoints.products}`, {
      data: product,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const createdProductBody = (await createProductResponse.json()) as IProductResponse;
    id = createdProductBody.Product._id;
    expect(createProductResponse.status()).toBe(STATUS_CODES.CREATED);

    //get all products
    const allProductsResponse = await request.get(`${baseUrl}${endpoints.productsAll}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const allProductsBody = (await allProductsResponse.json()) as IProductsSortedResponse;
    await validateJsonSchema(allProductsBody, getAllProductsSchema);
    console.log('All products response body:', allProductsBody);
    const foundedProduct = allProductsBody.Products.some(
      (item: IProductFromResponse) => item._id === id && item.name === product.name
    );
    //assertions
    expect.soft(allProductsResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(foundedProduct).toBe(true);
    expect.soft(allProductsBody.IsSuccess).toBe(true);
    expect.soft(allProductsBody.ErrorMessage).toBe(null);
  });
});
