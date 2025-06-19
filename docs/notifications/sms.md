<div align="center">
    <a href="https://www.kexa.io/modules">
        <img src="../../images/twilio-logo.png" alt="Logo" width="200"/>
    </a>
</div>

<h3 align="center">SMS</h3>

<div>
  <p align="center">
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

By setting up 'SMS' notifications, you will receive critical alerts directly on your mobile device via text messages, ensuring you never miss important security or compliance issues even when you're away from your computer.

## Prerequire

Kexa uses Twilio for SMS notifications. You will need:

- A Twilio account
- A verified Twilio phone number (sender number)
- Twilio Account SID
- Twilio Auth Token

To get started:
1. Sign up for a Twilio account at [https://www.twilio.com/](https://www.twilio.com/)
2. Get a Twilio phone number from the console
3. Find your Account SID and Auth Token in your Twilio Console Dashboard

## Configuration

Set up the following environment variables:

```bash
SMSFROM='+1234567890'  # Your Twilio phone number (with country code)
SMSACCOUNTSID='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'  # Your Twilio Account SID
SMSAUTHTOKEN='XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'   # Your Twilio Auth Token
```

In your rule file, configure SMS notifications in the alert section:

```yaml
- version: 1.0.0
  date: 07-23-2024
  alert:
    fatal:
      enabled: true
      type: 
        - sms
        - log   
      to:
        - '+1234567890'  # Recipient phone number (with country code)
        - '+0987654321'  # You can add multiple recipients
    error:
      enabled: true
      type: 
        - sms
      to: 
        - '+1234567890'
    warning:
      enabled: false  # Usually disabled for SMS to avoid spam
      type: 
        - sms
      to:
        - '+1234567890'
    info:
      enabled: false  # Usually disabled for SMS to avoid spam
      type: 
        - sms
      to: 
        - '+1234567890'
    global:
      enabled: true
      type: 
        - sms
      to: 
        - '+1234567890'
      conditions:
        - level: 0
          min: 5  # Higher thresholds recommended for SMS
        - level: 1
          min: 3
        - level: 2
          min: 1
        - level: 3
          min: 1
  rules:
    # all rules are here
```

## Best Practices

- **Use SMS sparingly**: SMS notifications should typically be reserved for critical alerts (error and fatal levels) to avoid message spam
- **Phone number format**: Always include the country code (e.g., +1 for US, +33 for France)
- **Rate limiting**: Be aware that Twilio has rate limits and costs per message
- **Higher thresholds**: Consider setting higher minimum alert thresholds for SMS compared to other notification channels
- **Test thoroughly**: Always test with a small number of recipients first


## Troubleshooting

**Messages not being delivered:**
- Verify your Twilio credentials are correct
- Check that your Twilio account has sufficient balance
- Ensure recipient phone numbers include country codes
- Verify the sender phone number is active in your Twilio account

**Rate limiting errors:**
- Reduce notification frequency
- Increase the minimum alert thresholds