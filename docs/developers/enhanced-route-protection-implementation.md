# Enhanced Route Protection Implementation Guide

This guide explains how to implement the enhanced route protection system with intelligent redirects and user-friendly notifications for unauthorized access attempts.

## Overview

The enhanced route protection system provides:
- **Intelligent redirects** from admin routes to equivalent organization routes
- **User-friendly notifications** explaining why access was denied
- **Role-based messaging** showing current vs required permissions  
- **Seamless user experience** with helpful suggestions

## Implementation Steps

### Step 1: Replace Existing AuthGuard

**Current Issue**: Basic AuthGuard only redirects to generic dashboard without explanation.

**Solution**: Replace with EnhancedAuthGuard that provides context-aware redirects and notifications.

```tsx
// BEFORE: In your page components
import { AuthGuard } from "@/components/auth/auth-guard";

// AFTER: Use enhanced version
import { EnhancedAuthGuard } from "@/components/auth/enhanced-auth-guard";

// In admin pages
export default function AdminUsersPage() {
  return (
    <EnhancedAuthGuard requiredRole="super_admin" requiresOrganization={false}>
      <AdminUsersContent />
    </EnhancedAuthGuard>
  );
}
```

### Step 2: Update Middleware (Optional but Recommended)

**Replace current middleware.ts with enhanced version:**

```bash
# Backup current middleware
mv middleware.ts middleware.ts.backup

# Rename enhanced middleware
mv enhanced-middleware.ts middleware.ts
```

### Step 3: Add AccessDeniedHandler to Layout

**Add to your main layout component:**

```tsx
// In app/layout.tsx or app/(dashboard)/layout.tsx
import { AccessDeniedHandler } from "@/components/auth/access-denied-handler";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider>
          <SupabaseProvider>
            <Toaster />
            <AccessDeniedHandler /> {/* Add this line */}
            {children}
          </SupabaseProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
```

### Step 4: Update Admin Route Components

**Replace existing admin route protection:**

```tsx
// BEFORE: app/(dashboard)/admin/organizations/page.tsx
import { AuthGuard } from "@/components/auth/auth-guard";

export default function AdminOrganizationsPage() {
  return (
    <AuthGuard requiredRole="super_admin">
      <AdminOrganizationsContent />
    </AuthGuard>
  );
}

// AFTER: Enhanced with intelligent redirects
import { EnhancedAuthGuard } from "@/components/auth/enhanced-auth-guard";

export default function AdminOrganizationsPage() {
  return (
    <EnhancedAuthGuard requiredRole="super_admin" requiresOrganization={false}>
      <AdminOrganizationsContent />
    </EnhancedAuthGuard>
  );
}
```

### Step 5: Add Role-Based UI Components (Optional)

**Use the useUserPermissions hook for conditional rendering:**

```tsx
import { useUserPermissions } from "@/components/auth/enhanced-auth-guard";

function NavigationSidebar() {
  const { isSuperAdmin, isOwner, hasPermission } = useUserPermissions();

  return (
    <nav>
      {/* Always visible */}
      <NavLink href="/dashboard">Dashboard</NavLink>
      <NavLink href="/dashboard/widget">Widget</NavLink>
      
      {/* Owner and above */}
      {hasPermission("owner") && (
        <>
          <NavLink href="/dashboard/team">Team</NavLink>
          <NavLink href="/dashboard/settings">Settings</NavLink>
        </>
      )}
      
      {/* Super Admin only */}
      {isSuperAdmin && (
        <div className="admin-section">
          <NavLink href="/admin">Admin Dashboard</NavLink>
          <NavLink href="/admin/organizations">All Organizations</NavLink>
          <NavLink href="/admin/users">All Users</NavLink>
        </div>
      )}
    </nav>
  );
}
```

## Route Mapping Configuration

### Current Route Mappings

The system automatically redirects users from admin routes to equivalent organization routes:

```tsx
const ROUTE_MAPPINGS = {
  "/admin/organizations": "/dashboard",                    // All orgs → My org
  "/admin/organizations/[orgId]": "/dashboard/settings",   // Org details → My settings  
  "/admin/roles": "/dashboard/team",                       // All roles → My team
  "/admin/support": "/dashboard/support",                  // Admin support → User support
  "/admin/users": "/dashboard/team",                       // All users → My team
  "/admin/widgets": "/dashboard/widget/customize",         // All widgets → My widget
};
```

### Adding New Route Mappings

**To add new admin routes with intelligent redirects:**

```tsx
// In enhanced-auth-guard.tsx, update ROUTE_MAPPINGS
const ROUTE_MAPPINGS = {
  // Existing mappings...
  
  // Add new mappings
  "/admin/analytics": "/dashboard/analytics",
  "/admin/settings": "/dashboard/settings", 
  "/admin/integrations": "/dashboard/settings/integrations",
};
```

## User Experience Flow

### Scenario: Editor Tries to Access Admin Users

1. **User Action**: Editor types `/admin/users` in browser
2. **Auth Check**: EnhancedAuthGuard detects insufficient permissions
3. **Notification**: Toast appears: "You don't have permission to manage all users. Your current role is Editor."
4. **Intelligent Redirect**: After 1.5 seconds, redirects to `/dashboard/team` 
5. **URL Cleanup**: Removes error parameters from URL
6. **User Result**: User sees their team management page with helpful context

### Scenario: Owner Tries to Access Admin Dashboard

1. **User Action**: Owner navigates to `/admin`
2. **Auth Check**: Detects Owner role < Super Admin requirement
3. **Notification**: "You don't have permission to access admin dashboard. Your current role is Organization Owner."
4. **Redirect**: Redirects to `/dashboard` (their organization dashboard)
5. **Helpful Context**: User understands why and where they ended up

## Customization Options

