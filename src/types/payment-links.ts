import { BaseEntity } from './common';

export interface PaymentLink extends BaseEntity {
  id: string;
  slug: string;
  data?: Record<string, any>;
  config: Record<string, any>;
  single_use: boolean;
  status: 'active' | 'inactive' | 'expired' | 'used';
  created_at: string;
  updated_at: string;
  used_at?: string;
  expires_at?: string;
}

export interface PaymentLinkUsage extends BaseEntity {
  id: string;
  payment_link_id: string;
  session_id?: string;
  customer_id?: string;
  event_type: string;
  ip_address?: string;
  user_agent?: string;
  referer?: string;
  country?: string;
  metadata?: Record<string, any>;
  timestamp: string;
}

export interface CreatePaymentLinkRequest {
  slug: string;
  data?: Record<string, any>;
  config: Record<string, any>;
  single_use?: boolean;
  expires_at?: string;
}

export interface UpdatePaymentLinkRequest {
  slug?: string;
  data?: Record<string, any>;
  config?: Record<string, any>;
  single_use?: boolean;
  status?: 'active' | 'inactive' | 'expired' | 'used';
  expires_at?: string;
}

export interface RecordPaymentLinkUsageRequest {
  payment_link_id: string;
  session_id?: string;
  customer_id?: string;
  event_type: string;
  ip_address?: string;
  user_agent?: string;
  referer?: string;
  country?: string;
  metadata?: Record<string, any>;
}

// List query parameters
export interface ListPaymentLinksParams {
  page?: number;
  limit?: number;
  status?: 'active' | 'inactive' | 'expired' | 'used';
  slug?: string;
}

export interface ListPaymentLinkUsagesParams {
  page?: number;
  limit?: number;
  event_type?: string;
  start_date?: string;
  end_date?: string;
}

// Response types
export interface PaymentLinkResponse extends PaymentLink {}

export interface PaymentLinkUsageResponse extends PaymentLinkUsage {}
