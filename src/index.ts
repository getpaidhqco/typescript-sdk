// Main exports
export { GetPaidHQClient } from './client';
export type { GetPaidHQClientConfig } from './client';

// Export version
export const SPEC_VERSION = '1.0.5';

// Export individual resources for tree-shaking
export {
  CustomersResource,
  ProductsResource,
  VariantsResource,
  PricesResource,
  SubscriptionsResource,
  UsageResource,
  OrganizationsResource,
  MetersResource,
  OrdersResource,
  PaymentsResource,
  InvoicesResource,
  DunningResource,
  WebhooksResource,
  ReportsResource,
  SettingsResource,
  GatewaysResource,
  SessionsResource,
  DiscountsResource,
  PaymentLinksResource,
  CartsResource,
  PublicPaymentsResource,
} from './resources';

// Export commonly used types (tree-shakeable)
export type {
  // Common
  ListResponse,
  PaginationParams,
  ErrorResponse,
  ApiError,
  Address,
  // Customer types
  Customer,
  CreateCustomerRequest,
  UpdateCustomerRequest,
  CustomerListParams,
  // Product types
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  Variant,
  CreateVariantRequest,
  UpdateVariantRequest,
  Price,
  CreatePriceRequest,
  UpdatePriceRequest,
  // Subscription types
  Subscription,
  CreateSubscriptionRequest,
  UpdateSubscriptionRequest,
  SubscriptionListParams,
  SubscriptionStatus,
  PauseSubscriptionRequest,
  ResumeSubscriptionRequest,
  CancelSubscriptionRequest,
  ChangePlanRequest,
  // Usage types
  UsageRecord,
  RecordUsageRequest,
  BatchRecordUsageRequest,
  CloudEventUsageRequest,
  CloudEventUsageResponse,
  UsageSummary,
  // Payment types
  Payment,
  PaymentMethod,
  Refund,
  RefundPaymentRequest,
  // Invoice types
  Invoice,
  InvoiceLineItem,
  CreateInvoiceRequest,
  UpdateInvoiceRequest,
  InvoiceListParams,
  InitiateInvoicePaymentRequest,
  InitiatePaymentResponse,
  // Order types
  Order,
  OrderItem,
  CreateOrderRequest,
  CompleteOrderRequest,
  // Organization types
  Organization,
  CreateOrganizationRequest,
  // Meter types
  Meter,
  CreateMeterRequest,
  UpdateMeterRequest,
  // Dunning types
  DunningCampaign,
  DunningConfiguration,
  CreateDunningConfigurationRequest,
  UpdateDunningConfigurationRequest,
  // Webhook types
  WebhookSubscription,
  CreateWebhookRequest,
  WebhookEvent,
  // Report types
  RevenueReport,
  SubscriberReport,
  RefundReport,
  ChurnReport,
  // Settings types
  Setting,
  CreateSettingRequest,
  UpdateSettingRequest,
  // Gateway types
  PspConfiguration,
  CreatePspConfigurationRequest,
  // Session types
  Session,
  CreateSessionRequest,
  // Public Payments types
  PublicPaymentDetailsResponse,
  PublicInvoiceResponse,
  PublicInvoiceLineItem,
  PublicCustomerResponse,
  PublicCreateOrderRequest,
  PublicOrderResponse,
  PublicOrderStatusResponse,
} from './types';

// Export all other types as wildcard (less tree-shakeable but comprehensive)
export * from './types';

// Export errors
export {
  GetPaidHQError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError,
} from './errors/errors';
