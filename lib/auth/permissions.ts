import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/supabase-server';
import { UserRole, RolePermissions, canAccessResource } from '@/types/roles.types';

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  organizationId: string | null;
}

/**
 * Get current authenticated user with role information
 */
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return null;
    }

    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, role, organization_id')
      .eq('id', userId)
      .single();

    if (error || !user) {
      console.error('Error fetching user:', error);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
      organizationId: user.organization_id
    };
  } catch (error) {
    console.error('Error in getCurrentUser:', error);
    return null;
  }
}

/**
 * Check if user has required permission
 */
export async function checkPermission(
  requiredPermission: string,
  targetOrgId?: string
): Promise<{ allowed: boolean; user: AuthUser | null; reason?: string }> {
  const user = await getCurrentUser();
  
  if (!user) {
    return { allowed: false, user: null, reason: 'Not authenticated' };
  }

  // Parse permission
  const [resource, action, scope] = requiredPermission.split(':');
  
  // Super admins can do everything
  if (user.role === 'super_admin') {
    return { allowed: true, user };
  }

  // Check specific permissions based on scope
  switch (scope) {
    case 'all':
      // Only super admins can access 'all' scope
      return { 
        allowed: false, 
        user, 
        reason: 'Super admin access required' 
      };
      
    case 'org':
      // Check if user is admin and in the right organization
      if (user.role === 'admin') {
        if (targetOrgId && user.organizationId !== targetOrgId) {
          return { 
            allowed: false, 
            user, 
            reason: 'Access limited to your organization' 
          };
        }
        return { allowed: true, user };
      }
      return { 
        allowed: false, 
        user, 
        reason: 'Admin access required' 
      };
      
    case 'own':
      // User can only access their own resources
      return { allowed: true, user };
      
    case 'basic':
      // Basic read access for users in the organization
      if (targetOrgId && user.organizationId !== targetOrgId) {
        return { 
          allowed: false, 
          user, 
          reason: 'Access limited to your organization' 
        };
      }
      return { allowed: true, user };
      
    default:
      return { 
        allowed: false, 
        user, 
        reason: 'Invalid permission scope' 
      };
  }
}

/**
 * Middleware function to protect API routes
 */
export function withRoleProtection(
  requiredPermission: string,
  handler: (user: AuthUser, ...args: any[]) => Promise<Response>
) {
  return async (...args: any[]): Promise<Response> => {
    const { allowed, user, reason } = await checkPermission(requiredPermission);
    
    if (!allowed || !user) {
      return new Response(
        JSON.stringify({ error: reason || 'Access denied' }), 
        { 
          status: user ? 403 : 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
    
    return handler(user, ...args);
  };
}

/**
 * Check if user can manage another user (for role assignments)
 */
export async function canManageUser(
  currentUser: AuthUser, 
  targetUserId: string
): Promise<{ allowed: boolean; reason?: string; targetUser?: any }> {
  // Get target user
  const { data: targetUser, error } = await supabaseAdmin
    .from('users')
    .select('id, role, organization_id, email')
    .eq('id', targetUserId)
    .single();

  if (error || !targetUser) {
    return { allowed: false, reason: 'Target user not found' };
  }

  // Super admins can manage anyone
  if (currentUser.role === 'super_admin') {
    return { allowed: true, targetUser };
  }

  // Admins can manage users in their organization (except super admins)
  if (currentUser.role === 'admin') {
    if (targetUser.role === 'super_admin') {
      return { allowed: false, reason: 'Cannot manage super admin users' };
    }
    
    if (currentUser.organizationId !== targetUser.organization_id) {
      return { allowed: false, reason: 'Can only manage users in your organization' };
    }
    
    return { allowed: true, targetUser };
  }

  // Users cannot manage other users
  return { allowed: false, reason: 'Insufficient permissions' };
}

/**
 * Validate role assignment permissions
 */
export async function canAssignRole(
  currentUser: AuthUser,
  targetRole: UserRole,
  targetOrgId?: string
): Promise<{ allowed: boolean; reason?: string }> {
  // Super admins can assign any role
  if (currentUser.role === 'super_admin') {
    return { allowed: true };
  }

  // Admins can only assign admin/user roles within their organization
  if (currentUser.role === 'admin') {
    if (targetRole === 'super_admin') {
      return { allowed: false, reason: 'Cannot assign super admin role' };
    }
    
    if (targetOrgId && currentUser.organizationId !== targetOrgId) {
      return { allowed: false, reason: 'Can only assign roles within your organization' };
    }
    
    return { allowed: true };
  }

  return { allowed: false, reason: 'Insufficient permissions to assign roles' };
}

/**
 * Get accessible organizations for user
 */
export async function getAccessibleOrganizations(user: AuthUser) {
  if (user.role === 'super_admin') {
    // Super admins can see all organizations
    const { data: organizations, error } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .order('name');
    
    return { organizations: organizations || [], error };
  } else if (user.organizationId) {
    // Other users can only see their own organization
    const { data: organization, error } = await supabaseAdmin
      .from('organizations')
      .select('*')
      .eq('id', user.organizationId)
      .single();
    
    return { organizations: organization ? [organization] : [], error };
  }
  
  return { organizations: [], error: null };
}

/**
 * Filter data based on user permissions
 */
export function filterByPermissions<T extends { organization_id?: string }>(
  data: T[],
  user: AuthUser
): T[] {
  if (user.role === 'super_admin') {
    return data;
  }
  
  return data.filter(item => 
    item.organization_id === user.organizationId
  );
}

/**
 * Common permission checks
 */
export const PermissionChecks = {
  canViewUsers: (user: AuthUser) => 
    user.role === 'super_admin' || user.role === 'admin',
    
  canManageOrganization: (user: AuthUser, orgId: string) =>
    user.role === 'super_admin' || 
    (user.role === 'admin' && user.organizationId === orgId),
    
  canManageWidgets: (user: AuthUser, orgId: string) =>
    user.role === 'super_admin' || 
    (user.role === 'admin' && user.organizationId === orgId),
    
  canViewAnalytics: (user: AuthUser, orgId: string) =>
    user.role === 'super_admin' || 
    (user.organizationId === orgId),
    
  canInviteUsers: (user: AuthUser) =>
    user.role === 'super_admin' || user.role === 'admin',
    
  canExportData: (user: AuthUser, orgId: string) =>
    user.role === 'super_admin' || 
    (user.role === 'admin' && user.organizationId === orgId)
};