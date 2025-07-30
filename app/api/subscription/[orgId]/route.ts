import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { supabase } from '@/lib/supabase/client';

export async function GET(
  request: NextRequest,
  { params }: { params: { orgId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orgId = params.orgId;

    // Get organization subscription from database
    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('organization_id', orgId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching subscription:', error);
      return NextResponse.json({ error: 'Failed to fetch subscription' }, { status: 500 });
    }

    // Default to free plan if no subscription exists
    const subscriptionData = subscription || {
      plan: 'free',
      status: 'active',
      current_period_end: null,
      cancel_at_period_end: false
    };

    return NextResponse.json({
      plan: subscriptionData.plan,
      status: subscriptionData.status,
      currentPeriodEnd: subscriptionData.current_period_end,
      cancelAtPeriodEnd: subscriptionData.cancel_at_period_end
    });

  } catch (error) {
    console.error('Error in subscription API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}