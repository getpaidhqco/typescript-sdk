import { HttpClient } from '../utils/http-client';
import {
  Discount,
  DiscountRedemption,
  CreateDiscountRequest,
  UpdateDiscountRequest,
  ValidateDiscountRequest,
  DiscountValidationResponse,
  ApplyDiscountRequest,
  DiscountApplicationResponse,
  ListDiscountsParams,
  ListDiscountRedemptionsParams,
} from '../types/discounts';
import { ListResponse } from '../types/common';

export class DiscountsResource {
  constructor(private httpClient: HttpClient) {}

  /**
   * List all discounts
   */
  async list(params?: ListDiscountsParams): Promise<ListResponse<Discount>> {
    return this.httpClient.get<ListResponse<Discount>>('/api/discounts', {
      params,
    });
  }

  /**
   * Create a new discount
   */
  async create(data: CreateDiscountRequest): Promise<Discount> {
    return this.httpClient.post<Discount>('/api/discounts', data);
  }

  /**
   * Get a discount by ID
   */
  async get(id: string): Promise<Discount> {
    return this.httpClient.get<Discount>(`/api/discounts/${id}`);
  }

  /**
   * Update a discount
   */
  async update(id: string, data: UpdateDiscountRequest): Promise<Discount> {
    return this.httpClient.put<Discount>(`/api/discounts/${id}`, data);
  }

  /**
   * Delete a discount
   */
  async delete(id: string): Promise<void> {
    return this.httpClient.delete(`/api/discounts/${id}`);
  }

  /**
   * Validate a discount code
   */
  async validate(data: ValidateDiscountRequest): Promise<DiscountValidationResponse> {
    return this.httpClient.post<DiscountValidationResponse>('/api/discounts/validate', data);
  }

  /**
   * Apply a discount
   */
  async apply(data: ApplyDiscountRequest): Promise<DiscountApplicationResponse> {
    return this.httpClient.post<DiscountApplicationResponse>('/api/discounts/apply', data);
  }

  /**
   * List discount redemptions for a specific discount
   */
  async listRedemptions(
    discountId: string,
    params?: ListDiscountRedemptionsParams,
  ): Promise<ListResponse<DiscountRedemption>> {
    return this.httpClient.get<ListResponse<DiscountRedemption>>(
      `/api/discounts/${discountId}/redemptions`,
      { params },
    );
  }
}
