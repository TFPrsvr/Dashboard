"use client";

import RequireOrgRole from "@/components/RequireOrgRole";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const [theme, setTheme] = useState({ primary: "#3b82f6", accent: "#d946ef" });

  useEffect(() => {
    // TODO: fetch current settings via GET /api/org/[orgId]
  }, []);

  function save() {
    // TODO: PUT /api/org/[orgId] with theme
  }

  return (
    <RequireOrgRole role="owner">
      <h1 className="text-2xl font-bold">Brand & Theme</h1>
      <div className="mt-4 space-y-4">
        <label className="block">
          Primary Color
          <input
            type="color"
            value={theme.primary}
            onChange={(e) =>
              setTheme((t) => ({ ...t, primary: e.target.value }))
            }
            className="ml-2"
          />
        </label>
        <label className="block">
          Accent Color
          <input
            type="color"
            value={theme.accent}
            onChange={(e) =>
              setTheme((t) => ({ ...t, accent: e.target.value }))
            }
            className="ml-2"
          />
        </label>
        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Settings
        </button>
      </div>
    </RequireOrgRole>
  );
}
