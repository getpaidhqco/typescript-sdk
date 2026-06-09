/** Payment service provider gateway (spec: GatewayResponse). */
export interface GatewayResponse {
  created_at: string;
  id: string;
  name: string;
  updated_at: string;
}

/** Create gateway input (spec: CreateGatewayRequest). */
export interface CreateGatewayRequest {
  name: string;
  psp: string;
  settings: Record<string, string>;
}
