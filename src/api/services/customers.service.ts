import { CustomersApi } from 'api/api/customers.api';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { validateResponse } from 'utils/validation/validateResponse.utils';

export class CustomersApiService {
  constructor(private customersApi: CustomersApi) {}

  async delete(id: string, token: string) {
    const response = await this.customersApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}
