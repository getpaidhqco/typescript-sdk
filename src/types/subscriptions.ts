import { BaseEntity, DateTime, Metadata, Currency, PaginationParams } from './common';

export type SubscriptionStatus =
  | 'trial'
  | 'active'
  | 'past_due'
  | 'non_renewing'
  | 'paused'
  | 'unpaid'
  | 'cancelled'
  | 'pending'
  | 'expired'
  | 'completed'
  | 'error';

export interface Subscription extends BaseEntity {
  customer_id: string;
  status: SubscriptionStatus;
  currency: Currency;
  current_period_start: DateTime;
  current_period_end: DateTime;
  trial_start?: DateTime;
  trial_end?: DateTime;
  cancelled_at?: DateTime;
  cancel_at_period_end: boolean;
  billing_cycle_anchor?: DateTime;
  items: SubscriptionItem[];
  default_payment_method_id?: string;
  metadata?: Metadata;
}

export interface SubscriptionItem extends BaseEntity {
  subscription_id: string;
  price_id: string;
  quantity: number;
  description?: string;
  metadata?: Metadata;
}

export interface CreateSubscriptionRequest {
  customer_id: string;
  items: CreateSubscriptionItemRequest[];
  trial_period_days?: number;
  trial_end?: DateTime;
  billing_cycle_anchor?: DateTime;
  default_payment_method_id?: string;
  metadata?: Metadata;
}

export interface CreateSubscriptionItemRequest {
  price_id: string;
  quantity?: number;
  description?: string;
  metadata?: Metadata;
}

export interface UpdateSubscriptionRequest {
  default_payment_method_id?: string;
  metadata?: Metadata;
  cancel_at_period_end?: boolean;
}

export interface PauseSubscriptionRequest {
  reason: string;
  pause_mode: 'temporary' | 'indefinite';
  resume_at?: DateTime;
}

export interface ResumeSubscriptionRequest {
  reason?: string;
  resume_behavior?: 'continue_existing_period' | 'start_new_period';
  proration_mode?: 'none' | 'credit_unused';
}

export interface CancelSubscriptionRequest {
  reason?: string;
  cancel_at?: 'immediate' | 'period_end';
}

export interface ActivateSubscriptionRequest {
  trial_end?: DateTime;
  billing_cycle_anchor?: DateTime;
}

export interface ChangePlanRequest {
  new_variant_id: string;
  new_price_id: string;
  proration_mode?: 'none' | 'immediate' | 'credit_unused';
  effective_date?: 'immediate' | 'next_billing_cycle';
  reason?: string;
}

export interface UpdateBillingAnchorRequest {
  billing_anchor: number; // Day of month (1-31)
  proration_mode?: 'none' | 'credit_unused';
}

export interface PlanChange {
  id: string;
  subscription_id: string;
  from_items: SubscriptionItem[];
  to_items: SubscriptionItem[];
  effective_date: DateTime;
  proration_amount?: number;
}

export interface ProrationDetails {
  amount: number;
  currency: Currency;
  period_start: DateTime;
  period_end: DateTime;
  description: string;
}

export interface SubscriptionListParams extends PaginationParams {
  status?: SubscriptionStatus;
  customer_id?: string;
}