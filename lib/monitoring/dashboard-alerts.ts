/**
 * Dashboard Access Alert System
 * 
 * Monitors dashboard availability, performance, and access issues
 */

import { supabase } from '@/lib/supabase/supabase-client';
import { AlertService } from './alert-service';

export interface DashboardAlert {
  id: string;
  type: 'dashboard_down' | 'slow_response' | 'auth_failure' | 'api_error' | 'database_connection_error';
  severity: 'low' | 'medium' | 'high' | 'critical';
  endpoint: string;
  userId?: string;
  organizationId?: string;
  responseTime?: number;
  errorMessage: string;
  statusCode?: number;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface DashboardHealth {
  uptime: number;
  responseTime: number;
  errorRate: number;
  activeUsers: number;
  dbConnectionStatus: 'healthy' | 'degraded' | 'down';
  apiEndpoints: Record<string, {
    status: 'up' | 'down' | 'degraded';
    responseTime: number;
    errorRate: number;
  }>;
}

export class DashboardAlertMonitor {
  private alertService: AlertService;
  private thresholds = {
    responseTime: {
      warning: 2000,   // 2 seconds
      critical: 5000,  // 5 seconds
    },
    errorRate: {
      warning: 0.05,   // 5%
      critical: 0.15,  // 15%
    },
    consecutiveFailures: 3,
    uptimeThreshold: 0.99, // 99% uptime
    timeWindow: 15 * 60 * 1000, // 15 minutes
  };

  constructor() {
    this.alertService = new AlertService();
  }

  /**
   * Monitor dashboard endpoint health
   */
  async monitorEndpointHealth(endpoint: string, responseTime: number, statusCode: number, error?: string) {
    // Check if endpoint is down
    if (statusCode >= 500) {
      await this.monitorDashboardDown({
        endpoint,
        statusCode,
        error: error || `Server error: ${statusCode}`,
        responseTime,
      });
    }
    // Check for slow responses
    else if (responseTime > this.thresholds.responseTime.warning) {
      await this.monitorSlowResponse({
        endpoint,
        responseTime,
        threshold: this.thresholds.responseTime.warning,
      });
    }
    // Check for client errors (4xx)
    else if (statusCode >= 400 && statusCode < 500) {
      await this.monitorAuthFailure({
        endpoint,
        statusCode,
        error: error || `Client error: ${statusCode}`,
      });
    }

    // Update endpoint health metrics
    await this.updateEndpointMetrics(endpoint, responseTime, statusCode);
  }

