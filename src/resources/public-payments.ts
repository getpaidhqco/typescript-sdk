import { HttpClient } from '../utils/http-client';
import {
  PublicPaymentDetailsResponse,
  PublicCreateOrderRequest,
  PublicOrderResponse,
  PublicOrderStatusResponse,
} from '../types';

export class PublicPaymentsResource {
  private readonly resourcePath = '/api/pay';

  constructor(private httpClient: HttpClient) {}

  async getPublicPaymentDetails(slug: string): Promise<PublicPaymentDetailsResponse> {
    return this.httpClient.get<PublicPaymentDetailsResponse>(`${this.resourcePath}/${slug}`);
  }

  async createPublicPaymentOrder(
    slug: string,
    data: PublicCreateOrderRequest,
  ): Promise<PublicOrderResponse> {
    return this.httpClient.post<PublicOrderResponse>(
      `${this.resourcePath}/${slug}/create-order`,
      data,
    );
  }

  async getPublicOrderStatus(slug: string, orderId: string): Promise<PublicOrderStatusResponse> {
    return this.httpClient.get<PublicOrderStatusResponse>(
      `${this.resourcePath}/${slug}/order/${orderId}/status`,
    );
  }
}
