"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";
import { Building, Search, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function AdminOrganizationsPage() {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    try {
      const { data, error } = await supabase
        .from("organizations")
        .select(
          `
          *,
          widgets (count),
          donations:widgets(donations(count))
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrganizations(data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Organizations</h1>
        <p className="text-gray-600 mt-1">
          Manage and support all organizations
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search organizations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrganizations.map((org) => (
          <Card
            key={org.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="truncate">{org.name}</span>
                <Building className="h-5 w-5 text-gray-400" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p className="text-gray-600">{org.email}</p>
                <p className="text-gray-500">
                  Joined {format(new Date(org.created_at), "MMM dd, yyyy")}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {org.subscription_status}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      router.push(`/admin/organizations/${org.id}`)
                    }
                  >
                    View Details
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
