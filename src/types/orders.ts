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
  tax_total: number;
  discount_total: number;
  total: number;
  items?: OrderItem[];
  customer?: any; // Customer object
  metadata?: Metadata;
}

export interface OrderItem extends BaseEntity {
  order_id: string;
  product_id: string;
  variant_id: string;
  price_id: string;
  description?: string;
  quantity: number;
  unit_price: number;
  sub_total: number;
  total: number;
  tax_total: number;
  discount_total: number;
  metadata?: Metadata;
}

export interface CreateOrderRequest {
  customer: { id: string } | any; // Existing customer ID or new customer data
  payment_method_id?: string;
  session_id?: string;
  psp_id: string;
  cart?: {
    currency?: Currency;
    items: Array<{
      product_id: string;
      price_id: string;
      quantity: number;
    }>;
  };
  metadata?: Metadata;
}

export interface CompleteOrderRequest {
  payment_method_id?: string;
  payment_method?: {
    token: string;
    type: 'card' | 'bank_account';
  };
  payment?: {
    amount: number;
    currency: Currency;
  };
  metadata?: Metadata;
}

export interface AddCartItemRequest {
  product_id: string;
  price_id: string;
  quantity: number;
}

export interface RemoveCartItemRequest {
  product_id: string;
}

export interface OrderListParams extends PaginationParams {
  status?: OrderStatus;
  customer_id?: string;
}
