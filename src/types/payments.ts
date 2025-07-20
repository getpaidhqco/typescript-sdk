import { BaseEntity, Currency, DateTime, Metadata, PaginationParams } from './common';

export type PaymentStatus =
  | 'pending'
  | 'failed'
  | 'succeeded'
  | 'refunded'
  | 'partial_refund'
  | 'cancelled'
  | 'expired'
  | 'fraudulent';

export interface Payment extends BaseEntity {
  psp: string;
  psp_id: string;
  reference?: string;
  recurring: boolean;
  order_id?: string;
  invoice_id?: string;
  subscription_id?: string;
  customer_id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  psp_fee?: number;
  platform_fee?: number;
  net_amount?: number;
  refunded_amount?: number;
  metadata?: Metadata;
  completed_at?: DateTime;
}

export interface Refund extends BaseEntity {
  psp_refund_id?: string;
  payment_id: string;
  amount: number;
  currency: Currency;
  reason?: string;
  status: 'pending' | 'completed' | 'error';
  refunded_at?: DateTime;
  completed_at?: DateTime;
}

export interface RefundPaymentRequest {
  reason?: string;
  amount?: number; // Amount to refund in cents (if not provided, full amount)
}

export interface PaymentListParams extends PaginationParams {
  status?: PaymentStatus;
  customer_id?: string;
}

export interface PaymentMethod extends BaseEntity {
  status: 'active' | 'expired';
  psp: string;
  name: string;
  customer_id: string;
  billing_address?: any; // Address object
  details?: any; // Masked payment method details
  type: 'card' | 'bank_account';
  token: string;
  is_default: boolean;
  metadata?: Metadata;
  expire_at?: DateTime;
}