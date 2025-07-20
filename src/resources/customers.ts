import { HttpClient } from '../utils/http-client';
import {
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerListParams,
  ListResponse,
  PaymentMethod,
  CreatePaymentMethodRequest,
  UpdatePaymentMethodRequest,
  Invoice,
  InvoiceListParams,
  Order,
} from '../types';

export class CustomersResource {
  private readonly resourcePath = '/api/customers';

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

  async list(params?: CustomerListParams): Promise<ListResponse<Customer>> {
    return this.httpClient.get<ListResponse<Customer>>(`${this.resourcePath}${this.buildQueryString(params)}`);
  }

  async create(data: CreateCustomerRequest): Promise<Customer> {
    return this.httpClient.post<Customer>(this.resourcePath, data);
  }

  async get(customerId: string): Promise<Customer> {
    return this.httpClient.get<Customer>(`${this.resourcePath}/${customerId}`);
  }

  async update(customerId: string, data: UpdateCustomerRequest): Promise<Customer> {
    return this.httpClient.patch<Customer>(`${this.resourcePath}/${customerId}`, data);
  }

  async delete(customerId: string): Promise<void> {
    return this.httpClient.delete(`${this.resourcePath}/${customerId}`);
  }

  async suspend(customerId: string): Promise<Customer> {
    return this.update(customerId, { status: 'inactive' });
  }

  async activate(customerId: string): Promise<Customer> {
    return this.update(customerId, { status: 'active' });
  }

  async getOrders(_customerId: string): Promise<Order[]> {
    console.warn('getOrders endpoint not implemented in API');
    return [];
  }

  async listInvoices(
    customerId: string,
    params?: InvoiceListParams,
  ): Promise<ListResponse<Invoice>> {
    const queryString = this.buildQueryString(params);
    return this.httpClient.get<ListResponse<Invoice>>(
      `${this.resourcePath}/${customerId}/invoices${queryString}`,
    );
  }

  async createPaymentMethod(
    customerId: string,
    data: CreatePaymentMethodRequest,
  ): Promise<PaymentMethod> {
    return this.httpClient.post<PaymentMethod>(
      `${this.resourcePath}/${customerId}/payment-methods`,
      data,
    );
  }

  async updatePaymentMethod(
    customerId: string,
    paymentMethodId: string,
    data: UpdatePaymentMethodRequest,
  ): Promise<PaymentMethod> {
    return this.httpClient.put<PaymentMethod>(
      `${this.resourcePath}/${customerId}/payment-methods/${paymentMethodId}`,
      data,
    );
  }

  async getDunningHistory(customerId: string): Promise<any[]> {
    return this.httpClient.get<any[]>(`${this.resourcePath}/${customerId}/dunning-history`);
  }
}