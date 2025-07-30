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

    // Log the notification for now
    console.log('🎫 NEW SUPPORT TICKET CREATED:', {
      ticketId,
      subject,
      userEmail,
      userName,
      category,
      priority,
      timestamp: new Date().toISOString()
    });

    // Multiple notification methods for external alerts
    
    // 1. Email notification (you can implement with your preferred service)
    const emailNotification = {
      to: process.env.SUPPORT_EMAIL || 'support@passiton.com',
      subject: `New Support Ticket: ${subject}`,
      html: `
        <h2>New Support Ticket Created</h2>
        <p><strong>Ticket ID:</strong> ${ticketId}</p>
        <p><strong>From:</strong> ${userName} (${userEmail})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Priority:</strong> ${priority}</p>
        <p><strong>Description:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${description}
        </div>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/support">View in Admin Dashboard</a></p>
      `
    };

    // 2. Slack webhook notification (if configured)
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: `🎫 New Support Ticket: ${subject}`,
            blocks: [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*New Support Ticket Created*\n*From:* ${userName} (${userEmail})\n*Subject:* ${subject}\n*Priority:* ${priority}\n*Category:* ${category}`
                }
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Description:*\n${description}`
                }
              },
              {
                type: "actions",
                elements: [
                  {
                    type: "button",
                    text: {
                      type: "plain_text",
                      text: "View Ticket"
                    },
                    url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/support`
                  }
                ]
              }
            ]
          })
        });
        console.log('✅ Slack notification sent');
      } catch (slackError) {
        console.error('❌ Slack notification failed:', slackError);
      }
    }

    // 3. Console alert for development
    console.log('\n🚨 SUPPORT TICKET ALERT 🚨');
    console.log('================================');
    console.log(`Subject: ${subject}`);
    console.log(`User: ${userName} (${userEmail})`);
    console.log(`Priority: ${priority.toUpperCase()}`);
    console.log(`Category: ${category}`);
    console.log('================================\n');

    return NextResponse.json({ 
      success: true, 
      message: 'Notifications sent',
      methods: ['console', 'email_ready', 'slack_ready']
    });

  } catch (error) {
    console.error('Error sending support notification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}