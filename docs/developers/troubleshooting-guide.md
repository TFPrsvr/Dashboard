# PassItOn Troubleshooting Guide

## Overview

This guide helps developers diagnose and resolve common issues in the PassItOn platform. It covers everything from development environment problems to production incidents.

## Table of Contents

1. [Development Environment Issues](#development-environment-issues)
2. [Database Problems](#database-problems)
3. [Authentication Issues](#authentication-issues)
4. [Payment Processing Problems](#payment-processing-problems)
5. [Email Delivery Issues](#email-delivery-issues)
6. [Performance Problems](#performance-problems)
7. [Deployment Issues](#deployment-issues)
8. [Production Incidents](#production-incidents)
9. [Monitoring and Diagnostics](#monitoring-and-diagnostics)

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
```bash
# Check file naming
ls -la .env* 
# Should see .env.local (not .env)

# Verify variable names match exactly
grep -n "NEXT_PUBLIC" .env.local

# Restart development server after changes
npm run dev
```

**Issue**: Client-side environment variables undefined
```typescript
// Check if variable has NEXT_PUBLIC_ prefix
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL); // ✅ Works
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY); // ❌ Undefined on client

// Use runtime config for server-side only variables
const { serverRuntimeConfig } = getConfig();
```

### Next.js Development Issues

**Issue**: Hot reload not working
```bash
# Check file system watchers limit (Linux)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Try different development command
npm run dev -- --turbo
```

**Issue**: Build fails with memory errors
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## Database Problems

### Connection Issues

**Issue**: Cannot connect to Supabase
```bash
# Check if Supabase is running locally
supabase status

# Start Supabase if stopped
supabase start

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Issue**: RLS policy errors
```sql
-- Check current policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE schemaname = 'public';

-- Test policy with specific user
SELECT auth.uid(); -- Should return user ID when authenticated

-- Debug policy logic
SELECT * FROM organizations WHERE id = 'test_org_id';
-- If empty, policy might be too restrictive
```

### Migration Problems

**Issue**: Migration fails with foreign key errors
```bash
# Check dependency order in migrations
ls -la supabase/migrations/

# Rollback and reapply
supabase db reset
supabase db push
```

**Issue**: Column already exists error
```sql
-- Make migrations idempotent
ALTER TABLE organizations 
ADD COLUMN IF NOT EXISTS new_column TEXT;

-- Check if column exists first
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' 
        AND column_name = 'new_column'
    ) THEN
        ALTER TABLE organizations ADD COLUMN new_column TEXT;
    END IF;
END $$;
```

### Data Integrity Issues

**Issue**: Orphaned records
```sql
-- Find organizations without subscriptions
SELECT o.id, o.name 
FROM organizations o 
LEFT JOIN subscriptions s ON o.id = s.organization_id 
WHERE s.id IS NULL;

-- Create missing subscription records
INSERT INTO subscriptions (organization_id, plan, status)
SELECT o.id, 'free', 'active'
FROM organizations o 
LEFT JOIN subscriptions s ON o.id = s.organization_id 
WHERE s.id IS NULL;
```

**Issue**: User role inconsistencies
```sql
-- Check users without organizations
SELECT u.id, u.email 
FROM users u 
LEFT JOIN user_organizations uo ON u.id = uo.user_id 
WHERE uo.user_id IS NULL;

-- Fix user roles
UPDATE users SET role = 'user' WHERE role IS NULL;
```

## Authentication Issues

### Clerk Integration Problems

**Issue**: User not authenticated after login
```typescript
// Check Clerk configuration
console.log({
  publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  frontendApi: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API
});

// Verify middleware configuration
// middleware.ts
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/widget/(.*)", "/api/webhooks/(.*)"],
  ignoredRoutes: ["/api/health"]
});
```

**Issue**: JWT verification fails
```typescript
// Check JWT in API routes
import { auth } from "@clerk/nextjs";

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  // Continue with authenticated logic
}
```

**Issue**: Webhook signature verification fails
```typescript
// Verify webhook secret configuration
import { Webhook } from "svix";

const webhook = new Webhook(process.env.WEBHOOK_SECRET);

try {
  const payload = webhook.verify(body, headers);
} catch (err) {
  console.error("Webhook verification failed:", err);
  return Response.json({ error: "Invalid signature" }, { status: 400 });
}
```

### Session Management

**Issue**: User logged out unexpectedly
```typescript
// Check session configuration in Clerk Dashboard
// Verify session timeout settings
// Check for Cross-Site Request Forgery protection

// Debug session in component
import { useAuth } from "@clerk/nextjs";

function DebugAuth() {
  const { userId, sessionId, isLoaded } = useAuth();
  
  useEffect(() => {
    console.log({ userId, sessionId, isLoaded });
  }, [userId, sessionId, isLoaded]);
}
```

## Payment Processing Problems

### Stripe Integration Issues

**Issue**: Webhook events not received
```bash
# Test webhook endpoint locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Check webhook configuration in Stripe Dashboard
# Verify webhook URL is correct: https://yourdomain.com/api/webhooks/stripe
# Ensure all required events are selected

# Test webhook signature verification
curl -X POST localhost:3000/api/webhooks/stripe \
  -H "stripe-signature: test_signature" \
  -d '{"test": "data"}'
```

**Issue**: Payment processing fails
```typescript
// Check Stripe configuration
console.log({
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY?.substring(0, 8) + "...",
  secretKey: process.env.STRIPE_SECRET_KEY?.substring(0, 8) + "...",
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 8) + "..."
});

// Verify API version compatibility
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20', // Use consistent version
});
```

**Issue**: Subscription status not updating
```sql
-- Check subscription records
SELECT s.*, o.name 
FROM subscriptions s 
JOIN organizations o ON s.organization_id = o.id 
WHERE s.stripe_subscription_id = 'sub_xxx';

-- Verify webhook processing
SELECT * FROM webhook_logs 
WHERE event_type = 'customer.subscription.updated' 
ORDER BY created_at DESC;
```

### Plan Limits Not Enforced

**Issue**: Users exceed plan limits
```typescript
// Debug plan limits hook
const { limits, usage, currentPlan } = usePlanLimits(organizationId);

console.log({
  currentPlan,
  limits,
  usage,
  canCreateWidget: limits.widgets === -1 || usage.widgets < limits.widgets
});

// Check subscription status
const { data: subscription } = await supabase
  .from('subscriptions')
  .select('*')
  .eq('organization_id', organizationId)
  .single();

console.log('Subscription:', subscription);
```

## Email Delivery Issues

### Resend Configuration

**Issue**: Emails not being sent
```typescript
// Test Resend API key
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

try {
  const result = await resend.emails.send({
    from: 'test@yourdomain.com',
    to: 'test@example.com',
    subject: 'Test Email',
    text: 'This is a test email'
  });
  console.log('Email sent:', result);
} catch (error) {
  console.error('Email failed:', error);
}
```

**Issue**: Emails going to spam
```bash
# Check domain DNS configuration
dig TXT yourdomain.com | grep -i spf
dig TXT _dmarc.yourdomain.com
dig TXT selector._domainkey.yourdomain.com

# Verify domain in Resend Dashboard
# Set up proper SPF, DKIM, and DMARC records
```

**Issue**: Template rendering errors
```typescript
// Debug email template
const emailHtml = `
  <div>
    <h1>Hello ${userName}</h1>
    <p>Ticket ID: ${ticketId}</p>
  </div>
`;

// Validate all template variables exist
console.log({ userName, ticketId, subject, description });
```

## Performance Problems

### Slow Page Loads

**Issue**: Dashboard loading slowly
```typescript
// Profile component rendering
import { Profiler } from 'react';

function onRenderCallback(id, phase, actualDuration) {
  console.log('Component:', id, 'Phase:', phase, 'Duration:', actualDuration);
}

<Profiler id="Dashboard" onRender={onRenderCallback}>
  <DashboardComponent />
</Profiler>
```

**Issue**: Database queries taking too long
```sql
-- Enable query logging
ALTER SYSTEM SET log_statement = 'all';
SELECT pg_reload_conf();

-- Find slow queries
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Add missing indexes
CREATE INDEX CONCURRENTLY idx_donations_org_created 
ON donations(organization_id, created_at);

-- Analyze query plans
EXPLAIN (ANALYZE, BUFFERS) 
SELECT * FROM donations WHERE organization_id = 'org_123';
```

### Memory Leaks

**Issue**: Memory usage increasing over time
```typescript
// Check for event listener leaks
useEffect(() => {
  const handleResize = () => {
    // Handle resize
  };
  
  window.addEventListener('resize', handleResize);
  
  // Always cleanup
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

// Check for subscription leaks
useEffect(() => {
  const subscription = supabase
    .channel('public:donations')
    .on('postgres_changes', {
      event: 'INSERT',
      schema: 'public',
      table: 'donations'
    }, handleNewDonation)
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

## Deployment Issues

### Build Failures

**Issue**: TypeScript errors during build
```bash
# Check TypeScript configuration
npx tsc --noEmit --skipLibCheck

# Update database types
npm run db:generate

# Fix type errors incrementally
npx tsc --noEmit --strict false
```

**Issue**: Environment variables not available in build
```bash
# Check build logs for missing variables
npm run build 2>&1 | grep -i "undefined"

# Verify environment variables in deployment platform
# Ensure NEXT_PUBLIC_ prefix for client-side variables
```

### Vercel Deployment Problems

**Issue**: Function timeout errors
```javascript
// next.config.js
module.exports = {
  experimental: {
    // Increase timeout for serverless functions
    serverComponentsExternalPackages: ['stripe'],
  },
  // For Vercel Pro plans
  functions: {
    'app/api/webhooks/stripe/route.js': {
      maxDuration: 30,
    },
  },
};
```

**Issue**: Cold start performance
```typescript
// Optimize imports to reduce bundle size
// Instead of importing entire library
import Stripe from 'stripe';

// Import only what you need
import { Stripe } from 'stripe/lib/stripe.js';
```

## Production Incidents

### Database Connection Pool Exhaustion

**Symptoms**: "too many connections" errors
```sql
-- Check current connections
SELECT count(*) FROM pg_stat_activity;

-- Check connection limits
SHOW max_connections;

-- Kill idle connections
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE state = 'idle' 
AND state_change < NOW() - INTERVAL '10 minutes';
```

**Solution**:
```typescript
// Implement connection pooling
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    db: {
      poolSize: 10, // Limit connection pool size
    },
  }
);
```

### Memory Issues in Production

**Symptoms**: Application crashes with out of memory errors
```bash
# Check memory usage
free -h
ps aux --sort=-%mem | head

# Increase memory limit for Node.js
export NODE_OPTIONS="--max-old-space-size=2048"
```

**Solution**:
```javascript
// next.config.js
module.exports = {
  experimental: {
    // Reduce memory usage
    optimizeCss: true,
    optimizeImages: true,
  },
  // Optimize webpack bundle
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};
```

### High CPU Usage

**Symptoms**: Slow response times, high server load
```bash
# Profile Node.js application
node --prof app.js
node --prof-process isolate-*.log > profile.txt

# Check for infinite loops or heavy computations
# Monitor specific routes causing high CPU
```

## Monitoring and Diagnostics

### Health Check Implementation

```typescript
// app/api/health/route.ts
export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    database: false,
    stripe: false,
    resend: false,
    memory: process.memoryUsage(),
    uptime: process.uptime(),
  };

  try {
    // Database health
    const { error: dbError } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    checks.database = !dbError;

    // Stripe health
    const balance = await stripe.balance.retrieve();
    checks.stripe = !!balance;

    // Email service health
    const domains = await resend.domains.list();
    checks.resend = domains.data.length > 0;

    const healthy = checks.database && checks.stripe && checks.resend;
    
    return Response.json(checks, { 
      status: healthy ? 200 : 503 
    });
  } catch (error) {
    return Response.json({
      ...checks,
      error: error.message,
    }, { status: 500 });
  }
}
```

### Error Logging

```typescript
// lib/logger.ts
class Logger {
  static error(message: string, context?: any) {
    console.error(`[ERROR] ${message}`, context);
    
    // Send to monitoring service
    if (process.env.NODE_ENV === 'production') {
      // Sentry, LogRocket, etc.
    }
  }

  static warn(message: string, context?: any) {
    console.warn(`[WARN] ${message}`, context);
  }

  static info(message: string, context?: any) {
    console.info(`[INFO] ${message}`, context);
  }
}

// Usage in API routes
try {
  // API logic
} catch (error) {
  Logger.error('Failed to create organization', {
    userId,
    error: error.message,
    stack: error.stack,
  });
  
  return Response.json(
    { error: 'Internal server error' },
    { status: 500 }
  );
}
```

### Performance Monitoring

```typescript
// lib/metrics.ts
class Metrics {
  static async recordApiCall(endpoint: string, duration: number, status: number) {
    // Record metrics to monitoring service
    console.log(`API ${endpoint}: ${duration}ms (${status})`);
    
    // Send to analytics
    if (process.env.NODE_ENV === 'production') {
      // DataDog, New Relic, etc.
    }
  }
}

// Middleware for API monitoring
export function withMetrics(handler: Function) {
  return async (req: Request) => {
    const start = Date.now();
    const endpoint = new URL(req.url).pathname;
    
    try {
      const response = await handler(req);
      const duration = Date.now() - start;
      
      Metrics.recordApiCall(endpoint, duration, response.status);
      
      return response;
    } catch (error) {
      const duration = Date.now() - start;
      Metrics.recordApiCall(endpoint, duration, 500);
      throw error;
    }
  };
}
```

## Debugging Tools and Commands

### Database Debugging

```sql
-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check active queries
SELECT 
  pid,
  now() - pg_stat_activity.query_start AS duration,
  query,
  state
FROM pg_stat_activity
WHERE (now() - pg_stat_activity.query_start) > interval '5 minutes';

-- Check locks
SELECT 
  blocked_locks.pid AS blocked_pid,
  blocked_activity.usename AS blocked_user,
  blocking_locks.pid AS blocking_pid,
  blocking_activity.usename AS blocking_user,
  blocked_activity.query AS blocked_statement,
  blocking_activity.query AS current_statement_in_blocking_process
FROM pg_catalog.pg_locks blocked_locks
JOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid
JOIN pg_catalog.pg_locks blocking_locks ON blocking_locks.locktype = blocked_locks.locktype
JOIN pg_catalog.pg_stat_activity blocking_activity ON blocking_activity.pid = blocking_locks.pid
WHERE NOT blocked_locks.GRANTED;
```

### Application Debugging

```typescript
// Debug environment
console.log({
  nodeEnv: process.env.NODE_ENV,
  nextjsEnv: process.env.NEXT_RUNTIME,
  memory: process.memoryUsage(),
  versions: process.versions,
});

// Debug API requests
const originalFetch = global.fetch;
global.fetch = async (...args) => {
  console.log('Fetch:', args[0]);
  const response = await originalFetch(...args);
  console.log('Response:', response.status);
  return response;
};
```

---

*This troubleshooting guide should be continuously updated based on production issues and their resolutions. Keep it current with the latest system changes and known issues.*