# Authentication System Implementation Guide

## Overview

This guide covers the authentication system implementation using Clerk for user management and Supabase for data storage. It includes recent fixes, best practices, and troubleshooting information.

## Authentication Architecture

### Technology Stack:
- **Clerk**: User authentication and management
- **Supabase**: Database and user data storage  
- **Next.js 13+**: App Router with server/client components
- **TypeScript**: Type safety for auth flows

### Authentication Flow:
```
User Login → Clerk Authentication → Next.js Middleware → Supabase User Lookup → Role Authorization
```

### User Data Storage:
```sql
-- users table structure
CREATE TABLE users (
  id TEXT PRIMARY KEY,              -- Clerk user ID
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super_admin', 'owner', 'editor')),
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted')),
  first_name TEXT,
  last_name TEXT,
  invitation_token TEXT
);
```

## Clerk Integration

### Environment Variables:
```bash
# Required Clerk variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Client-Side Authentication:

#### **For React Components**:
```typescript
// Use separate hooks for different data
import { useAuth, useUser } from '@clerk/nextjs';

export default function MyComponent() {
  const { userId, isSignedIn } = useAuth();
  const { user } = useUser();

  // Access user profile data
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const userName = user?.fullName || user?.firstName;
}
```

#### **Common Mistakes to Avoid**:
```typescript
// ❌ WRONG - useAuth() doesn't return user object
const { userId, user } = useAuth();

// ✅ CORRECT - Use separate hooks
const { userId } = useAuth();
const { user } = useUser();
```

### Server-Side Authentication:

#### **For API Routes**:
```typescript
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  // Continue with authenticated logic
}
```

#### **Import Path Important**:
```typescript
// ✅ CORRECT - For API routes
import { auth } from '@clerk/nextjs/server';

// ❌ WRONG - Old import path
import { auth } from '@clerk/nextjs';
```

## Role-Based Authorization

### Role System:
The platform uses a three-tier role system:

```typescript
type UserRole = 'super_admin' | 'owner' | 'editor';
```

#### **Role Permissions**:
- **super_admin**: Full platform access, all admin features
- **owner**: Organization management, user management
- **editor**: Basic dashboard access, content editing functionality

### Role Checking Implementation:

#### **Database Role Lookup**:
```typescript
async function getUserRole(userId: string): Promise<UserRole | null> {
  const { data: user, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)  // Note: 'id', not 'user_id'
    .single();

  if (error || !user) {
    return null;
  }

  return user.role as UserRole;
}
```

#### **API Route Authorization**:
```typescript
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check admin role for admin endpoints
  const userRole = await getUserRole(userId);
  if (!userRole || !['admin', 'super_admin'].includes(userRole)) {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
  }

  // Continue with admin logic
}
```

#### **Client-Side Role Display**:
```typescript
// components/dashboard/sidebar.tsx
export function Sidebar() {
  const { userId } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      if (!userId) return;
      
      const { data } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (data) {
        setRole(data.role as UserRole);
      }
    }

    fetchUserRole();
  }, [userId]);

  return (
    <nav>
      {/* Regular navigation items */}
      
      {/* Admin-only navigation */}
      {role && ['admin', 'super_admin'].includes(role) && (
        <AdminNavigation />
      )}
    </nav>
  );
}
```

## Team Management System

### Invitation Flow:
```
Admin Invites User → Email Sent → User Clicks Link → Clerk Registration → Database Record Created
```

### Database Schema for Invitations:
```sql
-- Invitation tracking in users table
INSERT INTO users (
  id,                    -- Temporary ID: 'invited_[uuid]'
  email,                 -- Invitation email
  role,                  -- Assigned role: 'user' or 'admin'
  organization_id,       -- Organization they're joining
  status,                -- 'pending' until they accept
  invited_at,            -- Invitation timestamp
  invitation_token       -- Security token for verification
);
```

## Super Admin Creation System

### Overview
The platform provides three secure methods for creating super admin accounts. Choose the method that best fits your security requirements and deployment scenario.

### Method 1: Environment Variable (Recommended)

**Best for**: Production environments, team-based development

**Setup:**
1. Add authorized emails to your environment variables:
```env
SUPER_ADMIN_EMAILS=tfortner@banyanlabs.io,thalsell@banyanlabs.io,scallins@banyanlabs.io
```

2. The system automatically creates super admin accounts when authorized users sign in:
```typescript
// lib/auth/super-admin-creation.ts
export async function autoCreateSuperAdminIfAuthorized(): Promise<SuperAdminCreationResult | null> {
  const user = await currentUser();
  const email = user.emailAddresses[0].emailAddress;
  
  if (isAuthorizedForSuperAdmin(email)) {
    return await createSuperAdminAccount(user.id, email);
  }
  
  return null;
}
```

**Implementation Steps:**
1. Update `.env.local` with `SUPER_ADMIN_EMAILS`
2. Restart your development server
3. Have authorized team members sign in - they'll automatically become super admins
4. Verify in Supabase that their role is set to `super_admin`

### Method 2: First User Super Admin

**Best for**: Initial setup, single-admin scenarios

**Setup:**
1. Enable in environment variables:
```env
ENABLE_FIRST_USER_SUPER_ADMIN=true
```

2. The system checks if any super admins exist and promotes the first user:
```typescript
// Auto-promotes first user if no super admins exist
if (ENABLE_FIRST_USER_SUPER_ADMIN) {
  const superAdminExists = await checkSuperAdminExists();
  if (!superAdminExists) {
    return await createSuperAdminAccount(user.id, email);
  }
}
```

**Implementation Steps:**
1. Set `ENABLE_FIRST_USER_SUPER_ADMIN=true` in `.env.local`
2. Ensure no super admins exist in your database
3. Sign up/sign in as the first user - you'll become super admin
4. Disable this setting after initial setup for security

### Method 3: Secret Key Emergency Access

**Best for**: Emergency situations, backup access

**Setup:**
1. Configure secret key and enable the feature:
```env
SUPER_ADMIN_SECRET=your_ultra_secure_secret_key_here
ENABLE_SECRET_URL_CREATION=true
```

2. Access the emergency creation page at `/create-super-admin`

**Implementation Steps:**
1. Set both environment variables in `.env.local`
2. Navigate to `http://localhost:3000/create-super-admin`
3. Enter the target email and secret key
4. Sign in with the target email to complete super admin creation
5. Disable this feature after use for security

