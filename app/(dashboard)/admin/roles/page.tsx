"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Tabs } from '@/components/ui/Tabs';
import { 
  Users, 
  Shield, 
  Edit, 
  Trash2, 
  UserPlus, 
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { UserRole, ROLES } from '@/types/roles.types';

interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
  organization_id: string | null;
  first_name?: string;
  last_name?: string;
  status?: 'pending' | 'accepted';
  created_at: string;
  organizations?: { name: string };
}

interface RoleAssignment {
  id: string;
  user_id: string;
  assigned_by: string;
  old_role: string | null;
  new_role: string;
  organization_id: string | null;
  reason: string | null;
  created_at: string;
  assigned_by_user?: {
    email: string;
    first_name?: string;
    last_name?: string;
  };
}

export default function RoleManagementPage() {
  const { userId } = useAuth();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [roleHistory, setRoleHistory] = useState<RoleAssignment[]>([]);
  const [showRoleHistory, setShowRoleHistory] = useState(false);
  
  // Filters and pagination
  const [filters, setFilters] = useState({
    role: '',
    organization: '',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Role assignment
  const [editingUser, setEditingUser] = useState<UserWithRole | null>(null);
  const [newRole, setNewRole] = useState<UserRole>('user');
  const [roleReason, setRoleReason] = useState('');

  // Organizations for filter
  const [organizations, setOrganizations] = useState<{id: string, name: string}[]>([]);

  // Fetch users with filters
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '20',
        ...(filters.role && { role: filters.role }),
        ...(filters.organization && { organizationId: filters.organization })
      });

      const response = await fetch(`/api/admin/roles?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users || []);
        setTotalPages(data.pagination?.pages || 1);
        setTotalUsers(data.pagination?.total || 0);
      } else {
        console.error('Failed to fetch users:', data.error);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch organizations for filter
  const fetchOrganizations = async () => {
    try {
      const response = await fetch('/api/organizations');
      const data = await response.json();
      if (response.ok) {
        setOrganizations(data.organizations || []);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  // Fetch role history for a user
  const fetchRoleHistory = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'DELETE' // Using DELETE to get history (weird but matches our API)
      });
      const data = await response.json();
      
      if (response.ok) {
        setRoleHistory(data.history || []);
      }
    } catch (error) {
      console.error('Error fetching role history:', error);
      setRoleHistory([]);
    }
  };

  // Update user role
  const updateUserRole = async () => {
    if (!editingUser) return;

    try {
      const response = await fetch(`/api/users/${editingUser.id}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: newRole,
          reason: roleReason || 'Role updated via admin interface'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        // Refresh users list
        fetchUsers();
        setEditingUser(null);
        setRoleReason('');
        setNewRole('user');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Failed to update role');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrganizations();
  }, [currentPage, filters]);

  // Filter users based on search
  const filteredUsers = users.filter(user => {
    if (!filters.search) return true;
    const search = filters.search.toLowerCase();
    return (
      user.email.toLowerCase().includes(search) ||
      user.first_name?.toLowerCase().includes(search) ||
      user.last_name?.toLowerCase().includes(search) ||
      user.organizations?.name.toLowerCase().includes(search)
    );
  });

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatUserName = (user: UserWithRole) => {
    if (user.first_name || user.last_name) {
      return `${user.first_name || ''} ${user.last_name || ''}`.trim();
    }
    return user.email.split('@')[0];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role Management</h1>
          <p className="text-gray-600 mt-1">
            Manage user roles and permissions across the platform
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Role Definitions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role Definitions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(ROLES).map(([roleKey, roleDef]) => (
              <div key={roleKey} className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getRoleBadgeColor(roleKey as UserRole)}>
                    {roleDef.name}
                  </Badge>
                  <span className="text-sm text-gray-500">({roleDef.scope})</span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{roleDef.description}</p>
                <details className="text-xs">
                  <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                    View Permissions ({roleDef.permissions.length})
                  </summary>
                  <div className="mt-2 space-y-1 max-h-32 overflow-y-auto">
                    {roleDef.permissions.slice(0, 10).map((permission, idx) => (
                      <div key={idx} className="text-gray-600 font-mono text-xs">
                        {permission}
                      </div>
                    ))}
                    {roleDef.permissions.length > 10 && (
                      <div className="text-gray-500 text-xs">
                        +{roleDef.permissions.length - 10} more...
                      </div>
                    )}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search Users</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Name, email, organization..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label>Filter by Role</Label>
              <Select
                value={filters.role}
                onValueChange={(value) => setFilters(prev => ({ ...prev, role: value }))}
              >
                <option value="">All Roles</option>
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </Select>
            </div>

            <div>
              <Label>Filter by Organization</Label>
              <Select
                value={filters.organization}
                onValueChange={(value) => setFilters(prev => ({ ...prev, organization: value }))}
              >
                <option value="">All Organizations</option>
                {organizations.map(org => (
                  <option key={org.id} value={org.id}>{org.name}</option>
                ))}
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setFilters({ role: '', organization: '', search: '' });
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Users ({totalUsers})
            </div>
            <div className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading users...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2">User</th>
                      <th className="text-left py-3 px-2">Role</th>
                      <th className="text-left py-3 px-2">Organization</th>
                      <th className="text-left py-3 px-2">Status</th>
                      <th className="text-left py-3 px-2">Joined</th>
                      <th className="text-left py-3 px-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-2">
                          <div>
                            <div className="font-medium">{formatUserName(user)}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-3 px-2">
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {ROLES[user.role].name}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm">
                            {user.organizations?.name || 'No Organization'}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <Badge variant={user.status === 'accepted' ? 'default' : 'secondary'}>
                            {user.status || 'accepted'}
                          </Badge>
                        </td>
                        <td className="py-3 px-2">
                          <span className="text-sm text-gray-500">
                            {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setEditingUser(user);
                                setNewRole(user.role);
                              }}
                              disabled={user.id === userId} // Can't edit own role
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user);
                                setShowRoleHistory(true);
                                fetchRoleHistory(user.id);
                              }}
                            >
                              History
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-500">
                    Showing {filteredUsers.length} of {totalUsers} users
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <span className="text-sm">
                      {currentPage} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Role Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Update User Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>User</Label>
                <div className="text-sm">
                  <div className="font-medium">{formatUserName(editingUser)}</div>
                  <div className="text-gray-500">{editingUser.email}</div>
                </div>
              </div>

              <div>
                <Label>Current Role</Label>
                <Badge className={getRoleBadgeColor(editingUser.role)}>
                  {ROLES[editingUser.role].name}
                </Badge>
              </div>

              <div>
                <Label>New Role</Label>
                <Select value={newRole} onValueChange={(value) => setNewRole(value as UserRole)}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="super_admin">Super Admin</option>
                </Select>
              </div>

              <div>
                <Label>Reason (Optional)</Label>
                <Input
                  placeholder="Reason for role change..."
                  value={roleReason}
                  onChange={(e) => setRoleReason(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setEditingUser(null)}>
                  Cancel
                </Button>
                <Button 
                  onClick={updateUserRole}
                  disabled={newRole === editingUser.role}
                >
                  Update Role
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Role History Modal */}
      {showRoleHistory && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
            <CardHeader>
              <CardTitle>Role History - {formatUserName(selectedUser)}</CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto">
              {roleHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No role changes found</p>
              ) : (
                <div className="space-y-3">
                  {roleHistory.map((assignment) => (
                    <div key={assignment.id} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {assignment.old_role && (
                            <Badge className={getRoleBadgeColor(assignment.old_role as UserRole)}>
                              {assignment.old_role}
                            </Badge>
                          )}
                          <span className="text-gray-400">→</span>
                          <Badge className={getRoleBadgeColor(assignment.new_role as UserRole)}>
                            {assignment.new_role}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(assignment.created_at).toLocaleString()}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>
                          Assigned by: {assignment.assigned_by_user?.email || assignment.assigned_by}
                        </div>
                        {assignment.reason && (
                          <div>Reason: {assignment.reason}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="flex justify-end mt-4">
                <Button onClick={() => setShowRoleHistory(false)}>
                  Close
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}