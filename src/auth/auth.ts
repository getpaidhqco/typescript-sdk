import { AxiosRequestConfig } from 'axios';

export interface AuthConfig {
  apiKey?: string;
  bearerToken?: string;
}

export class AuthManager {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    if (!config.apiKey && !config.bearerToken) {
      throw new Error('Either apiKey or bearerToken must be provided');
    }
    this.config = config;
  }

  applyAuth(requestConfig: AxiosRequestConfig): AxiosRequestConfig {
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }

    // API Key takes precedence over Bearer token
    if (this.config.apiKey) {
      requestConfig.headers['X-API-Key'] = this.config.apiKey;
    } else if (this.config.bearerToken) {
      requestConfig.headers['Authorization'] = `Bearer ${this.config.bearerToken}`;
    }

    return requestConfig;
  }

  updateApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
    // Clear bearer token when API key is set
    delete this.config.bearerToken;
  }

  updateBearerToken(bearerToken: string): void {
    this.config.bearerToken = bearerToken;
    // Clear API key when bearer token is set
    delete this.config.apiKey;
  }

  getAuthType(): 'apiKey' | 'bearer' | null {
    if (this.config.apiKey) return 'apiKey';
    if (this.config.bearerToken) return 'bearer';
    return null;
  }
}