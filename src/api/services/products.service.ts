import { ProductsApi } from 'api/api/products.api';
import { generateProductData } from 'data/sales-portal/products/generateProductData';
import { createProductSchema } from 'data/schemas/products/create.schema';
import { STATUS_CODES } from 'data/types/statusCodes.types';
import { IProduct } from 'data/types/product.types';
import { validateResponse } from 'utils/validation/validateResponse.utils';
import { logStep } from 'utils/report/logStep.utils';
export class ProductsApiService {
  constructor(private productsApi: ProductsApi) {}

  @logStep('Create product via API')
  async createProduct(token: string, productData?: IProduct) {
    const data = generateProductData(productData);
    const response = await this.productsApi.create(data, token);
    validateResponse(response, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
    });
    return response.body.Product;
  }

  @logStep('Delete product via API')
  async delete(token: string, id: string) {
    const response = await this.productsApi.delete(id, token);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}
