/**
 * Traffic Pattern Alert System
 * 
 * Monitors for unusual traffic patterns that may indicate issues or attacks
 */

import { supabase } from '@/lib/supabase/supabase-client';
import { AlertService } from './alert-service';

export interface TrafficAlert {
  id: string;
  type: 'traffic_spike' | 'traffic_drop' | 'suspicious_pattern' | 'bot_traffic' | 'geographic_anomaly';
  severity: 'low' | 'medium' | 'high' | 'critical';
  organizationId?: string;
  metric: string;
  currentValue: number;
  expectedValue: number;
  threshold: number;
  timeWindow: number;
  metadata: Record<string, any>;
  timestamp: Date;
}

export interface TrafficMetrics {
  totalRequests: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  errorRate: number;
  geographicDistribution: Record<string, number>;
  userAgents: Record<string, number>;
  referrers: Record<string, number>;
}

export class TrafficAlertMonitor {
  private alertService: AlertService;
  private thresholds = {
    trafficSpike: {
      multiplier: 3, // 3x normal traffic
      minimumRequests: 100,
      timeWindow: 15 * 60 * 1000, // 15 minutes
    },
    trafficDrop: {
      multiplier: 0.3, // 30% of normal traffic
      timeWindow: 30 * 60 * 1000, // 30 minutes
    },
    botTraffic: {
      percentage: 0.5, // 50% bot traffic
      minimumRequests: 50,
    },
    errorRate: {
      percentage: 0.1, // 10% error rate
      minimumErrors: 10,
    },
    geographicAnomaly: {
      newCountryThreshold: 0.8, // 80% traffic from new country
      minimumRequests: 20,
    },
    suspiciousPattern: {
      sameIPThreshold: 0.3, // 30% requests from same IP
      rapidRequestsThreshold: 100, // 100 requests per minute from single IP
    }
  };

  constructor() {
    this.alertService = new AlertService();
  }

  /**
   * Monitor current traffic metrics against baselines
   */
  async monitorTrafficMetrics(metrics: TrafficMetrics, organizationId?: string) {
    const baseline = await this.getTrafficBaseline(organizationId);
    
    // Check for traffic spikes
    await this.checkTrafficSpike(metrics, baseline, organizationId);
    
    // Check for traffic drops
    await this.checkTrafficDrop(metrics, baseline, organizationId);
    
    // Check for bot traffic
    await this.checkBotTraffic(metrics, organizationId);
    
    // Check for geographic anomalies
    await this.checkGeographicAnomalies(metrics, baseline, organizationId);
    
    // Check for suspicious patterns
    await this.checkSuspiciousPatterns(metrics, organizationId);
    
    // Update baseline with current metrics
    await this.updateTrafficBaseline(metrics, organizationId);
  }

  /**
   * Check for traffic spikes
   */
  private async checkTrafficSpike(current: TrafficMetrics, baseline: TrafficMetrics, organizationId?: string) {
    const expectedRequests = baseline.totalRequests || 100;
    const threshold = expectedRequests * this.thresholds.trafficSpike.multiplier;
    
    if (current.totalRequests > threshold && current.totalRequests >= this.thresholds.trafficSpike.minimumRequests) {
      const alert: TrafficAlert = {
        id: `traffic_spike_${Date.now()}`,
        type: 'traffic_spike',
        severity: this.calculateSpikeSeverity(current.totalRequests, expectedRequests),
        organizationId,
        metric: 'totalRequests',
        currentValue: current.totalRequests,
        expectedValue: expectedRequests,
        threshold: threshold,
        timeWindow: this.thresholds.trafficSpike.timeWindow,
        metadata: {
          multiplier: current.totalRequests / expectedRequests,
          uniqueVisitors: current.uniqueVisitors,
          errorRate: current.errorRate,
          topReferrers: this.getTopItems(current.referrers, 5),
          topUserAgents: this.getTopItems(current.userAgents, 3),
        },
        timestamp: new Date(),
      };
      
      await this.triggerAlert(alert);
    }
  }

