import { test, expect } from 'fixtures/business.fixture';
import { generateProductResponseData } from 'data/sales-portal/products/generateProductData';
import { apiConfig } from 'config/apiConfig';
import { ProductsSortField, ProductsTableHeader } from 'data/types/product.types';
import { SortOrder } from 'data/types/core.types';
import _ from 'lodash';
import { convertToDateAndTime } from 'utils/date.utils';
import { TAGS } from 'data/tags';

test.describe('[Integration] [Sales Portal] [Products] [Table Sorting]', () => {
  const directions = ['asc', 'desc'] as SortOrder[];
  for (const header of ['Name', 'Price', 'Manufacturer', 'Created On'] as ProductsTableHeader[]) {
    for (const direction of directions) {
      test(
        `Field: ${header}, direction: ${direction}`,
        { tag: [TAGS.UI, TAGS.REGRESSION] },
        async ({ productsListPage, productsListUIService, mock }) => {
          const headersMapper: Record<string, ProductsSortField> = {
            Name: 'name',
            Price: 'price',
            Manufacturer: 'manufacturer',
            'Created On': 'createdOn',
          };
          const product1 = generateProductResponseData();
          const product2 = generateProductResponseData();
          const products = [product1, product2];
          //1 мок - подставляем продукты с обратным порядком сортировки
          await mock.productsPage({
            Products: products,
            IsSuccess: true,
            ErrorMessage: null,
            total: 1,
            page: 1,
            limit: 10,
            search: '',
            manufacturer: [],
            sorting: {
              sortField: headersMapper[header]!,
              sortOrder: directions.find((el) => el !== direction)!, //задаем обратный порядок от тестируемого
            },
          });

          await productsListUIService.open();

          //2 мок - подставляем продукты уже в порядке, который тестируем
          await mock.productsPage({
            Products: products,
            IsSuccess: true,
            ErrorMessage: null,
            total: 1,
            page: 1,
            limit: 10,
            search: '',
            manufacturer: [],
            sorting: {
              sortField: headersMapper[header]!,
              sortOrder: direction,
            },
          });
          //ждем, пока клик по заголовку таблицы отправит запрос на апи
          const request = await productsListPage.interceptRequest(
            apiConfig.endpoints.products,
            productsListPage.clickTableHeader.bind(productsListPage),
            header //заголовок таблицы, по которому сортируем
          );

          await productsListPage.waitForOpened();
          //URL запроса соответствует правильным параметрам сортировки
          expect(request.url()).toBe(
            `${apiConfig.baseUrl}${apiConfig.endpoints.products}?sortField=${headersMapper[header]}&sortOrder=${direction}&page=1&limit=10`
          );
          //стрелка сортировки на заголовке видима и соответствует направлению
          await expect(productsListPage.tableHeaderArrow(header, { direction })).toBeVisible();

          //получаем данные из таблицы и проверяем, что они соответствуют ожидаемым
          const tableData = await productsListPage.getTableData();
          expect(tableData.length).toBe(products.length);
          //проверяем каждый продукт в таблице
          tableData.forEach((product, i) => {
            const expected = _.omit(products[i], ['_id', 'notes', 'amount']);
            expected.createdOn = convertToDateAndTime(expected.createdOn!); //к формату таблицы
            expect(product).toEqual(expected);
          });
        }
      );
    }
  }
});
