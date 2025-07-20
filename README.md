# GetPaidHQ TypeScript SDK

Official TypeScript SDK for the GetPaidHQ API - A comprehensive subscription billing platform supporting traditional subscriptions, usage-based billing, and hybrid models.

## Installation

```bash
npm install @getpaidhq/sdk
# or
yarn add @getpaidhq/sdk
# or
pnpm add @getpaidhq/sdk
```

## Quick Start

```typescript
import { GetPaidHQClient } from '@getpaidhq/sdk';

// Initialize with API key
const client = new GetPaidHQClient({
  apiKey: 'sk_your_api_key',
});

// Or initialize with Bearer token
const client = new GetPaidHQClient({
  bearerToken: 'your_bearer_token',
});

// Create a customer
const customer = await client.customers.create({
  email: 'john@example.com',
  first_name: 'John',
  last_name: 'Doe',
  phone: '+27123456789',
  country: 'ZA',
  company: 'Tech Corp',
});
```

## Authentication

The SDK supports two authentication methods:

### API Key Authentication

```typescript
const client = new GetPaidHQClient({
  apiKey: 'sk_your_api_key', // Must start with 'sk_'
});
```

### Bearer Token Authentication

```typescript
const client = new GetPaidHQClient({
  bearerToken: 'your_bearer_token', // OAuth/JWT token
});
```

You can also update authentication credentials at runtime:

```typescript
client.updateApiKey('sk_new_api_key');
// or
client.updateBearerToken('new_bearer_token');
```

## Configuration

```typescript
const client = new GetPaidHQClient({
  apiKey: 'sk_your_api_key',
  baseURL: 'https://api.test.getpaidhq.com', // Optional: custom base URL
  timeout: 60000, // Optional: request timeout in ms (default: 30000)
  retries: 5, // Optional: number of retries (default: 3)
  retryDelay: 2000, // Optional: delay between retries in ms (default: 1000)
  userAgent: 'MyApp/1.0.0', // Optional: custom user agent
});
```

## Resources

### Customers

```typescript
// List customers
const customers = await client.customers.list({
  page: 0,
  limit: 20,
  status: 'active',
  email: 'john@example.com',
});

// Get a customer
const customer = await client.customers.get('customer-123');

// Update a customer
const updated = await client.customers.update('customer-123', {
  email: 'newemail@example.com',
  company: 'New Company Ltd',
});

// Delete a customer
await client.customers.delete('customer-123');

// Suspend/Activate a customer
await client.customers.suspend('customer-123');
await client.customers.activate('customer-123');

// Customer invoices
const invoices = await client.customers.listInvoices('customer-123', {
  status: 'paid',
});

// Payment methods
const paymentMethod = await client.customers.createPaymentMethod('customer-123', {
  type: 'card',
  provider: 'paystack',
  provider_payment_method_id: 'pm_xyz',
  is_default: true,
});
```

### Products and Pricing

```typescript
// Create a product
const product = await client.products.create({
  name: 'Premium Plan',
  description: 'Our premium subscription plan',
  type: 'service',
});

// Create a variant
const variant = await client.products.createVariant(product.id, {
  name: 'Monthly',
  description: 'Monthly billing',
});

// Create a price
const price = await client.prices.create({
  variant_id: variant.id,
  currency: 'USD',
  type: 'recurring',
  billing_scheme: 'per_unit',
  amount: 9999, // $99.99 in cents
  recurring: {
    interval: 'month',
    interval_count: 1,
  },
});
```

### Subscriptions

```typescript
// Create a subscription
const subscription = await client.subscriptions.create({
  customer_id: customer.id,
  items: [
    {
      price_id: price.id,
      quantity: 1,
    },
  ],
  trial_period_days: 14,
});

// Pause a subscription
await client.subscriptions.pause(subscription.id, {
  behavior: 'keep_as_draft',
});

// Resume a subscription
await client.subscriptions.resume(subscription.id, {
  billing_cycle_anchor: 'now',
});

// Cancel a subscription
await client.subscriptions.cancel(subscription.id, {
  behavior: 'mark_uncollectible',
});

// Change subscription plan
const result = await client.subscriptions.changePlan(subscription.id, {
  items: [
    {
      price_id: 'new-price-id',
      quantity: 1,
    },
  ],
  proration_behavior: 'create_prorations',
});
```

### Usage-Based Billing

