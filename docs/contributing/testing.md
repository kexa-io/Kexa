# Testing Guide

This guide covers testing practices and requirements for contributing to Kexa.

## Testing Framework

Kexa uses the following testing stack:

- Jest for unit and integration tests
- Supertest for API testing
- Mock Service Worker for API mocking
- GitHub Actions for CI/CD

## Types of Tests

### 1. Unit Tests

Test individual components in isolation:

```typescript
describe('RuleValidator', () => {
  it('should validate rule syntax', () => {
    const rule = {
      name: 'test-rule',
      conditions: [/* ... */]
    };
    expect(validateRule(rule)).toBeTruthy();
  });
});
```

### 2. Integration Tests

Test component interactions:

```typescript
describe('AzureProvider', () => {
  it('should scan resources and apply rules', async () => {
    const provider = new AzureProvider();
    const results = await provider.scan(testRules);
    expect(results).toMatchSnapshot();
  });
});
```

### 3. End-to-End Tests

Test complete workflows:

```typescript
describe('Complete Scan', () => {
  it('should perform full scan cycle', async () => {
    const kexa = new Kexa(config);
    await kexa.initialize();
    const results = await kexa.runScan();
    expect(results.violations).toBeDefined();
  });
});
```

### 4. Performance Tests

Test system performance:

```typescript
describe('Performance', () => {
  it('should complete scan within timeout', async () => {
    const startTime = Date.now();
    await runScan();
    const duration = Date.now() - startTime;
    expect(duration).toBeLessThan(TIMEOUT);
  });
});
```

## Writing Tests

### Best Practices

1. **Test Structure**
   - Use descriptive test names
   - Follow AAA pattern (Arrange, Act, Assert)
   - Keep tests focused and simple

2. **Mocking**
   - Mock external services
   - Use fixtures for test data
   - Avoid testing implementation details

3. **Coverage**
   - Aim for high coverage
   - Focus on critical paths
   - Test edge cases

### Example Test Structure

```typescript
describe('Feature', () => {
  let testInstance;

  beforeAll(() => {
    // Setup test environment
  });

  beforeEach(() => {
    testInstance = new TestClass();
  });

  afterEach(() => {
    // Cleanup after each test
  });

  afterAll(() => {
    // Cleanup test environment
  });

  it('should handle normal case', () => {
    // Test implementation
  });

  it('should handle error case', () => {
    // Test implementation
  });
});
```

## Running Tests

### Local Development

```bash
# Run all tests
pnpm run test

# Run specific test file
pnpm run test path/to/test

# Run with coverage
pnpm run test:coverage

# Run in watch mode
pnpm run test:watch
```

### CI/CD Pipeline

Tests run automatically on:

- Pull requests
- Main branch commits
- Release tags

## Test Coverage

Maintain high test coverage:

- Minimum 80% coverage required
- Critical paths need 100% coverage
- Document uncovered code

## Debugging Tests

1. **VS Code Configuration**

   ```json
   {
     "type": "node",
     "request": "launch",
     "name": "Debug Tests",
     "program": "${workspaceFolder}/node_modules/jest/bin/jest",
     "args": ["--runInBand"]
   }
   ```

2. **Troubleshooting**
   - Use `console.log()` for debugging
   - Check test environment
   - Verify mock data
   - Review test isolation

## Continuous Integration

Tests run in GitHub Actions:

- Automated test suite
- Coverage reports
- Performance benchmarks
- Integration tests

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Kexa Test Examples](../examples/tests)
