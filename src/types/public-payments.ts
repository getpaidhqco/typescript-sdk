import { Address } from './common';
import { Order } from './orders';

export interface PublicPaymentDetailsResponse {
  type: 'invoice' | 'checkout';
  invoice?: PublicInvoiceResponse;
  checkout_items?: Record<string, any>;
  payment_config: Record<string, any>;
  org_id: string;
}

export interface PublicInvoiceResponse {
  id: string;
  doc_number: string;
  total: number;
  amount_due: string;
  currency: string;
  due_at?: string | null;
  line_items: PublicInvoiceLineItem[];
  customer?: PublicCustomerResponse;
}

export interface PublicInvoiceLineItem {
  description: string;
  quantity: string;
  unit_price: number;
  line_total: number;
}

export interface PublicCustomerResponse {
  email: string;
  first_name?: string;
  last_name?: string;
  billing_address?: Address;
}

export interface PublicCreateOrderRequest {
  payment_processor: string;
  customer_email?: string;
  customer_name?: string;
  billing_address?: Address;
  success_url?: string;
  cancel_url?: string;
  metadata?: Record<string, string>;
}

export interface CreateOrderResponse {
  order: Order;
  psp: Record<string, any>;
}

export interface PublicOrderResponse {
  order_id: string;
  payment_processor: string;
  redirect_url?: string;
  client_secret?: string;
  session_id?: string;
  reference: string;
  amount: number;
  currency: string;
  status: string;
}

export interface PublicOrderStatusResponse {
  order_id: string;
  status: string;
  payment_status?: string;
  amount: number;
  currency: string;
}
