# Technical Troubleshooting Guide

## Overview

This comprehensive troubleshooting guide helps administrators and technical users diagnose and resolve issues with the PassItOn platform, covering support system problems, authentication issues, team management, monitoring systems, and general platform functionality.

## Table of Contents

- [Support System Issues](#support-system-issues)
- [Authentication Issues](#authentication-issues)
- [Team Management Issues](#team-management-issues)
- [Monitoring and Alert System Issues](#monitoring-and-alert-system-issues)
- [Platform General Issues](#platform-general-issues)
- [Performance Issues](#performance-issues)
- [Emergency Procedures](#emergency-procedures)
- [Preventive Measures](#preventive-measures)
- [Getting Help](#getting-help)

---

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

---

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

---

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

---

## Monitoring and Alert System Issues

### Problem: Alerts Not Being Received

#### **Symptoms**:
- No alerts are being sent despite system issues
- Alerts are sent but not reaching intended recipients
- Partial alert delivery (some channels work, others don't)

#### **Diagnosis Steps**:

**Check System Status:**
```bash
# Check if monitoring service is running
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

#### **Solutions**:

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

### Problem: Too Many Alerts (Alert Fatigue)

#### **Symptoms**:
- Constant stream of alerts
- Same alerts repeating frequently
- Team ignoring alerts due to volume

#### **Solutions**:

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

---

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

---

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

### Alert System Failure

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

## Preventive Measures

### Regular Maintenance Tasks

#### **Weekly**:
- [ ] Check error logs for patterns
- [ ] Verify backup systems are working
- [ ] Monitor system performance metrics
- [ ] Review support ticket volume and resolution times
- [ ] Review alert volume and patterns
- [ ] Test all notification channels

#### **Monthly**:
- [ ] Update dependencies and security patches
- [ ] Review and optimize database queries
- [ ] Test disaster recovery procedures
- [ ] Analyze support system usage patterns
- [ ] Analyze alert trends and patterns
- [ ] Update notification channel configurations

#### **Quarterly**:
- [ ] Full system security audit
- [ ] Performance benchmarking
- [ ] Capacity planning review
- [ ] User access audit
- [ ] Conduct alert system disaster recovery test

### Monitoring Setup

#### **Recommended Monitoring**:
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

#### **Alert Thresholds**:
- **Response Time**: > 5 seconds
- **Error Rate**: > 5% of requests
- **Database Connections**: > 80% of pool
- **Support Ticket Volume**: > 50 unresolved tickets

---

## Widget Issues

### Problem: Widget Close Button Missing After Payment

#### **Symptoms**:
- Donors cannot close widget after successful payment processing
- No close button visible after payment completion
- Donors feel trapped in widget interface
- Poor user experience and potential donor loss

#### **Impact**:
- Directly impacts donor experience and completion rates
- May cause donors to abandon future donations
- Reflects poorly on organization's professionalism

#### **Diagnosis Steps**:
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

#### **Solutions**:

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

#### **Testing Checklist**:
- [ ] Close button appears after successful payment
- [ ] Close button appears after payment failure  
- [ ] ESC key closes widget
- [ ] Clicking outside widget closes it
- [ ] Close button is keyboard accessible
- [ ] Widget properly resets state when closed
- [ ] Works on mobile devices and all browsers

#### **Priority**: HIGH - Directly impacts donor experience

---

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

### Useful Commands:
```bash
# Check recent alerts
curl https://your-domain.com/api/monitoring/alerts?limit=10

# Test specific alert type
curl -X POST https://your-domain.com/api/monitoring/test -d '{"type":"payment"}'

# Get system metrics
curl https://your-domain.com/api/monitoring/metrics

# Check database health
curl https://your-domain.com/api/health/database
```

---

**Last Updated**: January 30, 2025  
**Version**: 2.0  
**Next Review**: February 28, 2025

**For urgent issues**: Contact development team immediately  
**For non-urgent issues**: Create internal ticket or email dev team