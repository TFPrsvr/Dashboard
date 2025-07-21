import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { createInvitationToken, sendInvitationEmail } from "@/lib/invitations";

export async function POST(request: NextRequest) {
  console.log("TEAM INVITE API: Starting invitation process with tracking");
  
  try {
    // Check authentication
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { email, role, organizationId, organizationName } = body;

    if (!email || !role || !organizationId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    console.log("TEAM INVITE API: Processing invitation for:", email, "as", role);

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("id, email, status, role, invited_at")
      .eq("email", email)
      .eq("organization_id", organizationId)
      .maybeSingle();

    if (existingUser) {
      if (existingUser.status === 'accepted') {
        return NextResponse.json(
          { error: "User is already a team member" },
          { status: 409 }
        );
      } else if (existingUser.status === 'pending') {
        // Update existing pending invitation
        const invitationToken = createInvitationToken();
        
        const { error: updateError } = await supabaseAdmin
          .from("users")
          .update({
            role,
            invited_at: new Date().toISOString(),
            invitation_token: invitationToken
          })
          .eq("id", existingUser.id);

        if (updateError) {
          console.error("Error updating invitation:", updateError);
          return NextResponse.json(
            { error: "Failed to update invitation" },
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
        } catch (emailError) {
          console.error("Email error:", emailError);
        }

        return NextResponse.json({
          success: true,
          message: "Invitation updated and resent successfully"
        });
      }
    }

    // Create new invitation
    const invitationToken = createInvitationToken();
    const tempId = crypto.randomUUID();

    const { error: insertError } = await supabaseAdmin
      .from("users")
      .insert({
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
      console.log("TEAM INVITE API: Email sent successfully");
    } catch (emailError) {
      console.error("Email error:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Invitation sent successfully"
    });

  } catch (error) {
    console.error("TEAM INVITE API: Unhandled error:", error);
    return NextResponse.json(
      { error: "Failed to process invitation" },
      { status: 500 }
    );
  }
}