### Security Considerations

**Environment Variable Method (Most Secure):**
- ✅ No user interface exposure
- ✅ Controlled by environment configuration
- ✅ Easy to audit and manage
- ✅ Works automatically on sign-in

**First User Method (Moderate Security):**
- ⚠️ Should be disabled after initial setup
- ⚠️ Could accidentally promote wrong user
- ✅ Good for initial development setup
- ✅ No secrets to manage

**Secret Key Method (Emergency Only):**
- ⚠️ Exposes UI endpoint (can be disabled)
- ⚠️ Requires secure secret management
- ✅ Works when other methods fail
- ✅ Provides audit trail

### Troubleshooting Super Admin Creation

**Common Issues:**

1. **"Email not authorized" error:**
   - Check `SUPER_ADMIN_EMAILS` spelling and format
   - Ensure no extra spaces around email addresses
   - Verify environment variables are loaded (restart dev server)

2. **Auto-creation not working:**
   - Verify the user signed in with Clerk successfully
   - Check browser console for errors
   - Confirm environment variables are set correctly

3. **Secret key method failing:**
   - Ensure both `SUPER_ADMIN_SECRET` and `ENABLE_SECRET_URL_CREATION=true`
   - Check the secret key matches exactly (case-sensitive)
   - Verify the user signed in before accessing the page

**Database Verification:**
```sql
-- Check super admin users
SELECT id, email, role, created_at 
FROM users 
WHERE role = 'super_admin';

-- Check user role after sign-in
SELECT id, email, role, status, organization_id 
FROM users 
WHERE email = 'your-email@banyanlabs.io';
```

### Role System Updates:
**Important**: The role system was updated in January 2025:

```sql
-- Current roles (active)
'editor'     -- Basic team member, content editing
'owner'      -- Organization administrator
'super_admin' -- Platform administrator
```

### Team Invitation API:
```typescript
// app/api/team/invite/route.ts
export async function POST(request: NextRequest) {
  const { email, role, organizationId } = await request.json();

  // Validate role against current system
  if (!['user', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  // Create pending user record
  const tempId = `invited_${crypto.randomUUID()}`;
  const invitationToken = createInvitationToken();

  await supabaseAdmin.from('users').insert({
    id: tempId,
    email,
    role,
    organization_id: organizationId,
    status: 'pending',
    invited_at: new Date().toISOString(),
    invitation_token: invitationToken
  });

  // Send invitation email
  await sendInvitationEmail({ email, role, invitationToken });
}
```

## Database Integration

### Supabase Configuration:

#### **Row Level Security (RLS)**:
For most tables, we use application-level authorization instead of RLS due to Clerk integration complexity.

```sql
-- Disable RLS for tables with complex auth requirements
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Keep RLS for simple cases
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
```

#### **User Data Synchronization**:
```typescript
// Sync Clerk user data to Supabase
async function syncUserToSupabase(clerkUser: User) {
  const { error } = await supabase
    .from('users')
    .upsert({
      id: clerkUser.id,
      email: clerkUser.primaryEmailAddress?.emailAddress,
      first_name: clerkUser.firstName,
      last_name: clerkUser.lastName,
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error('Failed to sync user to Supabase:', error);
  }
}
```

### Common Database Queries:

#### **Get User with Organization**:
```typescript
const { data: userWithOrg } = await supabase
  .from('users')
  .select(`
    *,
    organizations (
      id,
      name,
      subscription_status
    )
  `)
  .eq('id', userId)
  .single();
```

