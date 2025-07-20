# GetPaidHQ SDK Development Guidelines

This document provides guidelines and instructions for developing and maintaining the GetPaidHQ TypeScript SDK.

## Build/Configuration Instructions

### Prerequisites

- Node.js >= 18
- pnpm 10.11.0 or later (recommended package manager)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Build Commands

- **Development Build (with watch mode)**:
  ```bash
  pnpm dev
  ```

- **Production Build**:
  ```bash
  pnpm build
  ```

### Build Configuration

The build process uses `tsup`, configured in `tsup.config.ts`:

- Entry point: `src/index.ts`
- Output formats: CommonJS and ESM
- TypeScript declarations are generated
- Source maps are included
- Output is minified and tree-shaken
- Target: ES2022
- Output directory: `dist/`

## Testing Information

### Test Framework

The project uses Vitest for testing, which is similar to Jest but optimized for Vite projects.

### Running Tests

- **Run all tests**:
  ```bash
  pnpm test
  ```

- **Run tests in watch mode** (for development):
  ```bash
  pnpm test:watch
  ```

- **Run tests with coverage**:
  ```bash
  pnpm test:coverage
  ```

### Test Configuration

Tests are configured in `vitest.config.ts`:
- Node.js environment
- Coverage reports in text, JSON, and HTML formats
- Excludes node_modules, dist, type definitions, and test files from coverage

### Writing Tests

1. Create test files in the `tests/` directory with the `.test.ts` or `.spec.ts` extension
2. Use the Vitest API (similar to Jest):
   ```typescript
   import { describe, it, expect } from 'vitest';
   
   describe('Feature', () => {
     it('should behave as expected', () => {
       // Test code
       expect(result).toBe(expectedValue);
     });
   });
   ```

3. Example test structure:
   ```typescript
   import { describe, it, expect } from 'vitest';
   
   // Function to test
   function sum(a: number, b: number): number {
     return a + b;
   }
   
   describe('Utils', () => {
     it('should correctly sum two numbers', () => {
       expect(sum(2, 3)).toBe(5);
       expect(sum(-1, 1)).toBe(0);
       expect(sum(0, 0)).toBe(0);
     });
   });
   ```

## Additional Development Information

### Code Style and Linting

The project uses ESLint and Prettier for code style and linting:

- **ESLint Configuration**:
  - TypeScript ESLint parser
  - Extends recommended ESLint, TypeScript ESLint, and Prettier configurations
  - Specific rules:
    - No explicit function return type required
    - Warns about using 'any' type
    - Errors on unused variables (except those starting with underscore)
    - Warns about console.log (but allows console.warn and console.error)

- **Prettier Configuration**:
  - Semicolons required
  - Trailing commas in all possible places
  - Single quotes for strings
  - Line width: 100 characters
  - Tab width: 2 spaces
  - Always include parentheses around arrow function parameters

### Linting and Formatting Commands

- **Lint code**:
  ```bash
  pnpm lint
  ```

- **Fix linting issues**:
  ```bash
  pnpm lint:fix
  ```

- **Format code**:
  ```bash
  pnpm format
  ```

- **Type check**:
  ```bash
  pnpm type-check
  ```

### Project Structure

- `src/` - Source code
  - `auth/` - Authentication-related code
  - `client.ts` - Main client implementation
  - `errors/` - Error handling
  - `index.ts` - Main entry point
  - `resources/` - API resources
  - `types/` - TypeScript type definitions
  - `utils/` - Utility functions
- `tests/` - Test files
- `dist/` - Build output (generated)
- `examples/` - Example usage

### TypeScript Configuration

The project uses TypeScript with the following key settings:
- Target: ES2022
- Module: ESNext
- Strict type checking enabled
- Source maps and declaration files generated
- Various code quality flags enabled (noUnusedLocals, noImplicitAny, etc.)
