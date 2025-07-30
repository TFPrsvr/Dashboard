import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { ticketId, subject, description, userEmail, userName, category, priority } = await request.json();

    // Send notification to support team
    const supportEmail = process.env.SUPPORT_EMAIL || 'support@passiton.com';
    
    await resend.emails.send({
      from: 'PassItOn Support <noreply@passiton.com>',
      to: [supportEmail],
      subject: `New Support Ticket: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Support Ticket Submitted</h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Category:</strong> ${category}</p>
            <p><strong>Priority:</strong> ${priority}</p>
            <p><strong>From:</strong> ${userName} (${userEmail})</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Description:</h3>
            <p style="background: #ffffff; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;">
              ${description}
            </p>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background: #e0f2fe; border-radius: 8px;">
            <p style="margin: 0;"><strong>Next Steps:</strong></p>
            <p style="margin: 5px 0 0 0;">Log into the admin dashboard to respond to this ticket and update its status.</p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/admin/support" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
        </div>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: 'PassItOn Support <noreply@passiton.com>',
      to: [userEmail],
      subject: `Support Ticket Received: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Support Ticket Received</h2>
          
          <p>Hi ${userName},</p>
          
          <p>Thank you for contacting PassItOn support. We've received your ticket and will get back to you as soon as possible.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ticket ID:</strong> ${ticketId}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Status:</strong> Open</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3>Your Request:</h3>
            <p style="background: #ffffff; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;">
              ${description}
            </p>
          </div>
          
          <div style="margin: 30px 0; padding: 20px; background: #e8f5e8; border-radius: 8px;">
            <p style="margin: 0;"><strong>What happens next?</strong></p>
            <p style="margin: 5px 0 0 0;">Our support team will review your request and respond within 24-48 hours. You can check the status of your ticket in your dashboard.</p>
          </div>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/support" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View Your Tickets
            </a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            The PassItOn Support Team
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error sending support notification:', error);
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 });
  }
}