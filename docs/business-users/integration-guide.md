<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 PassItOn Donation Widget</span>
<span style="font-size: 1.5rem; opacity: 0.9;">🔗 Complete Integration Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 2rem; font-weight: 800;">📝 Table of Contents</span>

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; margin-top: 1rem;">

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem;">
<li style="margin: 0.3rem 0;"><strong>1. 📊 [Overview](#overview)</strong></li>
<li style="margin: 0.3rem 0;"><strong>2. 🏢 [System Architecture](#system-architecture)</strong></li>
<li style="margin: 0.3rem 0;"><strong>3. 💼 [For Business Users (Non-Technical)](#for-business-users-non-technical)</strong></li>
<li style="margin: 0.3rem 0;"><strong>4. 👨‍💻 [For Developers](#for-developers)</strong></li>
</ul>
</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem;">
<li style="margin: 0.3rem 0;"><strong>5. 🎯 [Dashboard Setup Process](#dashboard-setup-process)</strong></li>
<li style="margin: 0.3rem 0;"><strong>6. 🔗 [Widget Integration Process](#widget-integration-process)</strong></li>
<li style="margin: 0.3rem 0;"><strong>7. 🌐 [Embedding on Websites](#embedding-on-websites)</strong></li>
<li style="margin: 0.3rem 0;"><strong>8. ✅ [Testing & Verification](#testing--verification)</strong></li>
</ul>
</div>

<div style="background: rgba(255,255,255,0.2); padding: 1rem; border-radius: 8px;">
<ul style="list-style: none; padding: 0; margin: 0; font-size: 1rem;">
<li style="margin: 0.3rem 0;"><strong>9. 🔍 [Troubleshooting](#troubleshooting)</strong></li>
<li style="margin: 0.3rem 0;"><strong>10. 💪 [Best Practices](#best-practices)</strong></li>
</ul>
</div>

</div>

</div>

---

<div style="background: #ecfdf5; border-left: 5px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="color: #047857; font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

<p style="font-size: 1.1rem; line-height: 1.7; color: #374151;">PassItOn is a donation widget system that consists of two main parts:</p>

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1rem 0;">

<div style="background: #d1fae5; border: 2px solid #10b981; border-radius: 10px; padding: 1.5rem;">
<h3 style="color: #065f46; margin: 0 0 1rem 0; font-size: 1.3rem;">🎯 1. Dashboard</h3>
<p style="color: #374151; margin: 0;">Where organizations configure their donation widgets</p>
</div>

<div style="background: #cffafe; border: 2px solid #06b6d4; border-radius: 10px; padding: 1.5rem;">
<h3 style="color: #0e7490; margin: 0 0 1rem 0; font-size: 1.3rem;">🌐 2. Widget</h3>
<p style="color: #374151; margin: 0;">The actual donation form that appears on websites</p>
</div>

</div>

<div style="background: #f0fdfa; border: 2px dashed #14b8a6; padding: 1.5rem; border-radius: 10px; margin: 1rem 0;">
<h4 style="color: #0f766e; margin: 0 0 1rem 0; font-size: 1.2rem;">💡 Think of it like this:</h4>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7; list-style: none; padding: 0;">
<li style="margin: 0.5rem 0;"><strong style="color: #10b981;">🎯 Dashboard</strong> = The control panel (like your thermostat)</li>
<li style="margin: 0.5rem 0;"><strong style="color: #06b6d4;">🌐 Widget</strong> = What people see and use (like the temperature in your room)</li>
</ul>
</div>

</div>

---

<div style="background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 2rem; font-weight: 800;">🏢 System Architecture</span>

</div>

<div style="background: #f0fdf4; border: 2px solid #16a34a; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<span style="color: #15803d; font-size: 1.8rem; font-weight: 700;">🔄 How the Two Systems Connect</span>

<div style="background: #374151; color: #e5e7eb; padding: 2rem; border-radius: 10px; font-family: monospace; font-size: 1.1rem; margin: 1rem 0; text-align: center; line-height: 2;">
[🌐 Organization's Website] 
         ↓ (embed script)
[💳 Donation Widget] 
         ↓ (gets configuration from)
[📊 Dashboard API] 
         ↓ (stores data in)
[🗺️ Database]
</div>

<span style="color: #15803d; font-size: 1.8rem; font-weight: 700;">📊 Key Components</span>

<div style="display: grid; gap: 1rem; margin: 1rem 0;">

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.2rem; border-radius: 8px;">
<strong style="font-size: 1.2rem;">🎯 Dashboard (Port 3001):</strong> Admin interface for configuring widgets
</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.2rem; border-radius: 8px;">
<strong style="font-size: 1.2rem;">🌐 Widget (Port 3000):</strong> The donation form that customers see
</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.2rem; border-radius: 8px;">
<strong style="font-size: 1.2rem;">🗺️ Database:</strong> Stores all configuration and donation data
</div>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.2rem; border-radius: 8px;">
<strong style="font-size: 1.2rem;">🔗 API:</strong> Connects the dashboard and widget together
</div>

</div>

</div>

---

<div style="background: linear-gradient(135deg, #14b8a6 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 2rem; font-weight: 800;">💼 For Business Users (Non-Technical)</span>

</div>

<div style="background: #f0fdfa; border: 2px solid #14b8a6; padding: 2rem; border-radius: 12px; margin: 2rem 0;">

<span style="color: #0f766e; font-size: 1.8rem; font-weight: 700;">🚀 Quick Start Resources</span>

<div style="display: grid; gap: 1rem; margin: 1rem 0;">

<div style="background: #d1fae5; border-left: 6px solid #10b981; padding: 1.2rem; border-radius: 8px;">
<strong style="color: #065f46; font-size: 1.1rem;">📝 [Complete Onboarding Guide](./onboarding-guide.md)</strong><br>
<em style="color: #047857;">Step-by-step setup process</em>
</div>

<div style="background: #cffafe; border-left: 6px solid #06b6d4; padding: 1.2rem; border-radius: 8px;">
<strong style="color: #0e7490; font-size: 1.1rem;">🔗 [Platform Integration Guides](./platform-guides/)</strong><br>
<em style="color: #0891b2;">WordPress, Shopify, Wix, Squarespace</em>
</div>

<div style="background: #fef3c7; border-left: 6px solid #f59e0b; padding: 1.2rem; border-radius: 8px;">
<strong style="color: #d97706; font-size: 1.1rem;">🔍 [User Troubleshooting Guide](./user-troubleshooting-guide.md)</strong><br>
<em style="color: #f59e0b;">Visual problem-solving help</em>
</div>

</div>

<span style="color: #0f766e; font-size: 1.8rem; font-weight: 700;">💡 What You Need to Know</span>

<div style="counter-reset: know-counter; margin: 1rem 0;">

<div style="counter-increment: know-counter; background: #ecfdf5; border-left: 6px solid #10b981; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #10b981; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">1</div>

<h4 style="color: #059669; font-size: 1.4rem; margin-top: 0;">🏢 Setting Up Your Organization</h4>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7;">
<li>🔑 You'll receive login credentials for the dashboard</li>
<li>🌐 Access the dashboard at your provided URL</li>
<li>📝 Complete your organization profile with:</li>
<ul style="margin-left: 1.5rem;">
<li>Organization name</li>
<li>Contact information</li>
<li>Stripe payment account details</li>
</ul>
</ul>

</div>

<div style="counter-increment: know-counter; background: #f0f9ff; border-left: 6px solid #0ea5e9; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #0ea5e9; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">2</div>

<h4 style="color: #0284c7; font-size: 1.4rem; margin-top: 0;">🎨 Customizing Your Widget</h4>
<p style="color: #374151; margin: 0.5rem 0;">The dashboard lets you control:</p>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7;">
<li><strong>🎨 Colors:</strong> Match your brand colors</li>
<li><strong>💰 Donation amounts:</strong> Set suggested amounts ($10, $25, $50, etc.)</li>
<li><strong>💳 Payment options:</strong> Credit card, bank transfer, recurring donations</li>
<li><strong>✨ Appearance:</strong> Fonts, button styles, layout</li>
</ul>

</div>

<div style="counter-increment: know-counter; background: #fef3c7; border-left: 6px solid #f59e0b; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px; position: relative;">
<div style="position: absolute; top: -10px; left: -10px; background: #f59e0b; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold;">3</div>

<h4 style="color: #d97706; font-size: 1.4rem; margin-top: 0;">📦 Getting Your Widget Code</h4>
<p style="color: #374151; margin: 0.5rem 0;">After customization, you'll receive:</p>
<ul style="color: #374151; font-size: 1.1rem; line-height: 1.7;">
<li>📝 A simple code snippet (like HTML)</li>
<li>🆔 Your unique organization ID</li>
<li>📋 Instructions for your web developer</li>
</ul>

</div>

<div style="background: #f3e8ff; border-left: 6px solid #a855f7; padding: 1.5rem; margin: 1.5rem 0; border-radius: 8px;">

<h4 style="color: #9333ea; font-size: 1.4rem; margin-top: 0;">🌐 How It Appears on Your Website</h4>
<p style="color: #374151; margin: 0.5rem 0;">Your widget can appear as:</p>

<div style="display: grid; gap: 1rem; margin: 1rem 0;">

<div style="background: #e0e7ff; padding: 1rem; border-radius: 8px;">
<strong style="color: #4f46e5; font-size: 1.1rem;">🔘 Floating button:</strong><br>
<span style="color: #374151;">Appears in corner of every page</span>
</div>

<div style="background: #ecfdf5; padding: 1rem; border-radius: 8px;">
<strong style="color: #059669; font-size: 1.1rem;">📊 Embedded form:</strong><br>
<span style="color: #374151;">Built into specific pages</span>
</div>

<div style="background: #fef3c7; padding: 1rem; border-radius: 8px;">
<strong style="color: #d97706; font-size: 1.1rem;">🎆 Pop-up modal:</strong><br>
<span style="color: #374151;">Opens when people click "Donate"</span>
</div>

</div>

</div>

</div>

</div>

</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📋 Step-by-Step Process for Business Users</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📊 Step 1: Access Your Dashboard</span>

<div style="margin-top: 1rem;">
1. Go to your provided dashboard URL
2. Sign in with your credentials
3. Navigate to "Widget Customize"

</div>

</div>

<div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #059669;">🎨 Step 2: Brand Your Widget</span>

<div style="margin-top: 1rem;">
1. **Choose Colors**:
   - Primary color (main buttons and headers)
   - Secondary color (accents and borders)
   - Background color (usually white)

2. **Set Donation Amounts**:
   - Minimum donation amount
   - Suggested amounts (like $10, $25, $50)
   - Allow custom amounts option

3. **Configure Options**:
   - Show/hide donor list
   - Allow recurring donations
   - Show fee coverage option

</div>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">🧪 Step 3: Test Your Widget</span>

<div style="margin-top: 1rem;">
1. Use the "Test Widget" page to see your changes
2. Try different donation amounts
3. Test on mobile and desktop
4. **Important**: Refresh the test page after making changes

</div>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📦 Step 4: Get Integration Code</span>

<div style="margin-top: 1rem;">
1. Copy the provided embed code
2. Share with your web developer
3. Provide your organization ID

</div>

</div>

<div style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #16a34a;">🚀 Step 5: Go Live</span>

<div style="margin-top: 1rem;">
1. Your developer adds the code to your website
2. Test live donations (small amounts first)
3. Monitor donations through the dashboard

</div>

</div>

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">👨‍💻 For Developers</span>

</div>

<div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #059669;">🔧 Technical Overview</span>

<div style="margin-top: 1rem;">

The PassItOn system uses a microservices architecture with two main applications:

1. **Dashboard Application** (Next.js)
   - Admin interface for widget configuration
   - User authentication via Clerk
   - Database management via Supabase
   - API endpoints for widget configuration

2. **Widget Application** (Next.js + Iframe)
   - Donation form interface
   - Stripe payment processing
   - Responsive design with dynamic sizing
   - Cross-origin messaging for embedding

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Prerequisites</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">💻 Required Software</span>

<div style="margin-top: 1rem;">
- Node.js (v18 or higher)
- Docker (for local Supabase)
- Git
- Modern web browser

</div>

</div>

<div style="background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #16a34a;">🔐 Required Accounts</span>

<div style="margin-top: 1rem;">
- Supabase account (database)
- Clerk account (authentication)
- Stripe account (payments)

</div>

</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🛠️ Development Environment Setup</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📊 1. Dashboard Setup</span>

<div style="margin-top: 1rem;">
```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Clone the dashboard repository</span>

</div>
git clone [dashboard-repo-url]
cd PassItOn-Admin

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📦 Install dependencies</span>

</div>
npm install

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Configure environment variables</span>

</div>
cp .env.example .env.local

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Required environment variables:</span>

</div>
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Start development server</span>

</div>
npm run dev
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Dashboard runs on http://localhost:3001</span>

</div>
```

</div>

</div>

<div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #059669;">🎯 2. Widget Setup</span>

<div style="margin-top: 1rem;">
```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Clone the widget repository</span>

</div>
git clone [widget-repo-url]
cd Donor-widget/passiton

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📦 Install dependencies</span>

</div>
npm install

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Configure environment variables</span>

</div>
cp .env.example .env.local

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Required environment variables:</span>

</div>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Start development server</span>

</div>
npm run dev
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Widget runs on http://localhost:3000</span>

</div>
```

</div>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🗄️ 3. Database Setup</span>

<div style="margin-top: 1rem;">
```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 In dashboard directory</span>

</div>
npx supabase start
npx supabase db reset
```

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;"><span style="font-size: 1.8rem; font-weight: 700;">📊 Dashboard Setup Process</span></div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🏗️ Architecture Components</span></div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.3rem; font-weight: 600; color: #d97706;">🗄️ 1. Database Schema</span></div>

```sql
-- Organizations table
organizations (
  id UUID PRIMARY KEY,
  name TEXT,
  email TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Widgets table
widgets (
  id UUID PRIMARY KEY,
  organization_id UUID REFERENCES organizations(id),
  name TEXT,
  slug TEXT,
  config JSONB,
  is_active BOOLEAN,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Users table (Clerk integration)
users (
  id TEXT PRIMARY KEY, -- Clerk user ID
  email TEXT,
  role TEXT,
  organization_id UUID REFERENCES organizations(id),
  created_at TIMESTAMP
);
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔌 2. **API Endpoints**</span>

</div>

**Widget Configuration API** (`/api/widget-config/[orgId]`)
```typescript
// GET request returns widget configuration
{
  id: string,
  name: string,
  organizationId: string,
  organizationName: string,
  config: {
    theme: {
      primaryColor: string,
      secondaryColor: string,
      backgroundColor: string,
      textColor: string,
      headerColor: string,
      fontFamily: string,
      borderRadius: number,
      headerAlignment: string
    },
    settings: {
      showProgressBar: boolean,
      showDonorList: boolean,
      allowRecurring: boolean,
      minimumDonation: number,
      suggestedAmounts: number[],
      showCoverFees: boolean,
      defaultFrequency: string
    },
    causes: array
  }
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔐 3. **Authentication Flow**</span>

</div>
1. User signs in via Clerk
2. Clerk provides JWT token
3. Token validated on protected routes
4. User associated with organization
5. Organization access controls applied

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Widget Integration Process</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 How Widget Connects to Dashboard</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔧 1. **Configuration Loading**</span>

</div>
```javascript
// Widget requests configuration from dashboard
const response = await fetch(
  `${DASHBOARD_URL}/api/widget-config/${organizationId}`
);
const config = await response.json();
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 2. **Dynamic Styling**</span>

</div>
```javascript
// Widget applies configuration to UI
const theme = config.theme;
document.documentElement.style.setProperty('--primary-color', theme.primaryColor);
document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 3. **Cross-Origin Communication**</span>

</div>
```javascript
// Widget communicates with parent window
window.parent.postMessage({
  type: 'PASSITON_RESIZE',
  height: newHeight
}, '*');

// Parent window handles messages
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_RESIZE') {
    iframe.style.height = event.data.height + 'px';
  }
});
```

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Embedding on Websites</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 1: Simple Embed Script (Recommended)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Business Users:</span>

</div>
"Just add this code to your website where you want the donate button to appear"

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Developers:</span>

</div>
```html
<!-- Add before closing </body> tag -->
<script>
  window.PassItOnConfig = {
    organizationId: 'your-org-id-here',
    defaultAmount: 25,
    color: '#0891B2',
    buttonText: 'Donate Now',
    position: 'bottom-right'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 2: Inline Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Specific Page Placement:</span>

</div>
```html
<!-- Create container where you want the widget -->
<div id="donation-widget-container">
  <p>Loading donation form...</p>
</div>

<!-- Configuration -->
<script>
  window.PassItOnConfig = {
    targetElementId: 'donation-widget-container',
    organizationId: 'your-org-id-here',
    defaultAmount: 50,
    color: '#0891B2',
    buttonText: 'Support Our Cause'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 3: WordPress Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For WordPress Users:</span>

</div>
1. Go to your WordPress admin
2. Navigate to Appearance → Theme Editor
3. Add the embed code to your theme's footer.php file
4. Or use a plugin like "Insert Headers and Footers"

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 WordPress Plugin Method:</span>

</div>
```php
// Add to functions.php
function add_passiton_widget() {
    ?>
    <script>
      window.PassItOnConfig = {
        organizationId: '<?php echo get_option('passiton_org_id'); ?>',
        defaultAmount: 25,
        color: '#0891B2',
        buttonText: 'Donate Now',
        position: 'bottom-right'
      };
    </script>
    <script src="https://your-widget-domain.com/embed.js"></script>
    <?php
}
add_action('wp_footer', 'add_passiton_widget');
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Configuration Options</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Available Parameters:</span>

</div>
```javascript
window.PassItOnConfig = {
  // Required
  organizationId: 'your-unique-org-id',
  
  // Optional - Appearance
  color: '#0891B2',              // Primary button color
  buttonText: 'Donate Now',      // Button text
  position: 'bottom-right',      // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  
  // Optional - Behavior
  defaultAmount: 25,             // Default donation amount
  targetElementId: 'my-div',     // For inline embedding
  
  // Optional - Advanced
  showPoweredBy: true,           // Show "Powered by PassItOn"
  theme: 'light',                // 'light' or 'dark'
  language: 'en'                 // Language code
};
```

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing & Verification</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Business Users</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 1. **Dashboard Testing**</span>

</div>
- [ ] Can log in to dashboard
- [ ] Can change widget colors
- [ ] Can set donation amounts
- [ ] Can save changes successfully

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 2. **Widget Testing**</span>

</div>
- [ ] Widget appears on test page
- [ ] Colors match your brand
- [ ] Donation amounts are correct
- [ ] Test page refreshes show changes

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 3. **Website Testing**</span>

</div>
- [ ] Widget appears on your website
- [ ] Donate button works
- [ ] Payment form opens
- [ ] Can complete test donation

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Developers</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 1. **Development Testing**</span>

</div>
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test dashboard API</span>

</div>
curl http://localhost:3001/api/widget-config/your-org-id

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test widget loading</span>

</div>
open http://localhost:3000/test-embed-page.html

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test integration</span>

</div>
open http://localhost:3000/live-widget-test.html
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 2. **Integration Testing**</span>

</div>
```javascript
// Test configuration loading
async function testConfig() {
  const response = await fetch('/api/widget-config/test-org-id');
  const config = await response.json();
  console.log('Configuration loaded:', config);
}

// Test widget initialization
window.PassItOnWidget.init({
  organizationId: 'test-org-id',
  targetElementId: 'test-container'
});
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 3. **Cross-Browser Testing**</span>

</div>
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers
- [ ] Different screen sizes

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Test Scenarios</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 Essential Tests:</span>

</div>
1. **Widget loads correctly**
2. **Configuration applies properly**
3. **Payment form functions**
4. **Cross-origin embedding works**
5. **Responsive design adapts**

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Edge Cases:</span>

</div>
1. **Slow network connections**
2. **JavaScript disabled**
3. **Ad blockers active**
4. **Mobile devices**
5. **Multiple widgets on same page**

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Issues for Business Users</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Widget not showing up"</span>

</div>
**Problem**: The donate button doesn't appear on your website
**Solutions**:
1. Check if the code was added correctly
2. Make sure your organization ID is correct
3. Verify the widget is activated in the dashboard
4. Try refreshing the page

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Wrong colors showing"</span>

</div>
**Problem**: Widget colors don't match what you set in dashboard
**Solutions**:
1. Refresh the test page after making changes
2. Clear your browser cache
3. Check if you saved changes in dashboard
4. Wait a few minutes for changes to propagate

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Donation form not working"</span>

</div>
**Problem**: People can't complete donations
**Solutions**:
1. Verify Stripe account is connected
2. Check payment methods are enabled
3. Test with small amounts first
4. Contact technical support

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Technical Issues for Developers</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 CORS Errors</span>

</div>
**Problem**: Cross-origin requests blocked
```javascript
// Solution: Add CORS headers to API responses
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🗄️ Database Connection Issues</span>

</div>
**Problem**: "relation does not exist" errors
```sql
-- Solution: Run database migrations
npx supabase db reset
-- Or handle missing tables gracefully in code
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔐 Authentication Failures</span>

</div>
**Problem**: Users can't access dashboard
```javascript
// Solution: Verify Clerk configuration
console.log('Clerk publishable key:', process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Widget Not Loading</span>

</div>
**Problem**: Embed script fails
```javascript
// Solution: Check network requests
console.log('Loading widget for org:', organizationId);
fetch(`/api/widget-config/${organizationId}`)
  .then(response => response.json())
  .then(config => console.log('Config loaded:', config))
  .catch(error => console.error('Config failed:', error));
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Debugging Steps</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Business Users:</span>

</div>
1. **Check browser console** (F12 key → Console tab)
2. **Look for error messages**
3. **Try different browsers**
4. **Contact technical support with screenshots**

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Developers:</span>

</div>
1. **Check network requests** in browser DevTools
2. **Verify environment variables** are set correctly
3. **Test API endpoints** directly
4. **Check server logs** for errors
5. **Use browser debugging tools**

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Best Practices</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Business Users</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔧 Configuration Best Practices:</span>

</div>
1. **Test thoroughly** before going live
2. **Use brand colors** consistently
3. **Set reasonable donation amounts** (not too high/low)
4. **Monitor performance** regularly
5. **Update payment settings** as needed

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Content Best Practices:</span>

</div>
1. **Clear donation purposes** - Explain what donations support
2. **Transparent fee structure** - Show if fees are added
3. **Thank donors promptly** - Set up automatic thank you messages
4. **Regular updates** - Keep donors informed about impact

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Developers</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔒 Security Best Practices:</span>

</div>
```javascript
// Validate all inputs
function validateOrgId(orgId) {
  if (!orgId || typeof orgId !== 'string') {
    throw new Error('Invalid organization ID');
  }
  return orgId.replace(/[^a-zA-Z0-9-]/g, '');
}

// Use environment variables for secrets
const stripeKey = process.env.STRIPE_SECRET_KEY;
if (!stripeKey) {
  throw new Error('Stripe key not configured');
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Performance Best Practices:</span>

</div>
```javascript
// Cache configuration responses
const configCache = new Map();
function getCachedConfig(orgId) {
  if (configCache.has(orgId)) {
    return configCache.get(orgId);
  }
  // Fetch and cache...
}

// Optimize embed script loading
script.async = true;
script.defer = true;
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Code Quality Best Practices:</span>

</div>
1. **Use TypeScript** for type safety
2. **Implement error boundaries** for React components
3. **Add comprehensive logging** for debugging
4. **Write unit tests** for critical functions
5. **Document API endpoints** thoroughly

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 Deployment Best Practices</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Production Checklist:</span>

</div>
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] SSL certificates installed
- [ ] CDN configured for embed script
- [ ] Monitoring and alerting set up
- [ ] Backup procedures tested
- [ ] Load testing completed

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔒 Security Checklist:</span>

</div>
- [ ] HTTPS enforced everywhere
- [ ] API rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CORS properly configured

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">💬 Support and Resources</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Developers</span>

</div>
- **API Documentation**: `/docs` endpoint on dashboard
- **GitHub Repository**: [Link to repos]
- **Community Forum**: [Link to forum]

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Additional Resources</span>

</div>
- **Stripe Documentation**: https://stripe.com/docs
- **Supabase Documentation**: https://supabase.com/docs
- **Next.js Documentation**: https://nextjs.org/docs
- **React Documentation**: https://react.dev

---

*This guide covers the complete process of integrating the PassItOn donation widget system. For specific technical questions or custom implementations, please contact our development team.*