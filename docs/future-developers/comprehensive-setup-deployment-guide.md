# Comprehensive Setup & Deployment Guide

## Overview

This comprehensive guide covers everything needed to set up, configure, and deploy the PassItOn Admin Dashboard, from local development to production deployment using Docker, Vercel, or other platforms.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd PassItOn-Admin

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Set up environment variables (see Environment Configuration section)
# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the application.

---

## Prerequisites

### Required Software
- **Node.js** (v18.17.0 or higher)
- **npm** (v9.6.7 or higher)
- **Git** (latest version)
- **Docker** (optional, for containerized deployment)

### Required Services
- **Supabase** account (database & authentication)
- **Clerk** account (authentication management)
- **Stripe** account (payment processing)

---

## Environment Configuration

### Complete Environment Variables

Copy this configuration to your `.env.local` file:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

# Supabase Database
SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Super Admin Creation Options (Choose ONE method)
# Method 1: Environment variable with authorized emails (most secure)
SUPER_ADMIN_EMAILS=your-email@company.com

# Method 2: First user becomes super admin (if no super admins exist)
ENABLE_FIRST_USER_SUPER_ADMIN=false

# Method 3: Secret key for emergency super admin creation
SUPER_ADMIN_SECRET=your_super_secret_key_here
ENABLE_SECRET_URL_CREATION=false

# Email Service (Optional)
# RESEND_API_KEY=re_your_api_key_here

# Monitoring & Alerts (Production)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
ALERT_EMAIL_RECIPIENTS=alerts@yourcompany.com
```

### Service Configuration

#### 1. Clerk Setup
1. Visit [clerk.com](https://clerk.com) and create account
2. Create new application named "PassItOn Admin"
3. Copy publishable key and secret key
4. Configure redirect URLs in Clerk dashboard

#### 2. Supabase Setup
1. Visit [supabase.com](https://supabase.com) and create account
2. Create new project
3. Copy project URL and API keys
4. Set up database schema (see Database Setup section)

#### 3. Stripe Setup
1. Visit [stripe.com](https://stripe.com) and create account
2. Get test/live API keys
3. Set up webhook endpoints
4. Configure products and pricing

---

## Database Setup

### Required Tables

Run these SQL commands in your Supabase SQL editor:

```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'super_admin')),
  organization_id UUID,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE IF NOT EXISTS organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  website TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Support tickets table
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

-- Donations table
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  stripe_payment_intent_id TEXT UNIQUE,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  donor_email TEXT,
  donor_name TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Indexes for Performance

```sql
-- Add performance indexes
CREATE INDEX IF NOT EXISTS idx_users_clerk_user_id ON users(clerk_user_id);
CREATE INDEX IF NOT EXISTS idx_users_organization_id ON users(organization_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_organization_id ON donations(organization_id);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
```

### Row Level Security (Production)

```sql
-- Enable RLS on sensitive tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;

-- Create policies (customize based on your needs)
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (clerk_user_id = auth.jwt() ->> 'sub');

CREATE POLICY "Admins can view all data" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users u 
      WHERE u.clerk_user_id = auth.jwt() ->> 'sub' 
      AND u.role IN ('admin', 'super_admin')
    )
  );
```

---

## Local Development

### Development Server

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Run in development mode with debugging
npm run dev:debug
```

### Development Tools

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Database migrations (if using Prisma)
npm run db:migrate

# Reset database (development only)
npm run db:reset
```

---

## Docker Deployment

### Multi-Stage Docker Architecture

The project uses a single `Dockerfile` with multiple build targets:

1. **Development Target**: Local development with hot reload
2. **Basic Target**: Simple production deployment
3. **Production Target**: Optimized production deployment

### Docker Compose Configuration

```yaml
# docker-compose.yml (Development)
version: '3.8'
services:
  app:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    env_file:
      - .env.local

# docker-compose.prod.yml (Production)
version: '3.8'
services:
  app:
    build:
      context: .
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    env_file:
      - .env.production
```

### Docker Commands

```bash
# Development
docker-compose up -d

# Production build
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Build specific target
docker build --target production -t passiton-admin:prod .

# Run production container
docker run -p 3000:3000 --env-file .env.production passiton-admin:prod
```

