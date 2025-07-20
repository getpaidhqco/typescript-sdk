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
  payment_methods?: PaymentMethod[];
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

export interface PaymentMethod extends BaseEntity {
  customer_id: string;
  type: 'card' | 'bank_account' | 'mobile_money';
  provider: string;
  provider_payment_method_id: string;
  is_default: boolean;
  details: PaymentMethodDetails;
  metadata?: Metadata;
}

export interface PaymentMethodDetails {
  // Card details
  brand?: string;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
  // Bank account details
  bank_name?: string;
  account_type?: string;
  account_last4?: string;
  // Mobile money details
  phone_number?: string;
  provider_name?: string;
}

export interface CreatePaymentMethodRequest {
  type: 'card' | 'bank_account' | 'mobile_money';
  provider: string;
  provider_payment_method_id: string;
  is_default?: boolean;
  metadata?: Metadata;
}

export interface UpdatePaymentMethodRequest {
  is_default?: boolean;
  metadata?: Metadata;
}

export interface CustomerListParams extends PaginationParams {
  status?: 'active' | 'inactive';
  email?: string;
}