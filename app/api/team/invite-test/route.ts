import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, role, organizationId, organizationName } = await request.json();
    
    console.log("TEST API: Received invite request:", { email, role, organizationId, organizationName });

    if (!email || !role || !organizationId) {
      console.log("TEST API: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("TEST API: Processing invitation for:", email);
    console.log("TEST API: Organization:", organizationName);
    console.log("TEST API: Role:", role);
    
    // Simulate invitation email (just console log)
    console.log("=== INVITATION EMAIL (TEST) ===");
    console.log("To:", email);
    console.log("Subject: Invitation to join", organizationName);
    console.log("Role:", role);
    console.log("Invitation URL: http://localhost:3000/accept-invitation?token=test-token-123");
    console.log("==============================");

    console.log("TEST API: Returning success response");
    return NextResponse.json({
      success: true,
      message: "Test invitation sent successfully - check console for email content",
    });
  } catch (error) {
    console.error("TEST API: Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}