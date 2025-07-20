export interface RevenueReport {
  currency: string;
  amount: number;
  period: string;
  breakdown?: Array<{
    date: string;
    amount: number;
    change_percent?: number;
  }>;
  metadata?: any;
}

export interface SubscriberReport {
  total_count: number;
  active_count: number;
  trial_count: number;
  past_due_count: number;
  cancelled_count: number;
  date: string;
  change_percent?: number;
  breakdown?: Array<{
    status: string;
    count: number;
    percent: number;
  }>;
}

export interface RefundReport {
  currency: string;
  total_amount: number;
  refund_count: number;
  period: string;
  average_refund_amount: number;
  breakdown?: Array<{
    date: string;
    amount: number;
    count: number;
  }>;
}

export interface ChurnReport {
  period: string;
  churn_rate: number;
  churned_customers: number;
  total_customers: number;
  churned_mrr?: number;
  total_mrr?: number;
  breakdown?: Array<{
    date: string;
    churn_rate: number;
    churned_customers: number;
    reason?: string;
  }>;
}