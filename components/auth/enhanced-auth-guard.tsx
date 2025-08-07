"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase-client";
import { useToast } from "@/components/ui/use-toast";

interface EnhancedAuthGuardProps {
  children: React.ReactNode;
  requiredRole?: "super_admin" | "owner" | "editor";
  requiresOrganization?: boolean;
}

// Route mapping for intelligent redirects
const ROUTE_MAPPINGS = {
  // Admin routes to organization equivalents
  "/admin/organizations": "/dashboard",
  "/admin/organizations/[orgId]": "/dashboard/settings",
  "/admin/roles": "/dashboard/team", 
  "/admin/support": "/dashboard/support",
  "/admin/users": "/dashboard/team",
  "/admin/widgets": "/dashboard/widget/customize",
  
  // Default fallbacks
  "admin": "/dashboard",
  "default": "/dashboard"
};

export function EnhancedAuthGuard({ 
  children, 
  requiredRole,
  requiresOrganization = true 
}: EnhancedAuthGuardProps) {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  
  const [userRole, setUserRole] = useState<string | null>(null);
  const [hasOrganization, setHasOrganization] = useState<boolean | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to get intelligent redirect path
  const getRedirectPath = (userRole: string, currentPath: string) => {
    // If user is super_admin but accessing admin route, allow it
    if (userRole === "super_admin" && currentPath.startsWith("/admin")) {
      return null; // No redirect needed
    }
    
    // Map admin routes to organization dashboard equivalents
    if (currentPath.startsWith("/admin")) {
      // Find specific route mapping
      const mapping = Object.entries(ROUTE_MAPPINGS).find(([adminRoute]) => 
        currentPath === adminRoute || currentPath.startsWith(adminRoute.replace("[orgId]", ""))
      );
      
      if (mapping) {
        return mapping[1];
      }
      
      // Default admin redirect
      return ROUTE_MAPPINGS.admin;
    }
    
    return ROUTE_MAPPINGS.default;
  };

  // Helper function to show access denied notification
  const showAccessDeniedNotification = (attemptedAction: string, userRole: string) => {
    const roleDisplayNames = {
      "editor": "Editor",
      "owner": "Organization Owner", 
      "super_admin": "Super Admin"
    };

    toast({
      title: "Access Denied",
      description: `You don't have permission to ${attemptedAction}. Your current role is ${roleDisplayNames[userRole as keyof typeof roleDisplayNames] || userRole}.`,
      variant: "destructive"
    });
  };

  // Helper function to get user-friendly action description from URL
  const getActionFromPath = (path: string): string => {
    const pathMappings = {
      "/admin/organizations": "manage all organizations",
      "/admin/roles": "manage user roles", 
      "/admin/support": "access admin support tools",
      "/admin/users": "manage all users",
      "/admin/widgets": "manage all widgets",
      "/admin": "access admin dashboard"
    };

    // Find exact match first
    if (pathMappings[path as keyof typeof pathMappings]) {
      return pathMappings[path as keyof typeof pathMappings];
    }

    // Find partial match
    const partialMatch = Object.entries(pathMappings).find(([route]) => 
      path.startsWith(route)
    );
    
    if (partialMatch) {
      return partialMatch[1];
    }

    return "access this section";
  };

  useEffect(() => {
    async function checkUserAccess() {
      if (!isLoaded || !userId) {
        setLoading(false);
        return;
      }

      try {
        // Get user role and organization from Supabase
        const { data: userData, error } = await supabase
          .from("users")
          .select("role, organization_id, email")
          .eq("id", userId)
          .single();

        if (error) {
          console.error("Error fetching user data:", error);
          
          // If user doesn't exist in Supabase, redirect to onboarding
          if (error.code === 'PGRST116') {
            toast({
              title: "Account Setup Required",
              description: "Please complete your account setup to continue.",
            });
            router.push("/onboarding");
            return;
          }
        }

        if (userData) {
          // If role is missing, assign default role
          const userRole = userData.role || 'editor';
          setUserRole(userRole);
          setHasOrganization(!!userData.organization_id);
          setOrganizationId(userData.organization_id);

          // Check role requirements with enhanced messaging
          if (requiredRole) {
            const roleHierarchy = ["editor", "owner", "super_admin"];
            const userRoleIndex = roleHierarchy.indexOf(userRole);
            const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
            
            if (userRoleIndex < requiredRoleIndex) {
              const attemptedAction = getActionFromPath(pathname);
              showAccessDeniedNotification(attemptedAction, userRole);
              
              // Intelligent redirect based on current path
              const redirectPath = getRedirectPath(userRole, pathname);
              if (redirectPath) {
                // Add slight delay so user can see the notification
                setTimeout(() => {
                  router.push(redirectPath);
                }, 1500);
              }
              return;
            }
          }

          // Check organization requirements
          if (requiresOrganization && !userData.organization_id) {
            // If user is super_admin, they don't need organization
            if (userRole === 'super_admin') {
              setHasOrganization(true); // Override for super_admin
            } else {
              toast({
                title: "Organization Required", 
                description: "You need to be part of an organization to access this feature.",
              });
              router.push("/onboarding");
              return;
            }
          }

        } else {
          // User not found in Supabase, redirect to onboarding
          toast({
            title: "Account Setup Required",
            description: "We need to set up your account. Please complete the onboarding process.",
          });
          router.push("/onboarding");
          return;
        }
      } catch (error) {
        console.error("Error in auth guard:", error);
        toast({
          title: "Authentication Error",
          description: "There was an issue verifying your access. Please try again.",
          variant: "destructive"
        });
        router.push("/onboarding");
        return;
      } finally {
        setLoading(false);
      }
    }

    checkUserAccess();
  }, [isLoaded, userId, requiredRole, requiresOrganization, router, pathname, toast]);

  // Show loading state with better UX
  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
          <p className="mt-4 text-gray-600">Verifying your access...</p>
        </div>
      </div>
    );
  }

  // Redirect to sign-in if not authenticated
  if (!userId) {
    toast({
      title: "Authentication Required",
      description: "Please sign in to access this page.",
    });
    router.push("/sign-in");
    return null;
  }

  // Show content if all checks pass
  return <>{children}</>;
}

