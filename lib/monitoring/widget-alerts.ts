/**
 * Widget Loading Error Alert System
 * 
 * Monitors widget loading errors and performance issues
 */

import { supabase } from '@/lib/supabase/client';
import { AlertService } from './alert-service';

export interface WidgetAlert {
  id: string;
  type: 'widget_load_error' | 'widget_render_error' | 'widget_timeout' | 'widget_script_error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  organizationId: string;
  widgetId: string;
  url: string;
  userAgent: string;
  errorMessage: string;
  metadata: Record<string, any>;
  timestamp: Date;
}

export class WidgetAlertMonitor {
  private alertService: AlertService;
  private thresholds = {
    errorRate: 0.1, // 10% error rate triggers alert
    consecutiveErrors: 5,
    timeWindow: 10 * 60 * 1000, // 10 minutes
    loadTimeout: 30000, // 30 seconds
    renderTimeout: 15000, // 15 seconds
  };

  constructor() {
    this.alertService = new AlertService();
  }

  /**
   * Monitor widget loading errors
   */
  async monitorWidgetLoadError(errorData: {
    organizationId: string;
    widgetId: string;
    url: string;
    error: string;
    loadTime?: number;
    userAgent?: string;
    stackTrace?: string;
  }) {
    const alert: WidgetAlert = {
      id: `widget_load_error_${Date.now()}`,
      type: 'widget_load_error',
      severity: this.calculateLoadErrorSeverity(errorData.error, errorData.loadTime),
      organizationId: errorData.organizationId,
      widgetId: errorData.widgetId,
      url: errorData.url,
      userAgent: errorData.userAgent || 'Unknown',
      errorMessage: errorData.error,
      metadata: {
        loadTime: errorData.loadTime,
        stackTrace: errorData.stackTrace,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
    await this.checkWidgetErrorPatterns(errorData.organizationId, errorData.widgetId);
  }

  /**
   * Monitor widget rendering errors
   */
  async monitorWidgetRenderError(errorData: {
    organizationId: string;
    widgetId: string;
    url: string;
    error: string;
    renderTime?: number;
    domainInfo?: any;
    userAgent?: string;
  }) {
    const alert: WidgetAlert = {
      id: `widget_render_error_${Date.now()}`,
      type: 'widget_render_error',
      severity: this.calculateRenderErrorSeverity(errorData.error),
      organizationId: errorData.organizationId,
      widgetId: errorData.widgetId,
      url: errorData.url,
      userAgent: errorData.userAgent || 'Unknown',
      errorMessage: errorData.error,
      metadata: {
        renderTime: errorData.renderTime,
        domainInfo: errorData.domainInfo,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
    await this.checkWidgetErrorPatterns(errorData.organizationId, errorData.widgetId);
  }

  /**
   * Monitor widget timeouts
   */
  async monitorWidgetTimeout(timeoutData: {
    organizationId: string;
    widgetId: string;
    url: string;
    timeoutType: 'load' | 'render' | 'api_call';
    duration: number;
    expectedDuration: number;
    userAgent?: string;
  }) {
    const alert: WidgetAlert = {
      id: `widget_timeout_${Date.now()}`,
      type: 'widget_timeout',
      severity: this.calculateTimeoutSeverity(timeoutData.duration, timeoutData.expectedDuration),
      organizationId: timeoutData.organizationId,
      widgetId: timeoutData.widgetId,
      url: timeoutData.url,
      userAgent: timeoutData.userAgent || 'Unknown',
      errorMessage: `Widget ${timeoutData.timeoutType} timeout: ${timeoutData.duration}ms (expected: ${timeoutData.expectedDuration}ms)`,
      metadata: {
        timeoutType: timeoutData.timeoutType,
        duration: timeoutData.duration,
        expectedDuration: timeoutData.expectedDuration,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
  }

  /**
   * Monitor widget script errors
   */
  async monitorWidgetScriptError(errorData: {
    organizationId: string;
    widgetId: string;
    url: string;
    error: string;
    scriptUrl?: string;
    lineNumber?: number;
    columnNumber?: number;
    userAgent?: string;
    stackTrace?: string;
  }) {
    const alert: WidgetAlert = {
      id: `widget_script_error_${Date.now()}`,
      type: 'widget_script_error',
      severity: this.calculateScriptErrorSeverity(errorData.error),
      organizationId: errorData.organizationId,
      widgetId: errorData.widgetId,
      url: errorData.url,
      userAgent: errorData.userAgent || 'Unknown',
      errorMessage: errorData.error,
      metadata: {
        scriptUrl: errorData.scriptUrl,
        lineNumber: errorData.lineNumber,
        columnNumber: errorData.columnNumber,
        stackTrace: errorData.stackTrace,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
  }

  /**
   * Calculate load error severity
   */
  private calculateLoadErrorSeverity(error: string, loadTime?: number): WidgetAlert['severity'] {
    // Critical errors that prevent widget from loading at all
    const criticalErrors = [
      'script not found',
      'network error',
      'cors error',
      'authentication failed',
    ];

    if (criticalErrors.some(err => error.toLowerCase().includes(err))) {
      return 'critical';
    }

    // High severity for slow loads or multiple failures
    if (loadTime && loadTime > this.thresholds.loadTimeout) {
      return 'high';
    }

    // Configuration or styling errors
    const mediumErrors = [
      'configuration error',
      'invalid widget id',
      'styling conflict',
    ];

    if (mediumErrors.some(err => error.toLowerCase().includes(err))) {
      return 'medium';
    }

    return 'low';
  }

  /**
   * Calculate render error severity
   */
  private calculateRenderErrorSeverity(error: string): WidgetAlert['severity'] {
    const criticalErrors = [
      'dom manipulation failed',
      'react render error',
      'cannot read property',
    ];

    const highErrors = [
      'styling error',
      'element not found',
      'payment form error',
    ];

    if (criticalErrors.some(err => error.toLowerCase().includes(err))) {
      return 'critical';
    }

    if (highErrors.some(err => error.toLowerCase().includes(err))) {
      return 'high';
    }

    return 'medium';
  }

  /**
   * Calculate timeout severity
   */
  private calculateTimeoutSeverity(duration: number, expected: number): WidgetAlert['severity'] {
    const ratio = duration / expected;
    
    if (ratio > 3) return 'critical'; // 3x longer than expected
    if (ratio > 2) return 'high';     // 2x longer than expected
    if (ratio > 1.5) return 'medium'; // 1.5x longer than expected
    return 'low';
  }

  /**
   * Calculate script error severity
   */
  private calculateScriptErrorSeverity(error: string): WidgetAlert['severity'] {
    const criticalErrors = [
      'uncaught exception',
      'reference error',
      'type error',
    ];

    const highErrors = [
      'api call failed',
      'payment processing error',
      'validation error',
    ];

    if (criticalErrors.some(err => error.toLowerCase().includes(err))) {
      return 'critical';
    }

    if (highErrors.some(err => error.toLowerCase().includes(err))) {
      return 'high';
    }

    return 'medium';
  }

  /**
   * Check for widget error patterns
   */
  private async checkWidgetErrorPatterns(organizationId: string, widgetId: string) {
    const recentErrors = await this.getRecentWidgetErrors(organizationId, widgetId);
    
    // Check consecutive errors
    if (recentErrors.consecutive >= this.thresholds.consecutiveErrors) {
      await this.triggerSystemAlert('consecutive_widget_errors', {
        organizationId,
        widgetId,
        count: recentErrors.consecutive,
        threshold: this.thresholds.consecutiveErrors,
      });
    }

    // Check error rate
    if (recentErrors.rate > this.thresholds.errorRate) {
      await this.triggerSystemAlert('high_widget_error_rate', {
        organizationId,
        widgetId,
        rate: recentErrors.rate,
        threshold: this.thresholds.errorRate,
        timeWindow: this.thresholds.timeWindow,
      });
    }
  }

  /**
   * Trigger alert through alert service
   */
  private async triggerAlert(alert: WidgetAlert) {
    await this.alertService.sendAlert({
      type: 'widget',
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
      title: `Widget System Alert: ${type}`,
      message: `Detected widget system issue: ${type}`,
      data,
      channels: ['slack', 'email'],
    });
  }

  /**
   * Get alert title based on alert type
   */
  private getAlertTitle(alert: WidgetAlert): string {
    const titles = {
      widget_load_error: `🚫 Widget Load Error - ${alert.widgetId}`,
      widget_render_error: `🎨 Widget Render Error - ${alert.widgetId}`,
      widget_timeout: `⏱️ Widget Timeout - ${alert.widgetId}`,
      widget_script_error: `📜 Widget Script Error - ${alert.widgetId}`,
    };
    
    return titles[alert.type] || 'Widget Alert';
  }

  /**
   * Get alert message
   */
  private getAlertMessage(alert: WidgetAlert): string {
    return `Organization: ${alert.organizationId}\n` +
           `Widget: ${alert.widgetId}\n` +
           `URL: ${alert.url}\n` +
           `Error: ${alert.errorMessage}\n` +
           `User Agent: ${alert.userAgent}\n` +
           `Time: ${alert.timestamp.toISOString()}\n` +
           `Severity: ${alert.severity.toUpperCase()}`;
  }

  /**
   * Get alert channels based on severity
   */
  private getAlertChannels(severity: WidgetAlert['severity']): string[] {
    switch (severity) {
      case 'critical':
        return ['slack', 'email'];
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
   * Get recent widget error statistics
   */
  private async getRecentWidgetErrors(organizationId: string, widgetId: string) {
    const since = new Date(Date.now() - this.thresholds.timeWindow);
    
    const { data: errors, error } = await supabase
      .from('widget_alerts')
      .select('*')
      .eq('organization_id', organizationId)
      .eq('widget_id', widgetId)
      .gte('created_at', since.toISOString())
      .in('type', ['widget_load_error', 'widget_render_error', 'widget_script_error']);

    if (error) throw error;

    // Calculate consecutive errors and error rate
    const sortedErrors = errors?.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) || [];

    let consecutive = 0;
    for (const errorRecord of sortedErrors) {
      if (errorRecord.type === 'widget_load_error') {
        consecutive++;
      } else {
        break;
      }
    }

    // Get total widget loads for rate calculation
    const { count: totalLoads } = await supabase
      .from('widget_analytics')
      .select('*', { count: 'exact', head: true })
      .eq('organization_id', organizationId)
      .eq('widget_id', widgetId)
      .gte('created_at', since.toISOString());

    const rate = totalLoads ? (errors?.length || 0) / totalLoads : 0;

    return { consecutive, rate, total: errors?.length || 0 };
  }

  /**
   * Store alert in database
   */
  private async storeAlert(alert: WidgetAlert) {
    const { error } = await supabase
      .from('widget_alerts')
      .insert({
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        organization_id: alert.organizationId,
        widget_id: alert.widgetId,
        url: alert.url,
        user_agent: alert.userAgent,
        error_message: alert.errorMessage,
        metadata: alert.metadata,
        created_at: alert.timestamp.toISOString(),
      });

    if (error) {
      console.error('Failed to store widget alert:', error);
    }
  }
}

// Export singleton instance
export const widgetAlertMonitor = new WidgetAlertMonitor();