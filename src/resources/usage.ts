import { HttpClient } from '../utils/http-client';
import {
  UsageRecord,
  RecordUsageRequest,
  BatchRecordUsageRequest,
  CloudEventUsageRequest,
  CloudEventUsageResponse,
  ListResponse,
  PaginationParams,
  UsageSummary,
} from '../types';

export class UsageResource {
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

  async recordCloudEvent(data: CloudEventUsageRequest): Promise<CloudEventUsageResponse> {
    return this.httpClient.post<CloudEventUsageResponse>('/api/usage-events', data);
  }

  async record(data: RecordUsageRequest): Promise<UsageRecord> {
    return this.httpClient.post<UsageRecord>('/api/usage-records', data);
  }

  async batchRecord(
    data: BatchRecordUsageRequest,
  ): Promise<{ records: UsageRecord[]; total_count: number }> {
    return this.httpClient.post<{ records: UsageRecord[]; total_count: number }>(
      '/api/usage-records/batch',
      data,
    );
  }

  async list(
    params: { subscription_item_id: string } & PaginationParams,
  ): Promise<ListResponse<UsageRecord>> {
    const queryString = this.buildQueryString(params);
    return this.httpClient.get<ListResponse<UsageRecord>>(`/api/usage-records${queryString}`);
  }

  async getUsageRecord(usageRecordId: string): Promise<UsageRecord> {
    return this.httpClient.get<UsageRecord>(`/api/usage-records/${usageRecordId}`);
  }

  async deleteUsageRecord(usageRecordId: string): Promise<void> {
    return this.httpClient.delete(`/api/usage-records/${usageRecordId}`);
  }

  async getSummary(
    subscriptionItemId: string,
    params: { start_date: string; end_date: string },
  ): Promise<UsageSummary> {
    const queryString = this.buildQueryString(params);
    return this.httpClient.get<UsageSummary>(
      `/api/subscription-items/${subscriptionItemId}/usage-summary${queryString}`,
    );
  }
}
