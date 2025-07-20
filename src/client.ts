import { AuthManager } from './auth/auth';
import { HttpClient, HttpClientConfig } from './utils/http-client';
import { CustomersResource } from './resources/customers';
import { ProductsResource, VariantsResource, PricesResource } from './resources/products';
import { SubscriptionsResource } from './resources/subscriptions';
import { UsageResource } from './resources/usage';

export interface GetPaidHQClientConfig {
  /**
   * API key for authentication (starts with 'sk_')
   */
  apiKey?: string;

  /**
   * Bearer token for OAuth authentication
   */
  bearerToken?: string;

  /**
   * Base URL for the API
   * @default https://api.getpaidhq.com
   */
  baseURL?: string;

  /**
   * Request timeout in milliseconds
   * @default 30000 (30 seconds)
   */
  timeout?: number;

  /**
   * Number of retry attempts for failed requests
   * @default 3
   */
  retries?: number;

  /**
   * Delay between retries in milliseconds
   * @default 1000 (1 second)
   */
  retryDelay?: number;

  /**
   * Custom user agent string
   */
  userAgent?: string;
}

export class GetPaidHQClient {
  private authManager: AuthManager;
  private httpClient: HttpClient;

  // Resources
  public readonly customers: CustomersResource;
  public readonly products: ProductsResource;
  public readonly variants: VariantsResource;
  public readonly prices: PricesResource;
  public readonly subscriptions: SubscriptionsResource;
  public readonly usage: UsageResource;

  constructor(config: GetPaidHQClientConfig) {
    // Validate auth config
    if (!config.apiKey && !config.bearerToken) {
      throw new Error('Either apiKey or bearerToken must be provided');
    }

    // Initialize auth manager
    this.authManager = new AuthManager({
      apiKey: config.apiKey,
      bearerToken: config.bearerToken,
    });

    // Initialize HTTP client
    const httpConfig: HttpClientConfig = {
      baseURL: config.baseURL || 'https://api.getpaidhq.com',
      timeout: config.timeout,
      retries: config.retries,
      retryDelay: config.retryDelay,
      userAgent: config.userAgent,
    };

    this.httpClient = new HttpClient(httpConfig, this.authManager);

    // Initialize resources
    this.customers = new CustomersResource(this.httpClient);
    this.products = new ProductsResource(this.httpClient);
    this.variants = new VariantsResource(this.httpClient);
    this.prices = new PricesResource(this.httpClient);
    this.subscriptions = new SubscriptionsResource(this.httpClient);
    this.usage = new UsageResource(this.httpClient);
  }

  /**
   * Update API key for authentication
   */
  updateApiKey(apiKey: string): void {
    this.authManager.updateApiKey(apiKey);
  }

  /**
   * Update bearer token for authentication
   */
  updateBearerToken(bearerToken: string): void {
    this.authManager.updateBearerToken(bearerToken);
  }

  /**
   * Check API health
   */
  async healthCheck(): Promise<{ status: string }> {
    return this.httpClient.get<{ status: string }>('/api/health');
  }
}