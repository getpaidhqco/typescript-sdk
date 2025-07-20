import { HttpClient } from '../utils/http-client';
import {
  Invoice,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceLineItem,
  CreateInvoiceLineItemRequest,
  UpdateInvoiceLineItemRequest,
  InvoiceHistory,
  ListResponse,
  InvoiceListParams,
} from '../types';

export class InvoicesResource {
  private readonly resourcePath = '/api/invoices';

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

  async list(params?: InvoiceListParams): Promise<ListResponse<Invoice>> {
    return this.httpClient.get<ListResponse<Invoice>>(
      `${this.resourcePath}${this.buildQueryString(params)}`,
    );
  }

  async create(data: CreateInvoiceRequest): Promise<Invoice> {
    return this.httpClient.post<Invoice>(this.resourcePath, data);
  }

  async get(invoiceId: string): Promise<Invoice> {
    return this.httpClient.get<Invoice>(`${this.resourcePath}/${invoiceId}`);
  }

  async update(invoiceId: string, data: UpdateInvoiceRequest): Promise<Invoice> {
    return this.httpClient.put<Invoice>(`${this.resourcePath}/${invoiceId}`, data);
  }

  async performAction(
    invoiceId: string,
    action: 'send' | 'finalize' | 'void' | 'mark_paid',
  ): Promise<Invoice> {
    return this.httpClient.post<Invoice>(`${this.resourcePath}/${invoiceId}/actions`, { action });
  }

  async send(invoiceId: string): Promise<Invoice> {
    return this.performAction(invoiceId, 'send');
  }

  async finalize(invoiceId: string): Promise<Invoice> {
    return this.performAction(invoiceId, 'finalize');
  }

  async void(invoiceId: string): Promise<Invoice> {
    return this.performAction(invoiceId, 'void');
  }

  async markPaid(invoiceId: string): Promise<Invoice> {
    return this.performAction(invoiceId, 'mark_paid');
  }

  async listLineItems(invoiceId: string): Promise<InvoiceLineItem[]> {
    return this.httpClient.get<InvoiceLineItem[]>(`${this.resourcePath}/${invoiceId}/line-items`);
  }

  async addLineItem(
    invoiceId: string,
    data: CreateInvoiceLineItemRequest,
  ): Promise<InvoiceLineItem> {
    return this.httpClient.post<InvoiceLineItem>(
      `${this.resourcePath}/${invoiceId}/line-items`,
      data,
    );
  }

  async updateLineItem(
    invoiceId: string,
    lineItemId: string,
    data: UpdateInvoiceLineItemRequest,
  ): Promise<InvoiceLineItem> {
    return this.httpClient.put<InvoiceLineItem>(
      `${this.resourcePath}/${invoiceId}/line-items/${lineItemId}`,
      data,
    );
  }

  async deleteLineItem(invoiceId: string, lineItemId: string): Promise<{ status: string }> {
    return this.httpClient.delete<{ status: string }>(
      `${this.resourcePath}/${invoiceId}/line-items/${lineItemId}`,
    );
  }

  async listHistory(invoiceId: string): Promise<InvoiceHistory[]> {
    return this.httpClient.get<InvoiceHistory[]>(`${this.resourcePath}/${invoiceId}/history`);
  }

  async generatePdf(invoiceId: string): Promise<Blob> {
    const response = await this.httpClient.getAxiosInstance().post(
      `${this.resourcePath}/${invoiceId}/pdf`,
      {},
      {
        responseType: 'blob',
      },
    );
    return response.data;
  }
}
