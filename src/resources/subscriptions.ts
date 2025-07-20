import { HttpClient } from '../utils/http-client';
import {
  Subscription,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  SubscriptionListParams,
  ListResponse,
  PauseSubscriptionRequest,
  ResumeSubscriptionRequest,
  CancelSubscriptionRequest,
  ActivateSubscriptionRequest,
  ChangePlanRequest,
  UpdateBillingAnchorRequest,
  Payment,
  PaginationParams,
  UsageEventResponse,
  UsageEstimateResponse,
} from '../types';

export class SubscriptionsResource {
  private readonly resourcePath = '/api/subscriptions';

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

  async list(params?: SubscriptionListParams): Promise<ListResponse<Subscription>> {
    return this.httpClient.get<ListResponse<Subscription>>(
      `${this.resourcePath}${this.buildQueryString(params)}`,
    );
  }

  async create(data: CreateSubscriptionRequest): Promise<Subscription> {
    return this.httpClient.post<Subscription>(this.resourcePath, data);
  }

  async get(subscriptionId: string): Promise<Subscription> {
    return this.httpClient.get<Subscription>(`${this.resourcePath}/${subscriptionId}`);
  }

  async update(subscriptionId: string, data: UpdateSubscriptionRequest): Promise<Subscription> {
    return this.httpClient.patch<Subscription>(`${this.resourcePath}/${subscriptionId}`, data);
  }

  async pause(subscriptionId: string, data: PauseSubscriptionRequest): Promise<Subscription> {
    return this.httpClient.put<Subscription>(`${this.resourcePath}/${subscriptionId}/pause`, data);
  }

  async resume(subscriptionId: string, data: ResumeSubscriptionRequest): Promise<Subscription> {
    return this.httpClient.put<Subscription>(`${this.resourcePath}/${subscriptionId}/resume`, data);
  }

  async activate(
    subscriptionId: string,
    data?: ActivateSubscriptionRequest,
  ): Promise<Subscription> {
    return this.httpClient.put<Subscription>(
      `${this.resourcePath}/${subscriptionId}/activate`,
      data || {},
    );
  }

  async cancel(subscriptionId: string, data: CancelSubscriptionRequest): Promise<Subscription> {
    return this.httpClient.put<Subscription>(`${this.resourcePath}/${subscriptionId}/cancel`, data);
  }

  async changePlan(
    subscriptionId: string,
    data: ChangePlanRequest,
  ): Promise<{ subscription: Subscription; plan_change: any }> {
    return this.httpClient.put<{ subscription: Subscription; plan_change: any }>(
      `${this.resourcePath}/${subscriptionId}/change-plan`,
      data,
    );
  }

  async updateBillingAnchor(
    subscriptionId: string,
    data: UpdateBillingAnchorRequest,
  ): Promise<{ subscription: Subscription; proration_details: any }> {
    return this.httpClient.put<{ subscription: Subscription; proration_details: any }>(
      `${this.resourcePath}/${subscriptionId}/billing-anchor`,
      data,
    );
  }

  async listPayments(
    subscriptionId: string,
    params?: PaginationParams,
  ): Promise<ListResponse<Payment>> {
    const queryString = this.buildQueryString(params);
    return this.httpClient.get<ListResponse<Payment>>(
      `${this.resourcePath}/${subscriptionId}/payments${queryString}`,
    );
  }

  async getUsage(
    subscriptionId: string,
    params?: { start_date?: string; end_date?: string },
  ): Promise<{ items: UsageEventResponse[]; count: number }> {
    const queryString = this.buildQueryString(params);
    return this.httpClient.get<{ items: UsageEventResponse[]; count: number }>(
      `${this.resourcePath}/${subscriptionId}/usage${queryString}`,
    );
  }

  async getUsageEstimate(subscriptionId: string): Promise<UsageEstimateResponse> {
    return this.httpClient.get<UsageEstimateResponse>(
      `${this.resourcePath}/${subscriptionId}/estimate`,
    );
  }
}
