"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, userId, sessionId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    if (!userId || !sessionId) router.replace("/sign-in");
  }, [isLoaded, userId, sessionId, router]);

  if (!isLoaded || !userId) return null;
  return <>{children}</>;
}
