import { BaseEntity, Currency, Metadata, PaginationParams } from './common';
import { Product, Price } from './products';

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

export interface ValidateCouponRequest {
  coupon_code: string;
}

export interface Cart {
  id: string;
  customer_id?: string;
  items: CartItem[];
  discounts?: CartDiscount[];
  subtotal_amount: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  product_id: string;
  price_id: string;
  quantity: number;
  unit_amount: number;
  total_amount: number;
  product?: Product;
  price?: Price;
}

export interface CartDiscount {
  discount_id: string;
  amount: number;
  type: 'fixed' | 'percentage';
}

export interface CartResponse extends Cart {}

export interface OrderListParams extends PaginationParams {
  status?: OrderStatus;
  customer_id?: string;
}
