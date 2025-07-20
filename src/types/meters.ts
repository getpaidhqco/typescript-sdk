import { BaseEntity, Metadata } from './common';

export interface Meter extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  event_type: string;
  aggregation_method: 'sum' | 'max' | 'count' | 'unique_count';
  value_property?: string;
  unique_property?: string;
  filters?: MeterFilter[];
  status: 'active' | 'inactive';
  metadata?: Metadata;
}

export interface MeterFilter {
  property: string;
  operator: 'eq' | 'ne' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'nin';
  value: any;
}

export interface CreateMeterRequest {
  name: string;
  slug: string;
  description?: string;
  event_type: string;
  aggregation_method: 'sum' | 'max' | 'count' | 'unique_count';
  value_property?: string;
  unique_property?: string;
  filters?: MeterFilter[];
  metadata?: Metadata;
}

export interface UpdateMeterRequest {
  name?: string;
  description?: string;
  status?: 'active' | 'inactive';
  filters?: MeterFilter[];
  metadata?: Metadata;
}