import { IApiClient, IRequestOptions, IResponse } from './typesApi';

export abstract class BaseApiClient implements IApiClient {
  abstract send<T extends object | null>(options: IRequestOptions): Promise<IResponse<T>>;
  protected abstract transformResponse(): Promise<IResponse<object | null>>;
}
