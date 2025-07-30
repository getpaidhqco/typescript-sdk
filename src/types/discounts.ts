import { BaseEntity } from './common';

export interface Discount extends BaseEntity {
  id: string;
  org_id: string;
  name: string;
  type: 'fixed' | 'percentage';
  value: number;
  code?: string;
  starts_at?: string;
  ends_at?: string;
  max_redemptions?: number;
  recurring: 'once' | 'forever' | 'cycles';
  cycles?: number;
  currency?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
  metadata?: Record<string, any>;
}

export interface DiscountRedemption extends BaseEntity {
  id: string;
  org_id: string;
  discount_id: string;
  customer_id: string;
  resource_type: 'subscription' | 'invoice' | 'payment' | 'checkout_session';
  resource_id: string;
  discount_amount: number;
  currency: string;
  created_at: string;
  metadata?: Record<string, any>;
}

export interface CreateDiscountRequest {
  name: string;
  type: 'fixed' | 'percentage';
  value: number;
  code?: string;
  starts_at?: string;
  ends_at?: string;
  max_redemptions?: number;
  recurring: 'once' | 'forever' | 'cycles';
  cycles?: number;
  currency?: string;
  active?: boolean;
  metadata?: Record<string, any>;
}

export interface UpdateDiscountRequest {
  name?: string;
  code?: string;
  starts_at?: string;
  ends_at?: string;
  max_redemptions?: number;
  active?: boolean;
  metadata?: Record<string, any>;
}

export interface ValidateDiscountRequest {
  code: string;
  customer_id?: string;
  amount?: number;
  currency?: string;
}

export interface DiscountValidationResponse {
  valid: boolean;
  discount?: Discount;
  discount_amount?: number;
  final_amount?: number;
  error?: string;
}

export interface ApplyDiscountRequest {
  discount_id?: string;
  code?: string;
  customer_id: string;
  resource_type: 'subscription' | 'invoice' | 'payment' | 'checkout_session';
  resource_id: string;
  amount: number;
  currency: string;
}

export interface DiscountApplicationResponse {
  discount: Discount;
  redemption: DiscountRedemption;
  discount_amount: number;
  final_amount: number;
}

// List query parameters
export interface ListDiscountsParams {
  page?: number;
  limit?: number;
  active?: boolean;
  type?: 'fixed' | 'percentage';
  recurring?: 'once' | 'forever' | 'cycles';
}

export interface ListDiscountRedemptionsParams {
  page?: number;
  limit?: number;
  customer_id?: string;
  resource_type?: 'subscription' | 'invoice' | 'payment' | 'checkout_session';
}
