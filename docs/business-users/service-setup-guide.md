<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">⚙️ Service Setup Guide for Business Users</span>

</div>

This guide walks you through setting up the required services for your PassItOn donation system. Each service is explained in simple terms with step-by-step instructions and screenshots.

<div style="background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 <span style="font-size: 2rem; font-weight: 800;">📊 Overview - What Services Do You Need?</span></span>

</div>

</div>

<div style="background: #f0fdfa; border: 2px solid #14b8a6; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<p style="color: #0f766e; font-size: 1.2rem; font-weight: 600; margin-bottom: 1.5rem;">PassItOn requires three main services to work properly:</p>

<div style="display: grid; gap: 1.5rem; margin: 1rem 0;">

<div style="background: #dbeafe; border: 2px solid #3b82f6; border-radius: 10px; padding: 1.5rem;">
<h3 style="color: #1d4ed8; margin: 0 0 1rem 0; font-size: 1.3rem;">🔐 1. Clerk</h3>
<p style="color: #374151; margin: 0;">Handles user accounts and login (like having a bouncer at your digital door)</p>
</div>

<div style="background: #dcfce7; border: 2px solid #22c55e; border-radius: 10px; padding: 1.5rem;">
<h3 style="color: #15803d; margin: 0 0 1rem 0; font-size: 1.3rem;">💳 2. Stripe</h3>
<p style="color: #374151; margin: 0;">Processes credit card payments (like having a cash register for donations)</p>
</div>

<div style="background: #f3e8ff; border: 2px solid #a855f7; border-radius: 10px; padding: 1.5rem;">
<h3 style="color: #9333ea; margin: 0 0 1rem 0; font-size: 1.3rem;">🗄️ 3. Supabase</h3>
<p style="color: #374151; margin: 0;">Stores your data (like having a filing cabinet for donor information)</p>
</div>

</div>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 2rem 0;">

<div style="background: #f0f9ff; border: 2px dashed #06b6d4; padding: 1.5rem; border-radius: 10px;">
<h4 style="color: #0e7490; margin: 0 0 1rem 0; font-size: 1.2rem;">💰 Cost Overview:</h4>
<ul style="color: #374151; font-size: 1rem; line-height: 1.6; list-style: none; padding: 0;">
<li style="margin: 0.3rem 0;"><strong style="color: #3b82f6;">Clerk:</strong> Free for up to 10,000 users/month</li>
<li style="margin: 0.3rem 0;"><strong style="color: #10b981;">Stripe:</strong> 2.9% + 30¢ per successful transaction</li>
<li style="margin: 0.3rem 0;"><strong style="color: #8b5cf6;">Supabase:</strong> Free for up to 500MB database, 2GB bandwidth</li>
</ul>
</div>

<div style="background: #fefce8; border: 2px dashed #eab308; padding: 1.5rem; border-radius: 10px;">
<h4 style="color: #ca8a04; margin: 0 0 1rem 0; font-size: 1.2rem;">⏱️ Total Setup Time:</h4>
<p style="color: #374151; margin: 0; font-size: 1.2rem; font-weight: 600;">About 30-45 minutes</p>
</div>

</div>

</div>

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 <span style="font-size: 2rem; font-weight: 800;">🔐 Setting Up Clerk (User Authentication)</span></span>

</div>

</div>

<div style="background: #f0f9ff; border: 2px solid #3b82f6; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 <span style="color: #1d4ed8; font-size: 1.8rem; font-weight: 700;">💡 What is Clerk?</span></span>

</div>

<div style="background: #dbeafe; padding: 1.5rem; border-radius: 8px; margin: 1rem 0;">
<p style="color: #374151; font-size: 1.1rem; line-height: 1.7; margin: 0;">Clerk manages who can log into your PassItOn admin dashboard. It's like having a secure front desk that checks IDs before letting people into your building.</p>
</div>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Step 1: Create Your Clerk Account</span>

</div>

