import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { ticketId, subject, description, userEmail, userName, category, priority } = body;

    // For now, just log the notification request
    // In production, you would integrate with email service (SendGrid, Resend, etc.)
    console.log('Support ticket notification:', {
      ticketId,
      subject,
      userEmail,
      userName,
      category,
      priority
    });

    // Simulate email sending
    // TODO: Integrate with actual email service
    const emailSent = true;

    if (emailSent) {
      return NextResponse.json({ success: true, message: 'Notification sent' });
    } else {
      return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
    }

  } catch (error) {
    console.error('Error sending support notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}