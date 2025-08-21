<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔍 🔧 <span style="font-size: 2.5rem; font-weight: 800;">Technical Troubleshooting Guide</span></span>

</div>
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📖 <span style="font-size: 1.5rem; opacity: 0.9;">🔍 Administrator & Technical User Guide</span></span>

</div>

</div>

<div style="background: #f8fafc; border-left: 5px solid #667eea; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 <span style="color: #4c1d95; font-size: 1.8rem; font-weight: 700;">📊 Overview</span></span>

</div>

<p style="font-size: 1.1rem; line-height: 1.7; color: #374151;">This comprehensive troubleshooting guide helps administrators and technical users diagnose and resolve issues with the PassItOn platform, covering support system problems, authentication issues, team management, monitoring systems, and general platform functionality.</p>

</div>

<div style="background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 <span style="font-size: 2rem; font-weight: 800;">📝 Table of Contents</span></span>

</div>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;">

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<ul style="list-style: none; padding: 0; margin: 0; font-size: 1.1rem;">
<li style="margin: 0.5rem 0;"><strong>📞 [Support System Issues](#support-system-issues)</strong></li>
<li style="margin: 0.5rem 0;"><strong>🔐 [Authentication Issues](#authentication-issues)</strong></li>
<li style="margin: 0.5rem 0;"><strong>👥 [Team Management Issues](#team-management-issues)</strong></li>
</ul>
</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<ul style="list-style: none; padding: 0; margin: 0; font-size: 1.1rem;">
<li style="margin: 0.5rem 0;"><strong>🚨 [Monitoring and Alert System Issues](#monitoring-and-alert-system-issues)</strong></li>
<li style="margin: 0.5rem 0;"><strong>🏭 [Platform General Issues](#platform-general-issues)</strong></li>
<li style="margin: 0.5rem 0;"><strong>⚡ [Performance Issues](#performance-issues)</strong></li>
</ul>
</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<ul style="list-style: none; padding: 0; margin: 0; font-size: 1.1rem;">
<li style="margin: 0.5rem 0;"><strong>🆘 [Emergency Procedures](#emergency-procedures)</strong></li>
<li style="margin: 0.5rem 0;"><strong>🔒 [Preventive Measures](#preventive-measures)</strong></li>
<li style="margin: 0.5rem 0;"><strong>🆘 [Getting Help](#getting-help)</strong></li>
</ul>
</div>

</div>

</div>

---

<div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">💬 <span style="font-size: 2rem; font-weight: 800;">📞 Support System Issues</span></span>

</div>

</div>

<div style="background: #fef2f2; border: 2px solid #dc2626; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 <span style="color: #dc2626; font-size: 1.8rem; font-weight: 700;">⚠️ Problem: "Failed to get support tickets" Error</span></span>

</div>

<div style="background: #fee2e2; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<h4 style="color: #7f1d1d; margin: 0 0 1rem 0; font-size: 1.3rem;">🔴 Symptoms:</h4>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7;">
<li><strong>💻 Error message in browser console:</strong> <code style="background: #374151; color: #e5e7eb; padding: 0.2rem 0.4rem; border-radius: 4px;">GET /api/support 403 (Forbidden)</code></li>
<li><strong>📊 Support page shows:</strong> "Failed to load support tickets"</li>
<li><strong>🛡️ Admin support management shows:</strong> "Forbidden - Admin access required"</li>
</ul>
</div>

<div style="background: #f0f9ff; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<h4 style="color: #1e40af; margin: 0 0 1rem 0; font-size: 1.3rem;">🔍 Diagnosis Steps:</h4>

<div style="counter-reset: diag-counter; margin: 1rem 0;">

<div style="counter-increment: diag-counter; background: #dbeafe; border-left: 6px solid #2563eb; padding: 1.5rem; margin: 1rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #2563eb; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>

<h5 style="color: #1d4ed8; font-size: 1.2rem; margin-top: 0;">📊 Check User Role in Database:</h5>
<div style="background: #374151; color: #e5e7eb; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.9rem; margin: 0.5rem 0;">
SELECT id, email, role FROM users WHERE email = 'your-admin-email@company.com';
</div>
</div>

<div style="counter-increment: diag-counter; background: #ecfdf5; border-left: 6px solid #10b981; padding: 1.5rem; margin: 1rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #10b981; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>

<h5 style="color: #059669; font-size: 1.2rem; margin-top: 0;">✅ Verify Admin Role Assignment:</h5>
<ul style="color: #374151; font-size: 1rem; line-height: 1.6;">
<li>Role should be <code style="background: #065f46; color: #ecfdf5; padding: 0.2rem 0.4rem; border-radius: 4px;">admin</code> or <code style="background: #065f46; color: #ecfdf5; padding: 0.2rem 0.4rem; border-radius: 4px;">super_admin</code></li>
<li>If role is incorrect, update it:</li>
</ul>
<div style="background: #374151; color: #e5e7eb; padding: 1rem; border-radius: 6px; font-family: monospace; font-size: 0.9rem; margin: 0.5rem 0;">
UPDATE users SET role = 'admin' WHERE id = 'your-user-id';
</div>
</div>

<div style="counter-increment: diag-counter; background: #fef3c7; border-left: 6px solid #f59e0b; padding: 1.5rem; margin: 1rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #f59e0b; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>

<h5 style="color: #d97706; font-size: 1.2rem; margin-top: 0;">🌐 Check Browser Network Tab:</h5>
<ul style="color: #374151; font-size: 1rem; line-height: 1.6;">
<li>Look for 403 Forbidden responses</li>
<li>Verify API endpoints are being called correctly</li>
</ul>
</div>

</div>

</div>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Update User Role**
```sql
-- In Supabase SQL Editor
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@company.com';
```

**Solution 2: Verify Database Connection**
- Check Supabase connection in environment variables
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Test database connectivity

**Solution 3: Clear Authentication Cache**
- Log out and log back in
- Clear browser cookies for the domain
- Try in incognito/private browsing mode

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Problem: Support Tickets Not Creating</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- "Create Ticket" button doesn't work
- Error: "new row violates row-level security policy"
- Network error 500 when submitting ticket

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Check Database Table Exists**:
   ```sql
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' AND table_name = 'support_tickets';
   ```

2. **Verify RLS Settings**:
   ```sql
   SELECT schemaname, tablename, rowsecurity 
   FROM pg_tables 
   WHERE tablename = 'support_tickets';
   ```

3. **Check Browser Console**:
   - Look for JavaScript errors
   - Check network requests for 500 errors

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Create Support Tickets Table**
```sql
-- Run in Supabase SQL Editor
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  user_email TEXT,
  user_name TEXT,
  admin_response TEXT,
  admin_id TEXT,
  customer_response TEXT,
  customer_responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**Solution 2: Disable RLS for Support Tickets**
```sql
-- Disable Row Level Security
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
```

**Solution 3: Add Required Indexes**
```sql
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 Authentication Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔐 Problem: "Module has no exported member 'auth'" Error</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- TypeScript compilation error
- Import errors in API routes
- Authentication not working in API endpoints

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Check Clerk Version**:
   ```bash
   npm list @clerk/nextjs
   ```

2. **Verify Import Statements**:
   ```typescript
   // Check current imports in API files
   import { auth } from '@clerk/nextjs';
   ```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Update Import Paths**
```typescript
// For API routes (server-side)
import { auth } from '@clerk/nextjs/server';

// For React components (client-side)
import { useAuth, useUser } from '@clerk/nextjs';
```

**Solution 2: Update Clerk Package**
```bash
npm update @clerk/nextjs
```

**Solution 3: Fix Auth Usage in Components**
```typescript
// Before (incorrect)
const { userId, user } = useAuth();

// After (correct)
const { userId } = useAuth();
const { user } = useUser();
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 Problem: Stripe API Version Mismatch</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- TypeScript error about Stripe API version
- Billing portal not working
- Payment processing errors

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Update Stripe API Version**
```typescript
// In billing API routes
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16', // Use supported version
});
```

**Solution 2: Check Stripe Package Version**
```bash
npm list stripe
npm update stripe  # If needed
```

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Team Management Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Problem: "Role constraint violation" on Team Invitations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- 500 error when inviting team members
- Database constraint error in logs
- Team invitation form not working

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Check Current Role System**:
   ```sql
   SELECT constraint_name, check_clause 
   FROM information_schema.check_constraints 
   WHERE constraint_name LIKE '%role%';
   ```

2. **Verify Role Values in UI**:
   - Check dropdown options in team invitation form
   - Ensure they match database constraints

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Update UI Role Values**
```typescript
// In team invitation form
<select value={role} onChange={handleRoleChange}>
  <option value="user">User</option>        {/* Not 'editor' */}
  <option value="admin">Admin</option>      {/* Not 'owner' */}
</select>
```

**Solution 2: Update Database Constraints**
```sql
-- Check current constraint
SELECT conname, pg_get_constraintdef(c.oid) 
FROM pg_constraint c 
JOIN pg_class t ON c.conrelid = t.oid 
WHERE t.relname = 'users' AND conname LIKE '%role%';

-- Update if needed to match your role system
```

**Solution 3: Update Default Values**
```typescript
// Set correct default role
const [inviteRole, setInviteRole] = useState("user"); // Not "editor"
```

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Monitoring and Alert System Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Problem: Alerts Not Being Received</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- No alerts are being sent despite system issues
- Alerts are sent but not reaching intended recipients
- Partial alert delivery (some channels work, others don't)

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>

**Check System Status:**
```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check if monitoring service is running</span>

</div>
curl https://your-domain.com/api/monitoring/health
```

**Verify Environment Variables:**
1. Go to your hosting platform (Vercel/Netlify)
2. Check Environment Variables section
3. Verify these keys are set:
   - `SLACK_WEBHOOK_URL`
   - `ALERT_EMAIL_RECIPIENTS` 
   - `TWILIO_ACCOUNT_SID` (for SMS)
   - `PAGERDUTY_INTEGRATION_KEY`

**Test Individual Channels:**
```javascript
// In browser console or API testing tool
await fetch('/api/monitoring/test-alerts', { method: 'POST' });
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Missing Environment Variables:**
1. Add missing variables to your deployment platform
2. Redeploy the application
3. Test alerts again

**Invalid Webhook URLs:**
1. Regenerate Slack webhook URL
2. Update environment variable
3. Test Slack integration

**Email Configuration Issues:**
1. Check SMTP settings
2. Verify email addresses in recipient list
3. Check spam/junk folders

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Problem: Too Many Alerts (Alert Fatigue)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- Constant stream of alerts
- Same alerts repeating frequently
- Team ignoring alerts due to volume

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Adjust Thresholds:**
```typescript
// In lib/monitoring/dashboard-alerts.ts
private thresholds = {
  responseTime: {
    warning: 3000,    // Increased from 2000ms
    critical: 8000,   // Increased from 5000ms
  },
  consecutiveFailures: 5,  // Increased from 3
};
```

**Implement Rate Limiting:**
```typescript
// Add to alert monitor classes
private rateLimiter = new Map<string, number>();

private shouldSendAlert(alertKey: string): boolean {
  const now = Date.now();
  const lastSent = this.rateLimiter.get(alertKey) || 0;
  const cooldown = 10 * 60 * 1000; // 10 minutes
  
  if (now - lastSent < cooldown) {
    return false;
  }
  
  this.rateLimiter.set(alertKey, now);
  return true;
}
```

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Platform General Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Problem: Pages Not Loading or 404 Errors</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- Support page shows 404
- Admin pages not accessible
- Navigation links broken

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Check File Structure**:
   ```bash
   # Verify page files exist
   ls -la app/\(dashboard\)/dashboard/support/
   ls -la app/\(dashboard\)/admin/support/
   ```

2. **Check Navigation Configuration**:
   ```typescript
   // Verify sidebar links
   const navItems = [
     {
       title: "Support",
       href: "/dashboard/support",  // Check path
       icon: MessageCircle,
     }
   ];
   ```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Create Missing Pages**
- Ensure `page.tsx` files exist in correct directories
- Check file naming conventions
- Verify directory structure matches Next.js app router

**Solution 2: Fix Navigation Links**
```typescript
// Ensure navigation links match file structure
{
  title: "Support",
  href: "/dashboard/support",        // Matches: app/(dashboard)/dashboard/support/page.tsx
  icon: MessageCircle,
}
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🗄️ Problem: Database Connection Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- "Failed to connect to database" errors
- Supabase client not working
- API endpoints returning 500 errors

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Check Environment Variables**:
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Test Database Connection**:
   ```sql
   -- In Supabase SQL Editor
   SELECT current_database(), current_user, now();
   ```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Verify Environment Variables**
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 In .env.local</span>

</div>
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Solution 2: Check Supabase Client Configuration**
```typescript
// Verify client setup
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Performance Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Problem: Slow Page Loading</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- Support pages take long to load
- Database queries timing out
- Poor user experience

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Check Database Query Performance**:
   ```sql
   EXPLAIN ANALYZE SELECT * FROM support_tickets 
   WHERE user_id = 'user-id' 
   ORDER BY created_at DESC;
   ```

2. **Monitor Network Requests**:
   - Check browser Network tab
   - Look for slow API calls
   - Identify bottlenecks

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Add Database Indexes**
```sql
-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
```

**Solution 2: Implement Pagination**
```typescript
// Add pagination to large lists
const [tickets, setTickets] = useState([]);
const [loading, setLoading] = useState(false);

const fetchTickets = async (page = 1, limit = 20) => {
  const { data } = await supabase
    .from('support_tickets')
    .select('*')
    .range((page - 1) * limit, page * limit - 1)
    .order('created_at', { ascending: false });
    
  setTickets(data || []);
};
```

**Solution 3: Optimize API Queries**
```typescript
// Use specific field selection
const { data } = await supabase
  .from('support_tickets')
  .select('id, subject, status, created_at') // Only needed fields
  .eq('user_id', userId)
  .limit(50);
```

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Emergency Procedures</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Critical System Down</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Immediate Actions**:</span>

</div>
1. **Check System Status**:
   - Verify application is running
   - Check database connectivity
   - Monitor error logs

2. **Notify Stakeholders**:
   - Alert development team
   - Inform support staff
   - Update status page if available

3. **Gather Information**:
   - Screenshot error messages
   - Copy error logs
   - Document affected features

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Recovery Steps**:</span>

</div>
1. **Database Issues**:
   ```sql
   -- Check database health
   SELECT pg_database_size(current_database());
   SELECT count(*) FROM support_tickets;
   
   -- Check for locks
   SELECT * FROM pg_locks WHERE NOT granted;
   ```

2. **Application Issues**:
   ```bash
   # Restart application
   npm run build
   npm start
   
   # Check logs
   tail -f .next/server.log
   ```

3. **Environment Issues**:
   ```bash
   # Verify environment variables
   env | grep -E "(CLERK|SUPABASE|STRIPE)"
   
   # Test external services
   curl -f https://api.clerk.dev/v1/users
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Alert System Failure</span>

</div>

1. **Immediate Actions:**
   - Switch to manual monitoring
   - Notify team via alternative channels
   - Check system logs for root cause

2. **Recovery Steps:**
   ```bash
   # Restart monitoring service
   pm2 restart monitoring-service
   
   # Check database connectivity
   npm run db:health-check
   
   # Test alert channels
   npm run test:alerts
   ```

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Preventive Measures</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Regular Maintenance Tasks</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Weekly**:</span>

</div>
- [ ] Check error logs for patterns
- [ ] Verify backup systems are working
- [ ] Monitor system performance metrics
- [ ] Review support ticket volume and resolution times
- [ ] Review alert volume and patterns
- [ ] Test all notification channels

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Monthly**:</span>

</div>
- [ ] Update dependencies and security patches
- [ ] Review and optimize database queries
- [ ] Test disaster recovery procedures
- [ ] Analyze support system usage patterns
- [ ] Analyze alert trends and patterns
- [ ] Update notification channel configurations

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Quarterly**:</span>

</div>
- [ ] Full system security audit
- [ ] Performance benchmarking
- [ ] Capacity planning review
- [ ] User access audit
- [ ] Conduct alert system disaster recovery test

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ Monitoring Setup</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Recommended Monitoring**:</span>

</div>
```typescript
// Add to application
console.log('System Health Check:', {
  database: await testDatabaseConnection(),
  support_tickets: await getSupportTicketCount(),
  active_users: await getActiveUserCount(),
  alerts: {
    last24h: await getAlertCount(24),
    critical: await getCriticalAlertCount(24),
    errors: await getFailedAlertCount(24),
  },
  timestamp: new Date().toISOString()
});
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Alert Thresholds**:</span>

</div>
- **Response Time**: > 5 seconds
- **Error Rate**: > 5% of requests
- **Database Connections**: > 80% of pool
- **Support Ticket Volume**: > 50 unresolved tickets

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Widget Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Problem: Widget Close Button Missing After Payment</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Symptoms**:</span>

</div>
- Donors cannot close widget after successful payment processing
- No close button visible after payment completion
- Donors feel trapped in widget interface
- Poor user experience and potential donor loss

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Impact**:</span>

</div>
- Directly impacts donor experience and completion rates
- May cause donors to abandon future donations
- Reflects poorly on organization's professionalism

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Diagnosis Steps**:</span>

</div>
1. **Test Widget Payment Flow**:
   - Complete test donation using Stripe test card: `4242 4242 4242 4242`
   - Verify close button appears after payment success/failure
   - Test ESC key functionality
   - Test click-outside-to-close functionality

2. **Check Widget State Management**:
   ```javascript
   // Look for missing close handlers in widget states
   const widgetStates = ['initial', 'form', 'processing', 'success', 'error'];
   // Verify each state has appropriate close functionality
   ```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Solutions**:</span>

</div>

**Solution 1: Add Close Button to Success/Error States**
```jsx
function PaymentSuccess({ onClose, donationAmount }) {
  return (
    <div className="payment-success">
      <h2>Thank you for your donation!</h2>
      <p>Your ${donationAmount} donation has been processed successfully.</p>
      
      <div className="action-buttons">
        <button 
          onClick={onClose}
          className="btn-primary"
          data-testid="close-widget-btn"
        >
          Close
        </button>
      </div>
    </div>
  );
}
```

**Solution 2: Add Universal Close Button to Widget Header**
```jsx
function WidgetHeader({ onClose, title }) {
  return (
    <div className="widget-header">
      <h3 className="widget-title">{title}</h3>
      <button 
        onClick={onClose}
        className="close-button"
        aria-label="Close donation widget"
      >
        ×
      </button>
    </div>
  );
}
```

**Solution 3: Add Keyboard and Overlay Support**
```jsx
function WidgetModal({ children, onClose, isOpen }) {
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape') onClose();
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      return () => document.removeEventListener('keydown', handleEscKey);
    }
  }, [isOpen, onClose]);
  
  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) onClose();
  };
  
  return (
    <div className="widget-overlay" onClick={handleOverlayClick}>
      <div className="widget-modal">
        <WidgetHeader onClose={onClose} />
        {children}
      </div>
    </div>
  );
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 **Testing Checklist**:</span>

</div>
- [ ] Close button appears after successful payment
- [ ] Close button appears after payment failure  
- [ ] ESC key closes widget
- [ ] Clicking outside widget closes it
- [ ] Close button is keyboard accessible
- [ ] Widget properly resets state when closed
- [ ] Works on mobile devices and all browsers

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 **Priority**: HIGH - Directly impacts donor experience</span>

</div>

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Getting Help</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Internal Resources:</span>

</div>
- **Development Team**: For technical issues and code problems
- **Database Admin**: For Supabase and SQL-related issues
- **DevOps Team**: For deployment and infrastructure problems

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 External Resources:</span>

</div>
- **Clerk Support**: https://clerk.com/support
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Documentation:</span>

</div>
- **Clerk Docs**: https://clerk.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Useful Commands:</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check recent alerts</span>

</div>
curl https://your-domain.com/api/monitoring/alerts?limit=10

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test specific alert type</span>

</div>
curl -X POST https://your-domain.com/api/monitoring/test -d '{"type":"payment"}'

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Get system metrics</span>

</div>
curl https://your-domain.com/api/monitoring/metrics

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Check database health</span>

</div>
curl https://your-domain.com/api/health/database
```

---

<div style="background: #f1f5f9; border: 2px dashed #64748b; padding: 1.5rem; border-radius: 10px; margin: 2rem 0; text-align: center;">

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 <span style="color: #475569; font-size: 1.4rem; font-weight: 700;">📝 Document Information</span></span>

</div>

<p style="margin: 0.5rem 0; font-size: 1rem; color: #64748b;"><strong>📅 Last Updated:</strong> <span style="background: #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px;">Document date removed</span></p>
<p style="margin: 0.5rem 0; font-size: 1rem; color: #64748b;"><strong>🔖 Version:</strong> <span style="background: #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px;">2.0</span></p>
<p style="margin: 0.5rem 0; font-size: 1rem; color: #64748b;"><strong>🔍 Next Review:</strong> <span style="background: #e2e8f0; padding: 0.2rem 0.5rem; border-radius: 4px;">Document date removed</span></p>

</div>

<div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0; text-align: center;">

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 <span style="font-size: 1.8rem; font-weight: 700;">🆘 Emergency Contact Information</span></span>

</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<strong style="font-size: 1.2rem;">⚠️ For urgent issues:</strong><br>
<em style="font-size: 1rem;">Contact development team immediately</em>
</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<strong style="font-size: 1.2rem;">📝 For non-urgent issues:</strong><br>
<em style="font-size: 1rem;">Create internal ticket or email dev team</em>
</div>

</div>

</div>