1. **Visit Clerk Website**
   - Go to [clerk.com](https://clerk.com)
   - Click the blue **"Get Started"** button in the top right

2. **Sign Up for Free Account**
   - Enter your email address
   - Create a strong password
   - Click **"Sign up"**
   - Check your email and click the verification link

3. **Complete Your Profile**
   - Enter your first and last name
   - Add your organization name
   - Click **"Continue"**

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Step 2: Create Your Application</span>

</div>

1. **Create New Application**
   - You'll see "Create your first application"
   - **Application name**: Enter "PassItOn Admin" (or your organization name)
   - **Choose authentication options**: Leave the defaults selected:
     - ✅ Email address
     - ✅ Password
     - ✅ Google (optional but recommended)

2. **Click "Create Application"**

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">🔌 Step 3: Get Your API Keys</span>

</div>

1. **Go to API Keys Section**
   - Look for "API Keys" in the left sidebar
   - Click on it

2. **Copy Your Keys** (You'll need these later)
   - **Publishable Key**: Starts with `pk_test_`
   - **Secret Key**: Starts with `sk_test_`
   
   **📝 Write these down safely!** You'll paste them into your PassItOn settings later.

3. **Save Keys Securely**
   ```
   CLERK KEYS (keep these private):
   Publishable Key: pk_test_[your-key-here]
   Secret Key: sk_test_[your-key-here]
   ```

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">🔧 Step 4: Configure Redirect URLs</span>

</div>

1. **Go to "Paths" in Sidebar**
   - Click **"Paths"** in the left menu

2. **Set Up URLs** (use these exact values):
   - **Sign-in URL**: `/sign-in`
   - **Sign-up URL**: `/sign-up`
   - **After sign-in**: `/dashboard`
   - **After sign-up**: `/onboarding`

3. **Click "Save"**

**✅ Clerk Setup Complete!** Your authentication system is ready.

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 💳 Setting Up Stripe (Payment Processing)</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 What is Stripe?</span>

</div>
Stripe processes credit card payments from your donors. It's like having a secure cash register that can accept cards from anywhere in the world.

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step 1: Create Your Stripe Account</span>

</div>

1. **Visit Stripe Website**
   - Go to [stripe.com](https://stripe.com)
   - Click **"Start now"** button

2. **Create Account**
   - Enter your email address
   - Create a password
   - Enter your country (United States)
   - Click **"Create account"**

3. **Verify Email**
   - Check your email for Stripe verification
   - Click the verification link

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step 2: Complete Business Information</span>

</div>

1. **Business Details**
   - **Business type**: Choose what fits your organization:
     - Individual (for personal fundraising)
     - Company (for businesses/nonprofits)
   - **Industry**: Choose "Charitable organizations" or "Non-profit"
   
2. **Business Information**
   - **Business name**: Your organization's legal name
   - **Business address**: Your organization's address
   - **Phone number**: Your contact number
   - **Website**: Your organization's website

3. **Personal Information** (for verification)
   - Your personal details (required by law)
   - Social Security Number or EIN (for tax purposes)
   - Date of birth

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step 3: Add Bank Account for Payouts</span>

</div>

1. **Go to "Payouts" Section**
   - In your Stripe dashboard, find "Payouts" in left menu
   - Click **"Add bank account"**

2. **Enter Bank Details**
   - **Routing number**: Your bank's 9-digit routing number
   - **Account number**: Your checking account number
   - **Account holder name**: Should match your business name

3. **Verify Account** (takes 1-2 business days)
   - Stripe will send two small test deposits
   - You'll verify these amounts in your Stripe dashboard

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">🔌 Step 4: Get Your API Keys</span>

</div>

1. **Go to Developers → API Keys**
   - Click **"Developers"** in left sidebar
   - Click **"API keys"**

2. **Copy Your Keys** (You'll need these later)
   - **Publishable Key**: Starts with `pk_test_`
   - **Secret Key**: Starts with `sk_test_` (click "Reveal live key")

3. **Save Keys Securely**
   ```
   STRIPE KEYS (keep these private):
   Publishable Key: pk_test_[your-key-here]
   Secret Key: sk_test_[your-key-here]
   ```

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step 5: Set Up Webhooks (Important!)</span>

</div>

1. **Go to Developers → Webhooks**
   - Click **"Developers"** in left sidebar
   - Click **"Webhooks"**
   - Click **"Add endpoint"**

2. **Add Webhook Endpoint**
   - **Endpoint URL**: `https://your-domain.com/api/webhooks/stripe`
   - (You'll update this later when your site is live)
   - **Events to send**: Select these specific events:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `charge.dispute.created`

3. **Copy Webhook Secret**
   - After creating, click on your webhook
   - Find **"Signing secret"**
   - Copy this value (starts with `whsec_`)

**✅ Stripe Setup Complete!** Your payment processing is ready.

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🗄️ 🗄️ Setting Up Supabase (Database)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 What is Supabase?</span>

</div>
Supabase stores all your data - donor information, donation amounts, user accounts, etc. It's like having a super-organized filing cabinet that never loses anything.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Step 1: Create Your Supabase Account</span>

</div>

1. **Visit Supabase Website**
   - Go to [supabase.com](https://supabase.com)
   - Click **"Start your project"**

2. **Sign Up**
   - Click **"Sign up"**
   - **Recommended**: Use GitHub account for easy login
   - Or create account with email and password

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Step 2: Create Your Project</span>

</div>

1. **Create New Project**
   - Click **"New project"**
   - **Organization**: Use default or create new

2. **Project Settings**
   - **Name**: "PassItOn Admin" (or your organization name)
   - **Database Password**: Create a **strong password** (write this down!)
   - **Region**: Choose closest to your location (e.g., "US West" for California)
   - **Pricing plan**: Start with "Free" (you can upgrade later)

3. **Click "Create new project"**
   - ⏱️ This takes about 2-3 minutes

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 Step 3: Get Your API Keys</span>

</div>

1. **Go to Settings → API**
   - Click the **gear icon (⚙️)** in left sidebar
   - Click **"API"**

2. **Copy Your Keys** (You'll need these later)
   - **Project URL**: Looks like `https://xyz123abc.supabase.co`
   - **anon/public key**: Long string starting with `eyJhbGciOiJIUzI1NiI...`
   - **service_role key**: Another long string (click "Reveal" first)

3. **Save Keys Securely**
   ```
   SUPABASE KEYS (keep these private):
   Project URL: https://[your-project-id].supabase.co
   Public Key: eyJhbGciOiJIUzI1NiI[rest-of-key]
   Service Key: eyJhbGciOiJIUzI1NiI[rest-of-key]
   ```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🗄️ Step 4: Set Up Database Tables</span>

</div>

**Don't worry - PassItOn will create these automatically when you first run it!**

The tables that will be created:
- **Organizations**: Your organization info
- **Users**: People who can access your dashboard  
- **Widgets**: Your donation widgets
- **Donations**: All donation records

**✅ Supabase Setup Complete!** Your database is ready.

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 🔗 Connecting Everything to PassItOn</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Step 1: Update PassItOn Configuration</span>

</div>

1. **Find Your .env.local File**
   - In your PassItOn project folder
   - Open `.env.local` file in a text editor

2. **Add All Your Keys**
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_[your-clerk-key]
   CLERK_SECRET_KEY=sk_test_[your-clerk-key]
   
   # Supabase Database  
   NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiI[your-key]
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiI[your-key]
   
   # Stripe Payments
   STRIPE_SECRET_KEY=sk_test_[your-stripe-key]
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[your-stripe-key]
   STRIPE_WEBHOOK_SECRET=whsec_[your-webhook-secret]
   ```

3. **Save the File**

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ Step 2: Test Your Setup</span>

</div>

1. **Start PassItOn**
   ```bash
   npm run dev
   ```

2. **Visit Your Dashboard**
   - Go to `http://localhost:3000`
   - Try creating an account
   - If everything works, you'll see the dashboard!

**🎉 Congratulations! Your PassItOn system is fully configured.**

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 🆘 Troubleshooting Common Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Clerk Issues</span>

</div>

**Problem**: "Invalid publishable key"
**Solution**: 
- Make sure key starts with `pk_test_`
- Check for extra spaces or characters
- Verify you're using the key from the correct Clerk application

**Problem**: Redirect loops on login
**Solution**:
- Check your redirect URLs in Clerk dashboard match exactly:
  - Sign-in URL: `/sign-in`
  - After sign-in: `/dashboard`

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Stripe Issues</span>

</div>

**Problem**: "Invalid API key"  
**Solution**:
- Make sure secret key starts with `sk_test_`
- Make sure publishable key starts with `pk_test_`
- Check you're using keys from the same Stripe account

**Problem**: "Webhook signature verification failed"
**Solution**:
- Copy webhook secret from Stripe dashboard (starts with `whsec_`)
- Make sure webhook endpoint URL is correct
- Restart your PassItOn application after updating webhook secret

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Supabase Issues</span>

</div>

**Problem**: "Invalid API URL"
**Solution**:
- URL should be `https://[project-id].supabase.co`
- Check for typos in project ID
- Make sure project is created and running

**Problem**: "Row Level Security" errors
**Solution**:
- This is normal - PassItOn will set up security rules automatically
- Make sure you're using the service_role key for server operations

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 🔄 When You're Ready to Go Live</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Switching from Test to Live Mode</span>

</div>

**⚠️ Important**: Only do this when you're ready to accept real donations!

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Stripe - Enable Live Mode</span>

</div>

1. **Complete Stripe Verification**
   - Stripe will review your account (can take 1-7 days)
   - You'll get email when approved for live payments

2. **Get Live API Keys**
   - Go to Developers → API keys in Stripe
   - Toggle to "Live mode"
   - Copy live keys (start with `pk_live_` and `sk_live_`)

3. **Update Webhook for Live Mode**
   - Create new webhook with your live domain
   - Example: `https://admin.yourorganization.com/api/webhooks/stripe`

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Clerk - Switch to Production</span>

</div>

1. **In Clerk Dashboard**
   - Go to your application settings
   - Update domain from `localhost` to your live domain
   - Update redirect URLs to use your live domain

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ Supabase - Production Setup</span>

</div>

1. **Update Allowed Origins**
   - Go to Authentication → Settings
   - Add your live domain to allowed origins
   - Example: `https://admin.yourorganization.com`

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Update PassItOn Configuration</span>

</div>

1. **Update .env.local with Live Keys**
   ```env
   # Use live keys instead of test keys
   STRIPE_SECRET_KEY=sk_live_[your-live-stripe-key]
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your-live-stripe-key]
   ```

**🎉 You're now accepting real donations!**

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 💡 Pro Tips for Success</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Security Best Practices</span>

</div>

1. **Never Share Your Secret Keys**
   - Keep API keys private
   - Don't put them in public places (like GitHub)
   - Use different keys for testing vs live

2. **Use Strong Passwords**
   - Different password for each service
   - Use a password manager if possible
   - Enable two-factor authentication where available

3. **Regular Monitoring**
   - Check your dashboards weekly
   - Monitor for unusual activity
   - Keep contact info updated in all services

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Financial Management</span>

</div>

1. **Understand Stripe Fees**
   - 2.9% + 30¢ per successful card transaction
   - Additional fees for international cards
   - Payouts happen automatically (daily/weekly/monthly)

2. **Track Your Donations**
   - Use PassItOn analytics dashboard
   - Export data regularly for your records
   - Reconcile with Stripe payouts

3. **Tax Considerations**
   - Stripe provides tax documents
   - Keep records of all donations
   - Consult with accountant about donation processing

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Getting Help</span>

</div>

**📞 Need Help?** Don't hesitate to reach out - we're here to help you succeed!