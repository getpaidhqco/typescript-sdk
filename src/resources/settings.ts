import { HttpClient } from '../utils/http-client';
import { Setting, CreateSettingRequest, UpdateSettingRequest } from '../types';

export class SettingsResource {
  constructor(private httpClient: HttpClient) {}

  async list(parentId: string): Promise<Setting[]> {
    return this.httpClient.get<Setting[]>(`/api/settings/${parentId}`);
  }

  async create(parentId: string, data: CreateSettingRequest): Promise<Setting> {
    return this.httpClient.post<Setting>(`/api/settings/${parentId}`, data);
  }

  async get(parentId: string, settingId: string): Promise<Setting> {
    return this.httpClient.get<Setting>(`/api/settings/${parentId}/${settingId}`);
  }

  async update(parentId: string, settingId: string, data: UpdateSettingRequest): Promise<Setting> {
    return this.httpClient.put<Setting>(`/api/settings/${parentId}/${settingId}`, data);
  }

  async delete(parentId: string, settingId: string): Promise<void> {
    return this.httpClient.delete(`/api/settings/${parentId}/${settingId}`);
  }
}