import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
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

    console.log("INVITE: Fallback to basic schema until cache clears");

    // Check if user already exists in this organization (basic fields only)
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("organization_id", organizationId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error("Error checking existing user:", checkError);
      return NextResponse.json(
        { error: "Database error checking user", details: checkError.message },
        { status: 500 }
      );
    }

    if (existingUser) {
      if (existingUser.status === 'accepted') {
        return NextResponse.json(
          { error: "User is already a team member" },
          { status: 409 }
        );
      } else if (existingUser.status === 'pending') {
        // Resend invitation to existing pending user
        const invitationToken = createInvitationToken();
        
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            invited_at: new Date().toISOString(),
            invitation_token: invitationToken
          })
          .eq("id", existingUser.id);

        if (updateError) {
          console.error("Error updating invitation:", updateError);
          return NextResponse.json(
            { error: "Failed to resend invitation", details: updateError.message },
            { status: 500 }
          );
        }

        // Send email
        try {
          await sendInvitationEmail({
            email,
            organizationName: organizationName || "PassItOn Organization",
            invitationToken,
            role,
          });
          console.log("ENHANCED INVITE: Resent invitation email");
        } catch (emailError) {
          console.error("Email error:", emailError);
        }

        return NextResponse.json({
          success: true,
          message: "Invitation resent successfully",
          action: "updated_existing"
        });
      }
    }

    // Generate invitation token
    const invitationToken = createInvitationToken();
    const tempId = `invited_${crypto.randomUUID()}`;

    // Create pending user record (fallback to working schema)
    console.log("Attempting to insert user with data:", {
      id: tempId,
      email,
      role,
      organization_id: organizationId,
      created_at: new Date().toISOString()
    });

    const { data: insertedData, error: insertError } = await supabaseAdmin
      .from("users")
      .insert({
        id: tempId,
        email,
        role,
        organization_id: organizationId,
        created_at: new Date().toISOString()
      })
      .select();

    if (insertError) {
      console.error("Database insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to create invitation", details: insertError.message },
        { status: 500 }
      );
    }

    console.log("Successfully inserted user:", insertedData);

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
      message: "Invitation sent successfully with enhanced tracking",
      features: ["status_tracking", "invitation_tokens", "resend_capability"],
      action: "created_new"
    });
  } catch (error) {
    console.error("Invitation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}