import { HttpClient } from '../utils/http-client';
import { PspConfiguration, CreatePspConfigurationRequest } from '../types';

export class GatewaysResource {
  constructor(private httpClient: HttpClient) {}

  async create(data: CreatePspConfigurationRequest): Promise<PspConfiguration> {
    return this.httpClient.post<PspConfiguration>('/api/gateways', data);
  }
}
