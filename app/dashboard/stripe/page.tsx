"use client";

import RequireOrgRole from "@/components/RequireOrgRole";
import { useEffect, useState } from "react";

export default function StripePage() {
  const [connected, setConnected] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  useEffect(() => {
    fetch("/api/org/[orgId]/stripe")
      .then((r) => r.json())
      .then((d) => {
        setConnected(d.connected);
        if (d.url) setLinkUrl(d.url);
      });
  }, []);

  return (
    <RequireOrgRole role="owner">
      <h1 className="text-2xl font-bold">Stripe Settings</h1>
      {connected ? (
        <p>Your Stripe account is connected ✅</p>
      ) : (
        <button
          onClick={() => (window.location.href = linkUrl)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Connect Stripe
        </button>
      )}
    </RequireOrgRole>
  );
}
