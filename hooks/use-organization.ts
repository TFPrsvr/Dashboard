"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Organization = Database["public"]["Tables"]["organizations"]["Row"];

export function useOrganization() {
  const { userId } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchOrganization() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();

        const { data: user, error: userError } = await supabase
          .from("users")
          .select("organization_id")
          .eq("id", userId)
          .single();

        if (userError) {
          console.error("Error fetching user:", userError);
          return;
        }

        if (user?.organization_id && mounted) {
          const { data: org, error: orgError } = await supabase
            .from("organizations")
            .select("*")
            .eq("id", user.organization_id)
            .single();

          if (orgError) {
            console.error("Error fetching organization:", orgError);
            return;
          }

          if (mounted) {
            setOrganization(org);
          }
        }
      } catch (error) {
        console.error("Error in useOrganization:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchOrganization();

    return () => {
      mounted = false;
    };
  }, [userId]);

  return { organization, loading };
}
