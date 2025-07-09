// app/dashboard/layout.tsx
"use client";

import RequireAuth from "@/components/RequireAuth";
import DashboardLayout from "@/components/DashboardLayout";

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth>
      <DashboardLayout>{children}</DashboardLayout>
    </RequireAuth>
  );
}
