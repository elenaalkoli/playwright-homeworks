import { MANUFACTURERS } from 'data/sales-portal/products/manufacturers';

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}
export interface ICreatedOn {
  createdOn: string;
}
export interface IProductInTable
  extends Pick<IProduct, 'name' | 'price' | 'manufacturer'>,
    ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}
