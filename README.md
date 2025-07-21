# PassItOn Admin Dashboard

A multi-tenant admin dashboard for managing donation widgets, organizations, and team members built with Next.js 14, Supabase, and Clerk authentication.

## Table of Contents

- [Quick Start](#quick-start)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Development](#development)
- [Architecture Overview](#architecture-overview)
- [Key Features](#key-features)
- [API Documentation](#api-documentation)
- [Stripe Setup Tutorial](#stripe-setup-tutorial)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd PassItOn-Admin

# Install dependencies
npm install

# Copy environment template
cp  .env.local

# Set up environment variables (see Environment Setup section)
# Start development server
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Prerequisites

Before setting up the project, ensure you have the following installed:

### Required Software
- **Node.js** (v18.17.0 or higher)
- **npm** (v9.6.7 or higher)
- **Git** (latest version)

### Required Services
- **Supabase** account (database & authentication)
- **Clerk** account (user management)
- **Stripe** account (payments)

### Development Tools (Recommended)
- **VS Code** with extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PassItOn-Admin
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required dependencies including:

**Core Dependencies:**
- `next` - React framework
- `react` & `react-dom` - React library
- `typescript` - Type safety
- `@supabase/supabase-js` - Database client
- `@clerk/nextjs` - Authentication
- `stripe` - Payment processing

**UI Dependencies:**
- `@radix-ui/*` - Headless UI components
- `tailwindcss` - CSS framework
- `lucide-react` - Icons
- `class-variance-authority` - Styling utilities

### 3. Environment Configuration

Copy the environment template:

```bash
cp   .env.local
```

## Environment Setup

Create a `.env.local` file in the project root with the following variables:

```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_WEBHOOK_SECRET=whsec_...
```

### Getting Environment Variables

#### Clerk Setup
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy the publishable and secret keys
4. Configure redirect URLs in Clerk dashboard

#### Supabase Setup
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. Go to Settings → API
4. Copy the URL and anon key
5. Copy the service role key (for server-side operations)

#### Stripe Setup
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers → API keys
3. Set up webhooks for `/api/webhooks/stripe`
4. Configure Stripe Connect (see Stripe Setup Tutorial below)

## Database Setup

### 1. Running Migrations

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push

# Generate TypeScript types
npm run db:generate
```

### 2. Database Schema

The application uses the following main tables:
- `organizations` - Multi-tenant organization data
- `users` - User accounts linked to Clerk
- `widgets` - Donation widget configurations
- `donations` - Donation transaction records

## Development

### Starting the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### Available Scripts

```bash
npm run dev          # Start development server with Turbo
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:generate  # Generate TypeScript types
```

## Architecture Overview

### Project Structure

```
PassItOn-Admin/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboard routes
│   │   ├── admin/                # Super admin pages
│   │   ├── dashboard/           # Organization dashboard
│   │   └── widget/              # Widget customization
│   └── api/                     # API routes
├── components/                  # Reusable React components
│   ├── dashboard/              # Dashboard-specific components
│   └── ui/                     # Base UI components
├── lib/                        # Utility functions
├── hooks/                      # Custom React hooks
├── types/                      # TypeScript definitions
└── supabase/                   # Database configuration
```

### Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - PostgreSQL database with real-time features
- **Clerk** - User authentication and management
- **Stripe** - Payment processing and Connect for multi-tenant

## Key Features

### Multi-Tenant Architecture

The application supports multiple organizations with role-based access:

**Roles:**
- **Super Admin** - Platform administration
- **Owner** - Organization management  
- **Editor** - Content management

### Authentication Flow

1. **Sign Up/Sign In** - Handled by Clerk
2. **Organization Assignment** - Users linked to organizations
3. **Role Detection** - Permissions based on user role
4. **Dashboard Routing** - Role-based dashboard access

## API Documentation

### Organizations API

#### GET `/api/organizations`
Get all organizations (Super Admin only)

#### POST `/api/team/invite`
Send team invitation

**Request Body:**
```json
{
  "email": "user@example.com",
  "role": "editor",
  "organizationId": "uuid",
  "organizationName": "Organization Name"
}
```

## Stripe Setup Tutorial

### For Customers: How to Connect Your Stripe Account

This tutorial helps customers connect their Stripe accounts to receive donations through their widgets.

#### Step 1: Access Stripe Connect Settings

1. **Log into your dashboard** at your organization's dashboard
2. **Navigate to Settings** → **Payment Settings**
3. **Click "Connect Stripe Account"**

#### Step 2: Stripe Account Setup

If you don't have a Stripe account:

1. **Go to [stripe.com](https://stripe.com)** and click "Start now"
2. **Create your account** with business information
3. **Verify your identity** (required for receiving payments)
4. **Add bank account** for payouts

#### Step 3: Connect to PassItOn

1. **Click "Connect with Stripe"** in your PassItOn dashboard
2. **You'll be redirected to Stripe** - log in if prompted
3. **Review permissions** - PassItOn needs to:
   - Process payments on your behalf
   - Access transaction data
   - Handle refunds and disputes
4. **Click "Connect account"** to authorize

#### Step 4: Verification

1. **Complete Stripe's verification process**:
   - Business details
   - Tax information  
   - Bank account verification
   - Identity documents (if required)

2. **Test your connection**:
   - Return to PassItOn dashboard
   - Status should show "Connected"
   - Make a test donation to verify

#### Step 5: Configure Payout Settings

1. **In your Stripe dashboard**, go to Settings → Payouts
2. **Set payout schedule** (daily, weekly, monthly)
3. **Choose payout method** (bank account, debit card)
4. **Set minimum payout amount** if desired

### Configuration Management

For developers updating the Stripe integration:

#### Key Configuration Files

1. **`/lib/stripe/connect.ts`** - Stripe Connect integration
2. **`/app/api/stripe/connect/route.ts`** - Connect API endpoints
3. **`/components/dashboard/stripe-connect.tsx`** - UI components

#### Environment Variables Required

```env
# Stripe Configuration
STRIPE_SECRET_KEY=sk_live_... # or sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... # or pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_CONNECT_WEBHOOK_SECRET=whsec_...
```

#### Webhook Endpoints

Configure these webhooks in your Stripe dashboard:

1. **Account Webhooks** (`/api/webhooks/stripe`):
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.dispute.created`

2. **Connect Webhooks** (`/api/webhooks/stripe/connect`):
   - `account.updated`
   - `account.application.deauthorized`
   - `capability.updated`

#### Testing Stripe Connect

1. **Use Stripe's test mode** for development
2. **Test account creation flow**:
   ```bash
   curl -X POST http://localhost:3000/api/stripe/connect \
     -H "Content-Type: application/json" \
     -d '{"organizationId": "test-org-id"}'
   ```

3. **Test webhook handling**:
   - Use Stripe CLI for local testing
   - Forward events to local server
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

#### Updating Stripe Integration

When modifying the Stripe integration:

1. **Update TypeScript types** in `/types/stripe.ts`
2. **Test in Stripe's test mode** first
3. **Update webhook handlers** for new events
4. **Add error handling** for new scenarios
5. **Update documentation** for customers

#### Common Stripe Issues and Solutions

**Issue: Connect account creation fails**
- Check API keys are correct
- Verify webhook endpoints are configured
- Ensure required business information is provided

**Issue: Payments not processing**
- Check account verification status
- Verify payout methods are configured
- Check for any account restrictions

**Issue: Webhook events not received**
- Verify webhook URL is accessible
- Check webhook secret matches environment variable
- Ensure correct event types are subscribed

## Troubleshooting

### Common Issues

#### 1. Authentication Issues
- Check Clerk environment variables
- Verify redirect URLs in Clerk dashboard
- Ensure middleware is properly configured

#### 2. Database Connection Issues
- Verify Supabase URL and keys
- Check network connectivity
- Run database migrations

#### 3. Team Invitation Errors
The team invitation system has been simplified:
- Invitations are logged to console in development
- Production requires email service integration
- Database includes invitation token support

### Development Issues

#### Role-Based Access
- Super admin role is detected via database query
- Admin sections show for users with `super_admin` role
- Color-coded headers indicate current dashboard type

## Contributing

### Development Guidelines

1. **Follow TypeScript** - Use proper types for all functions
2. **Component Structure** - Keep components focused and reusable
3. **Error Handling** - Implement proper error boundaries
4. **Testing** - Add tests for new features
5. **Documentation** - Update docs when adding features

### Adding New Features

When adding new features:

1. **Plan the Architecture** - Consider multi-tenant implications
2. **Update Types** - Add TypeScript definitions
3. **Create API Routes** - Follow existing patterns
4. **Add UI Components** - Use existing design system
5. **Test Thoroughly** - Test across different roles
6. **Update Documentation** - Add to this README

---

**Last Updated:** January 2025
**Version:** 1.0.0
