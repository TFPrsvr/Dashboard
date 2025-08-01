# PassItOn Deployment Guide

## Overview

This guide covers deployment procedures for the PassItOn donation platform across different environments (staging and production). Follow these procedures to ensure reliable, zero-downtime deployments.

## Prerequisites

- Access to production hosting platform (Vercel, Railway, or similar)
- Supabase project for production database
- Stripe production account with webhooks configured
- Domain name and SSL certificate
- CI/CD pipeline configured (GitHub Actions recommended)

## Environment Setup

### Production Environment Variables

```bash
# Application
NEXT_PUBLIC_BASE_URL=https://dashboard.passiton.com
NODE_ENV=production

# Database - Supabase Production
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key

# Authentication - Clerk Production
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_production_key
CLERK_SECRET_KEY=sk_live_your_production_secret
WEBHOOK_SECRET=whsec_your_production_webhook_secret

# Payments - Stripe Production
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key
STRIPE_SECRET_KEY=sk_live_your_stripe_secret
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
STRIPE_PROFESSIONAL_PRICE_ID=price_live_professional
STRIPE_ENTERPRISE_PRICE_ID=price_live_enterprise

# Email - Resend Production
RESEND_API_KEY=re_your_production_key
SUPPORT_EMAIL=support@passiton.com

# Monitoring (Optional)
SENTRY_DSN=your_sentry_dsn
LOGROCKET_APP_ID=your_logrocket_id
```

### Staging Environment

Use separate staging instances for all services:
- Supabase staging project
- Clerk staging application
- Stripe test mode
- Separate domain (staging.passiton.com)

## Database Deployment

### Production Database Setup

```bash
# 1. Create Supabase production project
supabase projects create --name "passiton-production" --region us-east-1

# 2. Link local project to production
supabase link --project-ref your_production_project_id

# 3. Deploy schema and migrations
supabase db push --project-ref your_production_project_id

# 4. Set up RLS policies (already in migrations)
# 5. Create initial admin user
supabase sql --project-ref your_production_project_id --file scripts/create_admin.sql
```

### Migration Deployment Process

```bash
# 1. Test migrations on staging
supabase db push --project-ref staging_project_id

# 2. Verify staging functionality
npm run test:e2e:staging

# 3. Create database backup before production deployment
supabase db dump --project-ref production_project_id --file backup_$(date +%Y%m%d_%H%M%S).sql

# 4. Deploy to production
supabase db push --project-ref production_project_id

# 5. Verify migration success
supabase db diff --project-ref production_project_id
```

## Application Deployment

### Vercel Deployment (Recommended)

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy to staging
vercel --target staging

# 4. Deploy to production
vercel --prod
```

#### Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/widget/([^/]+)",
      "dest": "/widget/$1"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

### Docker Deployment (Alternative)

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_BASE_URL=https://dashboard.passiton.com
      # Add other environment variables
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  deploy-staging:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    environment: staging
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel Staging
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          scope: ${{ secrets.TEAM_ID }}

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    environment: production
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy Database Migrations
        run: |
          supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
          supabase db push --project-ref ${{ secrets.SUPABASE_PROJECT_ID }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
      
      - name: Deploy to Vercel Production
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
          scope: ${{ secrets.TEAM_ID }}
      
      - name: Run Post-Deployment Tests
        run: npm run test:e2e:production
        env:
          BASE_URL: https://dashboard.passiton.com
```

## External Service Configuration

### Stripe Configuration

```bash
# 1. Configure production webhooks
stripe webhooks create \
  --url https://dashboard.passiton.com/api/webhooks/stripe \
  --events payment_intent.succeeded \
  --events customer.subscription.created \
  --events customer.subscription.updated \
  --events customer.subscription.deleted \
  --events checkout.session.completed \
  --events invoice.payment_succeeded

# 2. Create price objects for subscription plans
stripe prices create \
  --currency usd \
  --unit-amount 3900 \
  --recurring[interval]=month \
  --product_data[name]="Professional Plan"

stripe prices create \
  --currency usd \
  --unit-amount 29900 \
  --recurring[interval]=month \
  --product_data[name]="Enterprise Plan"
```

### Clerk Configuration

1. **Create Production Application**:
   - Go to Clerk Dashboard
   - Create new application for production
   - Configure allowed origins: `https://dashboard.passiton.com`
   - Set up social login providers if needed

2. **Configure Webhooks**:
   ```bash
   # Add webhook endpoint in Clerk Dashboard
   Endpoint URL: https://dashboard.passiton.com/api/webhooks/clerk
   Events: user.created, user.updated, user.deleted
   ```

### Resend Configuration

1. **Domain Verification**:
   - Add domain to Resend dashboard
   - Configure DNS records for domain verification
   - Set up DKIM and SPF records

2. **Email Templates** (Optional):
   - Create branded email templates in Resend
   - Update API calls to use template IDs

## Domain and SSL Setup

