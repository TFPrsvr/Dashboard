"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { detectUserRole, UserRoleInfo } from '@/lib/auth/role-detection';

export function useUserRole() {
  const { userId, isLoaded } = useAuth();
  const [userRole, setUserRole] = useState<UserRoleInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUserRole() {
      if (!isLoaded) return;
      
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        // Detect the user's current role
        const roleInfo = await detectUserRole(userId);
        setUserRole(roleInfo);
        
      } catch (err) {
        console.error('Error loading user role:', err);
        setError(err instanceof Error ? err.message : 'Failed to load user role');
      } finally {
        setLoading(false);
      }
    }

    loadUserRole();
  }, [userId, isLoaded]);

  // Helper functions for easy role checking
  const isSuperAdmin = userRole?.isSuperAdmin ?? false;
  const isOwner = userRole?.role === 'owner';
  const isEditor = userRole?.role === 'editor';
  const isNewUser = userRole?.userType === 'new_user';
  const needsOnboarding = userRole?.needsOnboarding ?? false;
  const canAccessAdmin = userRole?.canAccessAdmin ?? false;
  const hasOrganization = userRole?.hasOrganization ?? false;

  // Role checking functions
  const hasPermission = (requiredRole: 'super_admin' | 'owner' | 'editor'): boolean => {
    if (!userRole?.role) return false;
    
    const roleHierarchy = ['editor', 'owner', 'super_admin'];
    const userRoleIndex = roleHierarchy.indexOf(userRole.role);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);
    
    return userRoleIndex >= requiredRoleIndex;
  };

  return {
    // Full user role information
    userRole,
    loading,
    error,
    
    // Quick role checks
    isSuperAdmin,
    isOwner,
    isEditor,
    isNewUser,
    needsOnboarding,
    canAccessAdmin,
    hasOrganization,
    
    // User details
    role: userRole?.role || 'editor',
    organizationId: userRole?.organizationId,
    organizationName: userRole?.organizationName,
    userType: userRole?.userType || 'new_user',
    
    // Permission checking
    hasPermission
  };
}