### Customize Notification Messages

**Update notification text in enhanced-auth-guard.tsx:**

```tsx
const showAccessDeniedNotification = (attemptedAction: string, userRole: string) => {
  const customMessages = {
    "manage all organizations": "Only Super Admins can view all organizations. You can manage your own organization from the dashboard.",
    "manage user roles": "Role management requires Super Admin access. You can invite team members from your team page.",
    // Add more custom messages...
  };

  const customMessage = customMessages[attemptedAction as keyof typeof customMessages];
  
  toast({
    title: "Access Denied",
    description: customMessage || `You don't have permission to ${attemptedAction}.`,
    variant: "destructive"
  });
};
```

### Customize Redirect Delays

**Adjust timing for better UX:**

```tsx
// In enhanced-auth-guard.tsx
setTimeout(() => {
  router.push(redirectPath);
}, 2000); // Increase delay to 2 seconds for slower readers
```

### Add Role-Specific Help Links

**Provide contextual help based on user role:**

```tsx
const getHelpLink = (userRole: string, attemptedAction: string) => {
  if (userRole === "editor" && attemptedAction.includes("manage users")) {
    return "/help/team-management-for-editors";
  }
  if (userRole === "owner" && attemptedAction.includes("admin")) {
    return "/help/admin-features-overview";
  }
  return "/help/permissions-guide";
};
```

## Testing the Implementation

### Test Cases

**1. Editor Accessing Admin Routes**
```bash
# Test as Editor user
curl -H "Authorization: Bearer editor-token" http://localhost:3000/admin/users
# Expected: Redirect to /dashboard/team with notification
```

**2. Owner Accessing Super Admin Features**
```bash  
# Test as Owner user
curl -H "Authorization: Bearer owner-token" http://localhost:3000/admin/organizations
# Expected: Redirect to /dashboard with notification
```

**3. Super Admin Accessing All Routes**
```bash
# Test as Super Admin
curl -H "Authorization: Bearer super-admin-token" http://localhost:3000/admin/users
# Expected: Access granted, page loads normally
```

### Manual Testing Checklist

**Test each role with different routes:**
- [ ] Editor tries to access `/admin/users` → redirects to `/dashboard/team`
- [ ] Editor tries to access `/admin/organizations` → redirects to `/dashboard`  
- [ ] Owner tries to access `/admin/roles` → redirects to `/dashboard/team`
- [ ] Owner tries to access `/admin/support` → redirects to `/dashboard/support`
- [ ] Super Admin accesses any `/admin/*` route → access granted
- [ ] Unauthenticated user tries admin route → redirects to sign-in
- [ ] All redirects show appropriate toast notifications
- [ ] Notifications disappear after appropriate time
- [ ] URL parameters are cleaned up after redirect

### Automated Testing

**Add to your test suite:**

```javascript
// test/auth/enhanced-route-protection.test.js
describe('Enhanced Route Protection', () => {
  test('Editor redirected from admin users to team page', async () => {
    const user = await loginAsEditor();
    await page.goto('/admin/users');
    
    // Should redirect
    await expect(page).toHaveURL('/dashboard/team');
    
    // Should show notification
    await expect(page.locator('[role="alert"]')).toContainText('Access Denied');
  });

  test('Owner redirected with helpful message', async () => {
    const user = await loginAsOwner(); 
    await page.goto('/admin/organizations');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('[role="alert"]')).toContainText('manage all organizations');
  });

  test('Super admin gets access to admin routes', async () => {
    const user = await loginAsSuperAdmin();
    await page.goto('/admin/users');
    
    // Should stay on admin page
    await expect(page).toHaveURL('/admin/users');
    
    // Should not show access denied
    await expect(page.locator('[role="alert"]')).not.toBeVisible();
  });
});
```

## Troubleshooting

### Common Issues

**1. Notifications Not Showing**
- Check that Toaster component is included in layout
- Verify useToast hook is imported correctly
- Check browser console for JavaScript errors

**2. Redirects Not Working**
- Verify Next.js router is being used correctly
- Check that pathname detection is working
- Ensure route mappings are correctly defined

**3. Role Detection Failing**
- Check Supabase connection and user data
- Verify user roles are correctly set in database
- Check authentication token is valid

**4. Infinite Redirect Loops**
- Ensure redirect target routes don't have conflicting guards
- Check that role hierarchy is correctly implemented
- Verify middleware and component guards don't conflict

### Debug Mode

**Enable debug logging:**

```tsx
// In enhanced-auth-guard.tsx, add debugging
useEffect(() => {
  console.log('DEBUG: Auth Guard Check', {
    userId,
    pathname, 
    requiredRole,
    userRole,
    hasOrganization
  });
}, [userId, pathname, requiredRole, userRole, hasOrganization]);
```

## Migration from Old System

### Step-by-Step Migration

**1. Audit Current Routes**
```bash
# Find all current AuthGuard usage
grep -r "AuthGuard" app/ components/
```

**2. Update Imports**
```bash
# Replace imports across codebase
find . -name "*.tsx" -exec sed -i 's/AuthGuard/EnhancedAuthGuard/g' {} \;
find . -name "*.tsx" -exec sed -i 's/auth-guard/enhanced-auth-guard/g' {} \;
```

**3. Add New Components**
- Copy enhanced-auth-guard.tsx to components/auth/
- Copy access-denied-handler.tsx to components/auth/
- Update layout to include AccessDeniedHandler

**4. Test Migration**
- Test each protected route with different user roles
- Verify notifications appear correctly
- Check that redirects work as expected

**5. Clean Up**
```bash
# Remove old auth guard if everything works
rm components/auth/auth-guard.tsx
```

This enhanced system provides a much better user experience with clear messaging about why access was denied and helpful suggestions for what users can do instead.