```typescript
// Record usage (CloudEvents format - recommended)
const usage = await client.usage.recordEvent({
  subscription_item_id: 'si_123',
  quantity: 100,
  timestamp: new Date().toISOString(),
  action: 'increment',
  idempotency_key: 'unique-key-123',
});

// Batch record usage
const batchResult = await client.usage.batchRecord({
  records: [
    {
      subscription_item_id: 'si_123',
      quantity: 50,
      timestamp: '2024-01-01T00:00:00Z',
    },
    {
      subscription_item_id: 'si_124',
      quantity: 75,
      timestamp: '2024-01-01T00:00:00Z',
    },
  ],
});

// Get usage summary
const summary = await client.usage.getSummary('si_123', {
  start_date: '2024-01-01T00:00:00Z',
  end_date: '2024-01-31T23:59:59Z',
});

// Get subscription usage estimate
const estimate = await client.subscriptions.getUsageEstimate('sub_123');
```

### Meters

```typescript
// Create a meter for usage-based billing
const meter = await client.meters.create({
  name: 'API Calls',
  slug: 'api-calls',
  event_type: 'api_request',
  aggregation_method: 'count',
  filters: [
    {
      property: 'environment',
      operator: 'eq',
      value: 'production',
    },
  ],
});

// Get meter by slug
const meter = await client.meters.getBySlug('api-calls');
```

### Invoices

```typescript
// Create an invoice
const invoice = await client.invoices.create({
  customer_id: customer.id,
  due_date: '2024-02-01T00:00:00Z',
  line_items: [
    {
      description: 'Premium subscription',
      quantity: 1,
      unit_amount: 9999, // $99.99 in cents
    },
  ],
});

// Send an invoice
await client.invoices.send(invoice.id);

// Mark as paid
await client.invoices.markPaid(invoice.id);

// Generate PDF
const pdfBlob = await client.invoices.generatePdf(invoice.id);
```

### Payment Gateways

```typescript
// Create a payment gateway
const gateway = await client.gateways.create({
  psp_id: 'paystack',
  name: 'Paystack Gateway',
  settings: {
    api_key: 'sk_paystack_key',
    connect_id: 'connect_123',
  },
  is_active: true,
});

// List gateways
const gateways = await client.gateways.list();
```

### Organizations and Settings

```typescript
// Create an organization (onboarding)
const org = await client.organizations.create({
  name: 'Tech Corp',
  email: 'admin@techcorp.com',
  website: 'https://techcorp.com',
});

// Get API keys
const apiKeys = await client.organizations.getApiKeys();

// Manage settings
const settings = await client.settings.list('org_123');
await client.settings.update('org_123', {
  value: 'new_value',
  description: 'Updated setting',
});
```

## Error Handling

The SDK provides typed errors for better error handling:

```typescript
import { 
  GetPaidHQError,
  ValidationError,
  AuthenticationError,
  NotFoundError,
  RateLimitError 
} from '@getpaidhq/sdk';

try {
  const customer = await client.customers.get('invalid_id');
} catch (error) {
  if (error instanceof NotFoundError) {
    console.error('Customer not found:', error.message);
  } else if (error instanceof ValidationError) {
    console.error('Validation failed:', error.details);
  } else if (error instanceof RateLimitError) {
    console.error('Rate limited, retry after:', error.retryAfter);
  } else if (error instanceof AuthenticationError) {
    console.error('Authentication failed');
  } else if (error instanceof GetPaidHQError) {
    console.error('API error:', error.statusCode, error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Pagination

All list endpoints support pagination:

```typescript
const result = await client.customers.list({
  page: 0, // 0-based page number
  limit: 50, // Items per page (max 100)
  sort_by: 'created_at',
  sort_order: 'desc',
});

console.log('Total customers:', result.meta.total);
console.log('Current page:', result.meta.page);
console.log('Customers:', result.data);
```

## TypeScript Support

The SDK is written in TypeScript and provides full type definitions:

```typescript
import type { 
  Customer, 
  Subscription, 
  Invoice,
  CreateCustomerRequest,
  SubscriptionStatus 
} from '@getpaidhq/sdk';

// All types are fully typed
const createCustomer = async (data: CreateCustomerRequest): Promise<Customer> => {
  return await client.customers.create(data);
};

// Type-safe status checks
const activeSubscriptions = subscriptions.filter(
  (sub): sub is Subscription & { status: 'active' } => sub.status === 'active'
);
```

## Advanced Usage

### Custom HTTP Client Access

For advanced use cases, you can access the underlying Axios instance:

```typescript
const axios = client.httpClient.getAxiosInstance();

// Add custom interceptors
axios.interceptors.request.use((config) => {
  console.log('Request:', config.url);
  return config;
});
```

### Health Check

```typescript
const health = await client.healthCheck();
console.log('API Status:', health.status); // "ok"
```

## API Reference

For detailed API documentation, visit [https://docs.getpaidhq.com/api](https://docs.getpaidhq.com/api)

## Support

- Documentation: [https://docs.getpaidhq.com](https://docs.getpaidhq.com)
- Email: support@getpaidhq.com
- Issues: [GitHub Issues](https://github.com/getpaidhq/typescript-sdk/issues)

## License

MIT License - see LICENSE file for details