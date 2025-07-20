import { BaseEntity, Metadata } from './common';

export interface Organization extends BaseEntity {
  name: string;
  country: string;
  timezone: string;
  metadata?: Metadata;
}

export interface CreateOrganizationRequest {
  name: string;
  country: string; // ISO 3166-1 alpha-2 country code
  timezone: string; // IANA timezone identifier
  metadata?: Metadata;
}

export interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  scopes: string[];
  expires_at?: string;
  created_at: string;
  last_used_at?: string;
}
