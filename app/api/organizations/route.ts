import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const user = await currentUser();
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = user.id;

  const supabase = await createClient();

  try {
    // Check if user is super admin
    const { data: userData } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (userData?.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Fetch all organizations
    const { data: organizations, error } = await supabase
      .from("organizations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json(organizations);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch organizations" },
      { status: 500 }
    );
  }
}
