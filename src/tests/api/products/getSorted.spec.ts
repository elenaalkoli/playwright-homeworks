import { test, expect } from 'fixtures/api.fixture';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { validateResponse } from 'utils/validation/validateResponse.utils';
import { TAGS } from 'data/tags';
import _ from 'lodash';

test.describe(
  '[API] [Sales Portal] [Products] Get Sorted',
  { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
  () => {
    test.describe('Search', () => {
      let id = '';
      let token = '';

      test.beforeEach(async ({ loginApiService }) => {
        token = await loginApiService.loginAsAdmin();
      });

      test.afterEach(async ({ productsApiService }) => {
        if (id) await productsApiService.delete(token, id);
        id = '';
      });

      test('Search by name', async ({ productsApiService, productsApi }) => {
        const product = await productsApiService.createProduct(token);

        const response = await productsApi.getSorted(token, { search: product.name });

        validateResponse(response, {
          status: STATUS_CODES.OK,
          IsSuccess: true,
          ErrorMessage: null,
        });

        const { limit, search, manufacturer, total, page, sorting } = response.body;
        const found = response.body.Products.find((el) => el._id === product._id);

        expect.soft(found, `Created product should be in response`).toBeTruthy();
        expect.soft(limit).toBe(10);
        expect.soft(search).toBe(product.name);
        expect.soft(manufacturer).toEqual([]);
        expect.soft(page).toBe(1);
        expect.soft(sorting).toEqual({ sortField: 'createdOn', sortOrder: 'desc' });
        expect.soft(total).toBeGreaterThanOrEqual(1);
      });
    });

    test.describe(
      'Sorting',
      { tag: [TAGS.API, TAGS.SMOKE, TAGS.REGRESSION, TAGS.PRODUCTS] },
      () => {
        const ids: string[] = [];
        let token = '';

        test.beforeEach(async ({ loginApiService }) => {
          token = await loginApiService.loginAsAdmin();
        });

        test.afterEach(async ({ productsApiService }) => {
          for (const id of ids) {
            await productsApiService.delete(token, id);
          }
          ids.length = 0;
        });

        test('SortField: createdOn, sortOrder: asc', async ({
          productsApiService,
          productsApi,
          page,
        }) => {
          const product1 = await productsApiService.createProduct(token);
          await page.waitForTimeout(5000);
          const product2 = await productsApiService.createProduct(token);

          ids.push(product1._id, product2._id);

          const response = await productsApi.getSorted(token, {
            sortField: 'createdOn',
            sortOrder: 'asc',
          });

          const actualProducts = response.body.Products;
          const sorted = actualProducts.toSorted(
            (a, b) => new Date(a.createdOn).getTime() - new Date(b.createdOn).getTime()
          );

          actualProducts.forEach((p, index) => {
            expect(_.omit(p, ['name', 'price', 'notes', 'amount', 'manufacturer'])).toEqual(
              _.omit(sorted[index], ['name', 'price', 'notes', 'amount', 'manufacturer'])
            );
          });

          const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
          expect.soft(limit).toBe(10);
          expect.soft(search).toBe('');
          expect.soft(manufacturer).toEqual([]);
          expect.soft(pageParam).toBe(1);
          expect.soft(sorting).toEqual({ sortField: 'createdOn', sortOrder: 'asc' });
          expect.soft(total).toBeGreaterThanOrEqual(2);
        });

        test('SortField: createdOn, sortOrder: desc', async ({
          productsApiService,
          productsApi,
          page,
        }) => {
          const product1 = await productsApiService.createProduct(token);
          await page.waitForTimeout(1000);
          const product2 = await productsApiService.createProduct(token);

          ids.push(product1._id, product2._id);

          const response = await productsApi.getSorted(token, {
            sortField: 'createdOn',
            sortOrder: 'desc',
          });

          const actualProducts = response.body.Products;
          const sorted = actualProducts.toSorted(
            (a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
          );

          actualProducts.forEach((p, index) => {
            expect(_.omit(p, ['name', 'price', 'notes', 'amount', 'manufacturer'])).toEqual(
              _.omit(sorted[index], ['name', 'price', 'notes', 'amount', 'manufacturer'])
            );
          });

          const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
          expect.soft(limit).toBe(10);
          expect.soft(search).toBe('');
          expect.soft(manufacturer).toEqual([]);
          expect.soft(pageParam).toBe(1);
          expect.soft(sorting).toEqual({ sortField: 'createdOn', sortOrder: 'desc' });
          expect.soft(total).toBeGreaterThanOrEqual(2);
        });

        test('SortField: manufacturer, sortOrder: desc', async ({
          productsApiService,
          productsApi,
          page,
        }) => {
          const product1 = await productsApiService.createProduct(token);
          await page.waitForTimeout(1000);
          const product2 = await productsApiService.createProduct(token);

          ids.push(product1._id, product2._id);

          const response = await productsApi.getSorted(token, {
            sortField: 'manufacturer',
            sortOrder: 'desc',
          });

          const actualProducts = response.body.Products;
          const sorted = actualProducts.toSorted(
            (a, b) =>
              b.manufacturer.localeCompare(a.manufacturer) ||
              new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime()
          );

          actualProducts.forEach((p, index) => {
            expect(_.omit(p, ['name', 'price', 'notes', 'amount', 'createdOn'])).toEqual(
              _.omit(sorted[index], ['name', 'price', 'notes', 'amount', 'createdOn'])
            );
          });

          const { limit, search, manufacturer, total, page: pageParam, sorting } = response.body;
          expect.soft(limit).toBe(10);
          expect.soft(search).toBe('');
          expect.soft(manufacturer).toEqual([]);
          expect.soft(pageParam).toBe(1);
          expect.soft(sorting).toEqual({ sortField: 'manufacturer', sortOrder: 'desc' });
          expect.soft(total).toBeGreaterThanOrEqual(2);
        });
      }
    );
  }
);
