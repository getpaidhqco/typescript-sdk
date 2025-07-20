import { HttpClient } from '../utils/http-client';
import {
  DunningCampaign,
  DunningConfiguration,
  DunningAttempt,
  DunningCommunication,
  CreateDunningConfigurationRequest,
  UpdateDunningConfigurationRequest,
  UpdateDunningCampaignRequest,
  PaymentToken,
  PaymentTokenVerification,
  VerifyPaymentTokenRequest,
  ActivatePaymentTokenRequest,
  ListResponse,
  DunningCampaignListParams,
} from '../types';

export class DunningResource {
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

  // Campaigns
  async listCampaigns(params?: DunningCampaignListParams): Promise<ListResponse<DunningCampaign>> {
    return this.httpClient.get<ListResponse<DunningCampaign>>(
      `/api/dunning/campaigns${this.buildQueryString(params)}`,
    );
  }

  async getCampaign(campaignId: string): Promise<DunningCampaign> {
    return this.httpClient.get<DunningCampaign>(`/api/dunning/campaigns/${campaignId}`);
  }

  async updateCampaign(campaignId: string, data: UpdateDunningCampaignRequest): Promise<DunningCampaign> {
    return this.httpClient.patch<DunningCampaign>(`/api/dunning/campaigns/${campaignId}`, data);
  }

  async listCampaignAttempts(campaignId: string): Promise<DunningAttempt[]> {
    return this.httpClient.get<DunningAttempt[]>(`/api/dunning/campaigns/${campaignId}/attempts`);
  }

  async triggerManualAttempt(campaignId: string): Promise<DunningAttempt> {
    return this.httpClient.post<DunningAttempt>(`/api/dunning/campaigns/${campaignId}/attempts`, {});
  }

  async listCampaignCommunications(campaignId: string): Promise<DunningCommunication[]> {
    return this.httpClient.get<DunningCommunication[]>(`/api/dunning/campaigns/${campaignId}/communications`);
  }

  // Configurations
  async listConfigurations(): Promise<DunningConfiguration[]> {
    return this.httpClient.get<DunningConfiguration[]>('/api/dunning/configurations');
  }

  async createConfiguration(data: CreateDunningConfigurationRequest): Promise<DunningConfiguration> {
    return this.httpClient.post<DunningConfiguration>('/api/dunning/configurations', data);
  }

  async getConfiguration(configId: string): Promise<DunningConfiguration> {
    return this.httpClient.get<DunningConfiguration>(`/api/dunning/configurations/${configId}`);
  }

  async updateConfiguration(
    configId: string,
    data: UpdateDunningConfigurationRequest,
  ): Promise<DunningConfiguration> {
    return this.httpClient.patch<DunningConfiguration>(`/api/dunning/configurations/${configId}`, data);
  }

  // Payment tokens
  async verifyPaymentToken(data: VerifyPaymentTokenRequest): Promise<PaymentTokenVerification> {
    return this.httpClient.post<PaymentTokenVerification>('/api/payment-tokens/verify', data);
  }

  async activatePaymentToken(data: ActivatePaymentTokenRequest): Promise<{ status: string }> {
    return this.httpClient.post<{ status: string }>('/api/payment-tokens/activate', data);
  }

  async createSubscriptionPaymentToken(subscriptionId: string): Promise<PaymentToken> {
    return this.httpClient.post<PaymentToken>(`/api/admin/subscriptions/${subscriptionId}/payment-tokens`, {});
  }
}