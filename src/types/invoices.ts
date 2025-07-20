import { BaseEntity, Currency, DateTime, Address, Metadata, PaginationParams } from './common';

export type InvoiceStatus =
  | 'draft'
  | 'sent'
  | 'paid'
  | 'overdue'
  | 'cancelled'
  | 'refunded';

export interface Invoice extends BaseEntity {
  customer_id: string;
  number: string;
  status: InvoiceStatus;
  currency: Currency;
  subtotal: number;
  tax: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  due_date?: DateTime;
  paid_at?: DateTime;
  period_start?: DateTime;
  period_end?: DateTime;
  subscription_id?: string;
  billing_address?: Address;
  line_items?: InvoiceLineItem[];
  payment_intent_id?: string;
  metadata?: Metadata;
}

export interface InvoiceLineItem extends BaseEntity {
  invoice_id: string;
  description: string;
  quantity: number;
  unit_amount: number;
  amount: number;
  currency: Currency;
  period_start?: DateTime;
  period_end?: DateTime;
  price_id?: string;
  metadata?: Metadata;
}

export interface CreateInvoiceRequest {
  customer_id: string;
  currency?: Currency;
  due_date?: DateTime;
  description?: string;
  line_items?: CreateInvoiceLineItemRequest[];
  auto_advance?: boolean;
  collection_method?: 'charge_automatically' | 'send_invoice';
  metadata?: Metadata;
}

export interface CreateInvoiceLineItemRequest {
  description: string;
  quantity: number;
  unit_amount: number;
  currency?: Currency;
  period_start?: DateTime;
  period_end?: DateTime;
  price_id?: string;
  metadata?: Metadata;
}

export interface UpdateInvoiceRequest {
  description?: string;
  due_date?: DateTime;
  metadata?: Metadata;
}

export interface UpdateInvoiceLineItemRequest {
  description?: string;
  quantity?: number;
  unit_amount?: number;
  metadata?: Metadata;
}

export interface InvoiceHistory {
  id: string;
  invoice_id: string;
  action: string;
  timestamp: DateTime;
  user_id?: string;
  details?: Record<string, any>;
}

export interface InvoiceListParams extends PaginationParams {
  status?: InvoiceStatus;
  customer_id?: string;
}