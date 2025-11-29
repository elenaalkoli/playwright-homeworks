import { faker } from '@faker-js/faker';
import { getRandomEnumValue } from 'utils/enum.utils';
import { ICustomer } from 'data/types/customers.types';
import { COUNTRIES } from './countries';

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: faker.internet.email(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    country: getRandomEnumValue(COUNTRIES),
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int({ min: 0, max: 999 }),
    flat: faker.number.int({ min: 0, max: 9999 }),
    phone: `+${faker.number.int({ min: 111111111, max: 999999999999999 })}`,
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params,
  };
}
