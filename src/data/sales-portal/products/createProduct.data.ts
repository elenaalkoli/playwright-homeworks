import { faker } from '@faker-js/faker';
import { IProduct } from 'data/types/product.types';

export const createProductPositiveCases: { title: string; value: Partial<IProduct> }[] = [
  // Name
  {
    title: 'Name with 3 alphanumerical chars',
    value: {
      name: faker.string.alphanumeric({ length: 3 }),
    },
  },
  {
    title: 'Name with 40 alphanumerical chars',
    value: {
      name: faker.string.alphanumeric({ length: 40 }),
    },
  },
  {
    title: 'Name with single space between words',
    value: {
      name: `${faker.string.alphanumeric({ length: 5 })} ${faker.string.alphanumeric({ length: 5 })}`,
    },
  },
  //Price
  {
    title: 'Price at minimum 1',
    value: {
      price: 1,
    },
  },
  {
    title: 'Price at maximum 99999',
    value: {
      price: 99999,
    },
  },
  //Amount
  {
    title: 'Amount at minimum 0',
    value: {
      amount: 0,
    },
  },
  {
    title: 'Amount at maximum 999',
    value: {
      amount: 999,
    },
  },
  //Notes
  {
    title: 'Empty notes',
    value: {
      notes: '',
    },
  },
  {
    title: 'Notes with 100 characters',
    value: {
      notes: faker.string.alphanumeric({ length: 100 }),
    },
  },
  {
    title: 'Notes with 250 characters',
    value: {
      notes: faker.string.alphanumeric({ length: 250 }),
    },
  },
];

export const createProductNegativeCases: { title: string; value: Partial<IProduct> }[] = [
  // Name
  {
    title: 'Missing name',
    value: {
      name: undefined,
    },
  },
  {
    title: 'Name with 2 characters',
    value: {
      name: faker.string.alphanumeric({ length: 2 }),
    },
  },
  {
    title: 'Name with 41 characters',
    value: {
      name: faker.string.alphanumeric({ length: 41 }),
    },
  },
  {
    title: 'Name with multiple spaces',
    value: {
      name: `${faker.string.alphanumeric({ length: 3 })}  ${faker.string.alphanumeric({ length: 5 })}`,
    },
  },
  {
    title: 'Space-only name',
    value: {
      name: '   ',
    },
  },

  // Manufacturer
  {
    title: 'Missing manufacturer',
    value: {
      manufacturer: undefined,
    },
  },

  // Price
  {
    title: 'Missing price',
    value: {
      price: undefined,
    },
  },
  {
    title: 'Price = 0',
    value: {
      price: 0,
    },
  },
  {
    title: 'Price < 0',
    value: {
      price: -100,
    },
  },
  {
    title: 'Price > 99999',
    value: {
      price: 100000,
    },
  },
  {
    title: 'Price as string',
    value: {
      price: '1000' as unknown as number,
    },
  },

  // Amount
  {
    title: 'Missing amount',
    value: {
      amount: undefined,
    },
  },
  {
    title: 'Amount < 0',
    value: {
      amount: -1,
    },
  },
  {
    title: 'Amount > 999',
    value: {
      amount: 1000,
    },
  },
  {
    title: 'Amount as string',
    value: {
      amount: '10' as unknown as number,
    },
  },

  // Notes
  {
    title: 'Notes with < symbol',
    value: {
      notes: `Notes with < symbol`,
    },
  },
  {
    title: 'Notes with > symbol',
    value: {
      notes: `Notes with > symbol`,
    },
  },
  {
    title: 'Notes longer than 250 characters',
    value: {
      notes: faker.string.alphanumeric({ length: 251 }),
    },
  },
];
