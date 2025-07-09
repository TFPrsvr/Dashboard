"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Organization, clerkClient } from "@clerk/nextjs";

export default function OrgSelector() {
  const [orgs, setOrgs] = useState<Organization[]>([]);
  const router = useRouter();

  useEffect(() => {
    clerkClient.organizations
      .getOrganizationList({ limit: 100 })
      .then(setOrgs)
      .catch(console.error);
  }, []);

  return (
    <select
      className="border p-1 rounded"
      onChange={(e) => router.push(`/dashboard?org=${e.target.value}`)}
    >
      <option value="">Select Org</option>
      {orgs.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </select>
  );
}
