import { BaseEntity, Metadata } from './common';

export interface Organization extends BaseEntity {
  name: string;
  email: string;
  website?: string;
  logo_url?: string;
  billing_email?: string;
  tax_id?: string;
  metadata?: Metadata;
}

export interface CreateOrganizationRequest {
  name: string;
  email: string;
  website?: string;
  logo_url?: string;
  billing_email?: string;
  tax_id?: string;
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