import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { UserRole, ROLES } from '@/types/roles.types';

// GET /api/admin/roles - Get all users with their roles (Super Admin only)
export async function GET(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify super admin permission
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const organizationId = searchParams.get('organizationId');
    const role = searchParams.get('role');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = (page - 1) * limit;

    // Build query
    let query = supabaseAdmin
      .from('users')
      .select(`
        id,
        email,
        role,
        organization_id,
        first_name,
        last_name,
        status,
        created_at,
        organizations(name)
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    // Apply filters
    if (organizationId) {
      query = query.eq('organization_id', organizationId);
    }
    
    if (role && ['super_admin', 'admin', 'user'].includes(role)) {
      query = query.eq('role', role);
    }

    const { data: users, error } = await query;

    if (error) {
      console.error('Error fetching users:', error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    // Get total count for pagination
    let countQuery = supabaseAdmin
      .from('users')
      .select('id', { count: 'exact', head: true });

    if (organizationId) {
      countQuery = countQuery.eq('organization_id', organizationId);
    }
    if (role) {
      countQuery = countQuery.eq('role', role);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Error counting users:', countError);
    }

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    });

  } catch (error) {
    console.error('Error in roles API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/admin/roles/bulk - Bulk role assignment (Super Admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify super admin permission
    const { data: currentUser } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', userId)
      .single();

    if (!currentUser || currentUser.role !== 'super_admin') {
      return NextResponse.json({ error: 'Super admin access required' }, { status: 403 });
    }

    const { assignments, reason } = await request.json();

    // Validate assignments array
    if (!Array.isArray(assignments) || assignments.length === 0) {
      return NextResponse.json({ error: 'Invalid assignments data' }, { status: 400 });
    }

    // Validate each assignment
    for (const assignment of assignments) {
      if (!assignment.userId || !assignment.role) {
        return NextResponse.json({ 
          error: 'Each assignment must have userId and role' 
        }, { status: 400 });
      }
      
      if (!['super_admin', 'admin', 'user'].includes(assignment.role)) {
        return NextResponse.json({ 
          error: `Invalid role: ${assignment.role}` 
        }, { status: 400 });
      }
    }

    // Get current roles for all users being updated
    const userIds = assignments.map(a => a.userId);
    const { data: currentUsers, error: fetchError } = await supabaseAdmin
      .from('users')
      .select('id, role, email, organization_id')
      .in('id', userIds);

    if (fetchError) {
      console.error('Error fetching current users:', fetchError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    // Prevent user from removing their own super admin status
    const selfAssignment = assignments.find(a => a.userId === userId);
    if (selfAssignment && selfAssignment.role !== 'super_admin') {
      return NextResponse.json({ 
        error: 'Cannot remove your own super admin privileges' 
      }, { status: 400 });
    }

    const results = [];
    const errors = [];

    // Process each assignment
    for (const assignment of assignments) {
      try {
        const currentUser = currentUsers?.find(u => u.id === assignment.userId);
        
        if (!currentUser) {
          errors.push({
            userId: assignment.userId,
            error: 'User not found'
          });
          continue;
        }

        // Skip if role hasn't changed
        if (currentUser.role === assignment.role) {
          results.push({
            userId: assignment.userId,
            status: 'skipped',
            message: 'Role unchanged'
          });
          continue;
        }

        // Update role
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ 
            role: assignment.role,
            updated_at: new Date().toISOString()
          })
          .eq('id', assignment.userId);

        if (updateError) {
          errors.push({
            userId: assignment.userId,
            error: updateError.message
          });
          continue;
        }

        // Log the assignment
        const { error: logError } = await supabaseAdmin
          .from('role_assignments')
          .insert({
            user_id: assignment.userId,
            assigned_by: userId,
            old_role: currentUser.role,
            new_role: assignment.role,
            organization_id: currentUser.organization_id,
            reason: reason || 'Bulk role assignment'
          });

        if (logError) {
          console.error('Error logging role assignment:', logError);
        }

        results.push({
          userId: assignment.userId,
          status: 'success',
          oldRole: currentUser.role,
          newRole: assignment.role
        });

      } catch (error) {
        errors.push({
          userId: assignment.userId,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return NextResponse.json({
      message: 'Bulk role assignment completed',
      results,
      errors,
      summary: {
        total: assignments.length,
        successful: results.filter(r => r.status === 'success').length,
        skipped: results.filter(r => r.status === 'skipped').length,
        failed: errors.length
      }
    });

  } catch (error) {
    console.error('Error in bulk role assignment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/admin/roles/definitions - Get role definitions
export async function PUT(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Any authenticated user can view role definitions
    return NextResponse.json({
      roles: ROLES,
      roleOptions: [
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' }
      ]
    });

  } catch (error) {
    console.error('Error fetching role definitions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}