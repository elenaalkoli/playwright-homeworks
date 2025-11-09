import { faker } from '@faker-js/faker';
import { IProduct } from 'data/types/product.types';

// export interface IProduct {
//   name: string;
//   manufacturer: MANUFACTURERS;
//   price: number;
//   amount: number;
//   notes?: string;
// }

export const positiveCases: { title: string; value: Partial<IProduct> }[] = [];
export const negativeCases: { title: string; value: Partial<IProduct> }[] = [];
