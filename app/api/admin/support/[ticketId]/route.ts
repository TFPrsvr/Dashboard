import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase/client';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is admin/super_admin
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('user_id', userId)
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
    }

    if (status) {
      updateData.status = status;
    }

    // Update support ticket
    const { data: ticket, error } = await supabase
      .from('support_tickets')
      .update(updateData)
      .eq('id', params.ticketId)
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