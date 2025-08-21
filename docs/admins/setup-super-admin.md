<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Super Admin Setup Guide</span>
<span style="font-size: 1.5rem; opacity: 0.9;">🛡️ System Administrator Configuration</span>

</div>

<div style="background: #f8fafc; border-left: 5px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 <span style="color: #1e40af; font-size: 1.8rem; font-weight: 700;">📋 Overview</span></span>

</div>

<p style="font-size: 1.1rem; line-height: 1.7; color: #374151;">This comprehensive guide covers the secure creation of super admin accounts for system administrators and developers. <strong style="color: #dc2626;">Three methods</strong> are available with different security levels and use cases.</p>

</div>

<div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 1.5rem; border-radius: 10px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 <span style="color: #92400e; font-size: 1.6rem; font-weight: 700;">⚠️ Prerequisites</span></span>

</div>

<ul style="font-size: 1.1rem; line-height: 1.8; color: #374151;">
<li><strong style="color: #dc2626;">🔧 Access to environment variables</strong> (<code>.env.local</code> or production environment)</li>
<li><strong style="color: #dc2626;">💾 Database access to Supabase</strong></li>
<li><strong style="color: #dc2626;">🧠 Understanding of the authentication system</strong> (Clerk + Supabase)</li>
</ul>

</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 <span style="font-size: 2rem; font-weight: 800;">🚀 Method 1: Environment Variable</span></span>

</div>
<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 <span style="font-size: 1.3rem; opacity: 0.9;">🏆 Production Recommended</span></span>

</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<p style="margin: 0.5rem 0; font-size: 1.2rem;"><strong>🔒 Security Level:</strong> <span style="font-size: 1.5rem;">⭐⭐⭐⭐⭐</span> <em>(Highest)</em></p>
<p style="margin: 0.5rem 0; font-size: 1.2rem;"><strong>🎯 Best for:</strong> Production environments, team-based development</p>
</div>

</div>

<div style="background: #f0fdf4; border: 2px solid #10b981; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">⚙️ <span style="color: #059669; font-size: 1.8rem; font-weight: 700;">📝 Setup Steps:</span></span>

</div>

<div style="counter-reset: step-counter; margin: 1rem 0;">

<div style="counter-increment: step-counter; background: #e0f2fe; border-left: 6px solid #0284c7; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #0284c7; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>

<h4 style="color: #0369a1; font-size: 1.4rem; margin-top: 0;">🔧 Configure Environment Variables:</h4>

```env
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Add to .env.local or production environment</span>

</div>
SUPER_ADMIN_EMAILS=tfortner@banyanlabs.io,thalsell@banyanlabs.io,scallins@banyanlabs.io
```

</div>

<div style="counter-increment: step-counter; background: #fef7cd; border-left: 6px solid #f59e0b; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #f59e0b; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>

<h4 style="color: #92400e; font-size: 1.4rem; margin-top: 0;">🔄 Restart Application</h4>
<p style="color: #374151; font-size: 1.1rem;">Load new environment variables</p>

</div>

<div style="counter-increment: step-counter; background: #f3e8ff; border-left: 6px solid #8b5cf6; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #8b5cf6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>

<h4 style="color: #7c3aed; font-size: 1.4rem; margin-top: 0;">🔐 User Authentication Process:</h4>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7;">
<li><strong>✅ Authorized users</strong> sign in through normal Clerk flow</li>
<li><strong>🔍 System automatically detects</strong> authorized email</li>
<li><strong>⚡ Super admin role</strong> is granted on first sign-in</li>
<li><strong>💾 Database record</strong> is created or updated automatically</li>
</ul>

</div>

<div style="counter-increment: step-counter; background: #ecfdf5; border-left: 6px solid #10b981; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #10b981; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>

<h4 style="color: #059669; font-size: 1.4rem; margin-top: 0;">✅ Verification:</h4>

```sql
-- Check created super admin accounts
SELECT id, email, role, created_at, status 
FROM users 
WHERE role = 'super_admin'
ORDER BY created_at DESC;
```

</div>

</div>

<div style="background: #f1f5f9; border: 2px dashed #64748b; padding: 1.5rem; border-radius: 10px; margin: 1.5rem 0;">

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 <span style="color: #475569; font-size: 1.4rem; font-weight: 700;">📁 Implementation Files:</span></span>

</div>

<ul style="font-size: 1.1rem; line-height: 1.8; color: #374151;">
<li><strong style="color: #dc2626;">🧠 Logic:</strong> <code style="background: #e5e7eb; padding: 0.3rem 0.6rem; border-radius: 4px;">lib/auth/super-admin-creation.ts</code></li>
<li><strong style="color: #dc2626;">🎣 Hook Integration:</strong> <code style="background: #e5e7eb; padding: 0.3rem 0.6rem; border-radius: 4px;">hooks/use-user-role.ts</code></li>
<li><strong style="color: #dc2626;">⚡ Auto-creation:</strong> Triggered by <code style="background: #e5e7eb; padding: 0.3rem 0.6rem; border-radius: 4px;">autoCreateSuperAdminIfAuthorized()</code></li>
</ul>

</div>

