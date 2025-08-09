# Monitoring Environment Variables Setup - Developer Guide

This guide covers all environment variables required to configure the PassItOn monitoring and alert system.

## Required Environment Variables

### Email Notifications

```bash
# SMTP Configuration for email alerts
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@yourdomain.com
SMTP_PASSWORD=your_app_specific_password

# Email Recipients (comma-separated)
ALERT_EMAIL_RECIPIENTS=admin@company.com,dev-team@company.com,ops@company.com
```

**Setup Instructions:**
1. **Gmail Setup:**
   - Enable 2-factor authentication on your Gmail account
   - Generate App Password: Google Account → Security → App passwords
   - Use the app password, not your regular Gmail password

2. **Other Email Providers:**
   - Outlook: `smtp-mail.outlook.com:587`
   - Yahoo: `smtp.mail.yahoo.com:587`
   - Custom SMTP: Contact your email provider for settings

### Slack Integration

```bash
# Slack Webhook URL for notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX

# Optional: Custom Slack settings
SLACK_CHANNEL=#alerts
SLACK_USERNAME=PassItOn Monitoring
SLACK_ICON_EMOJI=:warning:
```

**Setup Instructions:**
1. **Create Slack App:**
   - Go to https://api.slack.com/apps
   - Click "Create New App" → "From scratch"
   - Choose your workspace

2. **Enable Incoming Webhooks:**
   - Go to "Incoming Webhooks" in your app settings
   - Turn on "Activate Incoming Webhooks"
   - Click "Add New Webhook to Workspace"
   - Select the channel for alerts
   - Copy the webhook URL

3. **Test Webhook:**
   ```bash
   curl -X POST -H 'Content-type: application/json' \
   --data '{"text":"Test alert from PassItOn monitoring"}' \
   YOUR_SLACK_WEBHOOK_URL
   ```

### SMS Notifications (Twilio)

```bash
# Twilio Account Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567

# SMS Recipients (comma-separated)
ALERT_SMS_RECIPIENTS=+15559876543,+15555555555
```

**Setup Instructions:**
1. **Create Twilio Account:**
   - Sign up at https://www.twilio.com
   - Verify your phone number
   - Get a Twilio phone number

2. **Find Credentials:**
   - Go to Twilio Console Dashboard
   - Copy Account SID and Auth Token
   - Note your Twilio phone number

3. **Test SMS:**
   ```bash
   curl -X POST https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json \
   --data-urlencode "To=+15555555555" \
   --data-urlencode "From=+15551234567" \
   --data-urlencode "Body=Test alert from PassItOn" \
   -u YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN
   ```

### PagerDuty Integration

```bash
# PagerDuty Integration Key
PAGERDUTY_INTEGRATION_KEY=your_32_character_integration_key_here

# Optional: Service configuration
PAGERDUTY_SERVICE_ID=PXXXXXXX
PAGERDUTY_ESCALATION_POLICY=PXXXXXX
```

**Setup Instructions:**
1. **Create PagerDuty Service:**
   - Log into PagerDuty
   - Go to Services → Service Directory
   - Click "New Service"
   - Choose "Events API v2" integration

2. **Get Integration Key:**
   - Go to your service → Integrations tab
   - Copy the "Integration Key"

3. **Test PagerDuty:**
   ```bash
   curl -X POST https://events.pagerduty.com/v2/enqueue \
   -H "Content-Type: application/json" \
   -d '{
     "routing_key": "YOUR_INTEGRATION_KEY",
     "event_action": "trigger",
     "payload": {
       "summary": "Test alert from PassItOn",
       "severity": "critical",
       "source": "PassItOn Monitoring"
     }
   }'
   ```

### General Monitoring Settings

