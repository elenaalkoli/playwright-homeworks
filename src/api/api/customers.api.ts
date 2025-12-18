import { IApiClient, IRequestOptions } from 'api/apiClients/typesApi';
import { apiConfig } from 'config/apiConfig';
import { logStep } from 'utils/report/logStep.utils';

export class CustomersApi {
  constructor(private apiClient: IApiClient) {}

  @logStep('DELETE /api/customers/{id}')
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl!,
      url: apiConfig.endpoints.customerById(id),
      method: 'delete',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClient.send<null>(options);
  }
}
