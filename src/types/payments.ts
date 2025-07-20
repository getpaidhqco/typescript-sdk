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
  customer_id: string;
  amount: number;
  currency: Currency;
  status: PaymentStatus;
  payment_method_id: string;
  description?: string;
  statement_descriptor?: string;
  invoice_id?: string;
  subscription_id?: string;
  attempt_count: number;
  next_attempt_at?: DateTime;
  failure_reason?: string;
  provider_payment_id?: string;
  refunded_amount?: number;
  metadata?: Metadata;
}

export interface Refund extends BaseEntity {
  payment_id: string;
  amount: number;
  currency: Currency;
  reason?: string;
  status: 'pending' | 'succeeded' | 'failed' | 'cancelled';
  failure_reason?: string;
  provider_refund_id?: string;
  metadata?: Metadata;
}

export interface RefundPaymentRequest {
  amount?: number; // If not provided, full refund
  reason?: string;
  metadata?: Metadata;
}

export interface PaymentListParams extends PaginationParams {
  status?: PaymentStatus;
  customer_id?: string;
}