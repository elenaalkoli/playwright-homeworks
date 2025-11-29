import { test, expect } from 'fixtures';
import { NOTIFICATIONS } from 'data/sales-portal/notifications';
import { TAGS } from 'data/tags';

test(
  'Table parsing',
  { tag: [TAGS.UI, TAGS.REGRESSION] },
  async ({ productsListPage, productsListUIService, addNewProductUIService }) => {
    // Открываем список продуктов
    await productsListUIService.open();

    // Открываем форму добавления нового продукта
    await addNewProductUIService.open();

    // Создаём продукт
    const created = await addNewProductUIService.createProduct();

    // Проверяем, что продукт виден в таблице
    await productsListUIService.assertProductVisibleInTable(created.name);

    // Проверяем уведомление
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);

    // Проверки данных продукта в таблице
    await expect.soft(productsListPage.nameCell(created.name)).toHaveText(created.name);
    await expect.soft(productsListPage.priceCell(created.name)).toHaveText(`$${created.price}`);
    await expect
      .soft(productsListPage.manufacturerCell(created.name))
      .toHaveText(created.manufacturer);

    // Получаем данные продукта из таблицы
    const productFromTable = await productsListPage.getProductData(created.name);
    console.log(productFromTable);
    console.log(created);

    // Сравниваем данные из таблицы с сгенерированными
    productsListUIService.assertTableProductDataToGenerated(productFromTable, created);
  }
);
