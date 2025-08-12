<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">⚙️ Monitoring Environment Variables Setup - Developer Guide</span>

</div>

This guide covers all environment variables required to configure the PassItOn monitoring and alert system.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Required Environment Variables</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 Email Notifications</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 SMTP Configuration for email alerts</span>

</div>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@yourdomain.com
SMTP_PASSWORD=your_app_specific_password

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Email Recipients (comma-separated)</span>

</div>
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

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Slack Integration</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Slack Webhook URL for notifications</span>

</div>
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Optional: Custom Slack settings</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 SMS Notifications (Twilio)</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Twilio Account Configuration</span>

</div>
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 SMS Recipients (comma-separated)</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 PagerDuty Integration</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 PagerDuty Integration Key</span>

</div>
PAGERDUTY_INTEGRATION_KEY=your_32_character_integration_key_here

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Optional: Service configuration</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 General Monitoring Settings</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Alert System Configuration</span>

</div>
ALERT_RATE_LIMIT=10                    # Max alerts per time window
ALERT_RATE_WINDOW=300000               # Rate limit window (5 minutes)
MAINTENANCE_MODE=false                 # Suppress non-critical alerts
NODE_ENV=production                    # Environment mode

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Database Configuration (Supabase)</span>

</div>
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Monitoring Thresholds (Optional - defaults in code)</span>

</div>
PAYMENT_FAILURE_THRESHOLD=0.05         # 5% payment failure rate
WIDGET_ERROR_THRESHOLD=0.1             # 10% widget error rate
TRAFFIC_SPIKE_MULTIPLIER=3              # 3x normal traffic
RESPONSE_TIME_WARNING=2000              # 2 second warning threshold
RESPONSE_TIME_CRITICAL=5000             # 5 second critical threshold
```

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Environment-Specific Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Development Environment (.env.local)</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Development settings</span>

</div>
NODE_ENV=development
MAINTENANCE_MODE=false

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Use development Slack channel</span>

</div>
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/.../dev-alerts
SLACK_CHANNEL=#dev-alerts

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Limited email recipients for testing</span>

</div>
ALERT_EMAIL_RECIPIENTS=developer@company.com

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Higher thresholds for development</span>

</div>
PAYMENT_FAILURE_THRESHOLD=0.2
WIDGET_ERROR_THRESHOLD=0.3
RESPONSE_TIME_WARNING=5000
RESPONSE_TIME_CRITICAL=10000

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test mode for external services</span>

</div>
TWILIO_TEST_MODE=true
PAGERDUTY_TEST_MODE=true
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Staging Environment (.env.staging)</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Staging settings</span>

</div>
NODE_ENV=staging
MAINTENANCE_MODE=false

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Staging-specific channels</span>

</div>
SLACK_CHANNEL=#staging-alerts
ALERT_EMAIL_RECIPIENTS=qa@company.com,dev-lead@company.com

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Moderate thresholds</span>

</div>
PAYMENT_FAILURE_THRESHOLD=0.1
WIDGET_ERROR_THRESHOLD=0.15
RESPONSE_TIME_WARNING=3000
RESPONSE_TIME_CRITICAL=7000
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Production Environment (.env.production)</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Production settings</span>

</div>
NODE_ENV=production
MAINTENANCE_MODE=false

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Production alert channels</span>

</div>
SLACK_CHANNEL=#production-alerts
ALERT_EMAIL_RECIPIENTS=ops@company.com,admin@company.com,oncall@company.com

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 SMS for critical production alerts</span>

</div>
ALERT_SMS_RECIPIENTS=+15551234567,+15557654321

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Sensitive production thresholds</span>

</div>
PAYMENT_FAILURE_THRESHOLD=0.05
WIDGET_ERROR_THRESHOLD=0.1
RESPONSE_TIME_WARNING=2000
RESPONSE_TIME_CRITICAL=5000

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Enable all notification channels</span>

</div>
ENABLE_EMAIL_ALERTS=true
ENABLE_SLACK_ALERTS=true
ENABLE_SMS_ALERTS=true
ENABLE_PAGERDUTY_ALERTS=true
```

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Platform-Specific Setup</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 Vercel Deployment</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 Netlify Deployment</span>

</div>

1. **Via Netlify Dashboard:**
   - Go to Site settings → Environment variables
   - Add variables individually

2. **Via netlify.toml:**
   ```toml
   [build.environment]
     NODE_ENV = "production"
     ALERT_RATE_LIMIT = "10"
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 Docker Deployment</span>

</div>

```dockerfile
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Dockerfile</span>

</div>
FROM node:18-alpine

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Set environment variables</span>

</div>
ENV NODE_ENV=production
ENV ALERT_RATE_LIMIT=10
ENV ALERT_RATE_WINDOW=300000

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Copy application</span>

</div>
COPY . .

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📦 Install dependencies</span>

</div>
RUN npm ci --only=production

CMD ["npm", "start"]
```

```yaml
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 docker-compose.yml</span>

</div>
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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔒 Security Considerations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Sensitive Information</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Keep these secret and never commit to version control</span>

</div>
SMTP_PASSWORD=
TWILIO_AUTH_TOKEN=
PAGERDUTY_INTEGRATION_KEY=
SUPABASE_SERVICE_ROLE_KEY=

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Webhook URLs contain secrets</span>

</div>
SLACK_WEBHOOK_URL=
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Access Control</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Restrict email recipients to authorized personnel</span>

</div>
ALERT_EMAIL_RECIPIENTS=admin@company.com,security@company.com

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Use role-based SMS alerts</span>

</div>
ALERT_SMS_RECIPIENTS=+15551234567  # On-call engineer only
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Environment Isolation</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Use different accounts/services for different environments</span>

</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Production</span>

</div>
TWILIO_ACCOUNT_SID=ACprod...
SLACK_WEBHOOK_URL=https://hooks.slack.com/.../prod-alerts

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Development  </span>

</div>
TWILIO_ACCOUNT_SID=ACdev...
SLACK_WEBHOOK_URL=https://hooks.slack.com/.../dev-alerts
```

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Testing Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ Validate Environment Setup</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Test Alert Delivery</span>

</div>

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

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Issues</span>

</div>

**Email not sending:**
```bash
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check SMTP settings</span>

</div>
telnet smtp.gmail.com 587

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Verify credentials</span>

</div>
curl -u "username:password" smtps://smtp.gmail.com:465
```

**Slack webhook not working:**
```bash
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test webhook URL</span>

</div>
curl -X POST -H 'Content-type: application/json' \
--data '{"text":"Test"}' $SLACK_WEBHOOK_URL
```

**Twilio SMS failing:**
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check account status</span>

</div>
curl -u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN \
https://api.twilio.com/2010-04-01/Accounts/$TWILIO_ACCOUNT_SID.json
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Environment Variable Debugging</span>

</div>

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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Best Practices</span>

</div>

1. **Use different configurations per environment**
2. **Keep secrets in environment variables, not code**
3. **Test all notification channels after setup**
4. **Document your alert escalation procedures**
5. **Regularly rotate API keys and tokens**
6. **Monitor your monitoring system's health**
7. **Set up backup notification methods**

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📖 Migration Guide</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 From Manual Monitoring</span>

</div>
1. Set up environment variables
2. Deploy monitoring code
3. Test alert delivery
4. Gradually reduce manual checks

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 From Other Systems</span>

</div>
1. Export existing alert configurations
2. Map alerts to PassItOn monitoring types
3. Set up equivalent thresholds
4. Run both systems in parallel initially
5. Switch over after validation