"use client";

import RequireOrgRole from "@/components/RequireOrgRole";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("/api/org/[orgId]/users")
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  function invite() {
    fetch("/api/org/[orgId]/users", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    }).then(() => {
      setEmail("");
      router.refresh();
    });
  }

  return (
    <RequireOrgRole role="owner">
      <h1 className="text-2xl font-bold">Team Members</h1>
      <div className="mt-4 space-y-4">
        <div>
          <input
            type="email"
            placeholder="Invite by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={invite}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Invite
          </button>
        </div>
        <ul className="space-y-2">
          {users.map((u) => (
            <li key={u.userId} className="flex justify-between">
              <span>{u.email}</span>
              <button
                onClick={() => router.push(`/dashboard/users/${u.userId}`)}
                className="text-blue-600"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </RequireOrgRole>
  );
}