### Docker Environment Files

Create `.env.production` for production deployment:

```env
# Production Environment Variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Use production keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_live_key
CLERK_SECRET_KEY=sk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key

# Production database
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

---

## Production Deployment

### Platform-Specific Deployment

#### Vercel Deployment

1. **Automatic Deployment**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   
   # Production deployment
   vercel --prod
   ```

2. **Environment Variables**:
   - Go to Vercel dashboard
   - Add all environment variables
   - Ensure production keys are used

3. **Vercel Configuration** (`vercel.json`):
   ```json
   {
     "framework": "nextjs",
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "functions": {
       "app/api/**": {
         "maxDuration": 30
       }
     }
   }
   ```

#### Netlify Deployment

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = ".next"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

#### Railway Deployment

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Production Checklist

#### Pre-Deployment
- [ ] Update all environment variables to production values
- [ ] Configure production database with RLS
- [ ] Set up production Stripe webhooks
- [ ] Configure domain and SSL certificates
- [ ] Set up monitoring and error tracking
- [ ] Test all critical user flows
- [ ] Run security audit
- [ ] Performance optimization review

#### Post-Deployment
- [ ] Verify all API endpoints work
- [ ] Test payment processing end-to-end
- [ ] Confirm authentication flows
- [ ] Check email notifications
- [ ] Verify monitoring and alerts
- [ ] Test error handling
- [ ] Perform load testing
- [ ] Update documentation

### Production Environment Variables

```env
# Production-specific variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-production-domain.com

# Monitoring and Error Tracking
SENTRY_DSN=https://your-sentry-dsn
DATADOG_API_KEY=your-datadog-key
NEW_RELIC_LICENSE_KEY=your-newrelic-key

# Email Service
RESEND_API_KEY=re_your_production_api_key
SUPPORT_EMAIL=support@yourcompany.com

# Alerts and Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/PRODUCTION/WEBHOOK
ALERT_EMAIL_RECIPIENTS=alerts@yourcompany.com,team@yourcompany.com

# Security
NEXTAUTH_SECRET=your-super-secret-nextauth-secret
ENCRYPTION_KEY=your-encryption-key-for-sensitive-data
```

### Performance Optimization

#### Next.js Configuration

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  // Image optimization
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Bundle analyzer (development only)
  ...(process.env.ANALYZE === 'true' && {
    experimental: {
      bundlePagesExternals: true,
    },
  }),
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
```

#### Database Optimization

```sql
-- Connection pooling configuration
-- Set in Supabase dashboard or environment
DB_POOL_MIN=2
DB_POOL_MAX=10

-- Query optimization
EXPLAIN ANALYZE SELECT * FROM donations 
WHERE organization_id = 'uuid' 
ORDER BY created_at DESC 
LIMIT 50;
```

---

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node modules and reinstall
rm -rf node_modules
npm install

# Type checking
npm run type-check
```

#### Environment Variable Issues
```bash
# Check if variables are loaded
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Verify .env.local exists and has correct format
cat .env.local | head -5
```

#### Database Connection Issues
```sql
-- Test database connection
SELECT current_database(), current_user, now();

-- Check table existence
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

#### Docker Issues
```bash
# Check Docker logs
docker-compose logs app

# Rebuild without cache
docker-compose build --no-cache

# Remove all containers and rebuild
docker-compose down
docker system prune -a
docker-compose up --build
```

### Performance Issues

#### Slow Database Queries
1. Add appropriate indexes
2. Use connection pooling
3. Implement query pagination
4. Monitor query performance

#### High Memory Usage
1. Optimize React components
2. Implement proper cleanup in useEffect
3. Use React.memo for expensive components
4. Monitor memory leaks

#### Slow Page Loading
1. Implement code splitting
2. Optimize images
3. Use CDN for static assets
4. Enable compression

### Support Resources

- **Development Team**: Internal support for technical issues
- **Clerk Documentation**: https://clerk.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **Stripe Documentation**: https://stripe.com/docs

---

**Last Updated**: January 30, 2025  
**Version**: 1.0  
**Next Review**: February 28, 2025

**For technical issues**: Contact development team  
**For deployment questions**: Check deployment platform documentation