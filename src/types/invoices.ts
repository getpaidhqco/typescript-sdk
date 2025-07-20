import { BaseEntity, Currency, DateTime, Metadata, PaginationParams } from './common';

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'refunded';

export type InvoiceType = 'invoice' | 'proforma' | 'quote' | 'receipt' | 'statement';

export type InvoiceCategory =
  | 'initial'
  | 'recurring'
  | 'usage'
  | 'adjustment'
  | 'setup'
  | 'cancellation'
  | 'refund';

export interface Invoice extends BaseEntity {
  customer_id: string;
  order_id?: string;
  subscription_id?: string;
  sequence_id?: string;
  doc_number?: string;
  type: InvoiceType;
  invoice_type: InvoiceCategory;
  status: InvoiceStatus;
  is_immutable: boolean;
  currency: Currency;
  sub_total: number;
  tax_total: number;
  discount_total: number;
  total: number;
  amount_paid: number;
  amount_due: number;
  tax_provider?: string;
  tax_transaction_id?: string;
  tax_breakdown?: any;
  issued_at?: DateTime;
  due_at?: DateTime;
  schedule_at?: DateTime;
  finalize_at?: DateTime;
  paid_at?: DateTime;
  notes?: string;
  customer_notes?: string;
  metadata?: Metadata;
  exchange_rate?: number;
  base_currency?: Currency;
  customer?: any; // Customer object
  line_items?: InvoiceLineItem[];
  payments?: any[]; // Payment objects
}

export interface InvoiceLineItem extends BaseEntity {
  invoice_id: string;
  product_id?: string;
  variant_id?: string;
  price_id?: string;
  description: string;
  category?: string;
  quantity: number;
  unit_price: number;
  line_total: number;
  discount_type?: 'percentage' | 'fixed';
  discount_value?: number;
  discount_total?: number;
  tax_code?: string;
  tax_rate?: number;
  tax_amount?: number;
  tax_exempt?: boolean;
  seq?: number;
  metadata?: Metadata;
}

export interface CreateInvoiceRequest {
  customer_id: string;
  order_id?: string;
  subscription_id?: string;
  type: InvoiceType;
  invoice_type: InvoiceCategory;
  currency: Currency;
  due_at?: DateTime;
  notes?: string;
  customer_notes?: string;
  metadata?: Metadata;
  line_items?: CreateInvoiceLineItemRequest[];
}

export interface CreateInvoiceLineItemRequest {
  product_id?: string;
  variant_id?: string;
  price_id?: string;
  description: string;
  category?: string;
  quantity: number;
  unit_price: number;
  discount_type?: 'percentage' | 'fixed';
  discount_value?: number;
  tax_code?: string;
  tax_rate?: number;
  tax_exempt?: boolean;
  metadata?: Metadata;
}

export interface UpdateInvoiceRequest {
  customer_notes?: string;
  notes?: string;
  due_at?: DateTime;
  metadata?: Metadata;
}

export interface UpdateInvoiceLineItemRequest {
  description?: string;
  category?: string;
  quantity?: number;
  unit_price?: number;
  discount_type?: 'percentage' | 'fixed';
  discount_value?: number;
  tax_code?: string;
  tax_rate?: number;
  tax_exempt?: boolean;
  metadata?: Metadata;
}

export interface InvoiceHistory {
  id: string;
  invoice_id: string;
  action: 'created' | 'updated' | 'finalized' | 'sent' | 'paid' | 'voided';
  field?: string;
  old_value?: any;
  new_value?: any;
  user_email?: string;
  reason?: string;
  timestamp: DateTime;
}

export interface InvoiceListParams extends PaginationParams {
  status?: InvoiceStatus;
  customer_id?: string;
}
