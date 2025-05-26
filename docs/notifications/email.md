<div align="center">
    <a href="https://www.kexa.io/modules">
        <img src="../../images/email-logo.png" alt="Logo" width="200">
    </a>

# <h3 align="center">Email</h3>

  <p align="center">
    <br />
    <a href="https://github.com/4urcloud/Kexa/issues">Report Bug</a>
    ·
    <a href="https://github.com/4urcloud/Kexa/issues">Request Feature</a>
  </p>
</div>

By setting up 'Email' notifications, you will receive detailed alerts with comprehensive information about your infrastructure compliance issues, including resource details, remediation links, and formatted reports directly in your inbox.

## Prerequire

Kexa supports SMTP-based email notifications. You will need:

- An SMTP server (Gmail, SendGrid, Outlook, or custom SMTP server)
- SMTP credentials (username, password/API key)
- SMTP server configuration (host, port)

### Recommended Email Providers:

**SendGrid (Recommended):**
- Reliable delivery rates
- Easy API key authentication
- Good free tier
- Sign up at [https://sendgrid.com/](https://sendgrid.com/)

**Gmail:**
- Use App Passwords for authentication
- Enable 2-factor authentication first
- Generate App Password in Google Account settings

**Custom SMTP:**
- Any SMTP-compatible email server
- Corporate email servers
- Self-hosted solutions

**Any other compatible SMTP**

### Examples configurations with different providers:

**SendGrid:**
```bash
EMAILPORT=587                                    # SMTP port (587 for TLS, 465 for SSL, 25 for unencrypted)
EMAILHOST='smtp.sendgrid.net'                   # SMTP server hostname
EMAILUSER='apikey'                              # Username (for SendGrid, use 'apikey')
EMAILPWD='SG.XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'   # Password or API key
EMAILFROM='"Kexa Security" <noreply@yourcompany.com>'  # Sender name and email
```

**Gmail:**
```bash
EMAILPORT=587
EMAILHOST='smtp.gmail.com'
EMAILUSER='youremail@gmail.com'
EMAILPWD='your_app_password_here'
EMAILFROM='"Kexa Security" <youremail@gmail.com>'
```

**Outlook/Office 365:**
```bash
EMAILPORT=587
EMAILHOST='smtp-mail.outlook.com'
EMAILUSER='youremail@outlook.com'
EMAILPWD='your_password_here'
EMAILFROM='"Kexa Alerts" <youremail@outlook.com>'
```

**Any other compatible SMTP**


In your rule file, configure email notifications:

```yaml
- version: 1.0.0
  date: 07-23-2024
  alert:
    fatal:
      enabled: true
      type: 
        - email
        - log   
      to:
        - 'admin@company.com'
        - 'security-team@company.com'
    error:
      enabled: true
      type: 
        - email
      to: 
        - 'admin@company.com'
        - 'devops@company.com'
    warning:
      enabled: true
      type: 
        - email
      to:
        - 'admin@company.com'
    info:
      enabled: true
      type: 
        - email
      to: 
        - 'admin@company.com'
    global:
      enabled: true
      type: 
        - email
      to: 
        - 'management@company.com'
        - 'admin@company.com'
      conditions:
        - level: 0
          min: 1
        - level: 1
          min: 1
        - level: 2
          min: 1
        - level: 3
          min: 1
  rules:
    # all rules are here
```

## Email Content Features

Kexa email notifications include:

- **HTML formatting**
- **Resource details** with direct links to cloud provider if possible
- **Severity indicators** with color coding
- **Summary statistics** in global alerts

## Best Practices

- **Use descriptive sender names**: Make it clear emails are from Kexa
- **Separate distribution lists**: Use different email lists for different severity levels

## Troubleshooting

**Emails not being sent:**
- Verify SMTP credentials are correct
- Check firewall settings for SMTP ports
- Ensure SMTP server allows connections from your Kexa instance
- Verify the sender email is authorized

**Emails going to spam:**
- Configure SPF, DKIM, and DMARC records for your domain
- Use a reputable email service provider
- Avoid spam trigger words in email content
- Maintain good sender reputation

**Authentication errors:**
- For Gmail: Use App Passwords, not regular passwords
- For corporate email: Check if 2FA or special authentication is required
- Verify username format (some require full email, others just username)

**Connection timeouts:**
- Check if your network/firewall blocks SMTP ports
- Try different ports (587, 465, 25)
- Verify SMTP server hostname is correct