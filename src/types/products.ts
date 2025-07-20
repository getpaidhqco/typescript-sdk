import { BaseEntity, Metadata } from './common';

export interface Product extends BaseEntity {
  name: string;
  description?: string;
  status: 'active' | 'inactive';
  type: 'product' | 'service';
  metadata?: Metadata;
  variants?: Variant[];
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  type: 'product' | 'service';
  metadata?: Metadata;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
  metadata?: Metadata;
}

export interface Variant extends BaseEntity {
  product_id: string;
  name: string;
  description?: string;
  sku?: string;
  status: 'active' | 'inactive';
  metadata?: Metadata;
  prices?: Price[];
}

export interface CreateVariantRequest {
  name: string;
  description?: string;
  sku?: string;
  metadata?: Metadata;
}

export interface UpdateVariantRequest {
  name?: string;
  description?: string;
  sku?: string;
  status?: 'active' | 'inactive';
  metadata?: Metadata;
}

export interface Price extends BaseEntity {
  variant_id: string;
  label?: string;
  category: 'one_time' | 'subscription' | 'usage' | 'hybrid' | 'free' | 'variable';
  scheme: 'fixed' | 'tiered' | 'volume' | 'graduated';
  cycles?: number;
  currency: string;
  unit_price?: number;
  min_price?: number;
  suggested_price?: number;
  billing_interval: 'none' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  billing_interval_qty?: number;
  trial_interval: 'none' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  trial_interval_qty?: number;
  has_usage?: boolean;
  usage_type?: 'metered' | 'licensed';
  unit_type?: string;
  aggregation_type?: 'sum' | 'max' | 'average' | 'last_during_period';
  percentage_rate?: number;
  tiers?: PricingTier[];
  tax_code?: string;
  metadata?: Metadata;
}

export interface PricingTier {
  up_to: number;
  unit_price: number;
  flat_fee?: number;
}

export interface RecurringConfig {
  interval: 'none' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  interval_count: number;
  trial_period_days?: number;
}

export interface UsageConfig {
  unit: string;
  aggregation_type: 'sum' | 'max' | 'average' | 'last_during_period';
  unit_amount?: number;
  tiers?: PricingTier[];
  package_size?: number;
}

export interface CreatePriceRequest {
  variant_id: string;
  label?: string;
  category: 'one_time' | 'subscription' | 'usage' | 'hybrid' | 'free' | 'variable';
  scheme: 'fixed' | 'tiered' | 'volume' | 'graduated';
  cycles?: number;
  currency: string;
  unit_price?: number;
  min_price?: number;
  suggested_price?: number;
  billing_interval: 'none' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  billing_interval_qty?: number;
  trial_interval: 'none' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  trial_interval_qty?: number;
  has_usage?: boolean;
  usage_type?: 'metered' | 'licensed';
  unit_type?: string;
  aggregation_type?: 'sum' | 'max' | 'average' | 'last_during_period';
  percentage_rate?: number;
  tiers?: PricingTier[];
  tax_code?: string;
  metadata?: Metadata;
}

export interface UpdatePriceRequest {
  label?: string;
  metadata?: Metadata;
}
