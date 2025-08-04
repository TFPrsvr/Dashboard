import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase/supabase-client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin/super_admin
    console.log('Checking admin access for userId:', userId);
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    console.log('User query result:', { user, userError });

    if (userError || !user || !['admin', 'super_admin'].includes(user.role)) {
      console.log('Access denied - User role:', user?.role, 'Error:', userError);
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    // Get all support tickets
    const { data: tickets, error } = await supabase
      .from('support_tickets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching support tickets:', error);
      return NextResponse.json({ error: 'Failed to fetch support tickets' }, { status: 500 });
    }

    return NextResponse.json({ tickets: tickets || [] });

  } catch (error) {
    console.error('Error in admin support GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}