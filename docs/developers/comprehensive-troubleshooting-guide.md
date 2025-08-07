# Comprehensive Troubleshooting Guide

This guide helps developers and administrators diagnose and resolve all common issues in the PassItOn platform, from development setup to production incidents.

## Table of Contents

1. [Development Environment Issues](#development-environment-issues)
2. [Authentication & Authorization Issues](#authentication--authorization-issues) 
3. [Database Problems](#database-problems)
4. [Support System Issues](#support-system-issues)
5. [Team Management Issues](#team-management-issues)
6. [Payment Processing Problems](#payment-processing-problems)
7. [Widget & Integration Issues](#widget--integration-issues)
8. [Performance Problems](#performance-problems)
9. [Deployment Issues](#deployment-issues)
10. [Production Incidents](#production-incidents)

## Development Environment Issues

### Node.js and npm Problems

**Issue**: `npm install` fails with permission errors
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Issue**: Module not found errors after adding dependencies
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

**Issue**: TypeScript compilation errors
```bash
# Regenerate types from database
npm run db:generate

# Check TypeScript configuration
npx tsc --noEmit
```

### Environment Variables

**Issue**: Environment variables not loading

**Diagnosis**:
1. Check file exists: `.env.local` (not `.env.example`)
2. Verify variable names match exactly (case-sensitive)
3. Restart development server after changes

**Solutions**:
```bash
# Check current environment
cat .env.local | grep CLERK
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# For production, verify deployment platform variables
```

## Authentication & Authorization Issues

### Clerk Authentication Problems

**Issue**: "Unauthorized" errors when accessing API routes

**Diagnosis Steps**:
```bash
# Verify Clerk environment variables
cat .env.local | grep CLERK
```

**Solutions**:
- Ensure all Clerk environment variables are set
- Check that publishable key starts with `pk_`
- Verify secret key starts with `sk_`
- Confirm redirect URLs match in Clerk dashboard

**Issue**: Infinite redirect loops on sign-in

**Solution**:
```bash
# Check redirect URLs in .env.local
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Role-Based Access Issues

**Issue**: Admin section not showing in sidebar

**Diagnosis**:
```sql
-- Check user role in database
SELECT id, email, role, organization_id 
FROM users 
WHERE email = 'your-email@example.com';
```

**Solutions**:
```sql
-- Update user to super_admin if needed
UPDATE users 
SET role = 'super_admin', organization_id = NULL 
WHERE email = 'your-email@example.com';
```

**Issue**: Wrong dashboard showing for user role

**Debug Steps**:
1. Check `components/dashboard/dashboard-header.tsx` logs
2. Verify user role in database matches expected role  
3. Clear browser cache and cookies
4. Check Clerk user metadata

## Database Problems

### Connection Issues

**Issue**: "Failed to connect to database" errors

**Solutions**:
```bash
# Test Supabase connection
curl -H "apikey: YOUR_ANON_KEY" \
  "https://YOUR_PROJECT.supabase.co/rest/v1/organizations"

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
echo $SUPABASE_SERVICE_ROLE_KEY
```

**Issue**: "relation does not exist" errors

**Solutions**:
```bash
# Run database migrations
supabase db push

# Reset database if needed
supabase db reset

# Generate fresh TypeScript types
npm run db:generate
```

### Migration Problems

**Issue**: Migration fails with permission errors

**Solutions**:
```bash
# Check Supabase login status
supabase status

# Re-link project
supabase link --project-ref your-project-ref

# Verify service role key
supabase secrets list
```

## Support System Issues

### Admin Support Access Problems

**Issue**: "Failed to get support tickets" Error

**Symptoms**:
- Error: `GET /api/support 403 (Forbidden)`
- Support page shows "Failed to load support tickets"
- Admin support management shows "Forbidden - Admin access required"

**Diagnosis Steps**:
```sql
-- Check User Role in Database
SELECT id, email, role FROM users WHERE email = 'your-admin-email@company.com';
```

**Solutions**:

**Solution 1: Update User Role**
```sql
-- In Supabase SQL Editor
UPDATE users 
SET role = 'super_admin' 
WHERE email = 'your-email@company.com';
```

**Solution 2: Verify Database Connection**
- Check Supabase connection in environment variables
- Verify `SUPABASE_SERVICE_ROLE_KEY` is correct
- Test database connectivity

**Solution 3: Clear Authentication Cache**
- Log out and log back in
- Clear browser cookies for the domain

### Support Ticket Management Issues

**Issue**: Unable to create or respond to support tickets

**Diagnosis**:
```sql
-- Check support_tickets table exists
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'support_tickets';

-- Verify RLS policies
SELECT * FROM pg_policies WHERE tablename = 'support_tickets';
```

**Solutions**:
```sql
-- Create support_tickets table if missing
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'closed')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  created_by TEXT NOT NULL,
  assigned_to TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## Team Management Issues

### Invitation System Problems

**Issue**: Invitations showing "pending" but emails not sent

**Current Status**: The invitation system creates database records but emails are logged to console in development.

**For Production**: Integrate with email service:
```typescript
// In lib/invitations.ts, replace console.log with:
await sendEmail({
  to: email,
  subject: `Invitation to join ${organizationName}`,
  html: emailContent
});
```

**Issue**: "invitation_token" column errors

**Solution**:
```sql
-- Run this migration manually if needed
ALTER TABLE users ADD COLUMN IF NOT EXISTS invitation_token TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'accepted';
ALTER TABLE users ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP WITH TIME ZONE;
```

### User Role Management

**Issue**: Unable to update user roles

**Diagnosis**:
```sql
-- Check current user permissions
SELECT role FROM users WHERE id = auth.uid();

-- Verify RLS policies allow role updates
SELECT * FROM pg_policies WHERE tablename = 'users' AND cmd = 'UPDATE';
```

**Solutions**:
```sql
-- Update user role (super_admin only)
UPDATE users 
SET role = 'editor'  -- or 'owner', 'super_admin'
WHERE id = 'target-user-id' AND 'super_admin' = (
  SELECT role FROM users WHERE id = auth.uid()
);
```

## Payment Processing Problems

### Stripe Integration Issues

**Issue**: "Invalid API key" errors

**Solutions**:
```bash
# Verify Stripe keys format
echo $STRIPE_SECRET_KEY        # Should start with sk_
echo $NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  # Should start with pk_

# Test Stripe connection
curl https://api.stripe.com/v1/payment_intents \
  -u $STRIPE_SECRET_KEY: \
  -d amount=1000 \
  -d currency=usd
```

**Issue**: Webhooks not being received

**Solutions**:

1. Use ngrok for local testing:
```bash
ngrok http 3000
# Use the https URL for webhook endpoints
```

2. Verify webhook endpoints in Stripe dashboard:
   - `/api/webhooks/stripe`
   - `/api/webhooks/stripe/connect`

### Stripe Connect Issues

**Issue**: Connect account creation fails

**Diagnosis**:
- Check API keys are correct
- Verify webhook endpoints are configured  
- Ensure required business information is provided

**Issue**: Payments not processing

**Solutions**:
- Check account verification status
- Verify payout methods are configured
- Check for any account restrictions

## Widget & Integration Issues

### Widget Customization Problems

**Issue**: Widget changes not saving

**Solutions**:
```bash
# Check API routes are working
curl -X POST http://localhost:3000/api/widgets \
  -H "Content-Type: application/json" \
  -d '{"name":"test","config":{}}'

# Verify database permissions
# Check RLS policies in Supabase dashboard
```

**Issue**: Widget not displaying on external sites

**Diagnosis**:
1. Check CORS settings
2. Verify widget slug is correct
3. Test widget URL directly
4. Check browser console for JavaScript errors

### Platform Integration Issues

**Issue**: WordPress/Shopify integration not working

**Solutions**:
1. Verify integration credentials
2. Check API endpoint accessibility
3. Test webhook delivery
4. Validate SSL certificates

## Performance Problems

### Slow Page Loads

**Solutions**:
```bash
# Analyze bundle size
npm run build
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build

# Check database query performance
# Enable slow query logging in Supabase
```

### Database Performance

**Issue**: Slow database queries

**Diagnosis**:
```sql
-- Check for missing indexes
SELECT schemaname, tablename, attname, n_distinct, correlation
FROM pg_stats
WHERE schemaname = 'public';

-- Monitor slow queries
SELECT query, mean_time, calls
FROM pg_stat_statements
ORDER BY mean_time DESC;
```

## Deployment Issues

### Build Problems

**Issue**: TypeScript errors during build

**Solutions**:
```bash
# Check for type errors
npm run lint
npx tsc --noEmit

# Regenerate types
npm run db:generate

# Clear Next.js cache
rm -rf .next
npm run build
```

**Issue**: Environment variables not loading in production

**Solutions**:
- Ensure variables are set in deployment platform
- Check variable names match exactly (case-sensitive)  
- Verify no trailing spaces in variable values
- For Vercel: Check project settings → Environment Variables

### Docker Deployment Issues

**Issue**: Docker build fails

**Solutions**:
```bash
# Check Docker configuration
docker-compose config

# Build with verbose output
docker-compose build --no-cache --progress=plain

# Check container logs
docker-compose logs app
```

## Production Incidents

### Emergency Procedures

**High Priority Issues**:
1. Payment processing failures
2. Authentication system down
3. Database connection failures
4. Major security incidents

**Response Steps**:
1. **Assess Impact**: How many users affected?
2. **Immediate Mitigation**: Can we quickly restore service?
3. **Communication**: Update status page and notify stakeholders
4. **Root Cause**: Investigate and fix underlying issue
5. **Post-Mortem**: Document lessons learned

### Monitoring and Alerts

**Key Metrics to Monitor**:
- API response times
- Database query performance  
- Authentication success rates
- Payment processing rates
- Error rates by endpoint

**Alert Thresholds**:
- API response time > 5 seconds
- Error rate > 5%
- Database connections > 80% of limit
- Failed authentication > 10%

### Recovery Procedures

**Database Recovery**:
```bash
# Create database backup
supabase db dump --file backup.sql

# Restore from backup
supabase db reset
supabase db push --file backup.sql
```

**Application Recovery**:
```bash
# Rollback to previous deployment
git checkout HEAD~1
npm run build
# Deploy to production

# Monitor application health
curl -f https://your-domain.com/api/health || exit 1
```

## Debug Mode and Logging

### Enable Detailed Logging

Add to `.env.local`:
```env
# Enable detailed logs
NODE_ENV=development
DEBUG=true
NEXT_PUBLIC_DEBUG=true
```

### Log Analysis

**Browser Console Errors**:
1. Check Network tab for failed requests
2. Look for JavaScript errors in Console
3. Verify authentication tokens in Application tab

**Server Logs**:
```bash
# Development
npm run dev  # Check terminal output

# Production
docker-compose logs -f app
# or check hosting platform logs
```

## Getting Help

### Escalation Process

1. **Check This Guide**: Search for similar issues
2. **Check Browser Console**: Look for JavaScript errors  
3. **Check Server Logs**: Review terminal output
4. **Test API Endpoints**: Use curl or Postman
5. **Verify Database State**: Check Supabase dashboard

### Creating Bug Reports

Include these details:
- **Environment**: Development/Production
- **Steps to Reproduce**: Exact sequence  
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Error Messages**: Full error text
- **Screenshots**: If UI-related
- **Browser/Version**: For frontend issues
- **Recent Changes**: What was changed recently

### Emergency Contacts

**Development Team**:
- Lead: Jesse Davis
- Developer: Tabitha Fortner  
- Developer: Tiffany Halsell
- Project Manager: Shannon Callins

**Escalation Priority**:
1. Security incidents → Immediate escalation
2. Payment failures → 1 hour response
3. Authentication issues → 2 hour response
4. General bugs → 24 hour response