"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/types/database.types";

type Donation = Database["public"]["Tables"]["donations"]["Row"];

interface DonationStats {
  totalRaised: number;
  totalDonations: number;
  averageDonation: number;
  uniqueDonors: number;
}

export function useDonations(widgetId?: string) {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [stats, setStats] = useState<DonationStats>({
    totalRaised: 0,
    totalDonations: 0,
    averageDonation: 0,
    uniqueDonors: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchDonations() {
      if (!widgetId) {
        setLoading(false);
        return;
      }

      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("donations")
          .select("*, causes(name)")
          .eq("widget_id", widgetId)
          .eq("status", "succeeded")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (mounted) {
          setDonations(data || []);

          // Calculate stats
          if (data && data.length > 0) {
            const total = data.reduce((sum, d) => sum + d.amount, 0);
            const uniqueDonorEmails = new Set(
              data.map((d) => d.donor_email).filter(Boolean)
            );

            setStats({
              totalRaised: total,
              totalDonations: data.length,
              averageDonation: total / data.length,
              uniqueDonors: uniqueDonorEmails.size,
            });
          }
        }
      } catch (err) {
        if (mounted) {
          setError(err as Error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchDonations();

    // Set up real-time subscription
    const supabase = createClient();
    const subscription = supabase
      .channel("donations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "donations",
          filter: `widget_id=eq.${widgetId}`,
        },
        (payload) => {
          if (mounted) {
            setDonations((prev) => [payload.new as Donation, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [widgetId]);

  return { donations, stats, loading, error };
}
