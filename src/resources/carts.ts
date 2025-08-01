import { HttpClient } from '../utils/http-client';
import {
  AddCartItemRequest,
  RemoveCartItemRequest,
  ValidateCouponRequest,
  CartResponse,
} from '../types';

export class CartsResource {
  private readonly resourcePath = '/api/carts';

  constructor(private httpClient: HttpClient) {}

  async addItem(cartId: string, data: AddCartItemRequest): Promise<CartResponse> {
    return this.httpClient.post<CartResponse>(`${this.resourcePath}/${cartId}/add`, data);
  }

  async removeItem(cartId: string, data: RemoveCartItemRequest): Promise<CartResponse> {
    return this.httpClient.post<CartResponse>(`${this.resourcePath}/${cartId}/remove`, data);
  }

  async validateCoupon(cartId: string, data: ValidateCouponRequest): Promise<CartResponse> {
    return this.httpClient.post<CartResponse>(
      `${this.resourcePath}/${cartId}/validate-coupon`,
      data,
    );
  }
}