  /**
   * Check for traffic drops
   */
  private async checkTrafficDrop(current: TrafficMetrics, baseline: TrafficMetrics, organizationId?: string) {
    const expectedRequests = baseline.totalRequests || 100;
    const threshold = expectedRequests * this.thresholds.trafficDrop.multiplier;
    
    if (current.totalRequests < threshold && expectedRequests >= 50) { // Only alert if baseline is meaningful
      const alert: TrafficAlert = {
        id: `traffic_drop_${Date.now()}`,
        type: 'traffic_drop',
        severity: this.calculateDropSeverity(current.totalRequests, expectedRequests),
        organizationId,
        metric: 'totalRequests',
        currentValue: current.totalRequests,
        expectedValue: expectedRequests,
        threshold: threshold,
        timeWindow: this.thresholds.trafficDrop.timeWindow,
        metadata: {
          dropPercentage: ((expectedRequests - current.totalRequests) / expectedRequests) * 100,
          errorRate: current.errorRate,
          avgSessionDuration: current.avgSessionDuration,
        },
        timestamp: new Date(),
      };
      
      await this.triggerAlert(alert);
    }
  }

  /**
   * Check for bot traffic
   */
  private async checkBotTraffic(metrics: TrafficMetrics, organizationId?: string) {
    const botCount = this.identifyBotTraffic(metrics.userAgents);
    const botPercentage = botCount / metrics.totalRequests;
    
    if (botPercentage > this.thresholds.botTraffic.percentage && 
        metrics.totalRequests >= this.thresholds.botTraffic.minimumRequests) {
      
      const alert: TrafficAlert = {
        id: `bot_traffic_${Date.now()}`,
        type: 'bot_traffic',
        severity: botPercentage > 0.8 ? 'high' : 'medium',
        organizationId,
        metric: 'botPercentage',
        currentValue: botPercentage * 100,
        expectedValue: 10, // Normal bot traffic ~10%
        threshold: this.thresholds.botTraffic.percentage * 100,
        timeWindow: 15 * 60 * 1000,
        metadata: {
          botCount,
          totalRequests: metrics.totalRequests,
          suspiciousUserAgents: this.getSuspiciousUserAgents(metrics.userAgents),
          bounceRate: metrics.bounceRate,
        },
        timestamp: new Date(),
      };
      
      await this.triggerAlert(alert);
    }
  }

  /**
   * Check for geographic anomalies
   */
  private async checkGeographicAnomalies(current: TrafficMetrics, baseline: TrafficMetrics, organizationId?: string) {
    const currentCountries = Object.keys(current.geographicDistribution);
    const baselineCountries = Object.keys(baseline.geographicDistribution || {});
    
    // Check for traffic from new countries
    for (const country of currentCountries) {
      const currentTraffic = current.geographicDistribution[country];
      const percentage = currentTraffic / current.totalRequests;
      
      if (!baselineCountries.includes(country) && 
          percentage > this.thresholds.geographicAnomaly.newCountryThreshold &&
          currentTraffic >= this.thresholds.geographicAnomaly.minimumRequests) {
        
        const alert: TrafficAlert = {
          id: `geographic_anomaly_${Date.now()}`,
          type: 'geographic_anomaly',
          severity: percentage > 0.9 ? 'high' : 'medium',
          organizationId,
          metric: 'geographicDistribution',
          currentValue: currentTraffic,
          expectedValue: 0,
          threshold: this.thresholds.geographicAnomaly.minimumRequests,
          timeWindow: 30 * 60 * 1000,
          metadata: {
            country,
            percentage: percentage * 100,
            totalRequests: current.totalRequests,
            isNewCountry: true,
          },
          timestamp: new Date(),
        };
        
        await this.triggerAlert(alert);
      }
    }
  }

