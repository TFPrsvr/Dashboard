"use client";

import { useEffect, useState } from "react";
import { Organization, clerkClient } from "@clerk/nextjs";
import CreateOrgForm from "@/components/CreateOrgForm";
import RequireAuth from "@/components/RequireAuth";
import RequireOrgRole from "@/components/RequireOrgRole";

export default function DashboardPage() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orgs on mount
  useEffect(() => {
    clerkClient.sessions
      .getAuth()
      .then(({ userId }) =>
        clerkClient.organizations.getOrganizationMembershipList({ userId })
      )
      .then((memberships) =>
        Promise.all(
          memberships.map((m) =>
            clerkClient.organizations.getOrganization({
              organizationId: m.organizationId,
            })
          )
        )
      )
      .then((list) => setOrgs(list as Organization[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="p-6">Loading organizations…</p>;
  }

  // If user has no orgs, show create form
  if (orgs.length === 0) {
    return (
      <RequireAuth>
        <CreateOrgForm />
      </RequireAuth>
    );
  }

  // Otherwise, show overview for first org (or let them switch later)
  const org = orgs[0];

  return (
    <RequireAuth>
      <RequireOrgRole role="editor">
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold">Dashboard: {org.name}</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Total Donations</p>
              <p className="text-xl font-semibold">$0</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Active Widgets</p>
              <p className="text-xl font-semibold">0</p>
            </div>
            <div className="p-4 bg-white rounded shadow">
              <p className="text-sm text-gray-500">Initiatives</p>
              <p className="text-xl font-semibold">0</p>
            </div>
          </div>
        </div>
      </RequireOrgRole>
    </RequireAuth>
  );
}
