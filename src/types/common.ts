// Common types used across the SDK

export interface ListResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    has_more: boolean;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface ErrorResponse {
  error: string;
  message?: string;
  details?: Record<string, any>;
}

export interface ApiError {
  code: string;
  message: string;
  details?: string | Record<string, any>;
}

export interface Address {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
}

export type Currency = string; // ISO 4217 currency code

export type DateTime = string; // ISO 8601 date-time string

export type Metadata = Record<string, string>;

export interface BaseEntity {
  id: string;
  created_at: DateTime;
  updated_at: DateTime;
}
