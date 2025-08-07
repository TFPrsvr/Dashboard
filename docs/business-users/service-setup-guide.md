# Service Setup Guide for Business Users

This guide walks you through setting up the required services for your PassItOn donation system. Each service is explained in simple terms with step-by-step instructions and screenshots.

## Overview - What Services Do You Need?

**PassItOn requires three main services to work properly:**

1. **🔐 Clerk** - Handles user accounts and login (like having a bouncer at your digital door)
2. **💳 Stripe** - Processes credit card payments (like having a cash register for donations)  
3. **🗄️ Supabase** - Stores your data (like having a filing cabinet for donor information)

**💰 Cost Overview:**
- **Clerk**: Free for up to 10,000 users/month
- **Stripe**: 2.9% + 30¢ per successful transaction  
- **Supabase**: Free for up to 500MB database, 2GB bandwidth

**⏱️ Total Setup Time:** About 30-45 minutes

---

## 🔐 Setting Up Clerk (User Authentication)

### What is Clerk?
Clerk manages who can log into your PassItOn admin dashboard. It's like having a secure front desk that checks IDs before letting people into your building.

### Step 1: Create Your Clerk Account

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

### Step 2: Create Your Application

1. **Create New Application**
   - You'll see "Create your first application"
   - **Application name**: Enter "PassItOn Admin" (or your organization name)
   - **Choose authentication options**: Leave the defaults selected:
     - ✅ Email address
     - ✅ Password
     - ✅ Google (optional but recommended)

2. **Click "Create Application"**

### Step 3: Get Your API Keys

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

### Step 4: Configure Redirect URLs

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

## 💳 Setting Up Stripe (Payment Processing)

### What is Stripe?
Stripe processes credit card payments from your donors. It's like having a secure cash register that can accept cards from anywhere in the world.

### Step 1: Create Your Stripe Account

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

### Step 2: Complete Business Information

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

### Step 3: Add Bank Account for Payouts

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

### Step 4: Get Your API Keys

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

### Step 5: Set Up Webhooks (Important!)

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

## 🗄️ Setting Up Supabase (Database)

### What is Supabase?
Supabase stores all your data - donor information, donation amounts, user accounts, etc. It's like having a super-organized filing cabinet that never loses anything.

### Step 1: Create Your Supabase Account

1. **Visit Supabase Website**
   - Go to [supabase.com](https://supabase.com)
   - Click **"Start your project"**

2. **Sign Up**
   - Click **"Sign up"**
   - **Recommended**: Use GitHub account for easy login
   - Or create account with email and password

### Step 2: Create Your Project

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

### Step 3: Get Your API Keys

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

### Step 4: Set Up Database Tables

**Don't worry - PassItOn will create these automatically when you first run it!**

The tables that will be created:
- **Organizations**: Your organization info
- **Users**: People who can access your dashboard  
- **Widgets**: Your donation widgets
- **Donations**: All donation records

**✅ Supabase Setup Complete!** Your database is ready.

---

## 🔗 Connecting Everything to PassItOn

### Step 1: Update PassItOn Configuration

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

### Step 2: Test Your Setup

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

## 🆘 Troubleshooting Common Issues

### Clerk Issues

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

### Stripe Issues

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

### Supabase Issues

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

## 🔄 When You're Ready to Go Live

### Switching from Test to Live Mode

**⚠️ Important**: Only do this when you're ready to accept real donations!

### Stripe - Enable Live Mode

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

### Clerk - Switch to Production

1. **In Clerk Dashboard**
   - Go to your application settings
   - Update domain from `localhost` to your live domain
   - Update redirect URLs to use your live domain

### Supabase - Production Setup

1. **Update Allowed Origins**
   - Go to Authentication → Settings
   - Add your live domain to allowed origins
   - Example: `https://admin.yourorganization.com`

### Update PassItOn Configuration

1. **Update .env.local with Live Keys**
   ```env
   # Use live keys instead of test keys
   STRIPE_SECRET_KEY=sk_live_[your-live-stripe-key]
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_[your-live-stripe-key]
   ```

**🎉 You're now accepting real donations!**

---

## 💡 Pro Tips for Success

### Security Best Practices

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

### Financial Management

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

### Getting Help

**Service-Specific Support:**
- **Clerk**: [clerk.com/support](https://clerk.com/support)
- **Stripe**: [stripe.com/support](https://stripe.com/support)  
- **Supabase**: [supabase.com/support](https://supabase.com/support)

**PassItOn Support:**
- **Email**: support@passiton.com
- **Live Chat**: Available in your admin dashboard

**📞 Need Help?** Don't hesitate to reach out - we're here to help you succeed!