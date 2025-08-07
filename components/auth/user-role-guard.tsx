"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/hooks/use-user-role";
import { useToast } from "@/components/ui/use-toast";
import { LoadingSpinner, ErrorPage } from "@/components/ui/error-page";

interface UserRoleGuardProps {
  children: React.ReactNode;
  requiredRole?: "super_admin" | "owner" | "editor";
  requiresOrganization?: boolean;
  fallbackPath?: string;
}

export function UserRoleGuard({ 
  children, 
  requiredRole,
  requiresOrganization = true,
  fallbackPath = "/dashboard"
}: UserRoleGuardProps) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const {
    userRole,
    loading: roleLoading,
    error: roleError,
    isSuperAdmin,
    hasOrganization,
    needsOnboarding,
    hasPermission
  } = useUserRole();

  useEffect(() => {
    // Wait for everything to load
    if (!isLoaded || roleLoading) return;

    // If not authenticated, redirect to sign-in
    if (!userId) {
      router.push("/sign-in");
      return;
    }

    // If role detection failed
    if (roleError) {
      toast({
        title: "Authentication Error",
        description: "Unable to verify your account. Please try signing in again.",
        variant: "destructive"
      });
      return;
    }

    // If user needs onboarding
    if (needsOnboarding) {
      router.push("/onboarding");
      return;
    }

    // If organization is required but user doesn't have one (and isn't super admin)
    if (requiresOrganization && !hasOrganization && !isSuperAdmin) {
      toast({
        title: "Organization Required",
        description: "You need to be part of an organization to access this feature.",
      });
      router.push("/onboarding");
      return;
    }

    // If specific role is required, check permissions
    if (requiredRole && !hasPermission(requiredRole)) {
      const roleNames = {
        'super_admin': 'Super Admin',
        'owner': 'Organization Owner',
        'editor': 'Editor'
      };

      toast({
        title: "Access Denied",
        description: `You need ${roleNames[requiredRole]} permissions to access this feature.`,
        variant: "destructive"
      });

      // Intelligent redirect based on user's actual role
      if (isSuperAdmin) {
        router.push("/admin");
      } else if (hasOrganization) {
        router.push(fallbackPath);
      } else {
        router.push("/onboarding");
      }
      return;
    }

  }, [
    isLoaded, 
    userId, 
    roleLoading, 
    roleError, 
    needsOnboarding, 
    hasOrganization, 
    isSuperAdmin, 
    requiredRole, 
    requiresOrganization, 
    router, 
    toast, 
    hasPermission,
    fallbackPath
  ]);

  // Show loading state
  if (!isLoaded || roleLoading) {
    return <LoadingSpinner message="Verifying your access..." />;
  }

  // Show error if role detection failed
  if (roleError) {
    return (
      <ErrorPage 
        title="Authentication Error"
        message={roleError}
        actions={[
          { label: "Try Again", onClick: () => window.location.reload() },
          { label: "Sign Out", onClick: () => router.push("/sign-out") }
        ]}
      />
    );
  }

  // If not authenticated
  if (!userId) {
    return <LoadingSpinner message="Redirecting to sign in..." />;
  }

  // If all checks pass, render the protected content
  return <>{children}</>;
}

// Specific guards for common use cases
export function SuperAdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <UserRoleGuard 
      requiredRole="super_admin" 
      requiresOrganization={false}
      fallbackPath="/dashboard"
    >
      {children}
    </UserRoleGuard>
  );
}

export function OwnerGuard({ children }: { children: React.ReactNode }) {
  return (
    <UserRoleGuard 
      requiredRole="owner" 
      requiresOrganization={true}
      fallbackPath="/dashboard"
    >
      {children}
    </UserRoleGuard>
  );
}

export function OrganizationGuard({ children }: { children: React.ReactNode }) {
  return (
    <UserRoleGuard 
      requiresOrganization={true}
      fallbackPath="/onboarding"
    >
      {children}
    </UserRoleGuard>
  );
}