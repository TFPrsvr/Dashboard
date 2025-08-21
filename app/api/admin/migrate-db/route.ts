import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const supabase = await createClient();

    // Check if user is super admin
    const { data: user } = await supabase
      .from("users")
      .select("role")
      .eq("id", userId)
      .single();

    if (!user || user.role !== "super_admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Add missing fields to organizations table
    const migrations = [
      // Add stripe_account_id field
      `DO $$ 
      BEGIN 
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'organizations' 
              AND column_name = 'stripe_account_id'
          ) THEN
              ALTER TABLE organizations ADD COLUMN stripe_account_id TEXT;
          END IF;
      END $$;`,

      // Add stripe_onboarding_complete field
      `DO $$ 
      BEGIN 
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'organizations' 
              AND column_name = 'stripe_onboarding_complete'
          ) THEN
              ALTER TABLE organizations ADD COLUMN stripe_onboarding_complete BOOLEAN DEFAULT false;
          END IF;
      END $$;`,

      // Add display_name field
      `DO $$ 
      BEGIN 
          IF NOT EXISTS (
              SELECT 1 FROM information_schema.columns 
              WHERE table_name = 'organizations' 
              AND column_name = 'display_name'
          ) THEN
              ALTER TABLE organizations ADD COLUMN display_name TEXT;
          END IF;
      END $$;`,

      // Create donation stats function
      `CREATE OR REPLACE FUNCTION get_donation_stats(widget_id uuid)
      RETURNS TABLE (
        total_raised bigint,
        total_donations bigint,
        average_donation numeric,
        unique_donors bigint
      ) 
      LANGUAGE plpgsql
      AS $$
      BEGIN
        RETURN QUERY
        SELECT 
          COALESCE(SUM(amount), 0) as total_raised,
          COUNT(*)::bigint as total_donations,
          COALESCE(AVG(amount), 0) as average_donation,
          COUNT(DISTINCT donor_email)::bigint as unique_donors
        FROM donations 
        WHERE donations.widget_id = get_donation_stats.widget_id
          AND status = 'succeeded';
      END;
      $$;`
    ];

    const results = [];
    for (const migration of migrations) {
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: migration });
        if (error) {
          console.error("Migration error:", error);
          results.push({ sql: migration.substring(0, 50) + "...", error: error.message });
        } else {
          results.push({ sql: migration.substring(0, 50) + "...", success: true });
        }
      } catch (err) {
        console.error("Migration execution error:", err);
        results.push({ sql: migration.substring(0, 50) + "...", error: String(err) });
      }
    }

    return NextResponse.json({ 
      message: "Migration attempted", 
      results 
    });

  } catch (error) {
    console.error("Database migration error:", error);
    return NextResponse.json(
      { error: "Failed to run migration" },
      { status: 500 }
    );
  }
}