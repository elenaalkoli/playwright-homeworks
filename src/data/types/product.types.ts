import { MANUFACTURERS } from 'data/sales-portal/products/manufacturers';
import { ID, IResponseFields, SortOrder } from './core.types';

// Базовый интерфейс продукта
export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

// Базовый интерфейс с датой создания
export interface ICreatedOn {
  createdOn: string;
}

// Продукт для таблицы (subset + дата создания)
export interface IProductInTable
  extends Pick<IProduct, 'name' | 'manufacturer' | 'price'>,
    ICreatedOn {}

// Детали продукта (все поля обязательны)
export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

// Продукт из ответа сервера, с ID
export interface IProductFromResponse extends Required<IProduct>, ICreatedOn, ID {}

// Ответ с 1 продуктом (для модалки / деталей)
export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse;
}
// Ответ со списком продуктов (для страницы списка)
export interface IProductsResponse extends IResponseFields {
  Products: IProductFromResponse[];
}
// Ответ с сортировкой и пагинацией для списка продуктов
// наследует IProductsResponse (список), а не IProductResponse (один продукт)
export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}

// Поля, по которым можно сортировать
export type ProductsSortField = 'createdOn' | 'manufacturer' | 'price' | 'name';

// Параметры запроса для API
export interface IGetProductsParams {
  manufacturer: MANUFACTURERS[];
  search: string;
  sortField: ProductsSortField;
  sortOrder: SortOrder;
  page: number;
  limit: number;
}

// Заголовки таблицы
export type ProductsTableHeader = 'Name' | 'Price' | 'Manufacturer' | 'Created On';
