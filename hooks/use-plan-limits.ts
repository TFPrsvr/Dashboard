import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/supabase-client';

export interface PlanLimits {
  widgets: number;
  monthlyDonations: number;
  teamMembers: number;
  customBranding: boolean;
  apiAccess: boolean;
  prioritySupport: boolean;
  analytics: boolean;
}

const PLAN_LIMITS: Record<string, PlanLimits> = {
  free: {
    widgets: 1,
    monthlyDonations: 50,
    teamMembers: 1,
    customBranding: false,
    apiAccess: false,
    prioritySupport: false,
    analytics: false,
  },
  professional: {
    widgets: 5,
    monthlyDonations: 1000,
    teamMembers: 5,
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
    analytics: true,
  },
  enterprise: {
    widgets: -1, // unlimited
    monthlyDonations: -1, // unlimited
    teamMembers: -1, // unlimited
    customBranding: true,
    apiAccess: true,
    prioritySupport: true,
    analytics: true,
  },
};

export function usePlanLimits(organizationId: string) {
  const [limits, setLimits] = useState<PlanLimits>(PLAN_LIMITS.free);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [usage, setUsage] = useState({
    widgets: 0,
    monthlyDonations: 0,
    teamMembers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (organizationId) {
      fetchPlanAndUsage();
    }
  }, [organizationId]);

  const fetchPlanAndUsage = async () => {
    try {
      // Get subscription plan
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('plan')
        .eq('organization_id', organizationId)
        .single();

      const plan = subscription?.plan || 'free';
      setCurrentPlan(plan);
      setLimits(PLAN_LIMITS[plan]);

      // Get current usage
      const [widgetsResult, donationsResult, membersResult] = await Promise.all([
        // Widget count
        supabase
          .from('widgets')
          .select('id', { count: 'exact' })
          .eq('organization_id', organizationId),
        
        // Monthly donation count
        supabase
          .from('donations')
          .select('id', { count: 'exact' })
          .eq('organization_id', organizationId)
          .gte('created_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()),
        
        // Team member count
        supabase
          .from('user_organizations')
          .select('id', { count: 'exact' })
          .eq('organization_id', organizationId)
      ]);

      setUsage({
        widgets: widgetsResult.count || 0,
        monthlyDonations: donationsResult.count || 0,
        teamMembers: membersResult.count || 0,
      });

    } catch (error) {
      console.error('Error fetching plan limits:', error);
    } finally {
      setLoading(false);
    }
  };

  const canCreateWidget = () => {
    return limits.widgets === -1 || usage.widgets < limits.widgets;
  };

  const canAcceptDonation = () => {
    return limits.monthlyDonations === -1 || usage.monthlyDonations < limits.monthlyDonations;
  };

  const canInviteTeamMember = () => {
    return limits.teamMembers === -1 || usage.teamMembers < limits.teamMembers;
  };

  const getWidgetLimitText = () => {
    if (limits.widgets === -1) return 'Unlimited widgets';
    return `${usage.widgets}/${limits.widgets} widgets used`;
  };

  const getDonationLimitText = () => {
    if (limits.monthlyDonations === -1) return 'Unlimited donations';
    return `${usage.monthlyDonations}/${limits.monthlyDonations} donations this month`;
  };

  const getTeamMemberLimitText = () => {
    if (limits.teamMembers === -1) return 'Unlimited team members';
    return `${usage.teamMembers}/${limits.teamMembers} team members`;
  };

  return {
    limits,
    currentPlan,
    usage,
    loading,
    canCreateWidget,
    canAcceptDonation,
    canInviteTeamMember,
    getWidgetLimitText,
    getDonationLimitText,
    getTeamMemberLimitText,
    refreshUsage: fetchPlanAndUsage,
  };
}