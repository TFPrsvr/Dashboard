<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔌 Monitoring API Reference - Developer Integration Guide</span>

</div>

This document provides a comprehensive reference for integrating with the PassItOn monitoring system APIs and classes.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Core Classes</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 AlertService</span>

</div>

Central service for sending alerts across multiple notification channels.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Constructor</span>

</div>

```typescript
constructor()
```

Creates a new AlertService instance with default notification channels.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Methods</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 sendAlert(alert: AlertData): Promise<void></span>

</div>

Sends an alert through the specified channels.

**Parameters:**
- `alert: AlertData` - The alert data to send

**Example:**
```typescript
await alertService.sendAlert({
  type: 'payment',
  severity: 'high',
  title: 'Payment Processing Error',
  message: 'Failed to process payment for order #12345',
  data: { orderId: '12345', amount: 99.99 },
  channels: ['slack', 'email']
});
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 addChannel(channel: NotificationChannel): void</span>

</div>

Adds a custom notification channel.

**Parameters:**
- `channel: NotificationChannel` - Custom notification channel

**Example:**
```typescript
alertService.addChannel({
  name: 'discord',
  send: async (alert: AlertData) => {
    // Custom Discord integration
  }
});
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 getAvailableChannels(): string[]</span>

</div>

Returns list of available notification channel names.

**Returns:** Array of channel names

---

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 PaymentAlertMonitor</span>

</div>

Monitors payment-related issues and failures.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Constructor</span>

</div>

```typescript
constructor()
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Methods</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 monitorStripeWebhooks(event: any, error?: Error): Promise<void></span>

</div>

Monitors Stripe webhook failures.

**Parameters:**
- `event: any` - Stripe event object
- `error?: Error` - Optional error object

**Example:**
```typescript
try {
  await processStripeWebhook(event);
} catch (error) {
  await paymentAlertMonitor.monitorStripeWebhooks(event, error);
  throw error;
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 monitorPaymentFailures(paymentData: PaymentFailureData): Promise<void></span>

</div>

Monitors payment processing failures.

**Parameters:**
```typescript
interface PaymentFailureData {
  organizationId: string;
  userId?: string;
  amount: number;
  currency: string;
  error: string;
  paymentIntentId?: string;
  widgetId?: string;
}
```

**Example:**
```typescript
await paymentAlertMonitor.monitorPaymentFailures({
  organizationId: 'org-123',
  userId: 'user-456',
  amount: 99.99,
  currency: 'usd',
  error: 'Card declined: insufficient funds',
  paymentIntentId: 'pi_123456789'
});
```

---

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 WidgetAlertMonitor</span>

</div>

Monitors widget loading and performance issues.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Methods</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 monitorWidgetLoadError(errorData: WidgetLoadErrorData): Promise<void></span>

</div>

Monitors widget loading failures.

**Parameters:**
```typescript
interface WidgetLoadErrorData {
  organizationId: string;
  widgetId: string;
  url: string;
  error: string;
  loadTime?: number;
  userAgent?: string;
  stackTrace?: string;
}
```

**Example:**
```typescript
try {
  await loadWidget(widgetId);
} catch (error) {
  await widgetAlertMonitor.monitorWidgetLoadError({
    organizationId: 'org-123',
    widgetId: 'widget-456',
    url: window.location.href,
    error: error.message,
    loadTime: Date.now() - startTime,
    userAgent: navigator.userAgent
  });
}
```

---

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 TrafficAlertMonitor</span>

</div>

Monitors traffic patterns and anomalies.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Methods</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 monitorTrafficMetrics(metrics: TrafficMetrics, organizationId?: string): Promise<void></span>

</div>

Analyzes current traffic metrics against baselines.

**Parameters:**
```typescript
interface TrafficMetrics {
  totalRequests: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  errorRate: number;
  geographicDistribution: Record<string, number>;
  userAgents: Record<string, number>;
  referrers: Record<string, number>;
}
```

---

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 DashboardAlertMonitor</span>

</div>

Monitors dashboard availability and performance.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Methods</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 monitorEndpointHealth(endpoint: string, responseTime: number, statusCode: number, error?: string): Promise<void></span>

</div>

Monitors API endpoint health and performance.

**Example:**
```typescript
app.use(async (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', async () => {
    const responseTime = Date.now() - start;
    await dashboardAlertMonitor.monitorEndpointHealth(
      req.path,
      responseTime,
      res.statusCode,
      res.statusCode >= 400 ? 'HTTP Error' : undefined
    );
  });
  
  next();
});
```

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">💡 Integration Examples</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Express.js Middleware Integration</span>

</div>

```typescript
import { monitoring } from '@/lib/monitoring';
import express from 'express';

const app = express();

// Performance monitoring middleware
app.use(async (req, res, next) => {
  const start = Date.now();
  
  res.on('finish', async () => {
    const responseTime = Date.now() - start;
    await monitoring.dashboard.monitorEndpointHealth(
      req.path,
      responseTime,
      res.statusCode
    );
  });
  
  next();
});
```

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Payment Processing Integration</span>

</div>

```typescript
import { monitoring } from '@/lib/monitoring';

async function processPayment(paymentData: PaymentData) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentData.amount,
      currency: paymentData.currency,
    });
    
    return paymentIntent;
  } catch (error) {
    await monitoring.payment.monitorPaymentFailures({
      organizationId: paymentData.organizationId,
      userId: paymentData.userId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      error: error.message,
    });
    
    throw error;
  }
}
```

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Frontend Widget Integration</span>

</div>

```typescript
import { monitoring } from '@/lib/monitoring';

class WidgetLoader {
  async loadWidget(widgetId: string, organizationId: string) {
    const startTime = Date.now();
    
    try {
      const widget = await this.fetchWidget(widgetId);
      await this.renderWidget(widget);
      return widget;
    } catch (error) {
      const loadTime = Date.now() - startTime;
      
      await monitoring.widget.monitorWidgetLoadError({
        organizationId,
        widgetId,
        url: window.location.href,
        error: error.message,
        loadTime,
        userAgent: navigator.userAgent
      });
      
      throw error;
    }
  }
}
```

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Alert Severity Levels</span>

</div>

| Severity | Channels | Use Case |
|----------|----------|----------|
| `critical` | Slack, Email, PagerDuty, SMS | System failures, security breaches |
| `high` | Slack, Email | Service degradation, payment failures |
| `medium` | Slack | Performance issues, minor errors |
| `low` | Email | Informational alerts, trends |