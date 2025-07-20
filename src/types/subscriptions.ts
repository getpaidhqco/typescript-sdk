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
  resume_at?: DateTime;
  behavior?: 'keep_as_draft' | 'mark_uncollectible' | 'void';
}

export interface ResumeSubscriptionRequest {
  billing_cycle_anchor?: 'now' | 'unchanged';
}

export interface ActivateSubscriptionRequest {
  trial_end?: DateTime;
  billing_cycle_anchor?: DateTime;
}

export interface ChangePlanRequest {
  items: CreateSubscriptionItemRequest[];
  proration_behavior?: 'create_prorations' | 'none' | 'always_invoice';
  billing_cycle_anchor?: 'now' | 'unchanged' | DateTime;
}

export interface UpdateBillingAnchorRequest {
  billing_cycle_anchor: DateTime;
  proration_behavior?: 'create_prorations' | 'none';
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