import { HttpClient } from '../utils/http-client';
import {
  PspConfiguration,
  CreatePspConfigurationRequest,
  ListResponse,
  PaginationParams,
} from '../types';

export class GatewaysResource {
  private readonly resourcePath = '/api/gateways';

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

  /**
   * List payment gateways
   */
  async list(params?: PaginationParams): Promise<ListResponse<PspConfiguration>> {
    return this.httpClient.get<ListResponse<PspConfiguration>>(
      `${this.resourcePath}${this.buildQueryString(params)}`,
    );
  }

  /**
   * Create a payment gateway
   */
  async create(data: CreatePspConfigurationRequest): Promise<PspConfiguration> {
    return this.httpClient.post<PspConfiguration>(this.resourcePath, data);
  }

  /**
   * Get a gateway by ID
   */
  async get(gatewayId: string): Promise<PspConfiguration> {
    return this.httpClient.get<PspConfiguration>(`${this.resourcePath}/${gatewayId}`);
  }

  /**
   * Update a gateway
   */
  async update(
    gatewayId: string,
    data: Partial<CreatePspConfigurationRequest>,
  ): Promise<PspConfiguration> {
    return this.httpClient.put<PspConfiguration>(`${this.resourcePath}/${gatewayId}`, data);
  }

  /**
   * Delete a gateway
   */
  async delete(gatewayId: string): Promise<void> {
    return this.httpClient.delete(`${this.resourcePath}/${gatewayId}`);
  }
}
