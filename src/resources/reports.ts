import { HttpClient } from '../utils/http-client';
import { RevenueReport, SubscriberReport, RefundReport, ChurnReport } from '../types';

export class ReportsResource {
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

  async getMrr(params?: { start_date?: string; end_date?: string }): Promise<RevenueReport> {
    return this.httpClient.get<RevenueReport>(
      `/api/reports/revenue/mrr${this.buildQueryString(params)}`,
    );
  }

  async getArr(params?: { year?: number }): Promise<RevenueReport> {
    return this.httpClient.get<RevenueReport>(
      `/api/reports/revenue/arr${this.buildQueryString(params)}`,
    );
  }

  async getActiveSubscribers(params?: { date?: string }): Promise<SubscriberReport> {
    return this.httpClient.get<SubscriberReport>(
      `/api/reports/active-subscribers${this.buildQueryString(params)}`,
    );
  }

  async getRefundTotals(params?: {
    start_date?: string;
    end_date?: string;
  }): Promise<RefundReport> {
    return this.httpClient.get<RefundReport>(
      `/api/reports/refunds${this.buildQueryString(params)}`,
    );
  }

  async getChurnTotals(params?: { start_date?: string; end_date?: string }): Promise<ChurnReport> {
    return this.httpClient.get<ChurnReport>(
      `/api/reports/churn/totals${this.buildQueryString(params)}`,
    );
  }

  async getChurnRates(params?: {
    period?: 'monthly' | 'quarterly' | 'yearly';
  }): Promise<ChurnReport> {
    return this.httpClient.get<ChurnReport>(
      `/api/reports/churn/rates${this.buildQueryString(params)}`,
    );
  }
}
