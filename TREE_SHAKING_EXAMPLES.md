# Tree-Shaking Examples

This SDK is fully optimized for tree-shaking, allowing consumers to import only what they need.

## Full Client Usage (includes everything)

```typescript
import { GetPaidHQClient } from '@getpaidhq/sdk';

const client = new GetPaidHQClient({ apiKey: 'sk_...' });
await client.customers.list();
```

## Individual Resource Usage (tree-shakeable)

```typescript
import { CustomersResource } from '@getpaidhq/sdk';
import { HttpClient } from '@getpaidhq/sdk/client';

// Only imports customers functionality
const httpClient = new HttpClient(config, authManager);
const customers = new CustomersResource(httpClient);
await customers.list();
```

## Specific Module Imports (highly tree-shakeable)

```typescript
// Import only specific resources
import { CustomersResource, PaymentsResource } from '@getpaidhq/sdk/resources';

// Import only specific types
import type { Customer, Payment } from '@getpaidhq/sdk/types';

// Import only specific errors
import { ValidationError, NotFoundError } from '@getpaidhq/sdk/errors';
```

## Type-Only Imports (zero runtime cost)

```typescript
import type {
  Customer,
  CreateCustomerRequest,
  Payment,
  Invoice
} from '@getpaidhq/sdk';

// These imports have zero runtime cost
function processCustomer(customer: Customer): void {
  // Type-safe operations
}
```

## Bundle Analysis

The SDK is built with:
- ✅ **ES Modules** - Modern import/export syntax
- ✅ **Code Splitting** - Separate chunks for different modules
- ✅ **Tree-shaking enabled** - Dead code elimination
- ✅ **Side-effect free** - `"sideEffects": false` in package.json
- ✅ **Multiple entry points** - Granular imports possible
- ✅ **Named exports** - Better for static analysis

## Bundle Sizes

| Import Style | Approximate Size | Use Case |
|--------------|------------------|----------|
| Full client | ~18KB | Complete SDK functionality |
| Individual resources | ~2-5KB per resource | Specific API operations |
| Types only | 0KB | Type definitions only |
| Specific functions | <1KB per function | Minimal footprint |

## Optimal Usage Patterns

### For Full-Featured Apps
```typescript
import { GetPaidHQClient } from '@getpaidhq/sdk';
```

### For Micro-services/Serverless
```typescript
import { CustomersResource } from '@getpaidhq/sdk/resources';
import type { Customer } from '@getpaidhq/sdk/types';
```

### For Libraries/Components
```typescript
import type { Customer, Payment } from '@getpaidhq/sdk/types';
// Only import types for interfaces, implement your own HTTP layer
```