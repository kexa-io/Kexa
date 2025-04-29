# Adding Addons to Kexa

This guide explains how to create new addons for Kexa to extend its functionality.

## What are Addons?

Addons are modular components that extend Kexa's capabilities by:

- Adding support for new cloud providers
- Implementing new notification channels
- Creating custom rule types
- Adding new reporting formats

## Creating a New Addon

### 1. Basic Structure

Create a new directory in the `src/addons` folder:

```bash
src/addons/
└── your-addon-name/
    ├── index.ts
    ├── types.ts
    ├── config.ts
    └── README.md
```

### 2. Implement Required Interfaces

Your addon must implement the appropriate interface based on its type:

```typescript
// For Cloud Provider Addons
export class YourProviderAddon implements CloudProviderAddon {
  name: string = 'your-provider';
  
  async initialize(config: Config): Promise<void> {
    // Setup code
  }
  
  async scan(rules: Rule[]): Promise<ScanResult[]> {
    // Scanning logic
  }
  
  async cleanup(): Promise<void> {
    // Cleanup code
  }
}

// For Notification Addons
export class YourNotificationAddon implements NotificationAddon {
  name: string = 'your-notification';
  
  async send(message: NotificationMessage): Promise<void> {
    // Notification logic
  }
}
```

### 3. Configuration

Define your addon's configuration schema:

```typescript
// config.ts
export interface YourAddonConfig {
  required_field: string;
  optional_field?: number;
  // Add other configuration options
}

export const configSchema = {
  type: 'object',
  properties: {
    required_field: { type: 'string' },
    optional_field: { type: 'number' }
  },
  required: ['required_field']
};
```

### 4. Documentation

Create a README.md for your addon with:

- Description and purpose
- Configuration options
- Usage examples
- Requirements
- Limitations

## Testing Your Addon

1. **Unit Tests**

   ```bash
   src/addons/your-addon-name/
   └── __tests__/
       ├── index.test.ts
       └── config.test.ts
   ```

2. **Integration Tests**
   - Test with real services
   - Mock external APIs when needed
   - Verify error handling

## Best Practices

1. **Error Handling**
   - Use proper error types
   - Provide meaningful error messages
   - Handle API failures gracefully

2. **Logging**
   - Use the built-in logger
   - Include relevant context
   - Follow log level guidelines

3. **Performance**
   - Implement caching when appropriate
   - Use batch operations
   - Minimize API calls

4. **Security**
   - Follow security best practices
   - Handle credentials securely
   - Validate input data

## Publishing Your Addon

1. **Quality Checklist**
   - All tests pass
   - Documentation complete
   - Code follows style guide
   - Security review done

2. **Submission Process**
   - Create pull request
   - Include test results
   - Add to addon registry
   - Update main documentation

## Examples

Check existing addons for reference:

- AWS Provider Addon
- Azure Provider Addon
- Email Notification Addon
- Slack Notification Addon

## Support

Need help? Contact us:

- GitHub Issues
- Community Forums
- Documentation
- Developer Chat
