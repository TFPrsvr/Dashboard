import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createClient } from "@/lib/supabase/supabase-server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const widgetId = searchParams.get("widgetId");

    if (!widgetId) {
      return NextResponse.json(
        { error: "Widget ID is required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify user has access to this widget
    const { data: userData } = await supabase
      .from("users")
      .select("role, organization_id")
      .eq("id", userId)
      .single();

    const { data: widget } = await supabase
      .from("widgets")
      .select("organization_id")
      .eq("id", widgetId)
      .single();

    if (!widget || (userData?.organization_id !== widget.organization_id && userData?.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get causes for this widget
    const { data: causes, error } = await supabase
      .from("causes")
      .select("*")
      .eq("widget_id", widgetId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching causes:", error);
      return NextResponse.json(
        { error: "Failed to fetch causes" },
        { status: 500 }
      );
    }

    return NextResponse.json(causes || []);
  } catch (error) {
    console.error("Error in causes API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { widgetId, name, description, goalAmount } = body;

    if (!widgetId || !name) {
      return NextResponse.json(
        { error: "Widget ID and name are required" },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Verify user has access to this widget
    const { data: userData } = await supabase
      .from("users")
      .select("role, organization_id")
      .eq("id", userId)
      .single();

    const { data: widget } = await supabase
      .from("widgets")
      .select("organization_id")
      .eq("id", widgetId)
      .single();

    if (!widget || (userData?.organization_id !== widget.organization_id && userData?.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Create new cause
    const { data: cause, error } = await supabase
      .from("causes")
      .insert({
        widget_id: widgetId,
        name,
        description,
        goal_amount: goalAmount ? Math.round(goalAmount * 100) : null, // Convert to cents
        is_active: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating cause:", error);
      return NextResponse.json(
        { error: "Failed to create cause" },
        { status: 500 }
      );
    }

    return NextResponse.json(cause);
  } catch (error) {
    console.error("Error in causes API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}