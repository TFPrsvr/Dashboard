# Monitoring API Reference - Developer Integration Guide

This document provides a comprehensive reference for integrating with the PassItOn monitoring system APIs and classes.

## Core Classes

### AlertService

Central service for sending alerts across multiple notification channels.

#### Constructor

```typescript
constructor()
```

Creates a new AlertService instance with default notification channels.

#### Methods

##### sendAlert(alert: AlertData): Promise<void>

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

##### addChannel(channel: NotificationChannel): void

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

##### getAvailableChannels(): string[]

Returns list of available notification channel names.

**Returns:** Array of channel names

---

### PaymentAlertMonitor

Monitors payment-related issues and failures.

#### Constructor

```typescript
constructor()
```

#### Methods

##### monitorStripeWebhooks(event: any, error?: Error): Promise<void>

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

##### monitorPaymentFailures(paymentData: PaymentFailureData): Promise<void>

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

### WidgetAlertMonitor

Monitors widget loading and performance issues.

#### Methods

##### monitorWidgetLoadError(errorData: WidgetLoadErrorData): Promise<void>

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

### TrafficAlertMonitor

Monitors traffic patterns and anomalies.

#### Methods

##### monitorTrafficMetrics(metrics: TrafficMetrics, organizationId?: string): Promise<void>

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

### DashboardAlertMonitor

Monitors dashboard availability and performance.

#### Methods

##### monitorEndpointHealth(endpoint: string, responseTime: number, statusCode: number, error?: string): Promise<void>

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

## Integration Examples

### Express.js Middleware Integration

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

### Payment Processing Integration

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

### Frontend Widget Integration

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

## Alert Severity Levels

| Severity | Channels | Use Case |
|----------|----------|----------|
| `critical` | Slack, Email, PagerDuty, SMS | System failures, security breaches |
| `high` | Slack, Email | Service degradation, payment failures |
| `medium` | Slack | Performance issues, minor errors |
| `low` | Email | Informational alerts, trends |