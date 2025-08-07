import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase/supabase-server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const user = await currentUser();
    console.log("API: Current user:", user?.id);
    
    if (!user?.id) {
      console.log("API: No user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = user.id;

    const supabase = supabaseAdmin;

    // Check if user is super admin
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    console.log("API: User data:", userData, "Error:", userError);

    if (userError) {
      console.log("API: User lookup error:", userError);
      
      // If user doesn't exist in database (first time login)
      if (userError.code === 'PGRST116') {
        return NextResponse.json({ error: "User account not set up. Please complete onboarding." }, { status: 404 });
      }
      
      // If other database error
      return NextResponse.json({ error: "Database error while verifying user" }, { status: 503 });
    }

    // Check super admin role (with fallback for missing role)
    const userRole = userData?.role || 'editor';
    if (userRole !== "super_admin") {
      console.log("API: User role check failed. Role:", userRole);
      return NextResponse.json({ 
        error: "Forbidden - Super Admin access required",
        currentRole: userRole 
      }, { status: 403 });
    }

    // Fetch all organizations
    const { data: organizations, error } = await supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });

    console.log("API: Organizations fetched:", organizations?.length || 0, "Error:", error);

    if (error) {
      console.log("API: Organizations fetch error:", error);
      return NextResponse.json({ 
        error: "Database error while fetching organizations",
        details: error.message 
      }, { status: 503 });
    }

    // If no organizations found
    if (!organizations || organizations.length === 0) {
      return NextResponse.json({ 
        message: "No organizations found",
        data: [] 
      });
    }

    return NextResponse.json(organizations);
  } catch (error) {
    console.error("API: Unhandled error:", error);
    
    // If environment configuration error
    if (error instanceof Error && error.message?.includes('environment')) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 503 }
      );
    }
    
    // If any other unexpected error
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