  /**
   * Check for suspicious patterns
   */
  private async checkSuspiciousPatterns(metrics: TrafficMetrics, organizationId?: string) {
    // This would require more detailed IP-level analytics
    // For now, we'll use user agent clustering as a proxy
    const topUserAgent = this.getTopItems(metrics.userAgents, 1)[0];
    if (topUserAgent) {
      const percentage = topUserAgent.count / metrics.totalRequests;
      
      if (percentage > this.thresholds.suspiciousPattern.sameIPThreshold) {
        const alert: TrafficAlert = {
          id: `suspicious_pattern_${Date.now()}`,
          type: 'suspicious_pattern',
          severity: percentage > 0.7 ? 'high' : 'medium',
          organizationId,
          metric: 'userAgentConcentration',
          currentValue: percentage * 100,
          expectedValue: 20, // Normal top user agent ~20%
          threshold: this.thresholds.suspiciousPattern.sameIPThreshold * 100,
          timeWindow: 15 * 60 * 1000,
          metadata: {
            topUserAgent: topUserAgent.key,
            requestCount: topUserAgent.count,
            percentage: percentage * 100,
            totalRequests: metrics.totalRequests,
          },
          timestamp: new Date(),
        };
        
        await this.triggerAlert(alert);
      }
    }
  }

  /**
   * Calculate traffic spike severity
   */
  private calculateSpikeSeverity(current: number, expected: number): TrafficAlert['severity'] {
    const multiplier = current / expected;
    if (multiplier > 10) return 'critical';
    if (multiplier > 5) return 'high';
    if (multiplier > 3) return 'medium';
    return 'low';
  }

  /**
   * Calculate traffic drop severity
   */
  private calculateDropSeverity(current: number, expected: number): TrafficAlert['severity'] {
    const percentage = current / expected;
    if (percentage < 0.1) return 'critical'; // 90% drop
    if (percentage < 0.3) return 'high';     // 70% drop
    if (percentage < 0.5) return 'medium';   // 50% drop
    return 'low';
  }

  /**
   * Identify bot traffic from user agents
   */
  private identifyBotTraffic(userAgents: Record<string, number>): number {
    const botPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /googlebot/i,
      /bingbot/i,
      /facebookexternalhit/i,
      /twitterbot/i,
      /linkedinbot/i,
    ];
    
    let botCount = 0;
    for (const [userAgent, count] of Object.entries(userAgents)) {
      if (botPatterns.some(pattern => pattern.test(userAgent))) {
        botCount += count;
      }
    }
    
