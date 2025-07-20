import { describe, it, expect } from 'vitest';
import { GetPaidHQClient } from '../src';

describe('GetPaidHQ SDK', () => {
  it('should initialize with API key', () => {
    const client = new GetPaidHQClient({
      apiKey: 'sk_test_123',
    });

    expect(client).toBeDefined();
    expect(client.customers).toBeDefined();
    expect(client.subscriptions).toBeDefined();
    expect(client.products).toBeDefined();
  });

  it('should initialize with bearer token', () => {
    const client = new GetPaidHQClient({
      bearerToken: 'test_bearer_token',
    });

    expect(client).toBeDefined();
  });

  it('should throw error without authentication', () => {
    expect(() => {
      new GetPaidHQClient({} as any);
    }).toThrow('Either apiKey or bearerToken must be provided');
  });

  it('should allow updating authentication', () => {
    const client = new GetPaidHQClient({
      apiKey: 'sk_test_123',
    });

    // Should not throw
    client.updateApiKey('sk_new_key');
    client.updateBearerToken('new_token');
  });
});