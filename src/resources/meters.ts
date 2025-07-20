import { HttpClient } from '../utils/http-client';
import {
  Meter,
  CreateMeterRequest,
  UpdateMeterRequest,
  ListResponse,
  PaginationParams,
} from '../types';

export class MetersResource {
  private readonly resourcePath = '/api/meters';

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

  async list(params?: PaginationParams): Promise<ListResponse<Meter>> {
    return this.httpClient.get<ListResponse<Meter>>(`${this.resourcePath}${this.buildQueryString(params)}`);
  }

  async create(data: CreateMeterRequest): Promise<Meter> {
    return this.httpClient.post<Meter>(this.resourcePath, data);
  }

  async get(meterId: string): Promise<Meter> {
    return this.httpClient.get<Meter>(`${this.resourcePath}/${meterId}`);
  }

  async getBySlug(slug: string): Promise<Meter> {
    return this.httpClient.get<Meter>(`${this.resourcePath}/slug/${slug}`);
  }

  async update(meterId: string, data: UpdateMeterRequest): Promise<Meter> {
    return this.httpClient.put<Meter>(`${this.resourcePath}/${meterId}`, data);
  }

  async delete(meterId: string): Promise<void> {
    return this.httpClient.delete(`${this.resourcePath}/${meterId}`);
  }
}