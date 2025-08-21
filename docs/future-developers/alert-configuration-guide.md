<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">⚙️ Monitoring Alert Configuration - Developer Setup Guide</span>

</div>

This guide covers how to configure, customize, and manage the monitoring and alerting system for the PassItOn Admin platform.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

The alert system is designed to be flexible and configurable, allowing administrators to customize thresholds, notification channels, and alert behavior based on their specific needs.

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Configuration Files</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Environment Variables</span>

</div>

Create or update your `.env.local` file with the following monitoring configuration:

```bash
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Email Notifications</span>

</div>
ALERT_EMAIL_RECIPIENTS=admin@passiton.com,ops@passiton.com,dev@passiton.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=alerts@passiton.com
SMTP_PASSWORD=your-app-password

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Slack Integration</span>

</div>
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX
SLACK_CHANNEL=#alerts
SLACK_USERNAME=PassItOn Alerts

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 SMS Notifications (Twilio)</span>

</div>
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
ALERT_SMS_RECIPIENTS=+15559876543,+15555555555

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 PagerDuty Integration</span>

</div>
PAGERDUTY_INTEGRATION_KEY=your_integration_key_here
PAGERDUTY_SERVICE_ID=PXXXXXXX

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 General Settings</span>

</div>
ALERT_RATE_LIMIT=10
ALERT_RATE_WINDOW=300000
NODE_ENV=production
```

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Alert Threshold Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Payment Alert Thresholds</span>

</div>

Configure payment monitoring thresholds by modifying `lib/monitoring/payment-alerts.ts`:

```typescript
private thresholds = {
  failureRate: 0.05,        // 5% failure rate triggers alert
  consecutiveFailures: 3,    // 3 consecutive failures
  timeWindow: 15 * 60 * 1000, // 15-minute window
  criticalAmount: 1000,      // $1000+ failures are critical
};
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Widget Alert Thresholds</span>

</div>

Configure widget monitoring thresholds in `lib/monitoring/widget-alerts.ts`:

```typescript
private thresholds = {
  errorRate: 0.1,           // 10% error rate triggers alert
  consecutiveErrors: 5,      // 5 consecutive errors
  timeWindow: 10 * 60 * 1000, // 10-minute window
  loadTimeout: 30000,        // 30 seconds load timeout
  renderTimeout: 15000,      // 15 seconds render timeout
};
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Traffic Alert Thresholds</span>

</div>

Configure traffic monitoring thresholds in `lib/monitoring/traffic-alerts.ts`:

```typescript
private thresholds = {
  trafficSpike: {
    multiplier: 3,            // 3x normal traffic
    minimumRequests: 100,     // Minimum requests to trigger
    timeWindow: 15 * 60 * 1000, // 15-minute window
  },
  trafficDrop: {
    multiplier: 0.3,          // 30% of normal traffic
    timeWindow: 30 * 60 * 1000, // 30-minute window
  },
  botTraffic: {
    percentage: 0.5,          // 50% bot traffic threshold
    minimumRequests: 50,      // Minimum requests to analyze
  },
};
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Dashboard Alert Thresholds</span>

</div>

Configure dashboard monitoring thresholds in `lib/monitoring/dashboard-alerts.ts`:

```typescript
private thresholds = {
  responseTime: {
    warning: 2000,            // 2 seconds warning
    critical: 5000,           // 5 seconds critical
  },
  errorRate: {
    warning: 0.05,            // 5% error rate warning
    critical: 0.15,           // 15% error rate critical
  },
  consecutiveFailures: 3,     // 3 consecutive failures
  uptimeThreshold: 0.99,      // 99% uptime requirement
};
```

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Notification Channel Setup</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Slack Configuration</span>

</div>

1. **Create Slack App**:
   - Go to https://api.slack.com/apps
   - Create a new app for your workspace
   - Enable "Incoming Webhooks"
   - Create webhook for desired channel

2. **Configure Webhook**:
   ```bash
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

3. **Test Slack Integration**:
   ```typescript
   import { alertService } from '@/lib/monitoring';
   
   await alertService.sendAlert({
     type: 'system',
     severity: 'low',
     title: 'Test Alert',
     message: 'Testing Slack integration',
     channels: ['slack'],
   });
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Email Configuration</span>

</div>

1. **SMTP Setup** (Gmail example):
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=alerts@yourdomain.com
   SMTP_PASSWORD=your-app-password  # Use App Password, not regular password
   ```

2. **Recipients Configuration**:
   ```bash
   ALERT_EMAIL_RECIPIENTS=admin@company.com,dev-team@company.com,ops@company.com
   ```