// Enhanced Admin Guard with better error handling
export function EnhancedAdminGuard({ children }: { children: React.ReactNode }) {
  return (
    <EnhancedAuthGuard requiredRole="super_admin" requiresOrganization={false}>
      {children}
    </EnhancedAuthGuard>
  );
}

// Enhanced Organization Guard
export function EnhancedOrganizationGuard({ children }: { children: React.ReactNode }) {
  return (
    <EnhancedAuthGuard requiresOrganization={true}>
      {children}
    </EnhancedAuthGuard>
  );
}

// Hook for accessing user role and permissions
export function useUserPermissions() {
  const { userId } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const { data: userData, error } = await supabase
          .from("users")
          .select("role, organization_id")
          .eq("id", userId)
          .single();

        if (!error && userData) {
          setUserRole(userData.role);
          setOrganizationId(userData.organization_id);
        }
      } catch (error) {
        console.error("Error fetching user permissions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  const hasPermission = (requiredRole: "super_admin" | "owner" | "editor") => {
    if (!userRole) return false;
    
    const roleHierarchy = ["editor", "owner", "super_admin"];
    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    
    return userRoleIndex >= requiredRoleIndex;
  };

  const isSuperAdmin = userRole === "super_admin";
  const isOwner = userRole === "owner";
  const isEditor = userRole === "editor";

  return {
    userRole,
    organizationId,
    loading,
    hasPermission,
    isSuperAdmin,
    isOwner, 
    isEditor,
    hasOrganization: !!organizationId
  };
}