#### **Get Organization Members**:
```typescript
const { data: members } = await supabase
  .from('users')
  .select('*')
  .eq('organization_id', organizationId)
  .order('created_at', { ascending: false });
```

## Error Handling

### Common Authentication Errors:

#### **1. Import Path Errors**:
```typescript
// Error: Module '"@clerk/nextjs"' has no exported member 'auth'
// Solution: Use correct import path
import { auth } from '@clerk/nextjs/server'; // For API routes
```

#### **2. User Property Not Found**:
```typescript
// Error: Property 'user' does not exist on type 'UseAuthReturn'
// Solution: Use separate hooks
const { userId } = useAuth();
const { user } = useUser(); // Separate hook for user data
```

#### **3. Database Column Mismatch**:
```typescript
// Error: Column 'user_id' doesn't exist
// Solution: Use correct column name
.eq('id', userId) // Correct column name
```

### Error Response Patterns:

#### **API Error Responses**:
```typescript
// Unauthorized (no auth token)
return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

// Forbidden (valid user, wrong permissions)
return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });

// Not Found (resource doesn't exist)
return NextResponse.json({ error: 'User not found' }, { status: 404 });

// Server Error (database/system error)
return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
```

## Security Best Practices

### API Route Security:
```typescript
export async function POST(request: NextRequest) {
  try {
    // 1. Always verify authentication first
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate request data
    const body = await request.json();
    if (!body.email || !isValidEmail(body.email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 3. Check authorization for protected resources
    if (isAdminEndpoint) {
      const hasPermission = await checkAdminPermission(userId);
      if (!hasPermission) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }
    }

    // 4. Sanitize data before database operations
    const sanitizedData = sanitizeInput(body);

    // 5. Use parameterized queries
    const { data, error } = await supabase
      .from('table')
      .select('*')
      .eq('user_id', userId); // User can only access their own data

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

### Client-Side Security:
```typescript
// Never expose sensitive operations to client
// ❌ WRONG
const deleteUser = async (userId: string) => {
  await supabase.from('users').delete().eq('id', userId);
};

// ✅ CORRECT - Use API route
const deleteUser = async (userId: string) => {
  const response = await fetch('/api/admin/users/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId })
  });
};
```

## Testing Authentication

### Manual Testing Checklist:
- [ ] **User registration** creates Supabase record
- [ ] **Role assignment** works correctly
- [ ] **Team invitations** send and process properly
- [ ] **Admin routes** require proper permissions
- [ ] **API authentication** blocks unauthorized access
- [ ] **User data sync** between Clerk and Supabase

### Automated Testing:
```typescript
// Example API route test
describe('POST /api/team/invite', () => {
  it('requires authentication', async () => {
    const response = await request(app)
      .post('/api/team/invite')
      .send({ email: 'test@example.com', role: 'user' })
      .expect(401);

    expect(response.body.error).toBe('Unauthorized');
  });

  it('validates role values', async () => {
    const response = await authenticatedRequest
      .post('/api/team/invite')
      .send({ email: 'test@example.com', role: 'invalid_role' })
      .expect(400);

    expect(response.body.error).toContain('Invalid role');
  });
});
```

## Troubleshooting Guide

### Development Issues:

#### **Clerk Webhook Not Working**:
1. Check webhook URL in Clerk dashboard
2. Verify endpoint signature validation
3. Check network connectivity from Clerk to your app

#### **User Not Found in Database**:
1. Check if Clerk user sync is working
2. Verify database connection
3. Check for typos in user ID

#### **Role Permissions Not Working**:
1. Verify user role in database matches expected value
2. Check role checking logic in API routes
3. Ensure role migration was applied correctly

### Production Issues:

#### **Authentication Failing**:
1. Check environment variables are set correctly
2. Verify Clerk domain configuration
3. Check SSL certificate validity

#### **Database Connection Issues**:
1. Verify Supabase connection string
2. Check API key permissions
3. Monitor connection pool usage

### Debug Logging:
```typescript
// Add debug logging for auth issues
console.log('Auth Debug:', {
  userId,
  userRole: await getUserRole(userId),
  timestamp: new Date().toISOString(),
  endpoint: request.url
});
```

## Migration Guide

### Updating from Old Role System:
If you're migrating from the old role system:

```sql
-- Update existing users
UPDATE users SET role = 'user' WHERE role = 'editor';
UPDATE users SET role = 'admin' WHERE role = 'owner';

-- Update UI components to use new role names
-- Update API validation to accept new roles
-- Update database constraints
```

### Clerk Version Updates:
When updating Clerk versions:

1. **Check breaking changes** in Clerk documentation
2. **Update import paths** if necessary
3. **Test authentication flows** thoroughly
4. **Update TypeScript types** if changed

---

**Author**: Development Team  
**Date**: January 30, 2025  
**Last Updated**: January 30, 2025  
**Next Review**: March 30, 2025