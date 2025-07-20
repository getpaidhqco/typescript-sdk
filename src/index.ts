// Main exports
export { GetPaidHQClient } from './client';
export type { GetPaidHQClientConfig } from './client';

// Export all types
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

// Export version
export const VERSION = '1.0.0';