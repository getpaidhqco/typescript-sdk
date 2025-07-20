import { HttpClient } from '../utils/http-client';
import { WebhookSubscription, CreateWebhookRequest } from '../types';

export class WebhooksResource {
  private readonly resourcePath = '/api/webhooks';

  constructor(private httpClient: HttpClient) {}

  async list(): Promise<WebhookSubscription[]> {
    return this.httpClient.get<WebhookSubscription[]>(this.resourcePath);
  }

  async create(data: CreateWebhookRequest): Promise<WebhookSubscription> {
    return this.httpClient.post<WebhookSubscription>(this.resourcePath, data);
  }

  async processWebhook(data: any): Promise<{ status: string }> {
    return this.httpClient.post<{ status: string }>('/api/notify', data);
  }

  async processCdcWebhook(data: any): Promise<{ status: string }> {
    return this.httpClient.post<{ status: string }>('/api/notify/cdc', data);
  }
}