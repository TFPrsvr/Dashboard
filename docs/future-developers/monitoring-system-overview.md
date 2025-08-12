<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📊 Monitoring & Alert System - Developer Overview</span>

</div>

The PassItOn Admin platform includes a comprehensive monitoring and alerting system designed to proactively identify and respond to system issues before they impact users.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Architecture</span>

</div>

The monitoring system is built around a modular architecture with the following components:

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 Core Components</span>

</div>

1. **AlertService** (`lib/monitoring/alert-service.ts`)
   - Central notification service
   - Multi-channel alert delivery (Email, Slack, SMS, PagerDuty)
   - Severity-based routing
   - Channel management and configuration

2. **Payment Monitoring** (`lib/monitoring/payment-alerts.ts`)
   - Stripe webhook failure detection
   - Payment processing error tracking
   - Decline pattern analysis
   - Timeout monitoring

3. **Widget Monitoring** (`lib/monitoring/widget-alerts.ts`)
   - Widget loading error detection
   - Render failure monitoring
   - Script error tracking
   - Performance timeout alerts

4. **Traffic Monitoring** (`lib/monitoring/traffic-alerts.ts`)
   - Traffic spike/drop detection
   - Bot traffic analysis
   - Geographic anomaly detection
   - Suspicious pattern identification

5. **Dashboard Monitoring** (`lib/monitoring/dashboard-alerts.ts`)
   - Uptime monitoring
   - Response time tracking
   - Authentication failure detection
   - API error monitoring
   - Database connection health

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Alert Severity Levels</span>

</div>

The system uses four severity levels with different notification channels:

| Severity | Description | Channels |
|----------|-------------|----------|
| **Critical** | System-wide failures, security issues | Slack, Email, PagerDuty, SMS |
| **High** | Service degradation, payment failures | Slack, Email |
| **Medium** | Performance issues, minor errors | Slack |
| **Low** | Informational alerts, low-impact issues | Email |

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Data Flow</span>

</div>

```
Application Events → Monitoring Services → AlertService → Notification Channels
                                       ↓
                                   Database Storage
```

1. **Event Detection**: Application components detect issues and call monitoring services
2. **Alert Processing**: Monitoring services evaluate severity and create structured alerts
3. **Notification**: AlertService routes notifications to appropriate channels
4. **Storage**: Alerts are stored in Supabase for historical analysis and reporting

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">✨ Key Features</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Intelligent Thresholds</span>

</div>
- Dynamic baseline calculation for traffic patterns
- Consecutive failure detection
- Rate-based alerting to prevent spam
- Time-window analysis for pattern recognition

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Pattern Recognition</span>

</div>
- Payment failure clustering
- Widget error correlation
- Traffic anomaly detection
- Geographic distribution analysis

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Performance Monitoring</span>

</div>
- Response time tracking
- Database connection health
- API endpoint availability
- Widget loading performance

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Security Monitoring</span>

</div>
- Authentication failure tracking
- Suspicious traffic pattern detection
- Bot traffic identification
- Geographic anomaly alerts

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Integration Points</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Frontend Integration</span>

</div>
```typescript
import { monitoring } from '@/lib/monitoring';

// Monitor widget errors
monitoring.widget.monitorWidgetLoadError({
  organizationId: 'org-123',
  widgetId: 'widget-456',
  url: window.location.href,
  error: error.message,
});
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 API Integration</span>

</div>
```typescript
import { monitoring } from '@/lib/monitoring';

// Monitor API endpoints
app.use(async (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const responseTime = Date.now() - start;
    monitoring.dashboard.monitorEndpointHealth(
      req.path,
      responseTime,
      res.statusCode
    );
  });
  
  next();
});
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Payment Integration</span>

</div>
```typescript
import { monitoring } from '@/lib/monitoring';

// Monitor payment failures
try {
  await processPayment(paymentData);
} catch (error) {
  await monitoring.payment.monitorPaymentFailures({
    organizationId: paymentData.organizationId,
    amount: paymentData.amount,
    currency: paymentData.currency,
    error: error.message,
  });
  throw error;
}
```

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🗄️ Database Schema</span>

</div>

The monitoring system requires the following database tables:

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Alert Tables</span>

</div>
- `payment_alerts`: Payment-related alerts and failures
- `widget_alerts`: Widget loading and performance issues
- `traffic_alerts`: Traffic pattern anomalies
- `dashboard_alerts`: System availability and performance
- `system_alerts`: General system notifications

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Metrics Tables</span>

</div>
- `traffic_baselines`: Historical traffic patterns for comparison
- `endpoint_metrics`: API endpoint performance data
- `widget_analytics`: Widget usage and performance metrics
- `dashboard_metrics`: Overall system health metrics

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Configuration Tables</span>

</div>
- `alert_configurations`: User-defined alert settings
- `notification_preferences`: Channel preferences by organization/user

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Environment Configuration</span>

</div>

The monitoring system requires several environment variables:

```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Email notifications</span>

</div>
ALERT_EMAIL_RECIPIENTS=admin@passiton.com,ops@passiton.com

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Slack integration</span>

</div>
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 SMS notifications (Twilio)</span>

</div>
ALERT_SMS_RECIPIENTS=+1234567890,+0987654321
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 PagerDuty integration</span>

</div>
PAGERDUTY_INTEGRATION_KEY=...
```

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Monitoring Best Practices</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Alert Fatigue Prevention</span>

</div>
- Use appropriate severity levels
- Implement rate limiting for similar alerts
- Group related alerts when possible
- Regular review and tuning of thresholds

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Performance Considerations</span>

</div>
- Asynchronous alert processing
- Batch database operations
- Efficient baseline calculations
- Cached metric lookups

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Security Considerations</span>

</div>
- Sanitize alert data before transmission
- Secure API keys and webhook URLs
- Rate limit alert endpoints
- Monitor for alert system abuse

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Getting Started</span>

</div>

1. **Initialize the monitoring system**:
```typescript
import { monitoring } from '@/lib/monitoring';
await monitoring.initialize();
```

2. **Configure notification channels** in environment variables

3. **Set up database tables** using the provided migrations

4. **Integrate monitoring calls** in your application code

5. **Test the system**:
```typescript
await monitoring.testAlerts();
```

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Maintenance</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Regular Tasks</span>

</div>
- Review alert thresholds monthly
- Clean up old alert data (>90 days)
- Update notification channel configurations
- Monitor system performance impact

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔍 Troubleshooting</span>

</div>
- Check environment variable configuration
- Verify database connectivity
- Test notification channel endpoints
- Review alert logs for patterns

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Future Enhancements</span>

</div>

- Machine learning-based anomaly detection
- Custom dashboard for alert visualization
- Integration with additional notification services
- Advanced correlation and root cause analysis
- Mobile app for alert management