import { BaseEntity, Currency, Metadata, PaginationParams } from './common';

export type OrderStatus =
  | 'pending'
  | 'failed'
  | 'refunded'
  | 'partial_refund'
  | 'completed'
  | 'expired'
  | 'cancelled'
  | 'fraudulent';

export interface Order extends BaseEntity {
  customer_id: string;
  status: OrderStatus;
  reference?: string;
  session_id?: string;
  currency: Currency;
  sub_total: number;
  discount: number;
  tax: number;
  total: number;
  line_items?: OrderLineItem[];
  metadata?: Metadata;
}

export interface OrderLineItem {
  price_id: string;
  quantity: number;
  amount: number;
  description?: string;
}

export interface CreateOrderRequest {
  customer_id: string;
  currency?: Currency;
  line_items: CreateOrderLineItemRequest[];
  metadata?: Metadata;
}

export interface CreateOrderLineItemRequest {
  price_id: string;
  quantity: number;
}

export interface CompleteOrderRequest {
  payment_method_id?: string;
  return_url?: string;
}

export interface AddCartItemRequest {
  price_id: string;
  quantity: number;
}

export interface RemoveCartItemRequest {
  price_id: string;
}

export interface OrderListParams extends PaginationParams {
  status?: OrderStatus;
  customer_id?: string;
}