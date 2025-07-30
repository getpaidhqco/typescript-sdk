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

  /**
   * Add item to cart
   */
  async addCartItem(cartId: string, data: AddCartItemRequest): Promise<{ status: string }> {
    return this.httpClient.post<{ status: string }>(`/api/carts/${cartId}/add`, data);
  }

  /**
   * Remove item from cart
   */
  async removeCartItem(cartId: string, data: RemoveCartItemRequest): Promise<{ status: string }> {
    return this.httpClient.post<{ status: string }>(`/api/carts/${cartId}/remove`, data);
  }

  /**
   * List subscriptions created from an order
   */
  async listSubscriptions(orderId: string): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.resourcePath}/${orderId}/subscriptions`);
  }
}
