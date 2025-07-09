"use client";

import RequireOrgRole from "@/components/RequireOrgRole";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const { userId } = useParams();
  const [role, setRole] = useState<"owner" | "editor">("editor");
  const router = useRouter();

  useEffect(() => {
    fetch(`/api/org/[orgId]/users/${userId}`)
      .then((r) => r.json())
      .then((u) => setRole(u.role));
  }, [userId]);

  function save() {
    fetch(`/api/org/[orgId]/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ role }),
      headers: { "Content-Type": "application/json" },
    }).then(() => router.push("/dashboard/users"));
  }

  return (
    <RequireOrgRole role="owner">
      <h1 className="text-2xl font-bold">Edit User</h1>
      <div className="mt-4">
        <label className="block">
          Role
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as any)}
            className="border p-2 rounded ml-2"
          >
            <option value="owner">Owner</option>
            <option value="editor">Editor</option>
          </select>
        </label>
        <button
          onClick={save}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </RequireOrgRole>
  );
}
