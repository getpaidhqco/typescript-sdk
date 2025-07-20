import { BaseEntity } from './common';

export type WebhookEvent =
  | 'subscription.created'
  | 'subscription.updated'
  | 'subscription.cancelled'
  | 'invoice.created'
  | 'invoice.finalized'
  | 'invoice.payment_succeeded'
  | 'invoice.payment_failed'
  | 'payment.succeeded'
  | 'payment.failed'
  | 'customer.created'
  | 'customer.updated'
  | 'usage.recorded';

export interface WebhookSubscription extends BaseEntity {
  url: string;
  events: WebhookEvent[];
  secret: string;
  is_active: boolean;
  metadata?: any;
}

export interface CreateWebhookRequest {
  url: string;
  events: WebhookEvent[];
  secret?: string;
}