3. **Test Email Integration**:
   ```typescript
   await alertService.sendAlert({
     type: 'system',
     severity: 'medium',
     title: 'Test Email Alert',
     message: 'Testing email notification system',
     channels: ['email'],
   });
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 SMS Configuration (Twilio)</span>

</div>

1. **Twilio Account Setup**:
   - Create account at https://www.twilio.com
   - Get Account SID and Auth Token
   - Purchase phone number

2. **Environment Configuration**:
   ```bash
   TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   TWILIO_AUTH_TOKEN=your_auth_token
   TWILIO_PHONE_NUMBER=+15551234567
   ALERT_SMS_RECIPIENTS=+15559876543,+15555555555
   ```

3. **Test SMS Integration**:
   ```typescript
   await alertService.sendAlert({
     type: 'system',
     severity: 'high',
     title: 'Test SMS Alert',
     message: 'Testing SMS notification',
     channels: ['sms'],
   });
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 PagerDuty Configuration</span>

</div>

1. **PagerDuty Integration**:
   - Create service in PagerDuty
   - Add "Events API v2" integration
   - Copy integration key

2. **Environment Setup**:
   ```bash
   PAGERDUTY_INTEGRATION_KEY=your_32_character_integration_key
   ```

3. **Test PagerDuty Integration**:
   ```typescript
   await alertService.sendAlert({
     type: 'system',
     severity: 'critical',
     title: 'Test PagerDuty Alert',
     message: 'Testing PagerDuty integration',
     channels: ['pagerduty'],
   });
   ```

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Custom Alert Rules</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Creating Custom Alert Types</span>

</div>

1. **Define Alert Interface**:
   ```typescript
   export interface CustomAlert {
     id: string;
     type: 'custom_alert_type';
     severity: 'low' | 'medium' | 'high' | 'critical';
     // ... other properties
   }
   ```

