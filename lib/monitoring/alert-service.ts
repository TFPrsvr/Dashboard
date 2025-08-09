/**
 * Alert Service
 * 
 * Central service for sending alerts across multiple channels
 */

export interface AlertData {
  type: 'payment' | 'widget' | 'traffic' | 'dashboard' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  data?: any;
  channels: string[];
}

export interface NotificationChannel {
  name: string;
  send: (alert: AlertData) => Promise<void>;
}

export class AlertService {
  private channels: Map<string, NotificationChannel> = new Map();

  constructor() {
    this.initializeChannels();
  }

  /**
   * Initialize notification channels
   */
  private initializeChannels() {
    // Email channel
    this.channels.set('email', {
      name: 'email',
      send: async (alert: AlertData) => {
        await this.sendEmail(alert);
      }
    });

    // Slack channel
    this.channels.set('slack', {
      name: 'slack',
      send: async (alert: AlertData) => {
        await this.sendSlack(alert);
      }
    });

    // SMS channel
    this.channels.set('sms', {
      name: 'sms',
      send: async (alert: AlertData) => {
        await this.sendSMS(alert);
      }
    });

    // PagerDuty channel
    this.channels.set('pagerduty', {
      name: 'pagerduty',
      send: async (alert: AlertData) => {
        await this.sendPagerDuty(alert);
      }
    });
  }

  /**
   * Send alert through specified channels
   */
  async sendAlert(alert: AlertData): Promise<void> {
    const promises = alert.channels.map(async (channelName) => {
      const channel = this.channels.get(channelName);
      if (!channel) {
        console.warn(`Alert channel '${channelName}' not found`);
        return;
      }

      try {
        await channel.send(alert);
        console.log(`Alert sent via ${channelName}:`, alert.title);
      } catch (error) {
        console.error(`Failed to send alert via ${channelName}:`, error);
        // Don't throw - we want other channels to still attempt sending
      }
    });

    await Promise.allSettled(promises);
  }

  /**
   * Send email notification
   */
  private async sendEmail(alert: AlertData): Promise<void> {
    const emailConfig = {
      to: process.env.ALERT_EMAIL_RECIPIENTS?.split(',') || [],
      subject: `[${alert.severity.toUpperCase()}] ${alert.title}`,
      html: this.formatEmailContent(alert),
    };

    const response = await fetch('/api/notifications/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailConfig),
    });

    if (!response.ok) {
      throw new Error(`Email send failed: ${response.statusText}`);
    }
  }

  /**
   * Send Slack notification
   */
  private async sendSlack(alert: AlertData): Promise<void> {
    const slackWebhook = process.env.SLACK_WEBHOOK_URL;
    if (!slackWebhook) {
      console.warn('Slack webhook URL not configured');
      return;
    }

    const slackPayload = {
      text: alert.title,
      attachments: [
        {
          color: this.getSeverityColor(alert.severity),
          fields: [
            {
              title: 'Message',
              value: alert.message,
              short: false
            },
            {
              title: 'Severity',
              value: alert.severity.toUpperCase(),
              short: true
            },
            {
              title: 'Type',
              value: alert.type,
              short: true
            },
            {
              title: 'Timestamp',
              value: new Date().toISOString(),
              short: true
            }
          ]
        }
      ]
    };

    const response = await fetch(slackWebhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackPayload),
    });

    if (!response.ok) {
      throw new Error(`Slack send failed: ${response.statusText}`);
    }
  }

  /**
   * Send SMS notification
   */
  private async sendSMS(alert: AlertData): Promise<void> {
    const twilioConfig = {
      to: process.env.ALERT_SMS_RECIPIENTS?.split(',') || [],
      message: `${alert.title}\n${alert.message}`,
    };

    const response = await fetch('/api/notifications/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(twilioConfig),
    });

    if (!response.ok) {
      throw new Error(`SMS send failed: ${response.statusText}`);
    }
  }

  /**
   * Send PagerDuty notification
   */
  private async sendPagerDuty(alert: AlertData): Promise<void> {
    const pagerDutyKey = process.env.PAGERDUTY_INTEGRATION_KEY;
    if (!pagerDutyKey) {
      console.warn('PagerDuty integration key not configured');
      return;
    }

    const pagerDutyPayload = {
      routing_key: pagerDutyKey,
      event_action: 'trigger',
      payload: {
        summary: alert.title,
        severity: this.mapToPagerDutySeverity(alert.severity),
        source: 'PassItOn Admin',
        component: alert.type,
        group: 'monitoring',
        class: alert.severity,
        custom_details: {
          message: alert.message,
          data: alert.data,
          timestamp: new Date().toISOString(),
        }
      }
    };

    const response = await fetch('https://events.pagerduty.com/v2/enqueue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pagerDutyPayload),
    });

    if (!response.ok) {
      throw new Error(`PagerDuty send failed: ${response.statusText}`);
    }
  }

  /**
   * Format email content
   */
  private formatEmailContent(alert: AlertData): string {
    return `
      <html>
        <body>
          <h2 style="color: ${this.getSeverityColor(alert.severity)};">
            ${alert.title}
          </h2>
          <p><strong>Severity:</strong> ${alert.severity.toUpperCase()}</p>
          <p><strong>Type:</strong> ${alert.type}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f5f5f5; padding: 10px; border-left: 4px solid ${this.getSeverityColor(alert.severity)};">
            ${alert.message}
          </p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
          ${alert.data ? `
          <p><strong>Additional Data:</strong></p>
          <pre style="background-color: #f8f9fa; padding: 10px; border-radius: 4px;">
${JSON.stringify(alert.data, null, 2)}
          </pre>
          ` : ''}
        </body>
      </html>
    `;
  }

  /**
   * Get color for alert severity
   */
  private getSeverityColor(severity: string): string {
    const colors = {
      low: '#28a745',      // Green
      medium: '#ffc107',   // Yellow
      high: '#fd7e14',     // Orange
      critical: '#dc3545'  // Red
    };
    return colors[severity as keyof typeof colors] || '#6c757d';
  }

  /**
   * Map severity to PagerDuty severity
   */
  private mapToPagerDutySeverity(severity: string): string {
    const mapping = {
      low: 'info',
      medium: 'warning',
      high: 'error',
      critical: 'critical'
    };
    return mapping[severity as keyof typeof mapping] || 'info';
  }

  /**
   * Add custom notification channel
   */
  addChannel(channel: NotificationChannel): void {
    this.channels.set(channel.name, channel);
  }

  /**
   * Remove notification channel
   */
  removeChannel(channelName: string): void {
    this.channels.delete(channelName);
  }

  /**
   * Get available channels
   */
  getAvailableChannels(): string[] {
    return Array.from(this.channels.keys());
  }
}

// Export singleton instance
export const alertService = new AlertService();