# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the official TypeScript SDK for GetPaidHQ API - a comprehensive subscription billing platform. The SDK is built with TypeScript and provides type-safe access to customers, products, subscriptions, usage-based billing, public payments, and other billing-related resources.

## Development Commands

**Build and Development:**
- `pnpm run build` - Build the SDK for production (uses tsup)
- `pnpm run dev` - Build in watch mode for development
- `pnpm run type-check` - Run TypeScript type checking without emitting files

**Testing:**
- `pnpm run test` - Run tests with Vitest
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run test:coverage` - Run tests with coverage report

**Code Quality:**
- `pnpm run lint` - Lint TypeScript files with ESLint
- `pnpm run lint:fix` - Auto-fix linting issues
- `pnpm run format` - Format code with Prettier

**Package Management:**
- Uses `pnpm` as package manager
- `pnpm run prepublishOnly` - Runs build before publishing

## Architecture

**Core Components:**
- `GetPaidHQClient` - Main SDK client class that orchestrates all resources
- `AuthManager` - Handles API key and Bearer token authentication
- `HttpClient` - Axios-based HTTP client with retry logic and error handling
- Resource classes - Individual API resource handlers (customers, products, subscriptions, usage, public payments, carts, etc.)

**Authentication:**
- Supports three authentication methods with priority order:
  1. API key authentication (x-api-key header) - highest priority
  2. Bearer token authentication (Authorization header) 
  3. Token authentication (query parameter) - for public endpoints only
- API key takes precedence over Bearer token, which takes precedence over token
- Token authentication automatically appends `?token=<value>` to request URLs for public payment endpoints
- Auth can be updated at runtime via client methods

**Resource Architecture:**
- Each API resource (customers, products, etc.) is implemented as a separate class
- Resources are instantiated in the main client and exposed as public readonly properties
- All resources use the shared HttpClient for consistent request handling

**Error Handling:**
- Custom error hierarchy extending base `GetPaidHQError`
- Specific error types: `AuthenticationError`, `ValidationError`, `NotFoundError`, `RateLimitError`, `ServerError`
- Automatic retry logic for network errors and 5xx responses with exponential backoff

**Types:**
- Comprehensive TypeScript types organized by domain (customers, products, subscriptions, etc.)
- Common types shared across resources
- Full type definitions exported for external use

**Build System:**
- Uses `tsup` for building both CJS and ESM outputs
- Generates TypeScript declaration files
- Source maps and minification enabled for production builds
- Target: ES2022 with Node.js 18+ support

**Testing:**
- Vitest for unit testing with V8 coverage
- MSW for API mocking in tests
- Test configuration excludes build artifacts and type definitions

## Recent Updates

**OpenAPI Spec Version 1.0.3 Implementation:**
- Updated SPEC_VERSION to '1.0.3' in src/index.ts
- Added Public Payments feature with 3 new endpoints:
  - `GET /api/pay/{slug}` - Get public payment details (no auth required)
  - `POST /api/pay/{slug}/create-order` - Create public payment order
  - `GET /api/pay/{slug}/order/{orderId}/status` - Get public order status
- Created PublicPaymentsResource class with comprehensive type definitions
- Added Cart management functionality (CartsResource)
- Enhanced invoice payment capabilities with initiate payment endpoint

**Available Resources:**
- CustomersResource, ProductsResource, VariantsResource, PricesResource
- SubscriptionsResource, UsageResource, OrganizationsResource, MetersResource
- OrdersResource, PaymentsResource, InvoicesResource, DunningResource
- WebhooksResource, ReportsResource, SettingsResource, GatewaysResource
- SessionsResource, DiscountsResource, PaymentLinksResource, CartsResource
- PublicPaymentsResource (new)

## Authentication Implementation Details

**Token Authentication for Public Endpoints:**
- The `AuthManager.applyAuth()` method correctly handles token-based authentication
- When `token` is provided in client config, it's automatically appended as a query parameter
- Implementation uses Axios `params` property which converts to query string: `/api/pay/:slug?token=<value>`
- Token authentication is specifically designed for public payment endpoints that don't require API keys
- Authentication priority: API Key > Bearer Token > Token (query param)

**Testing Token Authentication:**
- Direct AuthManager testing confirms token is added to `params` object
- Integration testing with real server requests validates end-to-end functionality
- Server responses confirm token is received and processed correctly