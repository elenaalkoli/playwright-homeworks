// Реализовать E2E тест по созданию покупателя (модуль Customers)
// по аналогии c Products с шагами
//   - залогиниться
//   - Перейти на страницу Customers List
//   - Перейти на страницу Add New Customer
//   - Заполнить поля валидными данными
//   - Сохранить покупателя
//   - Проверить наличие покупателя в таблице
// - Удалить покупателя через API

//   Требования найдете в валидационных сообщениях на фронте:)
// Уникальное поле - Email

import { generateCustomerData } from 'data/sales-portal/customers/generateCustomerData';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { expect, test } from 'fixtures';
import { TAGS } from 'data/tags';

test.describe('[Sales Portal] [Customers] E2E Add new customer', async () => {
  let id = '';
  let token = '';

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
    id = '';
  });

  test(
    'Add new customer using services (create via UI and delete via API)',
    { tag: [TAGS.UI, TAGS.SMOKE, TAGS.REGRESSION] },
    async ({ customersListUIService, addNewCustomerUIService, customersListPage }) => {
      await customersListUIService.open(); //сразу переходим на стр customers
      await customersListUIService.openAddNewCustomerPage();

      const newCustomer = generateCustomerData();
      const createdCustomer = await addNewCustomerUIService.createCustomer(newCustomer); //создали кастомера и перехватили респонз на создание
      id = createdCustomer._id;
      token = await customersListPage.getAuthToken(); //достаем токен из куки контекста браузера

      expect(customersListPage.toastMessage).toHaveText(NOTIFICATIONS.CUSTOMER_CREATED);
      await customersListUIService.assertCustomerMatches(newCustomer.email, newCustomer);
    }
  );
});
