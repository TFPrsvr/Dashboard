import { NextRequest, NextResponse } from "next/server";
import { createInvitationToken, sendInvitationEmail } from "@/lib/invitations";

export async function POST(request: NextRequest) {
  try {
    const { email, role, organizationId, organizationName } = await request.json();
    
    console.log("SIMPLE API: Received invite request:", { email, role, organizationId, organizationName });

    if (!email || !role || !organizationId) {
      console.log("SIMPLE API: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate invitation token (for email only)
    console.log("SIMPLE API: Generating invitation token...");
    const invitationToken = createInvitationToken();
    
    console.log("SIMPLE API: Generated token:", { invitationToken });

    // Send invitation email
    console.log("SIMPLE API: Sending invitation email...");
    try {
      await sendInvitationEmail({
        email,
        organizationName: organizationName || "PassItOn Organization",
        invitationToken,
        role,
      });
      console.log("SIMPLE API: Email sent successfully");
    } catch (emailError) {
      console.error("SIMPLE API: Email error:", emailError);
    }

    console.log("SIMPLE API: Returning success response");
    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully (simple version)",
    });
  } catch (error) {
    console.error("SIMPLE API: Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}