### DNS Configuration

```
# A Record
dashboard.passiton.com → Your server IP

# CNAME Records (for Vercel)
dashboard.passiton.com → cname.vercel-dns.com

# MX Records (for email)
passiton.com → Your email provider's MX records
```

### SSL Certificate

Most hosting platforms (Vercel, Netlify) handle SSL automatically. For custom deployments:

```bash
# Using Let's Encrypt with Certbot
certbot certonly --nginx -d dashboard.passiton.com
```

## Monitoring and Logging

### Health Checks

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: false,
    stripe: false,
    resend: false,
  };

  try {
    // Database check
    const { error: dbError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    checks.database = !dbError;

    // Stripe check
    const account = await stripe.accounts.retrieve();
    checks.stripe = !!account;

    // Email check
    const domains = await resend.domains.list();
    checks.resend = domains.data.length > 0;

    const allHealthy = Object.values(checks).every(Boolean);

    return Response.json({
      status: allHealthy ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      checks
    }, {
      status: allHealthy ? 200 : 503
    });
  } catch (error) {
    return Response.json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
```

### Error Tracking Setup

```bash
# Install Sentry
npm install @sentry/nextjs

# Configure Sentry
# sentry.client.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});

# sentry.server.config.js
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

## Post-Deployment Checklist

### Immediate Verification

- [ ] Application loads at production URL
- [ ] Database connections working
- [ ] User authentication working
- [ ] Stripe webhooks receiving events
- [ ] Email delivery functioning
- [ ] All environment variables set correctly

### Functional Testing

- [ ] User registration and login
- [ ] Organization creation
- [ ] Widget creation and customization
- [ ] Donation processing (test mode first)
- [ ] Subscription upgrades
- [ ] Support ticket creation
- [ ] Admin dashboard access

### Performance Testing

- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Database query performance
- [ ] CDN and asset optimization

### Security Verification

- [ ] HTTPS enforced
- [ ] API endpoints require authentication
- [ ] Database RLS policies active
- [ ] Webhook signature verification
- [ ] No sensitive data in client-side code

## Rollback Procedures

### Application Rollback

```bash
# Vercel rollback
vercel rollback [deployment-url]

# Docker rollback
docker-compose down
docker-compose up -d --scale app=0
docker-compose up -d previous_image_tag
```

### Database Rollback

```bash
# Create new migration to revert changes
supabase migration new revert_previous_changes

# Apply rollback migration
supabase db push
```

### Emergency Procedures

1. **Take application offline** (maintenance mode)
2. **Restore database** from backup
3. **Deploy previous application** version
4. **Verify functionality** with smoke tests
5. **Remove maintenance mode**
6. **Document incident** and lessons learned

## Maintenance Windows

### Scheduled Maintenance

```yaml
# maintenance.yml - GitHub Action for scheduled deployments
name: Scheduled Maintenance Deployment

on:
  schedule:
    # Run at 2 AM UTC on Sundays
    - cron: '0 2 * * 0'
  workflow_dispatch:

jobs:
  maintenance-deployment:
    runs-on: ubuntu-latest
    steps:
      - name: Enable Maintenance Mode
        run: |
          # Update environment variable or deploy maintenance page
          
      - name: Deploy Updates
        run: |
          # Run database migrations
          # Deploy application updates
          
      - name: Disable Maintenance Mode
        run: |
          # Restore normal operation
```

## Performance Optimization

### Build Optimization

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['stripe'],
  },
  images: {
    domains: ['your-image-domain.com'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

### Database Optimization

```sql
-- Create indexes for performance
CREATE INDEX CONCURRENTLY idx_donations_organization_created 
ON donations(organization_id, created_at);

CREATE INDEX CONCURRENTLY idx_subscriptions_organization_status 
ON subscriptions(organization_id, status);

CREATE INDEX CONCURRENTLY idx_support_tickets_status_priority 
ON support_tickets(status, priority, created_at);

-- Analyze table statistics
ANALYZE donations;
ANALYZE subscriptions;
ANALYZE support_tickets;
```

## Disaster Recovery

### Backup Strategy

```bash
# Daily database backups
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="backup_${DATE}.sql"

# Create backup
supabase db dump --project-ref $SUPABASE_PROJECT_ID --file $BACKUP_FILE

# Upload to cloud storage
aws s3 cp $BACKUP_FILE s3://passiton-backups/database/

# Cleanup local files older than 7 days
find . -name "backup_*.sql" -mtime +7 -delete
```

### Recovery Procedures

```bash
# 1. Create new Supabase project
supabase projects create --name "passiton-recovery"

# 2. Restore from backup
psql -h db.newproject.supabase.co -U postgres -d postgres < backup_file.sql

# 3. Update environment variables
# 4. Deploy application with new database
# 5. Update DNS if necessary
```

---

*This deployment guide should be reviewed and updated with each major release. Always test deployment procedures in staging before applying to production.*