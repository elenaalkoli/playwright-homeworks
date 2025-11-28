import { COUNTRIES } from 'data/sales-portal/customers/countries';
import { IResponseFields, ID } from './core.types';
import { ICreatedOn } from './product.types';

// Базовый интерфейс кастомера (из модалки Details)
export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRIES;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

// Кастомер из ответа сервера, с ID
export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}

// Ответ с 1 кастомером (при создании на POST/для страницы Details)
export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}

// Ответ со списком кастомеров (для страницы списка)
export interface ICustomersResponse extends IResponseFields {
  Customers: ICustomerFromResponse[];
}

export interface ICustomerInTable
  extends Pick<ICustomer, 'email' | 'name' | 'country'>,
    ICreatedOn {}
