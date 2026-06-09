import { BillingAddress, Metadata } from './common';

/**
 * Create customer input (spec: CreateCustomerInput).
 * The spec exposes no fixed schema for this body, so it is intentionally open.
 */
export type CreateCustomerInput = Record<string, any>;

/** Customer (spec: CustomerResponse). */
export interface CustomerResponse {
  billing_address: BillingAddress;
  created_at: string;
  email: string;
  first_name: string;
  id: string;
  last_name: string;
  metadata: Metadata;
  name: string;
  phone: string;
  updated_at: string;
}

/** Customer dunning history (spec: CustomerDunningHistoryResponse). */
export interface CustomerDunningHistoryResponse {
  avg_recovery_time_hours: number;
  customer_id: string;
  dunning_risk_tier: string;
  failed_campaigns: number;
  first_dunning_at: string;
  last_dunning_at: string;
  last_recovery_at: string;
  most_responsive_channel: string;
  payment_reliability_score: number;
  preferred_recovery_method: string;
  successful_recoveries: number;
  total_amount_at_risk: number;
  total_amount_lost: number;
  total_amount_recovered: number;
  total_dunning_campaigns: number;
}
