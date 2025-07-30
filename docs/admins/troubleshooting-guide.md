# Troubleshooting Guide for Administrators

## Overview

This comprehensive troubleshooting guide helps administrators diagnose and resolve common issues with the PassItOn platform, covering support system problems, authentication issues, team management, and general platform functionality.

## Support System Issues

### Problem: "Failed to get support tickets" Error

#### **Symptoms**:
- Error message in browser console: `GET /api/support 403 (Forbidden)`
- Support page shows "Failed to load support tickets"
- Admin support management shows "Forbidden - Admin access required"

#### **Diagnosis Steps**:
1. **Check User Role in Database**:
   ```sql
   SELECT id, email, role FROM users WHERE email = 'your-admin-email@company.com';
   ```
   
2. **Verify Admin Role Assignment**:
   - Role should be `admin` or `super_admin`
   - If role is incorrect, update it:
   ```sql
   UPDATE users SET role = 'admin' WHERE id = 'your-user-id';
   ```

3. **Check Browser Network Tab**:
   - Look for 403 Forbidden responses
   - Verify API endpoints are being called correctly

#### **Solutions**:

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

### Problem: Support Tickets Not Creating

#### **Symptoms**:
- "Create Ticket" button doesn't work
- Error: "new row violates row-level security policy"
- Network error 500 when submitting ticket

#### **Diagnosis Steps**:
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

#### **Solutions**:

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

### Problem: Customer Can't Reply to Admin Responses

#### **Symptoms**:
- Admin response shows but no "Reply" button
- "Reply" button present but doesn't open modal
- Customer response not saving

#### **Diagnosis Steps**:
1. **Check Ticket Status**:
   - Reply button only shows when status is `waiting_response`
   - Admin must respond first to enable customer replies

2. **Verify API Endpoint**:
   ```bash
   # Check if endpoint exists
   curl -X POST http://localhost:3000/api/support/[ticket-id]/respond
   ```

3. **Check Database Schema**:
   ```sql
   SELECT column_name, data_type 
   FROM information_schema.columns 
   WHERE table_name = 'support_tickets' 
   AND column_name IN ('customer_response', 'customer_responded_at');
   ```

#### **Solutions**:

**Solution 1: Update Ticket Status**
```sql
-- Set ticket to waiting_response status after admin responds
UPDATE support_tickets 
SET status = 'waiting_response' 
WHERE id = 'your-ticket-id' AND admin_response IS NOT NULL;
```

**Solution 2: Add Missing Database Columns**
```sql
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_response TEXT;

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_responded_at TIMESTAMP WITH TIME ZONE;
```

**Solution 3: Verify API Endpoint**
- Check that `/api/support/[ticketId]/respond/route.ts` file exists
- Restart the development server
- Verify the API route is properly configured

## Authentication Issues

### Problem: "Module has no exported member 'auth'" Error

#### **Symptoms**:
- TypeScript compilation error
- Import errors in API routes
- Authentication not working in API endpoints

#### **Diagnosis Steps**:
1. **Check Clerk Version**:
   ```bash
   npm list @clerk/nextjs
   ```

2. **Verify Import Statements**:
   ```typescript
   // Check current imports in API files
   import { auth } from '@clerk/nextjs';
   ```

#### **Solutions**:

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

### Problem: Stripe API Version Mismatch

#### **Symptoms**:
- TypeScript error about Stripe API version
- Billing portal not working
- Payment processing errors

#### **Solutions**:

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

## Team Management Issues

### Problem: "Role constraint violation" on Team Invitations

#### **Symptoms**:
- 500 error when inviting team members
- Database constraint error in logs
- Team invitation form not working

#### **Diagnosis Steps**:
1. **Check Current Role System**:
   ```sql
   SELECT constraint_name, check_clause 
   FROM information_schema.check_constraints 
   WHERE constraint_name LIKE '%role%';
   ```

2. **Verify Role Values in UI**:
   - Check dropdown options in team invitation form
   - Ensure they match database constraints

#### **Solutions**:

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

### Problem: Team Members Not Showing in List

#### **Symptoms**:
- Empty team member list
- Database has users but UI doesn't show them
- "No team members yet" message despite existing users

#### **Diagnosis Steps**:
1. **Check Database Data**:
   ```sql
   SELECT id, email, role, organization_id, status 
   FROM users 
   WHERE organization_id = 'your-org-id';
   ```

2. **Verify API Endpoint**:
   ```bash
   # Check team API response
   curl -H "Authorization: Bearer your-token" \
        http://localhost:3000/api/team
   ```

#### **Solutions**:

