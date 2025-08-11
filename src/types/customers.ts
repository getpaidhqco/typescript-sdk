import { BaseEntity, Address, Metadata, PaginationParams } from './common';

export interface Customer extends BaseEntity {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  billing_address?: Address;
  shipping_address?: Address;
  status: 'active' | 'inactive';
  metadata?: Metadata;
  payment_methods?: any[];
  default_payment_method_id?: string;
}

export interface CreateCustomerRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  billing_address?: Address;
  shipping_address?: Address;
  metadata?: Metadata;
}

export interface UpdateCustomerRequest {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  company?: string;
  billing_address?: Address;
  shipping_address?: Address;
  metadata?: Metadata;
  status?: 'active' | 'inactive';
}

export interface CreatePaymentMethodRequest {
  psp: string;
  name: string;
  type: 'card' | 'bank_account';
  details?: any;
  token: string;
  is_default?: boolean;
  billing_address?: Address;
  metadata?: Metadata;
}

export interface UpdatePaymentMethodRequest {
  name?: string;
  is_default?: boolean;
  billing_address?: Address;
  metadata?: Metadata;
}

export interface CustomerListParams extends PaginationParams {
  status?: 'active' | 'inactive';
  email?: string;
}

export interface MrrBreakdownItem {
  subscription_id: string;
  product_name: string;
  monthly_amount: number;
  billing_interval: 'month' | 'year' | 'week' | 'day';
  normalized_monthly?: number;
  next_billing: string;
}

export interface CustomerMrrResponse {
  customer_id: string;
  total_mrr: number;
  currency: string;
  breakdown: MrrBreakdownItem[];
  projected_annual_revenue: number;
}