</div>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 <span style="font-size: 2rem; font-weight: 800;">🚀 Method 2: First User Auto-Promotion</span></span>

</div>
<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ <span style="font-size: 1.3rem; opacity: 0.9;">⚡ Development Setup</span></span>

</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<p style="margin: 0.5rem 0; font-size: 1.2rem;"><strong>🔒 Security Level:</strong> <span style="font-size: 1.5rem;">⭐⭐⭐</span> <em>(Medium - Setup Only)</em></p>
<p style="margin: 0.5rem 0; font-size: 1.2rem;"><strong>🎯 Best for:</strong> Initial development setup, single administrator scenarios</p>
</div>

</div>

<div style="background: #fef7cd; border: 2px solid #f59e0b; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ <span style="color: #92400e; font-size: 1.8rem; font-weight: 700;">📝 Setup Steps:</span></span>

</div>

<div style="counter-reset: step-counter; margin: 1rem 0;">

<div style="counter-increment: step-counter; background: #ecfdf5; border-left: 6px solid #10b981; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #10b981; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>

<h4 style="color: #059669; font-size: 1.4rem; margin-top: 0;">🔘 Enable First User Mode:</h4>

```env
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Add to .env.local</span>

</div>
ENABLE_FIRST_USER_SUPER_ADMIN=true
```

</div>

<div style="counter-increment: step-counter; background: #e0f2fe; border-left: 6px solid #0284c7; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #0284c7; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>

<h4 style="color: #0369a1; font-size: 1.4rem; margin-top: 0;">🔍 Verify No Existing Super Admins:</h4>

```sql
-- Should return 0 rows
SELECT COUNT(*) FROM users WHERE role = 'super_admin';
```

</div>

<div style="counter-increment: step-counter; background: #f3e8ff; border-left: 6px solid #8b5cf6; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #8b5cf6; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>

<h4 style="color: #7c3aed; font-size: 1.4rem; margin-top: 0;">👤 First User Sign-Up:</h4>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7;">
<li><strong>🥇 First person to register</strong> gets super admin automatically</li>
<li><strong>🔍 System checks</strong> if any super admins exist</li>
<li><strong>⬆️ If none found,</strong> promotes first user to super admin</li>
</ul>

</div>

<div style="counter-increment: step-counter; background: #fee2e2; border-left: 6px solid #dc2626; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #dc2626; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">4</div>

<h4 style="color: #dc2626; font-size: 1.4rem; margin-top: 0;">🚨 Disable After Setup (Critical):</h4>

```env
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Change to false after first super admin is created</span>

</div>
ENABLE_FIRST_USER_SUPER_ADMIN=false
```

</div>

</div>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Security Notes:</span>

</div>
- ⚠️ **MUST be disabled** after initial setup
- ⚠️ Only use during development or initial deployment
- ⚠️ Could promote wrong user if left enabled

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 3: Emergency Secret Key Access</span>

</div>

**Security Level**: ⭐⭐ (Emergency Only)
**Best for**: Emergency situations, backup access when other methods fail

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ Setup Steps:</span>

</div>

1. **Configure Secret Access:**
```env
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Generate a strong, unique secret key</span>

</div>
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
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Disable emergency access after use</span>

</div>
ENABLE_SECRET_URL_CREATION=false
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 API Endpoint:</span>

</div>
- **Location**: `app/api/auth/create-super-admin/route.ts`
- **UI Page**: `app/create-super-admin/page.tsx`
- **Methods**: POST (creation), GET (status check)

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🗄️ Database Schema Requirements</span>

</div>

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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔒 Security Considerations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Production Environment:</span>

</div>
- ✅ Use Method 1 (Environment Variable) only
- ✅ Limit authorized emails to essential personnel
- ✅ Use business email addresses only
- ✅ Regular audit of super admin accounts

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Development Environment:</span>

</div>
- ✅ Method 1 or Method 2 acceptable
- ✅ Disable Method 2 after initial setup
- ✅ Never commit secrets to version control
- ✅ Use different secrets for dev/staging/prod

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Emergency Situations:</span>

</div>
- ⚠️ Method 3 only when absolutely necessary
- ⚠️ Disable immediately after use
- ⚠️ Generate new secret key after each use
- ⚠️ Document emergency access usage

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Issues:</span>

</div>

1. **Environment Variables Not Loading:**
```bash
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Verify environment variables are loaded</span>

</div>
echo $SUPER_ADMIN_EMAILS
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 or check in application</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Debug Steps:</span>

</div>

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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Audit and Management</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Regular Maintenance:</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Documentation Updates:</span>

</div>
- Maintain list of current super admins
- Document any emergency access usage
- Update this guide with new procedures or security requirements

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 Integration with Authentication System</span>

</div>

The super admin creation system integrates with:
- **Clerk**: User authentication and management
- **Supabase**: Database storage and role management  
- **Next.js**: Server-side and client-side components
- **Role Detection**: `lib/auth/role-detection.ts`
- **User Role Hook**: `hooks/use-user-role.ts`
- **Route Protection**: `components/auth/user-role-guard.tsx`

For detailed authentication system documentation, see:
- `docs/future-developers/authentication-system-guide.md`
- `docs/future-developers/environment-variables-setup.md`