**Solution 1: Check Organization ID**
- Verify user is in correct organization
- Check organization selection logic
- Ensure proper organization context

**Solution 2: Update Team Query**
```typescript
// Ensure correct query in team page
const { data, error } = await supabase
  .from("users")
  .select("*")
  .eq("organization_id", organization.id)  // Correct field name
  .order("created_at", { ascending: false });
```

## Platform General Issues

### Problem: Pages Not Loading or 404 Errors

#### **Symptoms**:
- Support page shows 404
- Admin pages not accessible
- Navigation links broken

#### **Diagnosis Steps**:
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

#### **Solutions**:

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

### Problem: Database Connection Issues

#### **Symptoms**:
- "Failed to connect to database" errors
- Supabase client not working
- API endpoints returning 500 errors

#### **Diagnosis Steps**:
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

#### **Solutions**:

**Solution 1: Verify Environment Variables**
```bash
# In .env.local
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

## Performance Issues

### Problem: Slow Page Loading

#### **Symptoms**:
- Support pages take long to load
- Database queries timing out
- Poor user experience

#### **Diagnosis Steps**:
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

#### **Solutions**:

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

## Notification Issues

### Problem: External Notifications Not Working

#### **Symptoms**:
- No console alerts for new tickets
- Slack notifications not sending
- Email notifications not configured

#### **Diagnosis Steps**:
1. **Check Console Output**:
   - Look for support ticket alerts in terminal
   - Verify notification endpoint is being called

2. **Verify Environment Variables**:
   ```bash
   echo $SLACK_WEBHOOK_URL
   echo $SUPPORT_EMAIL
   ```

#### **Solutions**:

**Solution 1: Configure Slack Webhook**
```bash
# Add to .env.local
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

**Solution 2: Test Notification Endpoint**
```bash
# Test notification API
curl -X POST http://localhost:3000/api/support/notify \
  -H "Content-Type: application/json" \
  -d '{"ticketId":"test","subject":"Test Ticket","userEmail":"test@example.com"}'
```

**Solution 3: Implement Email Service**
```typescript
// Add email service integration
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'support@yourcompany.com',
  to: [process.env.SUPPORT_EMAIL],
  subject: `New Support Ticket: ${subject}`,
  html: emailTemplate
});
```

## Emergency Procedures

### Critical System Down

#### **Immediate Actions**:
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

#### **Recovery Steps**:
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

### Data Recovery

#### **If Support Tickets Are Lost**:
1. **Check Database Backups**:
   - Supabase automatic backups
   - Manual backup files
   - Point-in-time recovery options

2. **Recovery Process**:
   ```sql
   -- Restore from backup (contact Supabase support)
   -- Or recreate table structure
   CREATE TABLE support_tickets_backup AS 
   SELECT * FROM support_tickets;
   ```

## Preventive Measures

### Regular Maintenance Tasks

#### **Weekly**:
- [ ] Check error logs for patterns
- [ ] Verify backup systems are working
- [ ] Monitor system performance metrics
- [ ] Review support ticket volume and resolution times

#### **Monthly**:
- [ ] Update dependencies and security patches
- [ ] Review and optimize database queries
- [ ] Test disaster recovery procedures
- [ ] Analyze support system usage patterns

#### **Quarterly**:
- [ ] Full system security audit
- [ ] Performance benchmarking
- [ ] Capacity planning review
- [ ] User access audit

### Monitoring Setup

#### **Recommended Monitoring**:
```typescript
// Add to application
console.log('System Health Check:', {
  database: await testDatabaseConnection(),
  support_tickets: await getSupportTicketCount(),
  active_users: await getActiveUserCount(),
  timestamp: new Date().toISOString()
});
```

#### **Alert Thresholds**:
- **Response Time**: > 5 seconds
- **Error Rate**: > 5% of requests
- **Database Connections**: > 80% of pool
- **Support Ticket Volume**: > 50 unresolved tickets

## Getting Help

### Internal Resources:
- **Development Team**: For technical issues and code problems
- **Database Admin**: For Supabase and SQL-related issues
- **DevOps Team**: For deployment and infrastructure problems

### External Resources:
- **Clerk Support**: https://clerk.com/support
- **Supabase Support**: https://supabase.com/support
- **Stripe Support**: https://support.stripe.com

### Documentation:
- **Clerk Docs**: https://clerk.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

**Last Updated**: January 30, 2025  
**Version**: 1.0  
**Next Review**: February 28, 2025

**For urgent issues**: Contact development team immediately  
**For non-urgent issues**: Create internal ticket or email dev team