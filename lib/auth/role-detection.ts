"use client";

import { supabase } from '@/lib/supabase/supabase-client';
import { supabaseAdmin } from '@/lib/supabase/supabase-server';

export type UserRole = 'super_admin' | 'owner' | 'editor' | 'new_user';

export interface UserRoleInfo {
  userType: UserRole;
  role: string;
  organizationId: string | null;
  organizationName: string | null;
  needsOnboarding: boolean;
  isSuperAdmin: boolean;
  canAccessAdmin: boolean;
  hasOrganization: boolean;
}

// Client-side role detection (uses Clerk userId + Supabase data)
export async function detectUserRole(clerkUserId: string): Promise<UserRoleInfo> {
  try {
    const { data: userData, error } = await supabase
      .from('users')
      .select(`
        role,
        organization_id,
        status,
        organizations (
          name
        )
      `)
      .eq('id', clerkUserId)
      .single();

    // If user doesn't exist in database (new Clerk user)
    if (error?.code === 'PGRST116') {
      return {
        userType: 'new_user',
        role: 'editor',
        organizationId: null,
        organizationName: null,
        needsOnboarding: true,
        isSuperAdmin: false,
        canAccessAdmin: false,
        hasOrganization: false
      };
    }

    if (error) throw error;

    const role = userData.role || 'editor';
    const isSuperAdmin = role === 'super_admin';
    const organizationId = userData.organization_id;
    const organizationName = userData.organizations?.name || null;
    const hasOrganization = !!organizationId;

    return {
      userType: role as UserRole,
      role,
      organizationId,
      organizationName,
      needsOnboarding: userData.status === 'pending' || (!hasOrganization && !isSuperAdmin),
      isSuperAdmin,
      canAccessAdmin: isSuperAdmin,
      hasOrganization
    };

  } catch (error) {
    console.error('Error detecting user role:', error);
    throw error;
  }
}

// Server-side role detection (for API routes)
export async function detectUserRoleServer(clerkUserId: string): Promise<UserRoleInfo> {
  try {
    const { data: userData, error } = await supabaseAdmin
      .from('users')
      .select(`
        role,
        organization_id,
        status,
        organizations (
          name
        )
      `)
      .eq('id', clerkUserId)
      .single();

    // If user doesn't exist in database (new Clerk user)
    if (error?.code === 'PGRST116') {
      return {
        userType: 'new_user',
        role: 'editor',
        organizationId: null,
        organizationName: null,
        needsOnboarding: true,
        isSuperAdmin: false,
        canAccessAdmin: false,
        hasOrganization: false
      };
    }

    if (error) throw error;

    const role = userData.role || 'editor';
    const isSuperAdmin = role === 'super_admin';
    const organizationId = userData.organization_id;
    const organizationName = userData.organizations?.name || null;
    const hasOrganization = !!organizationId;

    return {
      userType: role as UserRole,
      role,
      organizationId,
      organizationName,
      needsOnboarding: userData.status === 'pending' || (!hasOrganization && !isSuperAdmin),
      isSuperAdmin,
      canAccessAdmin: isSuperAdmin,
      hasOrganization
    };

  } catch (error) {
    console.error('Error detecting user role server-side:', error);
    throw error;
  }
}