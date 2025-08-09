# Monitoring & Alert System - Developer Overview

The PassItOn Admin platform includes a comprehensive monitoring and alerting system designed to proactively identify and respond to system issues before they impact users.

## Architecture

The monitoring system is built around a modular architecture with the following components:

### Core Components

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

## Alert Severity Levels

The system uses four severity levels with different notification channels:

| Severity | Description | Channels |
|----------|-------------|----------|
| **Critical** | System-wide failures, security issues | Slack, Email, PagerDuty, SMS |
| **High** | Service degradation, payment failures | Slack, Email |
| **Medium** | Performance issues, minor errors | Slack |
| **Low** | Informational alerts, low-impact issues | Email |

## Data Flow

```
Application Events → Monitoring Services → AlertService → Notification Channels
                                       ↓
                                   Database Storage
```

1. **Event Detection**: Application components detect issues and call monitoring services
2. **Alert Processing**: Monitoring services evaluate severity and create structured alerts
3. **Notification**: AlertService routes notifications to appropriate channels
4. **Storage**: Alerts are stored in Supabase for historical analysis and reporting

## Key Features

### Intelligent Thresholds
- Dynamic baseline calculation for traffic patterns
- Consecutive failure detection
- Rate-based alerting to prevent spam
- Time-window analysis for pattern recognition

### Pattern Recognition
- Payment failure clustering
- Widget error correlation
- Traffic anomaly detection
- Geographic distribution analysis

### Performance Monitoring
- Response time tracking
- Database connection health
- API endpoint availability
- Widget loading performance

### Security Monitoring
- Authentication failure tracking
- Suspicious traffic pattern detection
- Bot traffic identification
- Geographic anomaly alerts

## Integration Points

### Frontend Integration
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

### API Integration
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

### Payment Integration
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

## Database Schema

The monitoring system requires the following database tables:

### Alert Tables
- `payment_alerts`: Payment-related alerts and failures
- `widget_alerts`: Widget loading and performance issues
- `traffic_alerts`: Traffic pattern anomalies
- `dashboard_alerts`: System availability and performance
- `system_alerts`: General system notifications

### Metrics Tables
- `traffic_baselines`: Historical traffic patterns for comparison
- `endpoint_metrics`: API endpoint performance data
- `widget_analytics`: Widget usage and performance metrics
- `dashboard_metrics`: Overall system health metrics

### Configuration Tables
- `alert_configurations`: User-defined alert settings
- `notification_preferences`: Channel preferences by organization/user

## Environment Configuration

The monitoring system requires several environment variables:

```bash
# Email notifications
ALERT_EMAIL_RECIPIENTS=admin@passiton.com,ops@passiton.com

# Slack integration
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...

# SMS notifications (Twilio)
ALERT_SMS_RECIPIENTS=+1234567890,+0987654321
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1234567890

# PagerDuty integration
PAGERDUTY_INTEGRATION_KEY=...
```

## Monitoring Best Practices

### Alert Fatigue Prevention
- Use appropriate severity levels
- Implement rate limiting for similar alerts
- Group related alerts when possible
- Regular review and tuning of thresholds

### Performance Considerations
- Asynchronous alert processing
- Batch database operations
- Efficient baseline calculations
- Cached metric lookups

### Security Considerations
- Sanitize alert data before transmission
- Secure API keys and webhook URLs
- Rate limit alert endpoints
- Monitor for alert system abuse

## Getting Started

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

## Maintenance

### Regular Tasks
- Review alert thresholds monthly
- Clean up old alert data (>90 days)
- Update notification channel configurations
- Monitor system performance impact

### Troubleshooting
- Check environment variable configuration
- Verify database connectivity
- Test notification channel endpoints
- Review alert logs for patterns

## Future Enhancements

- Machine learning-based anomaly detection
- Custom dashboard for alert visualization
- Integration with additional notification services
- Advanced correlation and root cause analysis
- Mobile app for alert management