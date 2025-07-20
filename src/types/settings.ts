import { BaseEntity } from './common';

export interface Setting extends BaseEntity {
  parent_id: string;
  key: string;
  value: string;
  description?: string;
}

export interface CreateSettingRequest {
  key: string;
  value: string;
  description?: string;
}

export interface UpdateSettingRequest {
  value?: string;
  description?: string;
}