import { HttpClient } from '../utils/http-client';
import {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ListResponse,
  PaginationParams,
  Variant,
  CreateVariantRequest,
  UpdateVariantRequest,
  Price,
  CreatePriceRequest,
  UpdatePriceRequest,
} from '../types';

export class ProductsResource {
  private readonly resourcePath = '/api/products';

  constructor(private httpClient: HttpClient) {}

  private buildQueryString(params?: Record<string, any>): string {
    if (!params) return '';

    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => `${key}[]=${encodeURIComponent(v)}`).join('&');
        }
        return `${key}=${encodeURIComponent(value)}`;
      })
      .join('&');

    return query ? `?${query}` : '';
  }

  async list(params?: PaginationParams): Promise<ListResponse<Product>> {
    return this.httpClient.get<ListResponse<Product>>(
      `${this.resourcePath}${this.buildQueryString(params)}`,
    );
  }

  async create(data: CreateProductRequest): Promise<Product> {
    return this.httpClient.post<Product>(this.resourcePath, data);
  }

  async get(productId: string): Promise<Product> {
    return this.httpClient.get<Product>(`${this.resourcePath}/${productId}`);
  }

  async update(productId: string, data: UpdateProductRequest): Promise<Product> {
    return this.httpClient.patch<Product>(`${this.resourcePath}/${productId}`, data);
  }

  async delete(productId: string): Promise<void> {
    return this.httpClient.delete(`${this.resourcePath}/${productId}`);
  }

  async listVariants(productId: string): Promise<Variant[]> {
    return this.httpClient.get<Variant[]>(`${this.resourcePath}/${productId}/variants`);
  }

  async createVariant(productId: string, data: CreateVariantRequest): Promise<Variant> {
    return this.httpClient.post<Variant>(`${this.resourcePath}/${productId}/variants`, data);
  }
}

export class VariantsResource {
  private readonly resourcePath = '/api/variants';

  constructor(private httpClient: HttpClient) {}

  async get(variantId: string): Promise<Variant> {
    return this.httpClient.get<Variant>(`${this.resourcePath}/${variantId}`);
  }

  async update(variantId: string, data: UpdateVariantRequest): Promise<Variant> {
    return this.httpClient.put<Variant>(`${this.resourcePath}/${variantId}`, data);
  }

  async delete(variantId: string): Promise<void> {
    return this.httpClient.delete(`${this.resourcePath}/${variantId}`);
  }

  async listPrices(variantId: string): Promise<Price[]> {
    return this.httpClient.get<Price[]>(`${this.resourcePath}/${variantId}/prices`);
  }
}

export class PricesResource {
  private readonly resourcePath = '/api/prices';

  constructor(private httpClient: HttpClient) {}

  async create(data: CreatePriceRequest): Promise<Price> {
    return this.httpClient.post<Price>(this.resourcePath, data);
  }

  async get(priceId: string): Promise<Price> {
    return this.httpClient.get<Price>(`${this.resourcePath}/${priceId}`);
  }

  async update(priceId: string, data: UpdatePriceRequest): Promise<Price> {
    return this.httpClient.patch<Price>(`${this.resourcePath}/${priceId}`, data);
  }

  async delete(priceId: string): Promise<void> {
    return this.httpClient.delete(`${this.resourcePath}/${priceId}`);
  }
}
