<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">⚙️ Environment Variables Setup Guide</span>

</div>

Complete environment configuration for the PassItOn Admin Dashboard with current working keys.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Current Environment Variables</span>

</div>

Copy this exact configuration to your `.env.local` file:

```env
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Supabase Database</span>

</div>
SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Stripe Configuration</span>

</div>
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Application Configuration</span>

</div>
NEXT_PUBLIC_APP_URL=http://localhost:3000

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Super Admin Creation Options (Choose ONE method)</span>

</div>
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Method 1: Environment variable with authorized emails (most secure)</span>

</div>
SUPER_ADMIN_EMAILS=tfortner@banyanlabs.io,thalsell@banyanlabs.io,scallins@banyanlabs.io

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Method 2: First user becomes super admin (if no super admins exist)</span>

</div>
ENABLE_FIRST_USER_SUPER_ADMIN=false

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Method 3: Secret key for emergency super admin creation</span>

</div>
SUPER_ADMIN_SECRET=your_super_secret_key_here
ENABLE_SECRET_URL_CREATION=false

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Email Service (Optional - Currently Commented Out)</span>

</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔌 RESEND_API_KEY=re_your_api_key_here</span>

</div>
```

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Variable Explanations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔐 Clerk Authentication</span>

</div>
- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Public key for client-side authentication
- **CLERK_SECRET_KEY**: Server-side key for API operations
- **Redirect URLs**: Control where users go after authentication actions

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🗄️ Supabase Database</span>

</div>
- **NEXT_PUBLIC_SUPABASE_URL**: Your Supabase project API endpoint
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Public key for client-side database operations
- **SUPABASE_SERVICE_ROLE_KEY**: Admin key for server-side operations (bypasses RLS)

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Stripe Payments</span>

</div>
- **STRIPE_SECRET_KEY**: Server-side key for processing payments
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Client-side key for Stripe Elements
- **STRIPE_WEBHOOK_SECRET**: Validates webhook signatures from Stripe

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Application Settings</span>

</div>
- **NEXT_PUBLIC_APP_URL**: Base URL of your application

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Super Admin Creation Options</span>

</div>
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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Setup Instructions</span>

</div>

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

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Service Dashboards</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Active Services</span>

</div>
- **Clerk Dashboard**: [dashboard.clerk.com](https://dashboard.clerk.com/) - Manage authentication
- **Supabase Dashboard**: [supabase.com/dashboard](https://supabase.com/dashboard) - Database management  
- **Stripe Dashboard**: [dashboard.stripe.com](https://dashboard.stripe.com/) - Payment processing

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🗄️ Database Access</span>

</div>
- **Project**: `npzeveeyzyzkfkqipojk`
- **URL**: `https://npzeveeyzyzkfkqipojk.supabase.co`

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Adding New Developers</span>

</div>

When adding new team members:

1. **Share this document** - Contains all working keys
2. **Verify access** - Ensure they can access service dashboards
3. **Test setup** - Have them run `npm run dev` to confirm everything works
4. **Database permissions** - Confirm they can access Supabase tables

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🚀 Production Deployment</span>

</div>

For production, you'll need to:

1. **Get live keys** from each service (replace `test` with `live`)
2. **Update URLs** to production domains
3. **Set environment variables** in your deployment platform
4. **Configure webhooks** to point to production endpoints

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Missing Services</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Email Service (Resend)</span>

</div>
Currently commented out. To enable:

1. **Sign up**: [resend.com](https://resend.com/)
2. **Get API key**: Dashboard → API Keys
3. **Uncomment**: Remove `#` from `RESEND_API_KEY` line
4. **Add key**: Replace `re_your_api_key_here` with actual key

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Issues</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Quick Test</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Verify variables are loaded</span>

</div>
node -e "console.log('Clerk:', !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)"
node -e "console.log('Supabase:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)"
node -e "console.log('Stripe:', !!process.env.STRIPE_SECRET_KEY)"
```

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔒 Security Notes</span>

</div>

- **Development keys**: Current keys are for development/testing only
- **Never commit**: `.env.local` should never be committed to version control
- **Production keys**: Use separate live keys for production deployment
- **Service role key**: Has admin access - handle with care