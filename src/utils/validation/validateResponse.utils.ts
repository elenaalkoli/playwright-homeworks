import { expect } from '@playwright/test';
import { IResponse, IResponseFields } from 'api/apiClients/typesApi';
import { validateJsonSchema } from 'utils/validation/schema.utils';

export function validateResponse<T extends IResponseFields | null>(
  response: IResponse<T>,
  expected: {
    status: number;
    IsSuccess?: boolean;
    ErrorMessage?: string | null;
    schema?: object;
  }
) {
  expect.soft(response.status).toBe(expected.status);
  if (expected.IsSuccess) expect.soft(response.body!.IsSuccess).toBe(expected.IsSuccess);
  if (expected.ErrorMessage) expect.soft(response.body!.ErrorMessage).toBe(expected.ErrorMessage);
  if (expected.schema) validateJsonSchema(response.body!, expected.schema);
}
