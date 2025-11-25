// Реализовать е2е тест со следующими шагами:
//   - залогиниться - через loginUI service
//   - Создать продукт через API
//   - Перейти на страницу Edit Product
//   - Заполнить поля валидными данными - через UI
//   - Сохранить продукт
//   - Проверить продукт в таблице
//   - Открыть модалку деталей продукта
//   - Проверить данные в модалке
//   За собой удаляем продукт через апи

import { generateProductData } from 'data/sales-portal/products/generateProductData';
import { test } from 'fixtures';

test.describe('[Sales Portal] [Products] E2E Update product (API + UI)', () => {
  let id: string;
  let token: string;

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test('should update a product using services (create via API and edit via UI)', async ({
    loginUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.createProduct(token);
    id = createdProduct._id;

    await productsListUIService.open();

    const updatedProduct = generateProductData({ name: `${createdProduct.name} updated` });
    const editPage = await productsListUIService.openEditModal(createdProduct.name);
    await editPage.fillFormWithNewData(updatedProduct);
    await editPage.clickSaveChanges();
    await productsListPage.waitForOpened();

    await productsListUIService.assertProductMatches(updatedProduct.name, updatedProduct); // проверяем данные в таблице
    await productsListUIService.openDetailsModal(updatedProduct.name);
    const modalData = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsDataToGenerated(modalData, updatedProduct); // проверяем детали продукта в модалке
  });
});
