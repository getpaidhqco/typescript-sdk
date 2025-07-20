import { HttpClient } from '../utils/http-client';
import { Organization, CreateOrganizationRequest, ApiKey } from '../types';

export class OrganizationsResource {
  constructor(private httpClient: HttpClient) {}

  async create(data: CreateOrganizationRequest): Promise<Organization> {
    return this.httpClient.post<Organization>('/api/organizations', data);
  }

  async getApiKeys(): Promise<ApiKey[]> {
    return this.httpClient.get<ApiKey[]>('/api/organizations/api-keys');
  }
}