  /**
   * Monitor dashboard downtime
   */
  async monitorDashboardDown(downData: {
    endpoint: string;
    statusCode: number;
    error: string;
    responseTime?: number;
    userId?: string;
    organizationId?: string;
  }) {
    const alert: DashboardAlert = {
      id: `dashboard_down_${Date.now()}`,
      type: 'dashboard_down',
      severity: this.calculateDowntimeSeverity(downData.statusCode),
      endpoint: downData.endpoint,
      userId: downData.userId,
      organizationId: downData.organizationId,
      responseTime: downData.responseTime,
      errorMessage: downData.error,
      statusCode: downData.statusCode,
      metadata: {
        timestamp: Date.now(),
        userAgent: this.getUserAgent(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
    await this.checkDowntimePatterns(downData.endpoint);
  }

  /**
   * Monitor slow response times
   */
  async monitorSlowResponse(slowData: {
    endpoint: string;
    responseTime: number;
    threshold: number;
    userId?: string;
    organizationId?: string;
  }) {
    const alert: DashboardAlert = {
      id: `slow_response_${Date.now()}`,
      type: 'slow_response',
      severity: this.calculateSlowResponseSeverity(slowData.responseTime),
      endpoint: slowData.endpoint,
      userId: slowData.userId,
      organizationId: slowData.organizationId,
      responseTime: slowData.responseTime,
      errorMessage: `Slow response: ${slowData.responseTime}ms (threshold: ${slowData.threshold}ms)`,
      metadata: {
        threshold: slowData.threshold,
        slownessFactor: slowData.responseTime / slowData.threshold,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
  }

  /**
   * Monitor authentication failures
   */
  async monitorAuthFailure(authData: {
    endpoint: string;
    statusCode: number;
    error: string;
    userId?: string;
    userAgent?: string;
    ipAddress?: string;
  }) {
    const alert: DashboardAlert = {
      id: `auth_failure_${Date.now()}`,
      type: 'auth_failure',
      severity: this.calculateAuthFailureSeverity(authData.statusCode),
      endpoint: authData.endpoint,
      userId: authData.userId,
      errorMessage: authData.error,
      statusCode: authData.statusCode,
      metadata: {
        userAgent: authData.userAgent,
        ipAddress: authData.ipAddress,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
    await this.checkAuthFailurePatterns(authData.userId, authData.ipAddress);
  }

  /**
   * Monitor API errors
   */
  async monitorApiError(apiData: {
    endpoint: string;
    error: string;
    statusCode?: number;
    responseTime?: number;
    userId?: string;
    organizationId?: string;
    requestPayload?: any;
  }) {
    const alert: DashboardAlert = {
      id: `api_error_${Date.now()}`,
      type: 'api_error',
      severity: this.calculateApiErrorSeverity(apiData.statusCode, apiData.error),
      endpoint: apiData.endpoint,
      userId: apiData.userId,
      organizationId: apiData.organizationId,
      responseTime: apiData.responseTime,
      errorMessage: apiData.error,
      statusCode: apiData.statusCode,
      metadata: {
        requestPayload: apiData.requestPayload,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
  }

  /**
   * Monitor database connection errors
   */
  async monitorDatabaseError(dbData: {
    operation: string;
    error: string;
    endpoint?: string;
    userId?: string;
    organizationId?: string;
    queryTime?: number;
  }) {
    const alert: DashboardAlert = {
      id: `database_error_${Date.now()}`,
      type: 'database_connection_error',
      severity: 'critical', // Database errors are always critical
      endpoint: dbData.endpoint || 'database',
      userId: dbData.userId,
      organizationId: dbData.organizationId,
      errorMessage: `Database error in ${dbData.operation}: ${dbData.error}`,
      metadata: {
        operation: dbData.operation,
        queryTime: dbData.queryTime,
        timestamp: Date.now(),
      },
      timestamp: new Date(),
    };

    await this.triggerAlert(alert);
  }

  /**
   * Check overall dashboard health
   */
  async checkDashboardHealth(): Promise<DashboardHealth> {
    const health = await this.getDashboardHealthMetrics();
    
    // Check if uptime is below threshold
    if (health.uptime < this.thresholds.uptimeThreshold) {
      await this.triggerSystemAlert('low_uptime', {
        uptime: health.uptime,
        threshold: this.thresholds.uptimeThreshold,
      });
    }
    
    // Check if error rate is too high
    if (health.errorRate > this.thresholds.errorRate.critical) {
      await this.triggerSystemAlert('high_error_rate', {
        errorRate: health.errorRate,
        threshold: this.thresholds.errorRate.critical,
      });
    }
    
    // Check database connection
    if (health.dbConnectionStatus === 'down') {
      await this.triggerSystemAlert('database_down', {
        status: health.dbConnectionStatus,
      });
    }
    
    return health;
  }

  /**
   * Calculate downtime severity
   */
  private calculateDowntimeSeverity(statusCode: number): DashboardAlert['severity'] {
    if (statusCode >= 500) return 'critical';
    if (statusCode >= 400) return 'high';
    return 'medium';
  }

  /**
   * Calculate slow response severity
   */
  private calculateSlowResponseSeverity(responseTime: number): DashboardAlert['severity'] {
    if (responseTime > this.thresholds.responseTime.critical) return 'critical';
    if (responseTime > this.thresholds.responseTime.warning * 2) return 'high';
    if (responseTime > this.thresholds.responseTime.warning) return 'medium';
    return 'low';
  }

  /**
   * Calculate auth failure severity
   */
  private calculateAuthFailureSeverity(statusCode: number): DashboardAlert['severity'] {
    if (statusCode === 403) return 'high';  // Forbidden
    if (statusCode === 401) return 'medium'; // Unauthorized
    return 'low';
  }

  /**
   * Calculate API error severity
   */
  private calculateApiErrorSeverity(statusCode?: number, error?: string): DashboardAlert['severity'] {
    if (statusCode && statusCode >= 500) return 'critical';
    
    const criticalErrors = [
      'payment processing failed',
      'data corruption',
      'security violation',
    ];
    
    if (error && criticalErrors.some(err => error.toLowerCase().includes(err))) {
      return 'critical';
    }
    
    if (statusCode && statusCode >= 400) return 'high';
    return 'medium';
  }

  /**
   * Check for downtime patterns
   */
  private async checkDowntimePatterns(endpoint: string) {
    const recentFailures = await this.getRecentFailures(endpoint);
    
    if (recentFailures.consecutive >= this.thresholds.consecutiveFailures) {
      await this.triggerSystemAlert('consecutive_endpoint_failures', {
        endpoint,
        count: recentFailures.consecutive,
        threshold: this.thresholds.consecutiveFailures,
      });
    }
  }

  /**
   * Check for auth failure patterns
   */
  private async checkAuthFailurePatterns(userId?: string, ipAddress?: string) {
    // Check for brute force attacks or repeated failures
    if (userId || ipAddress) {
      const recentAuthFailures = await this.getRecentAuthFailures(userId, ipAddress);
      
      if (recentAuthFailures >= 5) { // 5 failures in short time
        await this.triggerSystemAlert('potential_brute_force', {
          userId,
          ipAddress,
          failureCount: recentAuthFailures,
        });
      }
    }
  }

  /**
   * Get dashboard health metrics
   */
  private async getDashboardHealthMetrics(): Promise<DashboardHealth> {
    // This would typically query your monitoring database or service
    const { data, error } = await supabase
      .from('dashboard_metrics')
      .select('*')
      .single();

    if (error || !data) {
      return {
        uptime: 0.95, // Default fallback
        responseTime: 1500,
        errorRate: 0.02,
        activeUsers: 0,
        dbConnectionStatus: 'degraded',
        apiEndpoints: {},
      };
    }

    return data as DashboardHealth;
  }

  /**
   * Get recent failures for an endpoint
   */
  private async getRecentFailures(endpoint: string) {
    const since = new Date(Date.now() - this.thresholds.timeWindow);
    
    const { data: failures, error } = await supabase
      .from('dashboard_alerts')
      .select('*')
      .eq('endpoint', endpoint)
      .eq('type', 'dashboard_down')
      .gte('created_at', since.toISOString());

    if (error) return { consecutive: 0, total: 0 };

    const sortedFailures = failures?.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ) || [];

    return {
      consecutive: sortedFailures.length,
      total: sortedFailures.length,
    };
  }

  /**
   * Get recent auth failures
   */
  private async getRecentAuthFailures(userId?: string, ipAddress?: string): Promise<number> {
    const since = new Date(Date.now() - (5 * 60 * 1000)); // Last 5 minutes
    
    let query = supabase
      .from('dashboard_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('type', 'auth_failure')
      .gte('created_at', since.toISOString());

    if (userId) {
      query = query.eq('user_id', userId);
    }
    
    if (ipAddress) {
      query = query.contains('metadata', { ipAddress });
    }

    const { count, error } = await query;
    
    if (error) return 0;
    return count || 0;
  }

  /**
   * Update endpoint metrics
   */
  private async updateEndpointMetrics(endpoint: string, responseTime: number, statusCode: number) {
    const { error } = await supabase
      .from('endpoint_metrics')
      .upsert({
        endpoint,
        response_time: responseTime,
        status_code: statusCode,
        timestamp: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to update endpoint metrics:', error);
    }
  }

  /**
   * Trigger alert through alert service
   */
  private async triggerAlert(alert: DashboardAlert) {
    await this.alertService.sendAlert({
      type: 'dashboard',
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
   * Trigger system-level alerts
   */
  private async triggerSystemAlert(type: string, data: any) {
    await this.alertService.sendAlert({
      type: 'system',
      severity: 'critical',
      title: `Dashboard System Alert: ${type}`,
      message: `Detected dashboard system issue: ${type}`,
      data,
      channels: ['slack', 'email', 'pagerduty'],
    });
  }

  /**
   * Get alert title based on alert type
   */
  private getAlertTitle(alert: DashboardAlert): string {
    const titles = {
      dashboard_down: `🚨 Dashboard Down - ${alert.endpoint}`,
      slow_response: `⏱️ Slow Response - ${alert.responseTime}ms`,
      auth_failure: `🔐 Authentication Failure - ${alert.endpoint}`,
      api_error: `🔌 API Error - ${alert.endpoint}`,
      database_connection_error: `💾 Database Error - ${alert.errorMessage.split(':')[0]}`,
    };
    
    return titles[alert.type] || 'Dashboard Alert';
  }

  /**
   * Get alert message
   */
  private getAlertMessage(alert: DashboardAlert): string {
    const userInfo = alert.userId ? `User: ${alert.userId}\n` : '';
    const orgInfo = alert.organizationId ? `Organization: ${alert.organizationId}\n` : '';
    const responseTimeInfo = alert.responseTime ? `Response Time: ${alert.responseTime}ms\n` : '';
    const statusCodeInfo = alert.statusCode ? `Status Code: ${alert.statusCode}\n` : '';
    
    return `Endpoint: ${alert.endpoint}\n` +
           userInfo +
           orgInfo +
           responseTimeInfo +
           statusCodeInfo +
           `Error: ${alert.errorMessage}\n` +
           `Time: ${alert.timestamp.toISOString()}\n` +
           `Severity: ${alert.severity.toUpperCase()}`;
  }

  /**
   * Get alert channels based on severity
   */
  private getAlertChannels(severity: DashboardAlert['severity']): string[] {
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
   * Store alert in database
   */
  private async storeAlert(alert: DashboardAlert) {
    const { error } = await supabase
      .from('dashboard_alerts')
      .insert({
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        endpoint: alert.endpoint,
        user_id: alert.userId,
        organization_id: alert.organizationId,
        response_time: alert.responseTime,
        error_message: alert.errorMessage,
        status_code: alert.statusCode,
        metadata: alert.metadata,
        created_at: alert.timestamp.toISOString(),
      });

    if (error) {
      console.error('Failed to store dashboard alert:', error);
    }
  }

  private getUserAgent(): string {
    return typeof window !== 'undefined' ? window.navigator.userAgent : 'Server';
  }
}

// Export singleton instance
export const dashboardAlertMonitor = new DashboardAlertMonitor();