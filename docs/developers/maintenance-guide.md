# PassItOn Platform Maintenance Guide

## Overview

This guide provides comprehensive instructions for maintaining, updating, and troubleshooting the PassItOn donation platform. It's designed for developers who need to understand the system architecture and perform routine maintenance tasks.

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Development Environment Setup](#development-environment-setup)
3. [Database Management](#database-management)
4. [API Endpoints](#api-endpoints)
5. [Subscription Management](#subscription-management)
6. [Support System](#support-system)
7. [Common Maintenance Tasks](#common-maintenance-tasks)
8. [Troubleshooting](#troubleshooting)
9. [Deployment Procedures](#deployment-procedures)
10. [Monitoring and Alerts](#monitoring-and-alerts)

## System Architecture

### Core Components

- **Frontend**: Next.js 14 with React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes with serverless functions
- **Database**: Supabase (PostgreSQL) with Row Level Security (RLS)
- **Authentication**: Clerk for user management
- **Payments**: Stripe for subscriptions and donations
- **Email**: Resend for transactional emails
- **File Storage**: Supabase Storage for assets

### Key Directories

```
app/
├── (dashboard)/           # Dashboard pages with shared layout
├── api/                   # API routes and webhooks
├── globals.css           # Global styles
└── layout.tsx            # Root layout

components/
├── dashboard/            # Dashboard-specific components
├── ui/                   # Reusable UI components
└── widget/               # Donation widget components

docs/                     # All documentation
├── business-users/       # Non-technical user guides
├── developers/           # Technical documentation
├── admins/              # System administrator guides
└── legal/               # Legal policies and agreements

hooks/                    # Custom React hooks
lib/                      # Utility functions and configurations
supabase/
├── migrations/          # Database schema changes
└── seed/               # Test data and initial setup
types/                   # TypeScript type definitions
```

## Development Environment Setup

### Prerequisites

- Node.js 18+ and npm/yarn
- Git for version control
- Supabase CLI for database management
- Stripe CLI for webhook testing

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
WEBHOOK_SECRET=your_clerk_webhook_secret

# Stripe
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
STRIPE_PROFESSIONAL_PRICE_ID=price_professional_monthly
STRIPE_ENTERPRISE_PRICE_ID=price_enterprise_monthly

# Email
RESEND_API_KEY=your_resend_api_key
SUPPORT_EMAIL=support@yourdomain.com

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Local Development

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:push

# Generate TypeScript types from database
npm run db:generate

# Start development server
npm run dev

# Run tests
npm test

# Run end-to-end tests
npm run test:e2e
```

## Database Management

### Running Migrations

```bash
# Apply pending migrations
supabase db push

# Reset database to clean state
supabase db reset

# Generate new migration
supabase migration new migration_name
```

### Important Tables

#### organizations
- Core organization data
- Subscription status tracking
- Stripe integration fields

#### subscriptions
- Billing and plan management
- Stripe subscription IDs
- Plan limits and features

#### support_tickets
- Customer support system
- Ticket status and priorities
- Admin response tracking

#### users
- User profiles and roles
- Clerk integration
- Organization memberships

#### widgets
- Donation widget configurations
- Customization settings
- Performance tracking

#### donations
- Transaction records
- Stripe payment intent IDs
- Donor information

### Database Backup

```bash
# Create backup
supabase db dump --file backup_$(date +%Y%m%d).sql

# Restore from backup
supabase db reset
psql -h localhost -p 54322 -U postgres -d postgres < backup_file.sql
```

## API Endpoints

### Authentication
- `GET /api/users/me` - Get current user profile
- `POST /api/webhooks/clerk` - Handle Clerk user events

### Organizations
- `GET /api/organizations` - List user organizations
- `POST /api/organizations` - Create new organization
- `GET /api/organizations/[orgId]` - Get organization details
- `PUT /api/organizations/[orgId]` - Update organization

### Subscriptions
- `GET /api/subscription/[orgId]` - Get subscription status
- `POST /api/subscription/upgrade` - Create checkout session
- `POST /api/subscription/cancel` - Cancel subscription
- `GET /api/billing/portal` - Access billing portal

### Support
- `POST /api/support/notify` - Send support notifications
- Support tickets managed through Supabase RLS

### Webhooks
- `POST /api/webhooks/stripe` - Handle Stripe events
- `POST /api/webhooks/clerk` - Handle Clerk events

## Subscription Management

### Plan Tiers

**Free Plan**:
- 1 donation widget
- Up to 50 donations/month
- Basic customization
- Email support

**Professional Plan ($39/month)**:
- 5 donation widgets
- Up to 1,000 donations/month
- Advanced customization
- Priority support
- Remove branding

**Enterprise Plan ($299+/month)**:
- Unlimited widgets
- Unlimited donations
- White-label solution
- Dedicated support
- Custom integrations

### Plan Limit Enforcement

Use the `usePlanLimits` hook to enforce restrictions:

```typescript
const { 
  canCreateWidget, 
  canAcceptDonation, 
  canInviteTeamMember,
  limits,
  usage 
} = usePlanLimits(organizationId);

// Check before allowing actions
if (!canCreateWidget()) {
  showUpgradeModal();
  return;
}
```

### Subscription Lifecycle

1. **Upgrade Flow**:
   - User clicks upgrade button
   - Stripe Checkout session created
   - User completes payment
   - Webhook updates database
   - Features unlocked immediately

2. **Cancellation Flow**:
   - User requests cancellation
   - Subscription marked as `cancel_at_period_end`
   - Service continues until period ends
   - Database updated to free plan

3. **Failed Payments**:
   - Stripe retries failed payments
   - After retry period, subscription becomes `past_due`
   - Features may be limited
   - User notified to update payment method

## Support System

### Ticket Workflow

1. **Creation**: User submits ticket through dashboard
2. **Notification**: Emails sent to support team and user
3. **Assignment**: Admin reviews and updates status
4. **Response**: Admin provides response via dashboard
5. **Resolution**: Ticket marked as resolved
6. **Follow-up**: User can reopen if needed

### Email Templates

Email templates are defined in `/app/api/support/notify/route.ts`:
- New ticket notification (to support team)
- Ticket confirmation (to user)
- Response notification (to user)

### Support Categories

- `general` - General questions
- `technical` - Technical issues
- `billing` - Billing questions
- `bug_report` - Bug reports
- `feature_request` - Feature requests

### Priority Levels

- `low` - Non-urgent issues
- `medium` - Standard priority (default)
- `high` - Important issues
- `urgent` - Critical issues requiring immediate attention

## Common Maintenance Tasks

### User Management

```bash
# Create super admin user
supabase sql --file scripts/create_super_admin.sql

# Update user role
UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';

# List all users with roles
SELECT u.email, u.role, u.created_at 
FROM users u 
ORDER BY u.created_at DESC;
```

### Organization Management

```bash
# List organizations with subscription status
SELECT o.name, s.plan, s.status, s.current_period_end
FROM organizations o
LEFT JOIN subscriptions s ON o.id = s.organization_id
ORDER BY o.created_at DESC;

# Update organization subscription manually
UPDATE subscriptions 
SET plan = 'professional', status = 'active'
WHERE organization_id = 'org_uuid';
```

### Support Ticket Management

```bash
# List open tickets by priority
SELECT st.subject, st.priority, st.created_at, st.user_name
FROM support_tickets st
WHERE st.status = 'open'
ORDER BY 
  CASE st.priority 
    WHEN 'urgent' THEN 1 
    WHEN 'high' THEN 2 
    WHEN 'medium' THEN 3 
    WHEN 'low' THEN 4 
  END,
  st.created_at ASC;
```

### Performance Monitoring

```bash
# Check donation volume by month
SELECT 
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as donation_count,
  SUM(amount) as total_amount
FROM donations
WHERE status = 'succeeded'
GROUP BY month
ORDER BY month DESC;

# Monitor widget performance
SELECT 
  w.name,
  COUNT(d.id) as donation_count,
  AVG(d.amount) as avg_donation
FROM widgets w
LEFT JOIN donations d ON w.id = d.widget_id
WHERE d.created_at >= NOW() - INTERVAL '30 days'
GROUP BY w.id, w.name
ORDER BY donation_count DESC;
```

## Troubleshooting

### Common Issues

#### Database Connection Errors
```bash
# Check Supabase status
supabase status

# Restart local instance
supabase stop
supabase start
```

#### Stripe Webhook Issues
```bash
# Test webhook endpoint
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check webhook logs in Stripe Dashboard
# Verify webhook secret matches environment variable
```

#### Authentication Problems
```bash
# Check Clerk webhook configuration
# Verify JWT verification in middleware
# Check user role assignments in database
```

#### Email Delivery Issues
```bash
# Test Resend API key
curl -X POST 'https://api.resend.com/emails' \
  -H 'Authorization: Bearer YOUR_API_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"from": "test@yourdomain.com", "to": "test@example.com", "subject": "Test", "text": "Test"}'
```

### Debugging Steps

1. **Check Environment Variables**: Ensure all required variables are set
2. **Review Logs**: Check browser console and server logs
3. **Database State**: Query relevant tables for data consistency
4. **External Services**: Verify Stripe, Clerk, and Resend configurations
5. **Network Issues**: Test API endpoints with curl or Postman

### Error Monitoring

Implement error tracking with services like:
- Sentry for error monitoring
- LogRocket for session replay
- DataDog for infrastructure monitoring

## Deployment Procedures

### Pre-deployment Checklist

- [ ] Run all tests (`npm test`, `npm run test:e2e`)
- [ ] Update database migrations if needed
- [ ] Verify environment variables in production
- [ ] Check Stripe webhook endpoints
- [ ] Test email delivery
- [ ] Backup production database

### Deployment Steps

```bash
# 1. Deploy to staging
git push staging main

# 2. Run migrations on staging
supabase db push --project-ref staging_project_id

# 3. Test critical workflows
npm run test:e2e:staging

# 4. Deploy to production
git push production main

# 5. Run migrations on production
supabase db push --project-ref production_project_id

# 6. Monitor for errors
# Check error tracking dashboard
# Verify webhook deliveries
# Monitor performance metrics
```

### Rollback Procedures

```bash
# 1. Revert to previous git commit
git revert HEAD
git push production main

# 2. Rollback database if needed
supabase db reset --project-ref production_project_id
psql -h production_host -d postgres < backup_file.sql

# 3. Clear CDN cache if applicable
# 4. Notify users of temporary issues
```

## Monitoring and Alerts

### Key Metrics to Monitor

- **Application Performance**: Response times, error rates
- **Database Performance**: Query performance, connection pool
- **Payment Processing**: Success rates, failed transactions
- **Support System**: Response times, ticket volume
- **User Activity**: Sign-ups, retention, feature usage

### Recommended Alerts

- High error rate (>1%)
- Database connection failures
- Failed payment webhooks
- Support ticket backlog (>10 open)
- Disk space usage (>80%)
- Memory usage (>90%)

### Health Check Endpoints

Create health check endpoints for monitoring:

```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    const { error } = await supabase.from('users').select('id').limit(1);
    if (error) throw error;

    // Check external services
    // ... add service checks

    return Response.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'ok',
        stripe: 'ok',
        resend: 'ok'
      }
    });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 500 }
    );
  }
}
```

## Security Considerations

### Regular Security Tasks

- Update dependencies monthly
- Review and rotate API keys quarterly
- Audit user permissions regularly
- Monitor for suspicious activity
- Keep security policies up to date

### Security Best Practices

- Use Row Level Security (RLS) for all database tables
- Validate all user inputs
- Sanitize data before database operations
- Use HTTPS in production
- Implement rate limiting on API endpoints
- Regular security audits

## Support and Resources

### Documentation Links
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Clerk Documentation](https://clerk.com/docs)

### Internal Resources
- Technical documentation: `/docs/developers/`
- API documentation: `/docs/developers/api-reference.md`
- Deployment guides: `/docs/developers/deployment-guide.md`

### Getting Help
- Technical issues: Create ticket in support system
- Emergency issues: Contact on-call engineer
- Architecture questions: Schedule team review

---

*This maintenance guide should be updated regularly as the system evolves. Last updated: January 29, 2025*