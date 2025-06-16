# Notifications

Kexa supports multiple notification channels to keep you informed about your infrastructure's compliance status and security alerts.

## Available Notification Channels

Each notification channel has its own configuration requirements. Please refer to the specific documentation for each channel to set up notifications properly.

1. [Microsoft Teams Integration](./teams.md)
   - Configure webhook-based notifications
   - Customizable message formatting
   - Rich card support

2. [Jira Integration](./jira.md)
   - Create issues automatically
   - Custom field mapping
   - Project and issue type configuration

3. [SMS Integration](./sms.md)
   - Critical alerts via text messages (Twilio)
   - Mobile accessibility for urgent issues

4. [Email Integration](./email.md)
   - Detailed HTML reports with resource links when possible
   - SMTP-based delivery (SendGrid, Gmail, customs, and more)

5. [Webhook Integration](./webhook.md)
   - Custom system integrations via HTTP POST
   - Structured JSON payloads
   - Support for authentication headers

6. [Logs](./logs.md)
   - Structured logging

## Configuration

Configure notifications at the top of your rules file:

```yaml
alert:
  info:
    enabled: true
    type:
      - email
      - teams
    to:
      - admin@example.com
      - https://webhook.example.com
  warn:
    enabled: true
    type:
      - email
    to:
      - admin@example.com
  error:
    enabled: true
    type:
      - email
      - sms
    to:
      - admin@example.com
      - +1234567890
  fatal:
    enabled: true
    type:
      - email
      - sms
      - teams
    to:
      - admin@example.com
      - +1234567890
      - https://webhook.example.com
  global:
    enabled: true
    type:
      - email
    to:
      - admin@example.com
    conditions:
      - level: 0
        min: 1
      - level: 1
        min: 1
      - level: 2
        min: 1
      - level: 3
        min: 1
```

Each notification channel has its own configuration requirements. Please refer to the specific documentation for each channel to set up notifications properly.

## Best Practices

- Always test your notification configuration after setup
- Use appropriate notification channels for different severity levels
- Consider rate limiting and notification frequency
- Keep your webhook URLs and API keys secure
