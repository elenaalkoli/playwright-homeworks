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

test.describe('[Sales Portal] [Customers] E2E Add new customer', async () => {
  let id = '';
  let token = '';

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(id, token);
    id = '';
  });

  test('Should add new customer using services (create via UI and delete via API)', async ({
    loginUIService,
    homeUIService,
    customersListUIService,
    addNewCustomerUIService,
    customersListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    await homeUIService.openModule('Customers');
    await customersListUIService.openAddNewCustomerPage();

    const newCustomer = generateCustomerData();
    const createdCustomer = await addNewCustomerUIService.createCustomer(newCustomer); //создали кастомера и перехватили респонз на создание
    id = createdCustomer._id;

    expect(customersListPage.toastMessage).toHaveText(NOTIFICATIONS.CUSTOMER_CREATED);
    await customersListUIService.assertCustomerMatches(newCustomer.email, newCustomer);
  });
});
