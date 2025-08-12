"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { Database } from "@/types/database.types";

type Organization = Database["public"]["Tables"]["organizations"]["Row"];

export function useOrganization() {
  const { userId } = useAuth();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function fetchOrganization() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data: org, error: orgError } = await supabase
          .from("users")
          .select("organizations(*)")
          .eq("id", userId)
          .single();

        if (orgError) {
          console.error("Error fetching organization:", orgError);
          
          // If user doesn't exist
          if (orgError.code === 'PGRST116') {
            if (mounted) setNotFound(true);
          } else {
            if (mounted) setError(orgError.message || "Failed to load organization");
          }
          if (mounted) setLoading(false);
          return;
        }

        if (mounted) {
          if (org?.organizations) {
            setOrganization(org.organizations as unknown as Organization);
          } else {
            // User exists but no organization
            setNotFound(true);
          }
        }
      } catch (error) {
        console.error("Error in useOrganization:", error);
        if (mounted) {
          setError("Failed to load organization");
        }
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

  return { organization, loading, error, notFound };
}
