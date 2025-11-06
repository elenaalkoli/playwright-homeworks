// Написать смоук API тест на логин
//   - создать и проверить схему
//   - проверить статус
//   - проверить наличие токена в хедерах

import test, { expect } from '@playwright/test';
import { apiConfig } from 'config/apiConfig';
import { credentials } from 'config/env';
import { loginSchema } from 'data/schemas/auth/login.schema';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { validateJsonSchema } from 'utils/schema.utils';

const { baseUrl, endpoints } = apiConfig;

test.describe('[API] [Sales Portal] [Authorization]', () => {
  test('Should login with valid credentials', async ({ request }) => {
    const response = await request.post(`${baseUrl}${endpoints.login}`, {
      data: credentials,
      headers: {
        'content-type': 'application/json',
      },
    });

    console.log(response);
    const responseBody = await response.json();
    console.log(responseBody);
    validateJsonSchema(responseBody, loginSchema);
    expect(response.status()).toBe(STATUS_CODES.OK);
    const token = response.headers()['authorization'];
    expect(token).toBeTruthy();
  });
});
