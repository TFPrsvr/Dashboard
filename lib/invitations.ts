import crypto from "crypto";

export function createInvitationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export interface InvitationEmailData {
  email: string;
  organizationName: string;
  invitationToken: string;
  role: string;
}

export async function sendInvitationEmail(data: InvitationEmailData) {
  const { email, organizationName, invitationToken, role } = data;
  
  // For now, we'll use a simple email service or console log
  // In production, you'd integrate with services like SendGrid, Resend, etc.
  
  const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/accept-invitation?token=${invitationToken}`;
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">You're invited to join ${organizationName}</h2>
      
      <p>Hello,</p>
      
      <p>You've been invited to join <strong>${organizationName}</strong> as a <strong>${role}</strong> on PassItOn.</p>
      
      <p>Click the link below to accept your invitation:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${inviteUrl}" 
           style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
          Accept Invitation
        </a>
      </div>
      
      <p>This invitation will expire in 7 days.</p>
      
      <p>If you didn't expect this invitation, you can safely ignore this email.</p>
      
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e5e5;">
      
      <p style="color: #666; font-size: 14px;">
        Best regards,<br>
        The PassItOn Team
      </p>
    </div>
  `;

  // For development, log to console
  console.log("=== INVITATION EMAIL ===");
  console.log("To:", email);
  console.log("Subject: Invitation to join", organizationName);
  console.log("Invite URL:", inviteUrl);
  console.log("Email Content:", emailContent);
  console.log("========================");

  // TODO: In production, integrate with email service:
  // 
  // Example with Resend:
  // await resend.emails.send({
  //   from: 'noreply@passiton.com',
  //   to: email,
  //   subject: `Invitation to join ${organizationName}`,
  //   html: emailContent,
  // });
  
  // Example with SendGrid:
  // await sgMail.send({
  //   to: email,
  //   from: 'noreply@passiton.com',
  //   subject: `Invitation to join ${organizationName}`,
  //   html: emailContent,
  // });

  return { success: true };
}