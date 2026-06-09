import { Metadata } from './common';

/** Meter (spec: MeterResponse). */
export interface MeterResponse {
  aggregation: string;
  code: string;
  created_at: string;
  field_name: string;
  id: string;
  metadata: Metadata;
  name: string;
  recurring: boolean;
  rounding_mode: string;
  rounding_scale: number;
  updated_at: string;
}

/** Create meter input (spec: CreateMeterRequest). */
export interface CreateMeterRequest {
  aggregation: string;
  code: string;
  field_name?: string;
  metadata?: Metadata;
  name: string;
  recurring?: boolean;
  rounding_mode?: string;
  rounding_scale?: number;
}
