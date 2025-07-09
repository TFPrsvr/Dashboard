"use client";

import RequireOrgRole from "@/components/RequireOrgRole";

export default function AdminPage() {
  return (
    <RequireOrgRole adminOnly>
      <h1 className="text-2xl font-bold">PassItOn Global Admin</h1>
      {/* TODO: list all orgs for support */}
    </RequireOrgRole>
  );
}
