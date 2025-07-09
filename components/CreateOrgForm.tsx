"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function CreateOrgForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !userId) return;
    setLoading(true);
    await fetch("/api/org", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, userId }),
    });
    router.refresh(); // reload GET /api/org
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold">Create Your Organization</h2>
      <input
        type="text"
        placeholder="Organization Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating…" : "Create Organization"}
      </button>
    </form>
  );
}
