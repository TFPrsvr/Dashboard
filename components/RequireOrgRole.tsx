"use client";

import { useOrganization, useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireOrgRole({
  children,
  role, // "owner" | "editor"
  adminOnly, // superadmin bypass
}: {
  children: React.ReactNode;
  role?: "owner" | "editor";
  adminOnly?: boolean;
}) {
  const { organization } = useOrganization();
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (adminOnly && user?.publicMetadata.role !== "PassItOnAdmin") {
      router.replace("/");
      return;
    }
    if (role) {
      const membership = organization?.membership;
      const userRole =
        membership?.publicMetadata.role || membership?.role || "";
      if (userRole !== role && userRole !== "owner") {
        router.replace("/");
      }
    }
  }, [organization, user, role, adminOnly, router]);

  return <>{children}</>;
}
