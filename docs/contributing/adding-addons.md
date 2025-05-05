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

According to the [addOn.service.ts](https://github.com/kexa-io/Kexa/blob/main/Kexa/services/addOn.service.ts) and depending on the type of addon that will be added, it must respect the template provided here : [freshTemplatesAddOn](https://github.com/kexa-io/Kexa/blob/main/config/freshTemplatesAddOn)

### 2. Documentation

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
