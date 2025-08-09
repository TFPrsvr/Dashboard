# Environment Variables Setup Guide

Complete environment configuration for the PassItOn Admin Dashboard with current working keys.

## Current Environment Variables

Copy this exact configuration to your `.env.local` file:

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
SUPER_ADMIN_EMAILS=tfortner@banyanlabs.io,thalsell@banyanlabs.io,scallins@banyanlabs.io

# Method 2: First user becomes super admin (if no super admins exist)
ENABLE_FIRST_USER_SUPER_ADMIN=false

# Method 3: Secret key for emergency super admin creation
SUPER_ADMIN_SECRET=your_super_secret_key_here
ENABLE_SECRET_URL_CREATION=false

# Email Service (Optional - Currently Commented Out)
# RESEND_API_KEY=re_your_api_key_here
```

## Variable Explanations

### Clerk Authentication
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Public key for client-side authentication
- **CLERK_SECRET_KEY**: Server-side key for API operations
- **Redirect URLs**: Control where users go after authentication actions

### Supabase Database
- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project API endpoint
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Public key for client-side database operations
- **SUPABASE_SERVICE_ROLE_KEY**: Admin key for server-side operations (bypasses RLS)

### Stripe Payments
- **STRIPE_SECRET_KEY**: Server-side key for processing payments
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Client-side key for Stripe Elements
- **STRIPE_WEBHOOK_SECRET**: Validates webhook signatures from Stripe

### Application Settings
- **NEXT_PUBLIC_APP_URL**: Base URL of your application

### Super Admin Creation Options
Choose ONE method based on your security preferences:

**Method 1: Environment Variable (Recommended)**
- **SUPER_ADMIN_EMAILS**: Comma-separated list of authorized super admin emails
- Most secure method - only specified emails can become super admins
- Example: `tfortner@banyanlabs.io,thalsell@banyanlabs.io`

**Method 2: First User Super Admin**
- **ENABLE_FIRST_USER_SUPER_ADMIN**: Set to `true` to enable
- First person to sign up becomes super admin if none exist
- Good for initial setup, less secure for production

**Method 3: Secret Key Emergency Access**
- **SUPER_ADMIN_SECRET**: Set a secure secret key
- **ENABLE_SECRET_URL_CREATION**: Set to `true` to enable
- Access via `/create-super-admin` with secret key
- For emergency situations only

## Setup Instructions

1. **Create Environment File**:
   ```bash
   cp .env.example .env.local  # or create new file
   ```

2. **Copy Configuration**: Paste the exact configuration above into `.env.local`

3. **Start Development**:
   ```bash
   npm install
   npm run dev
   ```

4. **Verify Setup**: Check that the app loads at `http://localhost:3000`

## Service Dashboards

### Active Services
- **Clerk Dashboard**: [dashboard.clerk.com](https://dashboard.clerk.com/) - Manage authentication
- **Supabase Dashboard**: [supabase.com/dashboard](https://supabase.com/dashboard) - Database management  
- **Stripe Dashboard**: [dashboard.stripe.com](https://dashboard.stripe.com/) - Payment processing

### Database Access
- **Project**: `npzeveeyzyzkfkqipojk`
- **URL**: `https://npzeveeyzyzkfkqipojk.supabase.co`

## Adding New Developers

When adding new team members:

1. **Share this document** - Contains all working keys
2. **Verify access** - Ensure they can access service dashboards
3. **Test setup** - Have them run `npm run dev` to confirm everything works
4. **Database permissions** - Confirm they can access Supabase tables

## Production Deployment

For production, you'll need to:

1. **Get live keys** from each service (replace `test` with `live`)
2. **Update URLs** to production domains
3. **Set environment variables** in your deployment platform
4. **Configure webhooks** to point to production endpoints

## Missing Services

### Email Service (Resend)
Currently commented out. To enable:

1. **Sign up**: [resend.com](https://resend.com/)
2. **Get API key**: Dashboard → API Keys
3. **Uncomment**: Remove `#` from `RESEND_API_KEY` line
4. **Add key**: Replace `re_your_api_key_here` with actual key

## Troubleshooting

### Common Issues

**App won't start**: 
- Check all variables are set
- Restart development server: `npm run dev`

**Database errors**:
- Verify Supabase URL and keys are correct
- Check database is accessible at dashboard

**Authentication fails**:
- Confirm Clerk keys match dashboard
- Verify redirect URLs are configured

**Stripe errors**:
- Test keys should start with `sk_test_` and `pk_test_`
- Check webhook endpoints are configured

### Quick Test
```bash
# Verify variables are loaded
node -e "console.log('Clerk:', !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)"
node -e "console.log('Supabase:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)"
node -e "console.log('Stripe:', !!process.env.STRIPE_SECRET_KEY)"
```

## Security Notes

- **Development keys**: Current keys are for development/testing only
- **Never commit**: `.env.local` should never be committed to version control
- **Production keys**: Use separate live keys for production deployment
- **Service role key**: Has admin access - handle with care