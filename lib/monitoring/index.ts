/**
 * Monitoring System Exports
 * 
 * Central export point for all monitoring and alert systems
 */

// Core alert service
export { AlertService, alertService } from './alert-service';
export type { AlertData, NotificationChannel } from './alert-service';

// Payment monitoring
export { PaymentAlertMonitor, paymentAlertMonitor } from './payment-alerts';
export type { PaymentAlert } from './payment-alerts';

// Widget monitoring
export { WidgetAlertMonitor, widgetAlertMonitor } from './widget-alerts';
export type { WidgetAlert } from './widget-alerts';

// Traffic monitoring
export { TrafficAlertMonitor, trafficAlertMonitor } from './traffic-alerts';
export type { TrafficAlert, TrafficMetrics } from './traffic-alerts';

// Dashboard monitoring
export { DashboardAlertMonitor, dashboardAlertMonitor } from './dashboard-alerts';
export type { DashboardAlert, DashboardHealth } from './dashboard-alerts';

// Import instances after class declarations
import { paymentAlertMonitor } from './payment-alerts';
import { widgetAlertMonitor } from './widget-alerts';
import { trafficAlertMonitor } from './traffic-alerts';
import { dashboardAlertMonitor } from './dashboard-alerts';
import { alertService } from './alert-service';

// Consolidated monitoring class
export class MonitoringSystem {
  payment = paymentAlertMonitor;
  widget = widgetAlertMonitor;
  traffic = trafficAlertMonitor;
  dashboard = dashboardAlertMonitor;
  alerts = alertService;

  /**
   * Initialize all monitoring systems
   */
  async initialize() {
    console.log('Initializing monitoring systems...');
    
    // Setup periodic health checks
    this.setupHealthChecks();
    
    console.log('Monitoring systems initialized successfully');
  }

  /**
   * Setup periodic health checks
   */
  private setupHealthChecks() {
    // Check dashboard health every 5 minutes
    setInterval(async () => {
      try {
        await this.dashboard.checkDashboardHealth();
      } catch (error) {
        console.error('Dashboard health check failed:', error);
      }
    }, 5 * 60 * 1000);
  }

  /**
   * Trigger test alerts (for testing purposes)
   */
  async testAlerts() {
    console.log('Testing alert systems...');
    
    // Test payment alert
    await this.payment.monitorPaymentFailures({
      organizationId: 'test-org',
      amount: 100,
      currency: 'usd',
      error: 'Test payment failure',
    });

    // Test widget alert
    await this.widget.monitorWidgetLoadError({
      organizationId: 'test-org',
      widgetId: 'test-widget',
      url: 'https://example.com',
      error: 'Test widget load error',
    });

    // Test dashboard alert
    await this.dashboard.monitorDashboardDown({
      endpoint: '/api/test',
      statusCode: 500,
      error: 'Test server error',
    });

    console.log('Test alerts sent successfully');
  }

  /**
   * Get system status
   */
  async getSystemStatus() {
    return {
      payment: { active: true, alerts: await this.getRecentAlerts('payment') },
      widget: { active: true, alerts: await this.getRecentAlerts('widget') },
      traffic: { active: true, alerts: await this.getRecentAlerts('traffic') },
      dashboard: { 
        active: true, 
        health: await this.dashboard.checkDashboardHealth(),
        alerts: await this.getRecentAlerts('dashboard')
      },
    };
  }

  /**
   * Get recent alerts for a system
   */
  private async getRecentAlerts(system: string) {
    // This would query the database for recent alerts
    // Implementation depends on your database structure
    return [];
  }
}

// Export singleton instance
export const monitoring = new MonitoringSystem();