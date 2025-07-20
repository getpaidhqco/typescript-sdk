import { BaseEntity, DateTime, Metadata, PaginationParams } from './common';

export type DunningCampaignStatus = 'active' | 'paused' | 'completed';

export interface DunningCampaign extends BaseEntity {
  subscription_id: string;
  status: DunningCampaignStatus;
  configuration_id: string;
  current_attempt: number;
  max_attempts: number;
  last_attempt_at?: DateTime;
  next_attempt_at?: DateTime;
  success_at?: DateTime;
  failure_at?: DateTime;
  metadata?: Metadata;
}

export interface DunningAttempt extends BaseEntity {
  campaign_id: string;
  attempt_number: number;
  status: 'pending' | 'succeeded' | 'failed';
  attempted_at: DateTime;
  payment_id?: string;
  failure_reason?: string;
  metadata?: Metadata;
}

export interface DunningCommunication extends BaseEntity {
  campaign_id: string;
  attempt_id: string;
  type: 'email' | 'sms' | 'in_app';
  template_id: string;
  sent_at: DateTime;
  delivered_at?: DateTime;
  opened_at?: DateTime;
  clicked_at?: DateTime;
  metadata?: Metadata;
}

export interface DunningConfiguration extends BaseEntity {
  name: string;
  max_attempts: number;
  retry_schedule: Array<{
    delay_days: number;
    communication_template: string;
  }>;
  grace_period_days: number;
  is_active: boolean;
  metadata?: Metadata;
}

export interface PaymentToken extends BaseEntity {
  subscription_id: string;
  token: string;
  expires_at: DateTime;
  is_used: boolean;
  used_at?: DateTime;
  metadata?: Metadata;
}

export interface PaymentTokenVerification {
  token: string;
  subscription_id: string;
  is_valid: boolean;
  expires_at: DateTime;
  customer_id: string;
  amount_due: number;
  currency: string;
}

export interface UpdateDunningCampaignRequest {
  status?: DunningCampaignStatus;
  metadata?: Metadata;
}

export interface CreateDunningConfigurationRequest {
  name: string;
  max_attempts: number;
  retry_schedule: Array<{
    delay_days: number;
    communication_template: string;
  }>;
  grace_period_days?: number;
  metadata?: Metadata;
}

export interface UpdateDunningConfigurationRequest {
  name?: string;
  max_attempts?: number;
  retry_schedule?: Array<{
    delay_days: number;
    communication_template: string;
  }>;
  grace_period_days?: number;
  metadata?: Metadata;
}

export interface VerifyPaymentTokenRequest {
  token: string;
}

export interface ActivatePaymentTokenRequest {
  token: string;
  payment_method_token: string;
}

export interface DunningCampaignListParams extends PaginationParams {
  status?: DunningCampaignStatus;
  subscription_id?: string;
}