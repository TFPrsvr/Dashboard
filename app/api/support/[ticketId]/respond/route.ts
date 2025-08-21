import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/supabase-server';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ ticketId: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;

    const body = await request.json();
    const { response } = body;

    if (!response?.trim()) {
      return NextResponse.json({ error: 'Response is required' }, { status: 400 });
    }

    // Update the ticket with customer response and change status to in_progress
    const { data: ticket, error } = await supabaseAdmin
      .from('support_tickets')
      .update({
        customer_response: response,
        customer_responded_at: new Date().toISOString(),
        status: 'in_progress',
        updated_at: new Date().toISOString()
      })
      .eq('id', resolvedParams.ticketId)
      .eq('user_id', userId) // Ensure user can only respond to their own tickets
      .select()
      .single();

    if (error) {
      console.error('Error updating support ticket:', error);
      return NextResponse.json({ error: 'Failed to send response' }, { status: 500 });
    }

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found or unauthorized' }, { status: 404 });
    }

    // TODO: Send notification email to admin about customer response
    console.log('Customer response received for ticket:', resolvedParams.ticketId);

    return NextResponse.json({ success: true, ticket });

  } catch (error) {
    console.error('Error in customer response:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}