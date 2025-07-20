import { BaseEntity, DateTime } from './common';

export interface UsageRecord extends BaseEntity {
  subscription_item_id: string;
  quantity: number;
  timestamp: DateTime;
  action?: 'increment' | 'set';
  idempotency_key?: string;
  metadata?: Record<string, any>;
}

export interface RecordUsageRequest {
  subscription_item_id: string;
  quantity: number;
  timestamp?: DateTime;
  action?: 'increment' | 'set';
  idempotency_key?: string;
  metadata?: Record<string, any>;
}

export interface BatchRecordUsageRequest {
  records: RecordUsageRequest[];
}

export interface UsageEvent {
  customer_id: string;
  subscription_item_id: string;
  event_type: string;
  quantity: number;
  timestamp?: DateTime;
  idempotency_key?: string;
}

export interface UsageSummary {
  subscription_id: string;
  subscription_item_id: string;
  billing_period: string;
  usage_type: 'metered' | 'licensed';
  unit_type: string;
  aggregation_type: 'sum' | 'max' | 'average' | 'last_during_period';
  total_quantity: number;
  total_amount: number;
  details?: Record<string, any>;
}

export interface UsageEstimate {
  subscription_id: string;
  estimated_amount: number;
  current_usage: Record<string, any>;
  billing_period: string;
}

export interface UsageEventResponse {
  id: string;
  subscription_item_id: string;
  quantity: number;
  timestamp: DateTime;
  processed: boolean;
}

export interface UsageEstimateResponse {
  subscription_id: string;
  period_start: DateTime;
  period_end: DateTime;
  estimated_total: number;
  line_items: UsageEstimateLineItem[];
}

export interface UsageEstimateLineItem {
  subscription_item_id: string;
  description: string;
  quantity: number;
  unit_amount: number;
  amount: number;
}

export interface UsageResponse {
  id: string;
  status: 'accepted' | 'rejected';
  errors?: string[];
}