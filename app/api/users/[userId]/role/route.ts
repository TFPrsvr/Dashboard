import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/supabase-server';
import { UserRole, RolePermissions } from '@/types/roles.types';

// GET /api/users/[userId]/role - Get user's current role
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const targetUserId = resolvedParams.userId;

    // Get current user's permissions
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('role, organization_id')
      .eq('id', currentUserId)
      .single();

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get target user's role
    const { data: targetUser } = await supabaseAdmin
      .from('users')
      .select('id, email, role, organization_id, first_name, last_name')
      .eq('id', targetUserId)
      .single();

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Permission check: Super admins can view any user, admins can view users in their org
    const canView = currentUser.role === 'super_admin' || 
      (currentUser.role === 'admin' && currentUser.organization_id === targetUser.organization_id);

    if (!canView) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    return NextResponse.json({
      user: targetUser,
      canModify: RolePermissions.canAssignRoles(currentUser.role as UserRole)
    });

  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/users/[userId]/role - Update user's role
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const { role: newRole, reason } = await request.json();
    const targetUserId = resolvedParams.userId;

    // Validate new role
    if (!['super_admin', 'admin', 'user'].includes(newRole)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Get current user's permissions
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('role, organization_id')
      .eq('id', currentUserId)
      .single();

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get target user
    const { data: targetUser } = await supabaseAdmin
      .from('users')
      .select('id, email, role, organization_id, first_name, last_name')
      .eq('id', targetUserId)
      .single();

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Permission checks
    const isSuperAdmin = currentUser.role === 'super_admin';
    const isAdmin = currentUser.role === 'admin';
    const sameOrg = currentUser.organization_id === targetUser.organization_id;

    // Super admins can assign any role to anyone
    // Admins can only assign admin/user roles within their organization
    if (!isSuperAdmin) {
      if (!isAdmin || !sameOrg) {
        return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
      }
      
      // Admins cannot assign super_admin role
      if (newRole === 'super_admin') {
        return NextResponse.json({ 
          error: 'Only super admins can assign super admin role' 
        }, { status: 403 });
      }
    }

    // Prevent users from removing their own super admin status
    if (currentUserId === targetUserId && currentUser.role === 'super_admin' && newRole !== 'super_admin') {
      return NextResponse.json({ 
        error: 'Cannot remove your own super admin privileges' 
      }, { status: 400 });
    }

    // Update the user's role
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ 
        role: newRole,
        updated_at: new Date().toISOString()
      })
      .eq('id', targetUserId);

    if (updateError) {
      console.error('Error updating user role:', updateError);
      return NextResponse.json({ error: 'Failed to update role' }, { status: 500 });
    }

    // Log the role assignment (will be handled by database trigger)
    // But we can also manually insert if we want more control
    const { error: logError } = await supabaseAdmin
      .from('role_assignments')
      .insert({
        user_id: targetUserId,
        assigned_by: currentUserId,
        old_role: targetUser.role,
        new_role: newRole,
        organization_id: targetUser.organization_id,
        reason: reason || 'Role updated via admin interface'
      });

    if (logError) {
      console.error('Error logging role assignment:', logError);
      // Don't fail the request for logging errors
    }

    // Get updated user data
    const { data: updatedUser } = await supabaseAdmin
      .from('users')
      .select('id, email, role, organization_id, first_name, last_name')
      .eq('id', targetUserId)
      .single();

    return NextResponse.json({
      message: 'Role updated successfully',
      user: updatedUser
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/users/[userId]/role/history - Get role assignment history
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId: currentUserId } = await auth();
    
    if (!currentUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const resolvedParams = await params;
    const targetUserId = resolvedParams.userId;

    // Get current user's permissions
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('role, organization_id')
      .eq('id', currentUserId)
      .single();

    if (!currentUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get target user
    const { data: targetUser } = await supabaseAdmin
      .from('users')
      .select('organization_id')
      .eq('id', targetUserId)
      .single();

    if (!targetUser) {
      return NextResponse.json({ error: 'Target user not found' }, { status: 404 });
    }

    // Permission check
    const canView = currentUser.role === 'super_admin' || 
      (currentUser.role === 'admin' && currentUser.organization_id === targetUser.organization_id);

    if (!canView) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }

    // Get role assignment history
    const { data: history, error } = await supabaseAdmin
      .from('role_assignments')
      .select(`
        *,
        assigned_by_user:assigned_by(email, first_name, last_name)
      `)
      .eq('user_id', targetUserId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching role history:', error);
      return NextResponse.json({ error: 'Failed to fetch role history' }, { status: 500 });
    }

    return NextResponse.json({ history });

  } catch (error) {
    console.error('Error fetching role history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}