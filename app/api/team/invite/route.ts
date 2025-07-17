import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";
import { createInvitationToken, sendInvitationEmail } from "@/lib/invitations";

export async function POST(request: NextRequest) {
  try {
    const { email, role, organizationId, organizationName } = await request.json();

    if (!email || !role || !organizationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("organization_id", organizationId)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists in this organization" },
        { status: 409 }
      );
    }

    // Generate invitation token
    const invitationToken = createInvitationToken();
    const tempId = crypto.randomUUID();

    // Create pending user record
    const { error: insertError } = await supabase.from("users").insert({
      id: tempId,
      email,
      role,
      organization_id: organizationId,
      status: "pending",
      invited_at: new Date().toISOString(),
      invitation_token: invitationToken,
    });

    if (insertError) {
      console.error("Database error:", insertError);
      return NextResponse.json(
        { error: "Failed to create invitation" },
        { status: 500 }
      );
    }

    // Send invitation email
    try {
      await sendInvitationEmail({
        email,
        organizationName: organizationName || "PassItOn Organization",
        invitationToken,
        role,
      });
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the request if email fails, but log it
      console.warn("Failed to send invitation email, but user record created");
    }

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully",
    });
  } catch (error) {
    console.error("Invitation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}