/**
 * Payment Failure Alert System
 * 
 * Monitors payment processing and sends alerts for various failure scenarios
 */

import { supabase } from '@/lib/supabase/supabase-client';
import { AlertService } from './alert-service';

export interface PaymentAlert {
  id: string;
  type: 'payment_failed' | 'payment_declined' | 'payment_timeout' | 'stripe_webhook_failed';
  severity: 'low' | 'medium' | 'high' | 'critical';
  organizationId: string;
  userId?: string;
  amount?: number;
  currency?: string;
  errorMessage: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export class PaymentAlertMonitor {
  private alertService: AlertService;
  private thresholds = {
    failureRate: 0.05, // 5% failure rate triggers alert
    consecutiveFailures: 3,
    timeWindow: 15 * 60 * 1000, // 15 minutes
    criticalAmount: 1000, // $1000+ failures are critical
  };

  constructor() {
    this.alertService = new AlertService();
  }

  /**
   * Monitor Stripe webhook failures
   */
  async monitorStripeWebhooks(event: any, error?: Error) {
    const alert: Partial<PaymentAlert> = {
      type: 'stripe_webhook_failed',
      severity: 'high',
      errorMessage: error?.message || 'Webhook processing failed',
      metadata: {
        eventType: event.type,
        eventId: event.id,
        livemode: event.livemode,
        created: event.created,
        stackTrace: error?.stack,
      },
      timestamp: new Date(),
    };

    // Critical events that must be processed
    const criticalEvents = [
      'payment_intent.succeeded',
      'payment_intent.payment_failed',
      'invoice.payment_succeeded',
      'invoice.payment_failed',
      'customer.subscription.deleted',
    ];

    if (criticalEvents.includes(event.type)) {
      alert.severity = 'critical';
    }

    await this.triggerAlert(alert as PaymentAlert);
    await this.logWebhookFailure(event, error);
  }

  /**
   * Monitor payment failures during processing
   */
  async monitorPaymentFailures(paymentData: {
    organizationId: string;
    userId?: string;
    amount: number;
    currency: string;
    error: string;
    paymentIntentId?: string;
    widgetId?: string;
  }) {
    const alert: PaymentAlert = {
      id: `payment_failure_${Date.now()}`,
      type: 'payment_failed',
      severity: this.calculateSeverity(paymentData.amount, paymentData.error),
      organizationId: paymentData.organizationId,
      userId: paymentData.userId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      errorMessage: paymentData.error,
      metadata: {
        paymentIntentId: paymentData.paymentIntentId,
        widgetId: paymentData.widgetId,
        userAgent: this.getUserAgent(),
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
    await this.checkFailurePatterns(paymentData.organizationId);
  }

  /**
   * Monitor payment declines
   */
  async monitorPaymentDeclines(declineData: {
    organizationId: string;
    userId?: string;
    amount: number;
    currency: string;
    declineCode: string;
    declineMessage: string;
    cardType?: string;
    cardCountry?: string;
  }) {
    const alert: PaymentAlert = {
      id: `payment_decline_${Date.now()}`,
      type: 'payment_declined',
      severity: this.calculateDeclineSeverity(declineData.declineCode, declineData.amount),
      organizationId: declineData.organizationId,
      userId: declineData.userId,
      amount: declineData.amount,
      currency: declineData.currency,
      errorMessage: `Payment declined: ${declineData.declineMessage} (${declineData.declineCode})`,
      metadata: {
        declineCode: declineData.declineCode,
        cardType: declineData.cardType,
        cardCountry: declineData.cardCountry,
        possibleFraud: this.isSuspiciousDecline(declineData.declineCode),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
    await this.trackDeclinePatterns(declineData);
  }

  /**
   * Monitor payment timeouts
   */
  async monitorPaymentTimeouts(timeoutData: {
    organizationId: string;
    userId?: string;
    amount: number;
    currency: string;
    duration: number;
    stage: 'intent_creation' | 'confirmation' | 'webhook_processing';
  }) {
    const alert: PaymentAlert = {
      id: `payment_timeout_${Date.now()}`,
      type: 'payment_timeout',
      severity: timeoutData.duration > 30000 ? 'high' : 'medium', // 30 seconds
      organizationId: timeoutData.organizationId,
      userId: timeoutData.userId,
      amount: timeoutData.amount,
      currency: timeoutData.currency,
      errorMessage: `Payment timeout at ${timeoutData.stage} stage (${timeoutData.duration}ms)`,
      metadata: {
        duration: timeoutData.duration,
        stage: timeoutData.stage,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
  }

  /**
   * Check for failure patterns that indicate systemic issues
   */
  private async checkFailurePatterns(organizationId: string) {
    const recentFailures = await this.getRecentFailures(organizationId);
    
    // Check consecutive failures
    if (recentFailures.consecutive >= this.thresholds.consecutiveFailures) {
      await this.triggerSystemAlert('consecutive_payment_failures', {
        organizationId,
        count: recentFailures.consecutive,
        threshold: this.thresholds.consecutiveFailures,
      });
    }

    // Check failure rate
    if (recentFailures.rate > this.thresholds.failureRate) {
      await this.triggerSystemAlert('high_payment_failure_rate', {
        organizationId,
        rate: recentFailures.rate,
        threshold: this.thresholds.failureRate,
        timeWindow: this.thresholds.timeWindow,
      });
    }
  }

  /**
   * Calculate alert severity based on amount and error type
   */
  private calculateSeverity(amount: number, error: string): PaymentAlert['severity'] {
    if (amount >= this.thresholds.criticalAmount) return 'critical';
    
    const highSeverityErrors = [
      'card_declined_insufficient_funds',
      'card_declined_lost_card',
      'card_declined_stolen_card',
      'processing_error',
    ];
    
    if (highSeverityErrors.some(err => error.includes(err))) return 'high';
    if (amount >= 100) return 'medium';
    return 'low';
  }

  /**
   * Calculate decline severity
   */
  private calculateDeclineSeverity(declineCode: string, amount: number): PaymentAlert['severity'] {
    const criticalCodes = ['fraudulent', 'stolen_card', 'lost_card'];
    const highCodes = ['insufficient_funds', 'currency_not_supported', 'processing_error'];
    
    if (criticalCodes.includes(declineCode)) return 'critical';
    if (highCodes.includes(declineCode)) return 'high';
    if (amount >= this.thresholds.criticalAmount) return 'high';
    return 'medium';
  }

  /**
   * Check if decline is suspicious/potentially fraudulent
   */
  private isSuspiciousDecline(declineCode: string): boolean {
    return ['fraudulent', 'stolen_card', 'lost_card', 'pickup_card'].includes(declineCode);
  }

  /**
   * Trigger alert through alert service
   */
  private async triggerAlert(alert: PaymentAlert) {
    await this.alertService.sendAlert({
      type: 'payment',
      severity: alert.severity,
      title: this.getAlertTitle(alert),
      message: this.getAlertMessage(alert),
      data: alert,
      channels: this.getAlertChannels(alert.severity),
    });

    // Store alert in database
    await this.storeAlert(alert);
  }

  /**
   * Trigger system-level alerts for patterns
   */
  private async triggerSystemAlert(type: string, data: any) {
    await this.alertService.sendAlert({
      type: 'system',
      severity: 'critical',
      title: `Payment System Alert: ${type}`,
      message: `Detected payment system issue: ${type}`,
      data,
      channels: ['slack', 'email', 'pagerduty'],
    });
  }

  /**
   * Get alert title based on alert type
   */
  private getAlertTitle(alert: PaymentAlert): string {
    const titles = {
      payment_failed: `💳 Payment Failed - $${alert.amount} ${alert.currency?.toUpperCase()}`,
      payment_declined: `⚠️ Payment Declined - $${alert.amount} ${alert.currency?.toUpperCase()}`,
      payment_timeout: `⏱️ Payment Timeout - $${alert.amount} ${alert.currency?.toUpperCase()}`,
      stripe_webhook_failed: `🔗 Stripe Webhook Failed`,
    };
    
    return titles[alert.type] || 'Payment Alert';
  }

  /**
   * Get alert message
   */
  private getAlertMessage(alert: PaymentAlert): string {
    return `Organization: ${alert.organizationId}\n` +
           `Error: ${alert.errorMessage}\n` +
           `Time: ${alert.timestamp.toISOString()}\n` +
           `Severity: ${alert.severity.toUpperCase()}`;
  }

  /**
   * Get alert channels based on severity
   */
  private getAlertChannels(severity: PaymentAlert['severity']): string[] {
    switch (severity) {
      case 'critical':
        return ['slack', 'email', 'pagerduty', 'sms'];
      case 'high':
        return ['slack', 'email'];
      case 'medium':
        return ['slack'];
      case 'low':
        return ['email'];
      default:
        return ['slack'];
    }
  }

  /**
   * Get recent failure statistics
   */
  private async getRecentFailures(organizationId: string) {
    const since = new Date(Date.now() - this.thresholds.timeWindow);
    
    const { data: failures, error } = await supabase
      .from('payment_alerts')
      .select('*')
      .eq('organization_id', organizationId)
      .gte('created_at', since.toISOString())
      .in('type', ['payment_failed', 'payment_declined', 'payment_timeout']);

    if (error) throw error;

    // Calculate consecutive failures and failure rate
    const sortedFailures = failures?.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) || [];

    let consecutive = 0;
    for (const failure of sortedFailures) {
      if (failure.type !== 'payment_failed') break;
      consecutive++;
    }

    // Get total payments attempted for rate calculation
    const { count: totalPayments } = await supabase
      .from('donations')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organizationId)
      .gte('created_at', since.toISOString());

    const rate = totalPayments ? failures?.length / totalPayments : 0;

    return { consecutive, rate, total: failures?.length || 0 };
  }

  /**
   * Store alert in database
   */
  private async storeAlert(alert: PaymentAlert) {
    const { error } = await supabase
      .from('payment_alerts')
      .insert({
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        organization_id: alert.organizationId,
        user_id: alert.userId,
        amount: alert.amount,
        currency: alert.currency,
        error_message: alert.errorMessage,
        metadata: alert.metadata,
        created_at: alert.timestamp.toISOString(),
      });

    if (error) {
      console.error('Failed to store payment alert:', error);
    }
  }

  /**
   * Track decline patterns for fraud detection
   */
  private async trackDeclinePatterns(declineData: any) {
    // Implementation for tracking decline patterns
    // This could involve machine learning or rule-based fraud detection
  }

  /**
   * Log webhook failures
   */
  private async logWebhookFailure(event: any, error?: Error) {
    const { error: dbError } = await supabase
      .from('webhook_failures')
      .insert({
        event_id: event.id,
        event_type: event.type,
        error_message: error?.message,
        error_stack: error?.stack,
        event_data: event,
        created_at: new Date().toISOString(),
      });

    if (dbError) {
      console.error('Failed to log webhook failure:', dbError);
    }
  }

  private getUserAgent(): string {
    return typeof window !== 'undefined' ? window.navigator.userAgent : 'Server';
  }
}

// Export singleton instance
export const paymentAlertMonitor = new PaymentAlertMonitor();