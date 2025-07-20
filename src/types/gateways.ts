import { BaseEntity } from './common';

export interface Gateway extends BaseEntity {
  org_id: string;
  psp_id: string;
  name: string;
  settings: Record<string, any>;
  is_active: boolean;
}

export interface CreateGatewayRequest {
  psp_id: string;
  name: string;
  settings: Record<string, any>;
  is_active?: boolean;
}

export interface UpdateGatewayRequest {
  name?: string;
  settings?: Record<string, any>;
  is_active?: boolean;
}