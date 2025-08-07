# Super Admin Setup Guide for System Administrators

## Overview

This guide covers the secure creation of super admin accounts for system administrators and developers. Three methods are available with different security levels and use cases.

## Prerequisites

- Access to environment variables (`.env.local` or production environment)
- Database access to Supabase
- Understanding of the authentication system (Clerk + Supabase)

## Method 1: Environment Variable (Production Recommended)

**Security Level**: ⭐⭐⭐⭐⭐ (Highest)
**Best for**: Production environments, team-based development

### Setup Steps:

1. **Configure Environment Variables:**
```env
# Add to .env.local or production environment
SUPER_ADMIN_EMAILS=tfortner@banyanlabs.io,thalsell@banyanlabs.io,scallins@banyanlabs.io
```

2. **Restart Application** to load new environment variables

3. **User Authentication Process:**
   - Authorized users sign in through normal Clerk flow
   - System automatically detects authorized email
   - Super admin role is granted on first sign-in
   - Database record is created or updated automatically

4. **Verification:**
```sql
-- Check created super admin accounts
SELECT id, email, role, created_at, status 
FROM users 
WHERE role = 'super_admin'
ORDER BY created_at DESC;
```

### Implementation Files:
- **Logic**: `lib/auth/super-admin-creation.ts`
- **Hook Integration**: `hooks/use-user-role.ts`
- **Auto-creation**: Triggered by `autoCreateSuperAdminIfAuthorized()`

## Method 2: First User Auto-Promotion

**Security Level**: ⭐⭐⭐ (Medium - Setup Only)
**Best for**: Initial development setup, single administrator scenarios

### Setup Steps:

1. **Enable First User Mode:**
```env
# Add to .env.local
ENABLE_FIRST_USER_SUPER_ADMIN=true
```

2. **Verify No Existing Super Admins:**
```sql
-- Should return 0 rows
SELECT COUNT(*) FROM users WHERE role = 'super_admin';
```

3. **First User Sign-Up:**
   - First person to register gets super admin automatically
   - System checks if any super admins exist
   - If none found, promotes first user to super admin

4. **Disable After Setup (Critical):**
```env
# Change to false after first super admin is created
ENABLE_FIRST_USER_SUPER_ADMIN=false
```

### Security Notes:
- ⚠️ **MUST be disabled** after initial setup
- ⚠️ Only use during development or initial deployment
- ⚠️ Could promote wrong user if left enabled

## Method 3: Emergency Secret Key Access

**Security Level**: ⭐⭐ (Emergency Only)
**Best for**: Emergency situations, backup access when other methods fail

### Setup Steps:

1. **Configure Secret Access:**
```env
# Generate a strong, unique secret key
SUPER_ADMIN_SECRET=your_ultra_secure_secret_key_here
ENABLE_SECRET_URL_CREATION=true
```

2. **Access Emergency Interface:**
   - Navigate to `/create-super-admin`
   - Enter target email address
   - Provide secret key for verification
   - System validates secret before proceeding

3. **Complete Process:**
   - User must sign in with Clerk after secret verification
   - Super admin role is applied during sign-in process
   - Database record is created or updated

4. **Disable After Use:**
```env
# Disable emergency access after use
ENABLE_SECRET_URL_CREATION=false
```

### API Endpoint:
- **Location**: `app/api/auth/create-super-admin/route.ts`
- **UI Page**: `app/create-super-admin/page.tsx`
- **Methods**: POST (creation), GET (status check)

## Database Schema Requirements

Ensure your users table supports the super admin role:

```sql
-- Verify role constraint includes super_admin
ALTER TABLE users 
ADD CONSTRAINT users_role_check 
CHECK (role IN ('super_admin', 'owner', 'editor'));

-- Check existing schema
\d users
```

Expected columns:
- `id` (TEXT) - Clerk user ID
- `email` (TEXT) - User email address
- `role` (TEXT) - User role with super_admin option
- `organization_id` (UUID) - Should be NULL for super admins
- `status` (TEXT) - Should be 'accepted' for super admins
- `created_at` (TIMESTAMP)

## Security Considerations

### Production Environment:
- ✅ Use Method 1 (Environment Variable) only
- ✅ Limit authorized emails to essential personnel
- ✅ Use business email addresses only
- ✅ Regular audit of super admin accounts

### Development Environment:
- ✅ Method 1 or Method 2 acceptable
- ✅ Disable Method 2 after initial setup
- ✅ Never commit secrets to version control
- ✅ Use different secrets for dev/staging/prod

### Emergency Situations:
- ⚠️ Method 3 only when absolutely necessary
- ⚠️ Disable immediately after use
- ⚠️ Generate new secret key after each use
- ⚠️ Document emergency access usage

## Troubleshooting

### Common Issues:

1. **Environment Variables Not Loading:**
```bash
# Verify environment variables are loaded
echo $SUPER_ADMIN_EMAILS
# or check in application
console.log(process.env.SUPER_ADMIN_EMAILS);
```

2. **Auto-Creation Not Triggering:**
   - Check browser console for errors
   - Verify user signed in successfully with Clerk
   - Confirm email matches authorized list exactly
   - Check database for existing user records

3. **Database Connection Issues:**
```typescript
// Test Supabase connection
import { supabaseAdmin } from '@/lib/supabase/supabase-server';

const testConnection = async () => {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('count(*)')
    .limit(1);
  
  console.log('Connection test:', { data, error });
};
```

4. **Role Not Applied:**
```sql
-- Check user record after sign-in
SELECT id, email, role, status, organization_id, created_at
FROM users 
WHERE email = 'problematic-email@banyanlabs.io';
```

### Debug Steps:

1. **Check Logs:**
   - Browser console for client-side errors
   - Server logs for API errors
   - Supabase logs for database issues

2. **Verify Configuration:**
   - Environment variables loaded correctly
   - Clerk authentication working
   - Supabase connection established

3. **Manual Verification:**
```sql
-- Manually create super admin if auto-creation fails
INSERT INTO users (id, email, role, organization_id, status, created_at)
VALUES (
  'clerk_user_id_here',
  'admin@banyanlabs.io',
  'super_admin',
  NULL,
  'accepted',
  NOW()
)
ON CONFLICT (id) 
DO UPDATE SET 
  role = 'super_admin',
  organization_id = NULL,
  status = 'accepted';
```

## Audit and Management

### Regular Maintenance:

1. **Review Super Admin Accounts:**
```sql
SELECT 
  id,
  email,
  role,
  created_at,
  last_sign_in_at
FROM users 
WHERE role = 'super_admin'
ORDER BY last_sign_in_at DESC;
```

2. **Remove Inactive Accounts:**
```sql
-- Identify inactive super admins (no sign-in for 90+ days)
SELECT email, last_sign_in_at
FROM users 
WHERE role = 'super_admin'
  AND last_sign_in_at < NOW() - INTERVAL '90 days';
```

3. **Update Environment Variables:**
   - Remove email addresses of former team members
   - Add new authorized team members
   - Restart application after changes

### Documentation Updates:
- Maintain list of current super admins
- Document any emergency access usage
- Update this guide with new procedures or security requirements

## Integration with Authentication System

The super admin creation system integrates with:
- **Clerk**: User authentication and management
- **Supabase**: Database storage and role management  
- **Next.js**: Server-side and client-side components
- **Role Detection**: `lib/auth/role-detection.ts`
- **User Role Hook**: `hooks/use-user-role.ts`
- **Route Protection**: `components/auth/user-role-guard.tsx`

For detailed authentication system documentation, see:
- `docs/developers/authentication-system-guide.md`
- `docs/developers/environment-variables-setup.md`