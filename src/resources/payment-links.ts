import { HttpClient } from '../utils/http-client';
import {
  CreatePaymentLinkRequest,
  UpdatePaymentLinkRequest,
  RecordPaymentLinkUsageRequest,
  ListPaymentLinksParams,
  ListPaymentLinkUsagesParams,
  PaymentLinkResponse,
  PaymentLinkUsageResponse,
} from '../types/payment-links';
import { ListResponse } from '../types/common';

export class PaymentLinksResource {
  constructor(private httpClient: HttpClient) {}

  /**
   * List all payment links
   */
  async list(params?: ListPaymentLinksParams): Promise<ListResponse<PaymentLinkResponse>> {
    return this.httpClient.get<ListResponse<PaymentLinkResponse>>('/api/payment-links', {
      params,
    });
  }

  /**
   * Create a new payment link
   */
  async create(data: CreatePaymentLinkRequest): Promise<PaymentLinkResponse> {
    return this.httpClient.post<PaymentLinkResponse>('/api/payment-links', data);
  }

  /**
   * Get a payment link by ID
   */
  async get(id: string): Promise<PaymentLinkResponse> {
    return this.httpClient.get<PaymentLinkResponse>(`/api/payment-links/${id}`);
  }

  /**
   * Update a payment link
   */
  async update(id: string, data: UpdatePaymentLinkRequest): Promise<PaymentLinkResponse> {
    return this.httpClient.put<PaymentLinkResponse>(`/api/payment-links/${id}`, data);
  }

  /**
   * Delete a payment link
   */
  async delete(id: string): Promise<void> {
    return this.httpClient.delete(`/api/payment-links/${id}`);
  }

  /**
   * Get a payment link by slug
   */
  async getBySlug(slug: string): Promise<PaymentLinkResponse> {
    return this.httpClient.get<PaymentLinkResponse>(`/api/payment-links/slug/${slug}`);
  }

  /**
   * List usage records for a specific payment link
   */
  async listUsages(
    paymentLinkId: string,
    params?: ListPaymentLinkUsagesParams,
  ): Promise<ListResponse<PaymentLinkUsageResponse>> {
    return this.httpClient.get<ListResponse<PaymentLinkUsageResponse>>(
      `/api/payment-links/${paymentLinkId}/usage`,
      { params },
    );
  }

  /**
   * Record payment link usage
   */
  async recordUsage(data: RecordPaymentLinkUsageRequest): Promise<PaymentLinkUsageResponse> {
    return this.httpClient.post<PaymentLinkUsageResponse>('/api/payment-links/usage', data);
  }

  /**
   * Get a specific payment link usage record
   */
  async getUsage(usageId: string): Promise<PaymentLinkUsageResponse> {
    return this.httpClient.get<PaymentLinkUsageResponse>(`/api/payment-links/usage/${usageId}`);
  }
}