2. **Create Alert Monitor**:
   ```typescript
   export class CustomAlertMonitor {
     private alertService: AlertService;
     
     constructor() {
       this.alertService = new AlertService();
     }
     
     async monitorCustomEvent(data: any) {
       const alert: CustomAlert = {
         // ... construct alert
       };
       
       await this.triggerAlert(alert);
     }
     
     private async triggerAlert(alert: CustomAlert) {
       await this.alertService.sendAlert({
         type: 'custom',
         severity: alert.severity,
         title: this.getAlertTitle(alert),
         message: this.getAlertMessage(alert),
         data: alert,
         channels: this.getAlertChannels(alert.severity),
       });
     }
   }
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Alert Suppression Rules</span>

</div>

1. **Rate Limiting**:
   ```typescript
   private rateLimiter = new Map<string, number>();
   
   private shouldSendAlert(alertKey: string, timeWindow: number = 300000): boolean {
     const now = Date.now();
     const lastSent = this.rateLimiter.get(alertKey) || 0;
     
     if (now - lastSent < timeWindow) {
       return false; // Suppress duplicate alert
     }
     
     this.rateLimiter.set(alertKey, now);
     return true;
   }
   ```

2. **Maintenance Mode**:
   ```typescript
   const MAINTENANCE_MODE = process.env.MAINTENANCE_MODE === 'true';
   
   private async triggerAlert(alert: Alert) {
     if (MAINTENANCE_MODE && alert.severity !== 'critical') {
       return; // Suppress non-critical alerts during maintenance
     }
     
     await this.alertService.sendAlert(alert);
   }
   ```

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Database Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Required Tables</span>

</div>

Create the following tables in your Supabase database:

```sql
-- Payment alerts
CREATE TABLE payment_alerts (
  id VARCHAR PRIMARY KEY,
  type VARCHAR NOT NULL,
  severity VARCHAR NOT NULL,
  organization_id VARCHAR,
  user_id VARCHAR,
  amount DECIMAL,
  currency VARCHAR(3),
  error_message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Widget alerts
CREATE TABLE widget_alerts (
  id VARCHAR PRIMARY KEY,
  type VARCHAR NOT NULL,
  severity VARCHAR NOT NULL,
  organization_id VARCHAR NOT NULL,
  widget_id VARCHAR NOT NULL,
  url TEXT NOT NULL,
  user_agent TEXT,
  error_message TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Traffic alerts
CREATE TABLE traffic_alerts (
  id VARCHAR PRIMARY KEY,
  type VARCHAR NOT NULL,
  severity VARCHAR NOT NULL,
  organization_id VARCHAR,
  metric VARCHAR NOT NULL,
  current_value DECIMAL NOT NULL,
  expected_value DECIMAL NOT NULL,
  threshold DECIMAL NOT NULL,
  time_window INTEGER NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dashboard alerts
CREATE TABLE dashboard_alerts (
  id VARCHAR PRIMARY KEY,
  type VARCHAR NOT NULL,
  severity VARCHAR NOT NULL,
  endpoint VARCHAR NOT NULL,
  user_id VARCHAR,
  organization_id VARCHAR,
  response_time INTEGER,
  error_message TEXT NOT NULL,
  status_code INTEGER,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Traffic baselines for comparison
CREATE TABLE traffic_baselines (
  organization_id VARCHAR PRIMARY KEY,
  metrics JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Endpoint metrics
CREATE TABLE endpoint_metrics (
  id SERIAL PRIMARY KEY,
  endpoint VARCHAR NOT NULL,
  response_time INTEGER NOT NULL,
  status_code INTEGER NOT NULL,
  timestamp TIMESTAMP DEFAULT NOW()
);
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Indexes for Performance</span>

</div>

```sql
-- Alert queries by organization and time
CREATE INDEX idx_payment_alerts_org_time ON payment_alerts(organization_id, created_at DESC);
CREATE INDEX idx_widget_alerts_org_time ON widget_alerts(organization_id, created_at DESC);
CREATE INDEX idx_traffic_alerts_org_time ON traffic_alerts(organization_id, created_at DESC);
CREATE INDEX idx_dashboard_alerts_time ON dashboard_alerts(created_at DESC);

-- Alert queries by type
CREATE INDEX idx_payment_alerts_type ON payment_alerts(type, created_at DESC);
CREATE INDEX idx_widget_alerts_type ON widget_alerts(type, created_at DESC);
CREATE INDEX idx_traffic_alerts_type ON traffic_alerts(type, created_at DESC);
CREATE INDEX idx_dashboard_alerts_type ON dashboard_alerts(type, created_at DESC);

-- Endpoint metrics for performance analysis
CREATE INDEX idx_endpoint_metrics_endpoint_time ON endpoint_metrics(endpoint, timestamp DESC);
```

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Testing Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Running Alert Tests</span>

</div>

1. **Unit Tests**:
   ```bash
   npm test -- --grep "monitoring"
   ```

2. **Integration Tests**:
   ```bash
   npm run test:integration -- monitoring
   ```

3. **Manual Testing**:
   ```typescript
   import { monitoring } from '@/lib/monitoring';
   
   // Test all alert systems
   await monitoring.testAlerts();
   
   // Test specific system
   await monitoring.payment.monitorPaymentFailures({
     organizationId: 'test-org',
     amount: 100,
     currency: 'usd',
     error: 'Test payment failure',
   });
   ```

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Monitoring Dashboard</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Health Check Endpoint</span>

</div>

Create a health check endpoint to monitor the monitoring system:

```typescript
// pages/api/monitoring/health.ts
import { monitoring } from '@/lib/monitoring';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const status = await monitoring.getSystemStatus();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ error: 'Monitoring system unhealthy' });
  }
}
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Metrics Endpoint</span>

</div>

```typescript
// pages/api/monitoring/metrics.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { timeRange = '1h' } = req.query;
  
  const metrics = await getAlertMetrics(timeRange as string);
  res.status(200).json(metrics);
}
```

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting Common Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Alerts Not Being Sent</span>

</div>

1. Check environment variables are set correctly
2. Verify network connectivity to notification services
3. Check service credentials and permissions
4. Review rate limiting settings

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Too Many Alerts</span>

</div>

1. Adjust threshold values
2. Implement alert suppression rules
3. Review severity assignments
4. Add maintenance mode capabilities

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Performance Issues</span>

</div>

1. Optimize database queries with proper indexes
2. Implement alert batching
3. Use background job processing
4. Monitor resource usage of alert system

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Best Practices</span>

</div>

1. **Start with Conservative Thresholds**: Begin with higher thresholds and adjust down based on false positive rates

2. **Use Appropriate Channels**: Route critical alerts to immediate channels (SMS, PagerDuty) and informational alerts to async channels (email)

3. **Regular Review**: Review alert patterns monthly and adjust thresholds as needed

4. **Documentation**: Keep alert runbooks updated with response procedures

5. **Testing**: Regularly test notification channels to ensure they work when needed

6. **Monitoring the Monitor**: Set up alerts for the monitoring system itself