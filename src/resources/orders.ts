import { HttpClient } from '../utils/http-client';
import {
  Order,
  CreateOrderRequest,
  CompleteOrderRequest,
  AddCartItemRequest,
  RemoveCartItemRequest,
  ListResponse,
  PaginationParams,
} from '../types';

export class OrdersResource {
  private readonly resourcePath = '/api/orders';

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

  async list(params?: PaginationParams): Promise<ListResponse<Order>> {
    return this.httpClient.get<ListResponse<Order>>(
      `${this.resourcePath}${this.buildQueryString(params)}`,
    );
  }

  async create(data: CreateOrderRequest): Promise<Order> {
    return this.httpClient.post<Order>(this.resourcePath, data);
  }

  async get(orderId: string): Promise<Order> {
    return this.httpClient.get<Order>(`${this.resourcePath}/${orderId}`);
  }

  async complete(orderId: string, data: CompleteOrderRequest): Promise<Order> {
    return this.httpClient.post<Order>(`${this.resourcePath}/${orderId}/complete`, data);
  }

  async addItem(orderId: string, data: AddCartItemRequest): Promise<Order> {
    return this.httpClient.post<Order>(`${this.resourcePath}/${orderId}/items`, data);
  }

  async removeItem(orderId: string, data: RemoveCartItemRequest): Promise<Order> {
    return this.httpClient.delete<Order>(`${this.resourcePath}/${orderId}/items`, { data });
  }
}
