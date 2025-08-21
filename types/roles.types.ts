// Role definitions and permissions for the PassItOn platform

export type UserRole = 'super_admin' | 'admin' | 'editor' | 'user';

export interface RoleDefinition {
  name: string;
  description: string;
  permissions: string[];
  scope: 'platform' | 'organization' | 'limited';
}

export const ROLES: Record<UserRole, RoleDefinition> = {
  super_admin: {
    name: 'Super Admin',
    description: 'Platform-wide administrator with full access to all organizations and system settings',
    scope: 'platform',
    permissions: [
      // Organization Management
      'organizations:read:all',
      'organizations:create',
      'organizations:update:all', 
      'organizations:delete:all',
      
      // User Management (All Users)
      'users:read:all',
      'users:create:all',
      'users:update:all',
      'users:delete:all',
      'users:assign_roles:all',
      
      // Widget Management (All Organizations)
      'widgets:read:all',
      'widgets:create:all',
      'widgets:update:all',
      'widgets:delete:all',
      'widgets:publish:all',
      
      // System Administration
      'system:analytics:all',
      'system:settings:all',
      'system:logs:all',
      'system:maintenance',
      
      // Financial Management
      'payments:read:all',
      'payments:refund:all',
      'subscriptions:manage:all',
      
      // Support & Moderation
      'support:access:all',
      'content:moderate:all'
    ]
  },
  
  admin: {
    name: 'Admin',
    description: 'Organization administrator with full control over their organization\'s widgets, donations, team, and settings',
    scope: 'organization',
    permissions: [
      // Organization Management (Own Only)
      'organizations:read:own',
      'organizations:update:own',
      
      // User Management (Organization Only)
      'users:read:org',
      'users:invite:org',
      'users:update:org',
      'users:remove:org',
      'users:assign_roles:org', // Can assign admin/user roles within org
      
      // Widget Management (Organization Only)
      'widgets:read:org',
      'widgets:create:org',
      'widgets:update:org',
      'widgets:delete:org',
      'widgets:publish:org',
      'widgets:customize:org',
      
      // Donation Management
      'donations:read:org',
      'donations:export:org',
      'donations:refund:org',
      
      // Analytics & Reporting
      'analytics:read:org',
      'reports:generate:org',
      
      // Team & Settings
      'team:manage:org',
      'settings:update:org',
      'integrations:manage:org', // Stripe, email, etc.
      
      // Notifications
      'notifications:read:org',
      'notifications:send:org'
    ]
  },
  
  editor: {
    name: 'Editor',
    description: 'Content editor with permissions to create and modify widgets within their organization',
    scope: 'organization',
    permissions: [
      // Organization Access
      'organizations:read:own',
      
      // Widget Management (Organization Only)
      'widgets:read:org',
      'widgets:create:org',
      'widgets:update:org',
      'widgets:delete:org',
      'widgets:publish:org',
      'widgets:customize:org',
      
      // Dashboard Viewing
      'dashboard:read:org',
      'analytics:read:basic:org',
      
      // Donation Viewing
      'donations:read:org',
      
      // Profile Management
      'profile:read:own',
      'profile:update:own',
      
      // Notifications
      'notifications:read:own'
    ]
  },
  
  user: {
    name: 'User',
    description: 'Limited access user who can view dashboards and interact with widgets within their organization',
    scope: 'limited',
    permissions: [
      // Basic Organization Access
      'organizations:read:own',
      
      // Limited Widget Access
      'widgets:read:org',
      'widgets:preview:org',
      
      // Dashboard Viewing
      'dashboard:read:org',
      'analytics:read:basic:org',
      
      // Donation Viewing (Limited)
      'donations:read:basic:org',
      
      // Profile Management
      'profile:read:own',
      'profile:update:own',
      
      // Notifications
      'notifications:read:own'
    ]
  }
};

export interface Permission {
  resource: string;
  action: string;
  scope: 'all' | 'own' | 'org' | 'basic';
}

export function parsePermission(permission: string): Permission {
  const [resource, action, scope = 'own'] = permission.split(':');
  return { resource, action, scope: scope as Permission['scope'] };
}

export function hasPermission(userRole: UserRole, requiredPermission: string): boolean {
  const rolePermissions = ROLES[userRole].permissions;
  return rolePermissions.includes(requiredPermission);
}

export function canAccessResource(
  userRole: UserRole, 
  resource: string, 
  action: string, 
  scope: 'all' | 'own' | 'org' | 'basic' = 'own'
): boolean {
  const permission = `${resource}:${action}:${scope}`;
  return hasPermission(userRole, permission);
}

// Helper functions for common permission checks
export const RolePermissions = {
  canManageUsers: (role: UserRole) => 
    hasPermission(role, 'users:update:all') || hasPermission(role, 'users:update:org'),
  
  canManageOrganizations: (role: UserRole) => 
    hasPermission(role, 'organizations:update:all'),
  
  canManageWidgets: (role: UserRole) => 
    hasPermission(role, 'widgets:create:all') || hasPermission(role, 'widgets:create:org'),
  
  canViewAnalytics: (role: UserRole) => 
    hasPermission(role, 'analytics:read:all') || hasPermission(role, 'analytics:read:org'),
  
  canAssignRoles: (role: UserRole) => 
    hasPermission(role, 'users:assign_roles:all') || hasPermission(role, 'users:assign_roles:org'),
  
  isSuperAdmin: (role: UserRole) => role === 'super_admin',
  isAdmin: (role: UserRole) => role === 'admin',
  isUser: (role: UserRole) => role === 'user'
};

// Navigation permissions for UI
export const NavigationPermissions = {
  showAdminSection: (role: UserRole) => role === 'super_admin',
  showWidgetCustomizer: (role: UserRole) => role !== 'user',
  showTeamManagement: (role: UserRole) => role !== 'user',
  showOrganizationSettings: (role: UserRole) => role !== 'user',
  showAnalytics: (role: UserRole) => RolePermissions.canViewAnalytics(role)
};