import { IApiClient, IRequestOptions } from 'api/apiClients/typesApi';
import { apiConfig } from 'config/apiConfig';

export class CustomersApi {
  constructor(private apiClient: IApiClient) {}

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
