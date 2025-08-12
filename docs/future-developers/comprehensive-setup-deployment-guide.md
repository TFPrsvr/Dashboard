<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 Comprehensive Setup & Deployment Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

<div style="margin-top: 1rem; font-size: 1.1rem; opacity: 0.9;">

This comprehensive guide covers everything needed to set up, configure, and deploy the PassItOn Admin Dashboard, from local development to production deployment using Docker, Vercel, or other platforms.

</div>

</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📋 Table of Contents</span>

<div style="margin-top: 1rem;">

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Local Development](#local-development)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Troubleshooting](#troubleshooting)

</div>

</div>

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚡ Quick Start</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Clone the repository</span>

</div>
git clone <repository-url>
cd PassItOn-Admin

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📦 Install dependencies</span>

</div>
npm install

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Copy environment template</span>

</div>
cp .env.example .env.local

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Set up environment variables (see Environment Configuration section)</span>

</div>
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Start development server</span>

</div>
npm run dev
```

Visit `http://localhost:3000` to access the application.

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Prerequisites</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Required Software</span>

</div>
- **Node.js** (v18.17.0 or higher)
- **npm** (v9.6.7 or higher)
- **Git** (latest version)
- **Docker** (optional, for containerized deployment)

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Required Services</span>

</div>
- **Supabase** account (database & authentication)
- **Clerk** account (authentication management)
- **Stripe** account (payment processing)

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Environment Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Complete Environment Variables</span>

</div>

Copy this configuration to your `.env.local` file:

```env
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Clerk Authentication</span>

</div>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/onboarding

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Supabase Database</span>

</div>
SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Stripe Configuration</span>

</div>
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Application Configuration</span>

</div>
NEXT_PUBLIC_APP_URL=http://localhost:3000

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Super Admin Creation Options (Choose ONE method)</span>

</div>
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Method 1: Environment variable with authorized emails (most secure)</span>

</div>
SUPER_ADMIN_EMAILS=your-email@company.com

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Method 2: First user becomes super admin (if no super admins exist)</span>

</div>
ENABLE_FIRST_USER_SUPER_ADMIN=false

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Method 3: Secret key for emergency super admin creation</span>

</div>
SUPER_ADMIN_SECRET=your_super_secret_key_here
ENABLE_SECRET_URL_CREATION=false

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Email Service (Optional)</span>

</div>
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔌 RESEND_API_KEY=re_your_api_key_here</span>

</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Monitoring & Alerts (Production)</span>

</div>
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
ALERT_EMAIL_RECIPIENTS=alerts@yourcompany.com
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Service Configuration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">⚙️ 1. Clerk Setup</span>

</div>
1. Visit [clerk.com](https://clerk.com) and create account
2. Create new application named "PassItOn Admin"
3. Copy publishable key and secret key
4. Configure redirect URLs in Clerk dashboard

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">⚙️ 2. Supabase Setup</span>

</div>
1. Visit [supabase.com](https://supabase.com) and create account
2. Create new project
3. Copy project URL and API keys
4. Set up database schema (see Database Setup section)

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">⚙️ 3. Stripe Setup</span>

</div>
1. Visit [stripe.com](https://stripe.com) and create account
2. Get test/live API keys
3. Set up webhook endpoints
4. Configure products and pricing

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Database Setup</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Required Tables</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Indexes for Performance</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Row Level Security (Production)</span>

</div>

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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Local Development</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Development Server</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📦 Install dependencies</span>

</div>
npm install

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Start development server with hot reload</span>

</div>
npm run dev

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Run in development mode with debugging</span>

</div>
npm run dev:debug
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Development Tools</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Linting</span>

</div>
npm run lint

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Type checking</span>

</div>
npm run type-check

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Database migrations (if using Prisma)</span>

</div>
npm run db:migrate

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Reset database (development only)</span>

</div>
npm run db:reset
```

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🚀 Docker Deployment</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Multi-Stage Docker Architecture</span>

</div>

The project uses a single `Dockerfile` with multiple build targets:

1. **Development Target**: Local development with hot reload
2. **Basic Target**: Simple production deployment
3. **Production Target**: Optimized production deployment

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Docker Compose Configuration</span>

</div>

```yaml
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 docker-compose.yml (Development)</span>

</div>
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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 docker-compose.prod.yml (Production)</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Docker Commands</span>

</div>

```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Development</span>

</div>
docker-compose up -d

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Production build</span>

</div>
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Build specific target</span>

</div>
docker build --target production -t passiton-admin:prod .

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Run production container</span>

</div>
docker run -p 3000:3000 --env-file .env.production passiton-admin:prod
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Docker Environment Files</span>

</div>

Create `.env.production` for production deployment:

```env
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Production Environment Variables</span>

</div>
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Use production keys</span>

</div>
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_live_key
CLERK_SECRET_KEY=sk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Production database</span>

</div>
NEXT_PUBLIC_SUPABASE_URL=https://your-prod-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_role_key
```

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🚀 Production Deployment</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 Platform-Specific Deployment</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🚀 Vercel Deployment</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🚀 Netlify Deployment</span>

</div>

```toml
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 netlify.toml</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🚀 Railway Deployment</span>

</div>

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically on push

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Production Checklist</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🚀 Pre-Deployment</span>

</div>
- [ ] Update all environment variables to production values
- [ ] Configure production database with RLS
- [ ] Set up production Stripe webhooks
- [ ] Configure domain and SSL certificates
- [ ] Set up monitoring and error tracking
- [ ] Test all critical user flows
- [ ] Run security audit
- [ ] Performance optimization review

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🚀 Post-Deployment</span>

</div>
- [ ] Verify all API endpoints work
- [ ] Test payment processing end-to-end
- [ ] Confirm authentication flows
- [ ] Check email notifications
- [ ] Verify monitoring and alerts
- [ ] Test error handling
- [ ] Perform load testing
- [ ] Update documentation

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Production Environment Variables</span>

</div>

```env
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Production-specific variables</span>

</div>
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-production-domain.com

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Monitoring and Error Tracking</span>

</div>
SENTRY_DSN=https://your-sentry-dsn
DATADOG_API_KEY=your-datadog-key
NEW_RELIC_LICENSE_KEY=your-newrelic-key

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Email Service</span>

</div>
RESEND_API_KEY=re_your_production_api_key
SUPPORT_EMAIL=support@yourcompany.com

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Alerts and Notifications</span>

</div>
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/PRODUCTION/WEBHOOK
ALERT_EMAIL_RECIPIENTS=alerts@yourcompany.com,team@yourcompany.com

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔒 Security</span>

</div>
NEXTAUTH_SECRET=your-super-secret-nextauth-secret
ENCRYPTION_KEY=your-encryption-key-for-sensitive-data
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Performance Optimization</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔧 Next.js Configuration</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ Database Optimization</span>

</div>

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

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Build Errors</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Clear Next.js cache</span>

</div>
rm -rf .next

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📦 Clear node modules and reinstall</span>

</div>
rm -rf node_modules
npm install

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Type checking</span>

</div>
npm run type-check
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Environment Variable Issues</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check if variables are loaded</span>

</div>
echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Verify .env.local exists and has correct format</span>

</div>
cat .env.local | head -5
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ Database Connection Issues</span>

</div>
```sql
-- Test database connection
SELECT current_database(), current_user, now();

-- Check table existence
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Docker Issues</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check Docker logs</span>

</div>
docker-compose logs app

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Rebuild without cache</span>

</div>
docker-compose build --no-cache

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Remove all containers and rebuild</span>

</div>
docker-compose down
docker system prune -a
docker-compose up --build
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Performance Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ Slow Database Queries</span>

</div>
1. Add appropriate indexes
2. Use connection pooling
3. Implement query pagination
4. Monitor query performance

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📝 High Memory Usage</span>

</div>
1. Optimize React components
2. Implement proper cleanup in useEffect
3. Use React.memo for expensive components
4. Monitor memory leaks

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Slow Page Loading</span>

</div>
1. Implement code splitting
2. Optimize images
3. Use CDN for static assets
4. Enable compression

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Support Resources</span>

</div>

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