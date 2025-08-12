<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Authentication System Implementation Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📖 Overview</span>

This guide covers the authentication system implementation using Clerk for user management and Supabase for data storage. It includes recent fixes, best practices, and troubleshooting information.

</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🏗 Authentication Architecture</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">⚡ Technology Stack:</span>
- **Clerk**: User authentication and management
- **Supabase**: Database and user data storage  
- **Next.js 13+**: App Router with server/client components
- **TypeScript**: Type safety for auth flows

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🔄 Authentication Flow:</span>
```
User Login → Clerk Authentication → Next.js Middleware → Supabase User Lookup → Role Authorization
```

</div>

</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🗄 User Data Storage</span>

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

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Clerk Integration</span>

</div>

<div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid #06b6d4; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #0891b2;">📌 Environment Variables:</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Required Clerk variables</span>

</div>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">🔐 Client-Side Authentication:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **For React Components**:</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Common Mistakes to Avoid**:</span>

</div>
```typescript
// ❌ WRONG - useAuth() doesn't return user object
const { userId, user } = useAuth();

// ✅ CORRECT - Use separate hooks
const { userId } = useAuth();
const { user } = useUser();
```

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">🔐 Server-Side Authentication:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔌 **For API Routes**:</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Import Path Important**:</span>

</div>
```typescript
// ✅ CORRECT - For API routes
import { auth } from '@clerk/nextjs/server';

// ❌ WRONG - Old import path
import { auth } from '@clerk/nextjs';
```

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 Role-Based Authorization</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Role System:</span>

</div>
The platform uses a three-tier role system:

```typescript
type UserRole = 'super_admin' | 'owner' | 'editor';
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Role Permissions**:</span>

</div>
- **super_admin**: Full platform access, all admin features
- **owner**: Organization management, user management
- **editor**: Basic dashboard access, content editing functionality

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Role Checking Implementation:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ **Database Role Lookup**:</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔌 **API Route Authorization**:</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Client-Side Role Display**:</span>

</div>
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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Team Management System</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Invitation Flow:</span>

</div>
```
Admin Invites User → Email Sent → User Clicks Link → Clerk Registration → Database Record Created
```

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">🗄️ Database Schema for Invitations:</span>

</div>
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

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Super Admin Creation System</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📊 Overview</span>

</div>
The platform provides three secure methods for creating super admin accounts. Choose the method that best fits your security requirements and deployment scenario.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 1: Environment Variable (Recommended)</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 2: First User Super Admin</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 3: Secret Key Emergency Access</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Security Considerations</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔍 Troubleshooting Super Admin Creation</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Role System Updates:</span>

</div>
**Important**: The role system was updated in January 2025:

```sql
-- Current roles (active)
'editor'     -- Basic team member, content editing
'owner'      -- Organization administrator
'super_admin' -- Platform administrator
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 Team Invitation API:</span>

</div>
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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🗄️ Database Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Supabase Configuration:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔒 **Row Level Security (RLS)**:</span>

</div>
For most tables, we use application-level authorization instead of RLS due to Clerk integration complexity.

```sql
-- Disable RLS for tables with complex auth requirements
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Keep RLS for simple cases
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **User Data Synchronization**:</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🗄️ Common Database Queries:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Get User with Organization**:</span>

</div>
```typescript
const { data: userWithOrg } = await supabase
  .from('users')
  .select(`
    *,
    organizations (
      id,
      name,
    )
  `)
  .eq('id', userId)
  .single();
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Get Organization Members**:</span>

</div>
```typescript
const { data: members } = await supabase
  .from('users')
  .select('*')
  .eq('organization_id', organizationId)
  .order('created_at', { ascending: false });
```

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Error Handling</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔐 Common Authentication Errors:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **1. Import Path Errors**:</span>

</div>
```typescript
// Error: Module '"@clerk/nextjs"' has no exported member 'auth'
// Solution: Use correct import path
import { auth } from '@clerk/nextjs/server'; // For API routes
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **2. User Property Not Found**:</span>

</div>
```typescript
// Error: Property 'user' does not exist on type 'UseAuthReturn'
// Solution: Use separate hooks
const { userId } = useAuth();
const { user } = useUser(); // Separate hook for user data
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ **3. Database Column Mismatch**:</span>

</div>
```typescript
// Error: Column 'user_id' doesn't exist
// Solution: Use correct column name
.eq('id', userId) // Correct column name
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Error Response Patterns:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔌 **API Error Responses**:</span>

</div>
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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔒 Security Best Practices</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 API Route Security:</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Client-Side Security:</span>

</div>
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

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing Authentication</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Manual Testing Checklist:</span>

</div>
- [ ] **User registration** creates Supabase record
- [ ] **Role assignment** works correctly
- [ ] **Team invitations** send and process properly
- [ ] **Admin routes** require proper permissions
- [ ] **API authentication** blocks unauthorized access
- [ ] **User data sync** between Clerk and Supabase

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Automated Testing:</span>

</div>
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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting Guide</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Development Issues:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Clerk Webhook Not Working**:</span>

</div>
1. Check webhook URL in Clerk dashboard
2. Verify endpoint signature validation
3. Check network connectivity from Clerk to your app

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ **User Not Found in Database**:</span>

</div>
1. Check if Clerk user sync is working
2. Verify database connection
3. Check for typos in user ID

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Role Permissions Not Working**:</span>

</div>
1. Verify user role in database matches expected value
2. Check role checking logic in API routes
3. Ensure role migration was applied correctly

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Production Issues:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔐 **Authentication Failing**:</span>

</div>
1. Check environment variables are set correctly
2. Verify Clerk domain configuration
3. Check SSL certificate validity

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ **Database Connection Issues**:</span>

</div>
1. Verify Supabase connection string
2. Check API key permissions
3. Monitor connection pool usage

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Debug Logging:</span>

</div>
```typescript
// Add debug logging for auth issues
console.log('Auth Debug:', {
  userId,
  userRole: await getUserRole(userId),
  timestamp: new Date().toISOString(),
  endpoint: request.url
});
```

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📖 Migration Guide</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Updating from Old Role System:</span>

</div>
If you're migrating from the old role system:

```sql
-- Update existing users
UPDATE users SET role = 'user' WHERE role = 'editor';
UPDATE users SET role = 'admin' WHERE role = 'owner';

-- Update UI components to use new role names
-- Update API validation to accept new roles
-- Update database constraints
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Clerk Version Updates:</span>

</div>
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