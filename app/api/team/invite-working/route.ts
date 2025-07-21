import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { createInvitationToken, sendInvitationEmail } from "@/lib/invitations";

export async function POST(request: NextRequest) {
  try {
    const { email, role, organizationId, organizationName } = await request.json();
    
    console.log("WORKING API: Received invite request:", { email, role, organizationId, organizationName });

    if (!email || !role || !organizationId) {
      console.log("WORKING API: Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists in this organization
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("organization_id", organizationId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("WORKING API: Error checking existing user:", checkError);
      return NextResponse.json(
        { error: "Database error checking user" },
        { status: 500 }
      );
    }

    if (existingUser) {
      console.log("WORKING API: User already exists");
      return NextResponse.json(
        { error: "User already exists in this organization" },
        { status: 409 }
      );
    }

    // Generate invitation token for the email
    const invitationToken = createInvitationToken();
    const tempId = `invited_${crypto.randomUUID()}`;
    
    console.log("WORKING API: Generated temp ID:", tempId);

    // Create a pending user record with only the fields that exist in current schema
    const { error: insertError } = await supabaseAdmin
      .from("users")
      .insert({
        id: tempId,
        email,
        role,
        organization_id: organizationId,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error("WORKING API: Database insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create user record", details: insertError.message },
        { status: 500 }
      );
    }

    console.log("WORKING API: User record created successfully");

    // Send invitation email with token
    try {
      await sendInvitationEmail({
        email,
        organizationName: organizationName || "PassItOn Organization",
        invitationToken,
        role,
      });
      console.log("WORKING API: Email sent successfully");
    } catch (emailError) {
      console.error("WORKING API: Email error:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully",
      tempUserId: tempId
    });
  } catch (error) {
    console.error("WORKING API: Unhandled error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}