    return botCount;
  }

  /**
   * Get suspicious user agents
   */
  private getSuspiciousUserAgents(userAgents: Record<string, number>): Array<{userAgent: string, count: number}> {
    const suspicious = [];
    for (const [userAgent, count] of Object.entries(userAgents)) {
      if (this.isSuspiciousUserAgent(userAgent) || count > 50) {
        suspicious.push({ userAgent, count });
      }
    }
    return suspicious.slice(0, 5);
  }

  /**
   * Check if user agent is suspicious
   */
  private isSuspiciousUserAgent(userAgent: string): boolean {
    const suspiciousPatterns = [
      /curl/i,
      /wget/i,
      /python/i,
      /requests/i,
      /scrapy/i,
      /^$/,
      /test/i,
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(userAgent));
  }

  /**
   * Get top items from a record
   */
  private getTopItems(record: Record<string, number>, limit: number): Array<{key: string, count: number}> {
    return Object.entries(record)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([key, count]) => ({ key, count }));
  }

  /**
   * Get traffic baseline for comparison
   */
  private async getTrafficBaseline(organizationId?: string): Promise<TrafficMetrics> {
    const { data, error } = await supabase
      .from('traffic_baselines')
      .select('*')
      .eq('organization_id', organizationId || 'global')
      .single();

    if (error || !data) {
      // Return default baseline if none exists
      return {
        totalRequests: 100,
        uniqueVisitors: 50,
        bounceRate: 0.4,
        avgSessionDuration: 120,
        errorRate: 0.02,
        geographicDistribution: {},
        userAgents: {},
        referrers: {},
      };
    }

    return data.metrics as TrafficMetrics;
  }

  /**
   * Update traffic baseline
   */
  private async updateTrafficBaseline(metrics: TrafficMetrics, organizationId?: string) {
    const baseline = await this.getTrafficBaseline(organizationId);
    
    // Use exponential smoothing to update baseline
    const alpha = 0.1; // Smoothing factor
    const updatedBaseline: TrafficMetrics = {
      totalRequests: Math.round(alpha * metrics.totalRequests + (1 - alpha) * baseline.totalRequests),
      uniqueVisitors: Math.round(alpha * metrics.uniqueVisitors + (1 - alpha) * baseline.uniqueVisitors),
      bounceRate: alpha * metrics.bounceRate + (1 - alpha) * baseline.bounceRate,
      avgSessionDuration: alpha * metrics.avgSessionDuration + (1 - alpha) * baseline.avgSessionDuration,
      errorRate: alpha * metrics.errorRate + (1 - alpha) * baseline.errorRate,
      geographicDistribution: this.mergeDistribution(metrics.geographicDistribution, baseline.geographicDistribution, alpha),
      userAgents: this.mergeDistribution(metrics.userAgents, baseline.userAgents, alpha),
      referrers: this.mergeDistribution(metrics.referrers, baseline.referrers, alpha),
    };

    const { error } = await supabase
      .from('traffic_baselines')
      .upsert({
        organization_id: organizationId || 'global',
        metrics: updatedBaseline,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Failed to update traffic baseline:', error);
    }
  }

  /**
   * Merge two distributions with smoothing
   */
  private mergeDistribution(current: Record<string, number>, baseline: Record<string, number>, alpha: number): Record<string, number> {
    const merged = { ...baseline };
    
    for (const [key, value] of Object.entries(current)) {
      merged[key] = Math.round(alpha * value + (1 - alpha) * (merged[key] || 0));
    }
    
    return merged;
  }

  /**
   * Trigger alert through alert service
   */
  private async triggerAlert(alert: TrafficAlert) {
    await this.alertService.sendAlert({
      type: 'traffic',
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
   * Get alert title based on alert type
   */
  private getAlertTitle(alert: TrafficAlert): string {
    const titles = {
      traffic_spike: `📈 Traffic Spike Detected - ${alert.currentValue} requests`,
      traffic_drop: `📉 Traffic Drop Detected - ${alert.currentValue} requests`,
      bot_traffic: `🤖 High Bot Traffic - ${alert.currentValue}%`,
      geographic_anomaly: `🌍 Geographic Anomaly Detected`,
      suspicious_pattern: `🚨 Suspicious Traffic Pattern - ${alert.currentValue}%`,
    };
    
    return titles[alert.type] || 'Traffic Alert';
  }

  /**
   * Get alert message
   */
  private getAlertMessage(alert: TrafficAlert): string {
    const orgInfo = alert.organizationId ? `Organization: ${alert.organizationId}\n` : '';
    return orgInfo +
           `Metric: ${alert.metric}\n` +
           `Current: ${alert.currentValue}\n` +
           `Expected: ${alert.expectedValue}\n` +
           `Threshold: ${alert.threshold}\n` +
           `Time Window: ${alert.timeWindow / (60 * 1000)} minutes\n` +
           `Time: ${alert.timestamp.toISOString()}\n` +
           `Severity: ${alert.severity.toUpperCase()}`;
  }

  /**
   * Get alert channels based on severity
   */
  private getAlertChannels(severity: TrafficAlert['severity']): string[] {
    switch (severity) {
      case 'critical':
        return ['slack', 'email', 'pagerduty'];
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
  private async storeAlert(alert: TrafficAlert) {
    const { error } = await supabase
      .from('traffic_alerts')
      .insert({
        id: alert.id,
        type: alert.type,
        severity: alert.severity,
        organization_id: alert.organizationId,
        metric: alert.metric,
        current_value: alert.currentValue,
        expected_value: alert.expectedValue,
        threshold: alert.threshold,
        time_window: alert.timeWindow,
        metadata: alert.metadata,
        created_at: alert.timestamp.toISOString(),
      });

    if (error) {
      console.error('Failed to store traffic alert:', error);
    }
  }
}

// Export singleton instance
export const trafficAlertMonitor = new TrafficAlertMonitor();