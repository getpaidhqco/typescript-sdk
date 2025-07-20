import { BaseEntity } from './common';

export interface Meter extends BaseEntity {
  org_id: string;
  slug: string;
  name: string;
  description?: string;
  event_name: string;
  aggregation_type: 'sum' | 'max' | 'average' | 'last_during_period';
  value_property: string;
  unit_type?: string;
  is_active: boolean;
}

export interface CreateMeterRequest {
  slug: string;
  name: string;
  description?: string;
  event_name: string;
  aggregation_type: 'sum' | 'max' | 'average' | 'last_during_period';
  value_property: string;
  unit_type?: string;
}

export interface UpdateMeterRequest {
  name?: string;
  description?: string;
  event_name?: string;
  aggregation_type?: 'sum' | 'max' | 'average' | 'last_during_period';
  value_property?: string;
  unit_type?: string;
  is_active?: boolean;
}