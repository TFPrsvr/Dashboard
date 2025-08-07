"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, ShieldX, ArrowRight } from "lucide-react";

// Component to handle access denied scenarios with user-friendly messaging
export function AccessDeniedHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  useEffect(() => {
    const error = searchParams.get('error');
    const attemptedPath = searchParams.get('attempted_path');

    if (error === 'access_denied' && attemptedPath) {
      const actionDescription = getActionDescription(attemptedPath);
      
      toast({
        title: "Access Denied",
        description: `You don't have permission to ${actionDescription}. You've been redirected to your dashboard.`,
        variant: "destructive",
        action: (
          <button 
            onClick={() => showDetailedAccessInfo(attemptedPath)}
            className="text-sm underline"
          >
            Learn more
          </button>
        )
      });

      // Clean up URL parameters after showing notification
      const url = new URL(window.location.href);
      url.searchParams.delete('error');
      url.searchParams.delete('attempted_path');
      router.replace(url.pathname);
    }
  }, [searchParams, toast, router]);

  const getActionDescription = (path: string): string => {
    const descriptions = {
      '/admin': 'access the admin dashboard',
      '/admin/organizations': 'manage all organizations',
      '/admin/roles': 'manage user roles and permissions',
      '/admin/support': 'access admin support tools',
      '/admin/users': 'manage all platform users',
      '/admin/widgets': 'manage all widgets across organizations',
    };

    // Check for exact match
    if (descriptions[path as keyof typeof descriptions]) {
      return descriptions[path as keyof typeof descriptions];
    }

    // Check for partial matches
    if (path.startsWith('/admin')) {
      return 'access admin features';
    }

    return 'access this section';
  };

  const showDetailedAccessInfo = (attemptedPath: string) => {
    // Create a more detailed explanation modal or redirect to help page
    const helpContent = generateHelpContent(attemptedPath);
    
    toast({
      title: "Understanding Access Levels",
      description: helpContent,
      duration: 8000,
    });
  };

  const generateHelpContent = (path: string): string => {
    if (path.startsWith('/admin')) {
      return "Admin features require Super Admin access. Contact your system administrator if you need these permissions.";
    }
    
    return "This feature requires specific permissions. Check with your organization administrator about your access level.";
  };

  return null; // This component doesn't render anything, just handles side effects
}

// Enhanced Access Denied Page Component
export function AccessDeniedPage({ 
  attemptedPath,
  userRole,
  requiredRole 
}: {
  attemptedPath: string;
  userRole: string;
  requiredRole: string;
}) {
  const router = useRouter();
  
  const roleHierarchy = {
    editor: { level: 1, description: "Can edit content and manage basic settings" },
    owner: { level: 2, description: "Can manage organization settings and team members" }, 
    super_admin: { level: 3, description: "Can access all platform features and admin tools" }
  };

  const getRedirectSuggestion = (path: string, role: string) => {
    if (path.startsWith('/admin')) {
      const suggestions = {
        '/admin/organizations': { path: '/dashboard', label: 'Organization Dashboard' },
        '/admin/roles': { path: '/dashboard/team', label: 'Team Management' },
        '/admin/support': { path: '/dashboard/support', label: 'Support Center' },
        '/admin/users': { path: '/dashboard/team', label: 'Team Members' },
        '/admin/widgets': { path: '/dashboard/widget/customize', label: 'Widget Customizer' },
      };

      return suggestions[path as keyof typeof suggestions] || { 
        path: '/dashboard', 
        label: 'Dashboard' 
      };
    }

    return { path: '/dashboard', label: 'Dashboard' };
  };

  const redirectSuggestion = getRedirectSuggestion(attemptedPath, userRole);
  const currentRoleInfo = roleHierarchy[userRole as keyof typeof roleHierarchy];
  const requiredRoleInfo = roleHierarchy[requiredRole as keyof typeof roleHierarchy];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
          <ShieldX className="h-8 w-8 text-red-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>
        
        <div className="text-left mb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center mb-2">
              <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
              <span className="font-semibold text-gray-700">Current Access Level</span>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              <span className="font-medium capitalize">{userRole}</span> - {currentRoleInfo?.description}
            </p>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <ShieldX className="h-5 w-5 text-red-500 mr-2" />
              <span className="font-semibold text-gray-700">Required Access Level</span>
            </div>
            <p className="text-sm text-gray-600 ml-7">
              <span className="font-medium capitalize">{requiredRole}</span> - {requiredRoleInfo?.description}
            </p>
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          You don't have the necessary permissions to access this feature. 
          Contact your system administrator if you believe this is an error.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push(redirectSuggestion.path)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Go to {redirectSuggestion.label}
            <ArrowRight className="h-4 w-4 ml-2" />
          </button>
          
          <button
            onClick={() => router.back()}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Go Back
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Need help? Contact support at{" "}
            <a href="mailto:support@passiton.com" className="text-blue-600 hover:underline">
              support@passiton.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Hook for checking and handling route permissions
export function useRoutePermissions() {
  const router = useRouter();
  const { toast } = useToast();

  const checkAccess = (
    requiredRole: "super_admin" | "owner" | "editor",
    userRole: string,
    currentPath: string
  ) => {
    const roleHierarchy = ["editor", "owner", "super_admin"];
    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    
    if (userRoleIndex < requiredRoleIndex) {
      handleAccessDenied(requiredRole, userRole, currentPath);
      return false;
    }
    
    return true;
  };

  const handleAccessDenied = (
    requiredRole: string,
    userRole: string, 
    attemptedPath: string
  ) => {
    // Get suggested redirect path
    const redirectPath = getIntelligentRedirect(attemptedPath);
    
    // Show toast notification
    toast({
      title: "Access Denied",
      description: `This feature requires ${requiredRole} access. You currently have ${userRole} access.`,
      variant: "destructive",
      duration: 5000
    });

    // Redirect after a brief delay
    setTimeout(() => {
      router.push(`${redirectPath}?error=access_denied&attempted_path=${encodeURIComponent(attemptedPath)}`);
    }, 1500);
  };

  const getIntelligentRedirect = (path: string): string => {
    const redirects = {
      '/admin': '/dashboard',
      '/admin/organizations': '/dashboard',
      '/admin/roles': '/dashboard/team',
      '/admin/support': '/dashboard/support', 
      '/admin/users': '/dashboard/team',
      '/admin/widgets': '/dashboard/widget/customize',
    };

    // Check for exact match
    if (redirects[path as keyof typeof redirects]) {
      return redirects[path as keyof typeof redirects];
    }

    // Check for path prefix match
    const prefixMatch = Object.keys(redirects).find(route => path.startsWith(route));
    if (prefixMatch) {
      return redirects[prefixMatch as keyof typeof redirects];
    }

    // Default fallback
    return '/dashboard';
  };

  return {
    checkAccess,
    handleAccessDenied
  };
}