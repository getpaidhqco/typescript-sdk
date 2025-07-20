import { HttpClient } from '../utils/http-client';
import {
  Payment,
  PaymentMethod,
  RefundPaymentRequest,
  Refund,
  ListResponse,
  PaymentListParams,
} from '../types';

export class PaymentsResource {
  private readonly resourcePath = '/api/payments';

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

  async list(params?: PaymentListParams): Promise<ListResponse<Payment>> {
    return this.httpClient.get<ListResponse<Payment>>(`${this.resourcePath}${this.buildQueryString(params)}`);
  }

  async get(paymentId: string): Promise<Payment> {
    return this.httpClient.get<Payment>(`${this.resourcePath}/${paymentId}`);
  }

  async refund(paymentId: string, data: RefundPaymentRequest): Promise<Refund> {
    return this.httpClient.post<Refund>(`${this.resourcePath}/${paymentId}/refund`, data);
  }

  async getPaymentMethod(paymentMethodId: string): Promise<PaymentMethod> {
    return this.httpClient.get<PaymentMethod>(`/api/payment-methods/${paymentMethodId}`);
  }
}