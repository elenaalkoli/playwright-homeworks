import { test } from 'fixtures/api.fixture';
import {
  createProductPositiveCases,
  createProductNegativeCases,
} from 'data/sales-portal/products/createProduct.data';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { validateResponse } from 'utils/validateResponse.utils';
import { createProductSchema } from 'data/schemas/products/create.schema';

// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   1. с позитивными проверками
//   2. с негативыми проверками
//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт -
// удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical
// characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols

test.describe('[API] [Sales Portal] [Products] [Create]', () => {
  let token = '';
  let id = '';

  test.beforeEach(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) {
      await productsApiService.delete(token, id);
      id = '';
    }
  });

  test.describe('Create product - positive cases', () => {
    for (const { title, value } of createProductPositiveCases) {
      test(title, async ({ productsApi }) => {
        const productData = generateProductData(value);
        const response = await productsApi.create(productData, token);
        console.log(response);

        validateResponse(response, {
          status: STATUS_CODES.CREATED,
          IsSuccess: true,
          ErrorMessage: null,
          schema: createProductSchema,
        });
        id = response.body.Product._id;
      });
    }
  });

  test.describe('Create product - negative cases', () => {
    for (const { title, value } of createProductNegativeCases) {
      test(title, async ({ productsApi }) => {
        const productData = generateProductData(value);
        const response = await productsApi.create(productData, token);
        console.log(response);

        validateResponse(response, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: 'Incorrect request body',
        });
      });
    }
  });
});
