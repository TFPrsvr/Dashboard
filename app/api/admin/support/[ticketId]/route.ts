import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/supabase-server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;

    // Check if user is admin/super_admin
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (userError || !user || !['admin', 'super_admin'].includes(user.role)) {
      return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { admin_response, status } = body;

    const updateData: any = {
      updated_at: new Date().toISOString()
    };

    if (admin_response) {
      updateData.admin_response = admin_response;
      updateData.admin_id = userId;
      updateData.admin_responded_at = new Date().toISOString();
    }

    if (status) {
      updateData.status = status;
    }

    // Update support ticket
    const { data: ticket, error } = await supabaseAdmin
      .from('support_tickets')
      .update(updateData)
      .eq('id', resolvedParams.ticketId)
      .select()
      .single();

    if (error) {
      console.error('Error updating support ticket:', error);
      return NextResponse.json({ error: 'Failed to update support ticket' }, { status: 500 });
    }

    return NextResponse.json({ ticket });

  } catch (error) {
    console.error('Error in admin support PATCH:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}