```bash
# Alert System Configuration
ALERT_RATE_LIMIT=10                    # Max alerts per time window
ALERT_RATE_WINDOW=300000               # Rate limit window (5 minutes)
MAINTENANCE_MODE=false                 # Suppress non-critical alerts
NODE_ENV=production                    # Environment mode

# Database Configuration (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Monitoring Thresholds (Optional - defaults in code)
PAYMENT_FAILURE_THRESHOLD=0.05         # 5% payment failure rate
WIDGET_ERROR_THRESHOLD=0.1             # 10% widget error rate
TRAFFIC_SPIKE_MULTIPLIER=3              # 3x normal traffic
RESPONSE_TIME_WARNING=2000              # 2 second warning threshold
RESPONSE_TIME_CRITICAL=5000             # 5 second critical threshold
```

## Environment-Specific Configuration

### Development Environment (.env.local)

```bash
# Development settings
NODE_ENV=development
MAINTENANCE_MODE=false

# Use development Slack channel
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/.../dev-alerts
SLACK_CHANNEL=#dev-alerts

# Limited email recipients for testing
ALERT_EMAIL_RECIPIENTS=developer@company.com

# Higher thresholds for development
PAYMENT_FAILURE_THRESHOLD=0.2
WIDGET_ERROR_THRESHOLD=0.3
RESPONSE_TIME_WARNING=5000
RESPONSE_TIME_CRITICAL=10000

# Test mode for external services
TWILIO_TEST_MODE=true
PAGERDUTY_TEST_MODE=true
```

### Staging Environment (.env.staging)

```bash
# Staging settings
NODE_ENV=staging
MAINTENANCE_MODE=false

# Staging-specific channels
SLACK_CHANNEL=#staging-alerts
ALERT_EMAIL_RECIPIENTS=qa@company.com,dev-lead@company.com

# Moderate thresholds
PAYMENT_FAILURE_THRESHOLD=0.1
WIDGET_ERROR_THRESHOLD=0.15
RESPONSE_TIME_WARNING=3000
RESPONSE_TIME_CRITICAL=7000
```

### Production Environment (.env.production)

```bash
# Production settings
NODE_ENV=production
MAINTENANCE_MODE=false

# Production alert channels
SLACK_CHANNEL=#production-alerts
ALERT_EMAIL_RECIPIENTS=ops@company.com,admin@company.com,oncall@company.com

# SMS for critical production alerts
ALERT_SMS_RECIPIENTS=+15551234567,+15557654321

# Sensitive production thresholds
PAYMENT_FAILURE_THRESHOLD=0.05
WIDGET_ERROR_THRESHOLD=0.1
RESPONSE_TIME_WARNING=2000
RESPONSE_TIME_CRITICAL=5000

# Enable all notification channels
ENABLE_EMAIL_ALERTS=true
ENABLE_SLACK_ALERTS=true
ENABLE_SMS_ALERTS=true
ENABLE_PAGERDUTY_ALERTS=true
```

## Platform-Specific Setup

### Vercel Deployment

1. **Via Vercel Dashboard:**
   - Go to your project settings
   - Click "Environment Variables"
   - Add each variable with appropriate environment scope

2. **Via Vercel CLI:**
   ```bash
   vercel env add ALERT_EMAIL_RECIPIENTS
   vercel env add SLACK_WEBHOOK_URL
   vercel env add TWILIO_ACCOUNT_SID
   ```

3. **From .env file:**
   ```bash
   vercel env pull .env.production
   ```

### Netlify Deployment

1. **Via Netlify Dashboard:**
   - Go to Site settings → Environment variables
   - Add variables individually

2. **Via netlify.toml:**
   ```toml
   [build.environment]
     NODE_ENV = "production"
     ALERT_RATE_LIMIT = "10"
   ```

### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine

# Set environment variables
ENV NODE_ENV=production
ENV ALERT_RATE_LIMIT=10
ENV ALERT_RATE_WINDOW=300000

# Copy application
COPY . .

# Install dependencies
RUN npm ci --only=production

CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - ALERT_EMAIL_RECIPIENTS=${ALERT_EMAIL_RECIPIENTS}
      - SLACK_WEBHOOK_URL=${SLACK_WEBHOOK_URL}
      - TWILIO_ACCOUNT_SID=${TWILIO_ACCOUNT_SID}
      - TWILIO_AUTH_TOKEN=${TWILIO_AUTH_TOKEN}
    env_file:
      - .env.production
```

## Security Considerations

### Sensitive Information
```bash
# Keep these secret and never commit to version control
SMTP_PASSWORD=
TWILIO_AUTH_TOKEN=
PAGERDUTY_INTEGRATION_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Webhook URLs contain secrets
SLACK_WEBHOOK_URL=
```

### Access Control
```bash
# Restrict email recipients to authorized personnel
ALERT_EMAIL_RECIPIENTS=admin@company.com,security@company.com

# Use role-based SMS alerts
ALERT_SMS_RECIPIENTS=+15551234567  # On-call engineer only
```

### Environment Isolation
```bash
# Use different accounts/services for different environments
# Production
TWILIO_ACCOUNT_SID=ACprod...
SLACK_WEBHOOK_URL=https://hooks.slack.com/.../prod-alerts

# Development  
TWILIO_ACCOUNT_SID=ACdev...
SLACK_WEBHOOK_URL=https://hooks.slack.com/.../dev-alerts
```

## Testing Configuration

### Validate Environment Setup

```javascript
// scripts/validate-monitoring-config.js
const requiredVars = [
  'ALERT_EMAIL_RECIPIENTS',
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY'
];

const optionalVars = [
  'SLACK_WEBHOOK_URL',
  'TWILIO_ACCOUNT_SID',
  'PAGERDUTY_INTEGRATION_KEY'
];

requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required variable: ${varName}`);
    process.exit(1);
  }
});

optionalVars.forEach(varName => {
  if (!process.env[varName]) {
    console.warn(`⚠️  Optional variable not set: ${varName}`);
  }
});

console.log('✅ Environment configuration validated');
```

### Test Alert Delivery

```javascript
// scripts/test-alerts.js
import { monitoring } from '../lib/monitoring/index.js';

async function testAllChannels() {
  console.log('Testing alert delivery...');
  
  try {
    await monitoring.testAlerts();
    console.log('✅ All alert channels tested successfully');
  } catch (error) {
    console.error('❌ Alert test failed:', error);
  }
}

testAllChannels();
```

## Troubleshooting

### Common Issues

**Email not sending:**
```bash
# Check SMTP settings
telnet smtp.gmail.com 587

# Verify credentials
curl -u "username:password" smtps://smtp.gmail.com:465
```

**Slack webhook not working:**
```bash
# Test webhook URL
curl -X POST -H 'Content-type: application/json' \
--data '{"text":"Test"}' $SLACK_WEBHOOK_URL
```

**Twilio SMS failing:**
```bash
# Check account status
curl -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID.json
```

### Environment Variable Debugging

```javascript
// Add to your monitoring initialization
console.log('Monitoring Config:', {
  email: !!process.env.ALERT_EMAIL_RECIPIENTS,
  slack: !!process.env.SLACK_WEBHOOK_URL,
  sms: !!process.env.TWILIO_ACCOUNT_SID,
  pagerduty: !!process.env.PAGERDUTY_INTEGRATION_KEY,
  nodeEnv: process.env.NODE_ENV
});
```

## Best Practices

1. **Use different configurations per environment**
2. **Keep secrets in environment variables, not code**
3. **Test all notification channels after setup**
4. **Document your alert escalation procedures**
5. **Regularly rotate API keys and tokens**
6. **Monitor your monitoring system's health**
7. **Set up backup notification methods**

## Migration Guide

### From Manual Monitoring
1. Set up environment variables
2. Deploy monitoring code
3. Test alert delivery
4. Gradually reduce manual checks

### From Other Systems
1. Export existing alert configurations
2. Map alerts to PassItOn monitoring types
3. Set up equivalent thresholds
4. Run both systems in parallel initially
5. Switch over after validation