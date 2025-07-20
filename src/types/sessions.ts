import { BaseEntity, Metadata } from './common';

export interface Session extends BaseEntity {
  type: 'checkout' | 'customer_portal';
  customer_id?: string;
  return_url?: string;
  session_url: string;
  expires_at: string;
  metadata?: Metadata;
}

export interface CreateSessionRequest {
  type: 'checkout' | 'customer_portal';
  customer_id?: string;
  return_url?: string;
  metadata?: Metadata;
}