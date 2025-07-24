import { AxiosRequestConfig } from 'axios';

export interface AuthConfig {
  apiKey?: string;
  getToken?: () => Promise<string | null>;
}

export class AuthManager {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    if (!config.apiKey && !config.getToken) {
      throw new Error('Either apiKey or bearerToken must be provided');
    }
    this.config = config;
  }

  async applyAuth(requestConfig: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    if (!requestConfig.headers) {
      requestConfig.headers = {};
    }

    // API Key takes precedence over Bearer token
    if (this.config.apiKey) {
      requestConfig.headers['X-API-Key'] = this.config.apiKey;
    } else {
      requestConfig.headers['Authorization'] = `Bearer ${await this.config.getToken?.()}`;
    }

    return requestConfig;
  }

  updateApiKey(apiKey: string): void {
    this.config.apiKey = apiKey;
  }

  getAuthType(): 'apiKey' | 'bearer' | null {
    if (this.config.apiKey) return 'apiKey';
    return 'bearer';
  }
}
