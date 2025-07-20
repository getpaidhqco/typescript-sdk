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
  currency: string;
  type: 'one_time' | 'recurring' | 'usage_based';
  billing_scheme: 'per_unit' | 'tiered' | 'volume' | 'graduated';
  amount?: number; // For per_unit pricing (in cents)
  tiers?: PriceTier[];
  recurring?: RecurringConfig;
  usage?: UsageConfig;
  metadata?: Metadata;
}

export interface PriceTier {
  up_to: number | null; // null means infinity
  unit_amount: number;
  flat_amount?: number;
}

export interface RecurringConfig {
  interval: 'day' | 'week' | 'month' | 'year';
  interval_count: number;
  trial_period_days?: number;
}

export interface UsageConfig {
  unit: string;
  aggregation_method: 'sum' | 'max' | 'last_during_period' | 'last_ever';
  unit_amount?: number;
  tiers?: PriceTier[];
  package_size?: number;
}

export interface CreatePriceRequest {
  variant_id: string;
  currency: string;
  type: 'one_time' | 'recurring' | 'usage_based';
  billing_scheme: 'per_unit' | 'tiered' | 'volume' | 'graduated';
  amount?: number;
  tiers?: PriceTier[];
  recurring?: RecurringConfig;
  usage?: UsageConfig;
  metadata?: Metadata;
}

export interface UpdatePriceRequest {
  metadata?: Metadata;
  active?: boolean;
}