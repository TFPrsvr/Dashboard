<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Cross-Project Testing Guide</span>

</div>

This guide covers testing the complete PassItOn system when both the Admin Dashboard and Donor Widget projects are deployed together.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Project Architecture Overview</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 Two-Project System</span>

</div>

**PassItOn Admin Dashboard** (this project):
- Organization management
- Widget configuration
- User authentication and roles
- Payment settings and Stripe Connect
- Analytics and reporting
- Team management

**PassItOn Donor Widget** (separate project):
- Embeddable donation widget
- Payment processing interface
- Donor-facing forms
- Real-time donation submission
- Widget customization rendering

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 Integration Points</span>

</div>

The two projects communicate through:

1. **Shared Database (Supabase)**:
   - Organizations table
   - Widgets table  
   - Donations table
   - User configurations

2. **Shared Services**:
   - Stripe payment processing
   - Email notifications
   - Authentication context

3. **API Communications**:
   - Widget fetches configuration from Admin API
   - Donation submissions update Admin database
   - Real-time synchronization between projects

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing Requirements</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">🧪 Why Cross-Project Testing Matters</span>

</div>

**Single Project Testing Limitations**:
- Widget configuration in Admin might not render correctly in actual widget
- Database changes in Admin might break widget functionality  
- Authentication flows might work in Admin but fail in widget context
- Payment processing might succeed in Admin but fail in embedded widget

**Cross-Project Testing Benefits**:
- Validates complete end-to-end user journey
- Ensures configuration changes take effect in live widgets
- Tests real-world embedding scenarios
- Validates payment processing in actual donor context

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Development Environment Testing</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">⚙️ Local Development Setup</span>

</div>

**Option 1: Both Projects Local**
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Terminal 1: Admin Dashboard</span>

</div>
cd PassItOn-Admin
npm run dev  # Runs on localhost:3000

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Terminal 2: Donor Widget  </span>

</div>
cd PassItOn-Widget
npm run dev  # Runs on localhost:3001
```

**Option 2: Admin Local, Widget Deployed**
```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Admin Dashboard local</span>

</div>
cd PassItOn-Admin
npm run dev  # localhost:3000

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 Widget uses deployed version</span>

</div>
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Update widget config to point to production widget URL</span>

</div>
```

**Option 3: Admin Deployed, Widget Local**
```bash
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Widget local for testing</span>

</div>
cd PassItOn-Widget
npm run dev  # localhost:3001

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 Admin uses deployed version</span>

</div>
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test widget changes against production admin</span>

</div>
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Environment Configuration</span>

</div>

**Shared Environment Variables**:
Both projects must share:
- Same Supabase database URL and keys
- Same Stripe account keys
- Compatible API endpoint configurations

**Admin Dashboard .env.local**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Widget project endpoint for testing</span>

</div>
NEXT_PUBLIC_WIDGET_URL=http://localhost:3001  # or deployed URL
```

**Donor Widget .env.local**:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔌 Admin dashboard endpoint for API calls</span>

</div>
NEXT_PUBLIC_ADMIN_URL=http://localhost:3000  # or deployed URL
```

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Cross-Project Test Scenarios</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 1. Widget Configuration Flow</span>

</div>

**Test: Admin Changes Reflect in Live Widget**

**Steps**:
1. **Create Widget in Admin**:
   ```bash
   # Admin Dashboard (localhost:3000)
   - Login to admin dashboard
   - Create new widget with specific configuration:
     * Name: "Test Cross-Project Widget"
     * Color: #FF5722 (orange)
     * Default amount: $25
     * Position: bottom-right
   - Save configuration
   - Note the widget ID and embed code
   ```

2. **Embed Widget in Test Page**:
   ```html
   <!-- Create test.html with widget embed code -->
   <!DOCTYPE html>
   <html>
   <head>
       <title>Widget Test Page</title>
   </head>
   <body>
       <h1>Test Donation Page</h1>
       <p>Widget should appear below...</p>
       
       <script>
         window.PassItOnConfig = {
           organizationId: 'org_your_test_org_id',
           widgetId: 'widget_id_from_admin'
         };
       </script>
       <script src="http://localhost:3001/embed.js"></script>  <!-- Widget project -->
   </body>
   </html>
   ```

3. **Verify Configuration**:
   - [ ] Widget appears with correct orange color (#FF5722)
   - [ ] Default donation amount shows $25
   - [ ] Widget positions in bottom-right corner
   - [ ] Widget displays "Test Cross-Project Widget" branding

4. **Test Live Updates**:
   - Change widget color to blue (#2196F3) in Admin Dashboard
   - Refresh test page
   - [ ] Widget should update to blue color
   - [ ] Changes should appear within 30 seconds

**Expected Result**: Changes in Admin Dashboard immediately reflect in embedded widget

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 2. End-to-End Donation Flow</span>

</div>

**Test: Complete Donation Process Across Projects**

**Steps**:
1. **Setup in Admin Dashboard**:
   ```bash
   # Admin Dashboard
   - Ensure Stripe Connect is configured
   - Verify test mode is enabled
   - Create test widget with custom settings
   - Set up email notifications
   ```

2. **Process Donation in Widget**:
   ```bash
   # Test Page with Embedded Widget
   - Click donate button on test page
   - Fill donation form with test data:
     * Amount: $50
     * Name: John Test Donor
     * Email: test@example.com
     * Test Credit Card: 4242 4242 4242 4242
   - Submit donation
   ```

3. **Verify in Admin Dashboard**:
   - [ ] Donation appears in dashboard within 2 minutes
   - [ ] Donation amount shows $50
   - [ ] Donor name shows "John Test Donor"
   - [ ] Donor email shows "test@example.com"
   - [ ] Payment status shows "Completed" or "Test"
   - [ ] Stripe transaction ID is recorded

4. **Check Stripe Dashboard**:
   - [ ] Payment appears in Stripe dashboard
   - [ ] Amount and details match admin dashboard
   - [ ] Test mode indicator is visible

**Expected Result**: Donation flows seamlessly from widget to admin dashboard to Stripe

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 3. Real-time Synchronization Testing</span>

</div>

**Test: Live Updates Between Projects**

**Steps**:
1. **Setup Multiple Browser Windows**:
   ```bash
   # Window 1: Admin Dashboard (localhost:3000)
   # Window 2: Test page with widget (test.html)
   # Window 3: Admin Dashboard analytics/donations page
   ```

2. **Process Multiple Donations**:
   ```bash
   # In Widget (Window 2)
   - Make donation #1: $25
   - Make donation #2: $100  
   - Make donation #3: $15
   ```

3. **Monitor Real-time Updates**:
   - [ ] Window 3 (Admin analytics) updates with new donations
   - [ ] Total donation amounts update in real-time
   - [ ] Donation count increases correctly
   - [ ] Recent donations list updates

**Expected Result**: Admin dashboard reflects widget donations in real-time

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 4. Authentication Context Testing</span>

</div>

**Test: User Authentication Across Projects**

**Steps**:
1. **Admin User Session**:
   ```bash
   # Admin Dashboard
   - Login as organization admin
   - Note user session and organization context
   ```

2. **Widget in Organization Context**:
   ```html
   <!-- Embed widget with organization context -->
   <script>
     window.PassItOnConfig = {
       organizationId: 'org_from_admin_session',
       // Should inherit some context from admin session
     };
   </script>
   ```

3. **Test Authentication Flow**:
   - [ ] Widget loads correctly for authenticated organization
   - [ ] Widget inherits appropriate organization branding
   - [ ] Widget restrictions respect organization settings
   - [ ] Donations properly associate with organization

**Expected Result**: Widget respects admin authentication and organization context

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🚀 Production Deployment Testing</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Staging Environment Testing</span>

</div>

**Setup**:
```bash
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 Both projects deployed to staging</span>

</div>
Admin Dashboard: https://admin-staging.passiton.com
Donor Widget: https://widget-staging.passiton.com
```

**Test Scenarios**:
1. **Cross-Domain Communication**:
   - [ ] Widget (widget-staging.passiton.com) can communicate with Admin API
   - [ ] CORS settings allow cross-domain requests
   - [ ] Authentication tokens work across domains

2. **SSL/HTTPS Testing**:
   - [ ] All communications use HTTPS
   - [ ] Mixed content warnings don't appear
   - [ ] SSL certificates are valid for both domains

3. **Production-like Data**:
   - [ ] Test with realistic organization data
   - [ ] Test with multiple organizations
   - [ ] Verify data isolation between organizations

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Live Production Testing</span>

</div>

**Pre-Go-Live Checklist**:
```bash
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 Both projects deployed to production</span>

</div>
Admin Dashboard: https://admin.passiton.com  
Donor Widget: https://widget.passiton.com
```

**Smoke Tests**:
1. **Basic Functionality**:
   - [ ] Admin dashboard loads and functions
   - [ ] Widget embed code generates correctly
   - [ ] Test widget appears on test page
   - [ ] Sample donation processes successfully

2. **Integration Points**:
   - [ ] Admin configuration changes reflect in widget
   - [ ] Widget donations appear in admin dashboard
   - [ ] Stripe processing works end-to-end
   - [ ] Email notifications send correctly

3. **Performance Testing**:
   - [ ] Widget loads quickly (< 2 seconds)
   - [ ] Admin dashboard responsive (< 3 seconds)
   - [ ] Database queries perform well under load
   - [ ] API endpoints respond quickly

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing Tools and Scripts</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Automated Testing Scripts</span>

</div>

**Cross-Project Integration Test Script**:
```javascript
// test-cross-project.js
const { test, expect } = require('@playwright/test');

test('Cross-project donation flow', async ({ page, context }) => {
  // Step 1: Setup widget in admin
  const adminPage = await context.newPage();
  await adminPage.goto('http://localhost:3000/dashboard');
  await adminPage.click('[data-testid="create-widget"]');
  await adminPage.fill('[name="widget-name"]', 'Test Widget');
  await adminPage.click('[data-testid="save-widget"]');
  
  // Step 2: Test widget on external page
  await page.goto('http://localhost:8080/test.html'); // Test page
  await page.click('.passiton-donate-button');
  await page.fill('[name="amount"]', '25');
  await page.fill('[name="email"]', 'test@example.com');
  await page.click('[data-testid="submit-donation"]');
  
  // Step 3: Verify in admin dashboard
  await adminPage.goto('http://localhost:3000/dashboard/donations');
  await expect(adminPage.locator('[data-testid="donation-amount"]')).toContainText('$25');
});
```

**Widget Configuration Sync Test**:
```javascript
// test-widget-sync.js
test('Widget configuration synchronization', async ({ page, context }) => {
  const adminPage = await context.newPage();
  
  // Change widget color in admin
  await adminPage.goto('http://localhost:3000/dashboard/widget/customize');
  await adminPage.click('[data-testid="color-picker"]');
  await adminPage.click('[data-color="#FF5722"]'); // Orange
  await adminPage.click('[data-testid="save-changes"]');
  
  // Check widget reflects changes
  await page.goto('http://localhost:8080/test.html');
  const widget = page.locator('.passiton-widget-button');
  await expect(widget).toHaveCSS('background-color', 'rgb(255, 87, 34)'); // Orange
});
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Manual Testing Checklist</span>

</div>

**Daily Cross-Project Testing** (Development):
- [ ] Create new widget in admin, verify it embeds correctly
- [ ] Process test donation, verify it appears in admin
- [ ] Change widget settings, verify changes reflect in embedded widget
- [ ] Test on different browsers and devices

**Weekly Integration Testing** (Staging):
- [ ] Full end-to-end donation flow testing
- [ ] Multi-organization testing
- [ ] Performance and load testing
- [ ] Security and authentication testing

**Monthly Production Testing**:
- [ ] Live cross-project integration verification
- [ ] Production data consistency checks  
- [ ] Performance monitoring and optimization
- [ ] User feedback incorporation

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Common Cross-Project Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Configuration Sync Issues</span>

</div>

**Problem**: Changes in Admin don't appear in Widget
**Diagnosis**:
```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔌 Check API connectivity</span>

</div>
curl -X GET http://localhost:3000/api/widgets/widget-id

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Check database state</span>

</div>
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 In Supabase dashboard, verify widget configuration updated</span>

</div>

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check widget caching</span>

</div>
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Clear browser cache, check widget fetches fresh config</span>

</div>
```

**Solutions**:
- Verify API endpoints are accessible from widget
- Check for caching issues preventing updates
- Ensure database transactions complete successfully
- Validate CORS settings allow cross-project communication

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Payment Processing Issues</span>

</div>

**Problem**: Payments succeed in widget but don't appear in admin
**Diagnosis**:
```bash
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check webhook delivery in Stripe dashboard</span>

</div>
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔧 Verify webhook endpoints are configured for both projects</span>

</div>
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🗄️ Check database for partial transaction records</span>

</div>

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Monitor webhook logs</span>

</div>
tail -f admin-dashboard.log | grep webhook
```

**Solutions**:
- Verify webhook URLs are correct for production domains
- Check webhook secret configuration matches
- Ensure database write permissions are correct
- Validate payment processing flow end-to-end

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔐 Authentication Context Issues</span>

</div>

**Problem**: Widget doesn't respect organization context
**Diagnosis**:
```bash
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Check organization ID in widget embed code</span>

</div>
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔌 Verify API returns correct organization data</span>

</div>
<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔐 Check authentication token passing between projects</span>

</div>
```

**Solutions**:
- Ensure organization ID is correctly embedded
- Validate API authentication middleware
- Check cross-domain authentication token handling

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Best Practices</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Development Workflow</span>

</div>

1. **Feature Development**:
   - Develop admin dashboard features first
   - Test admin functionality thoroughly
   - Implement corresponding widget features
   - Test cross-project integration
   - Deploy both projects together

2. **Testing Strategy**:
   - Unit tests for individual project components
   - Integration tests for database interactions
   - Cross-project tests for end-to-end flows
   - Manual testing for user experience validation

3. **Deployment Coordination**:
   - Deploy both projects to staging simultaneously
   - Run full cross-project test suite
   - Deploy to production in coordinated manner
   - Monitor both projects post-deployment

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Monitoring and Maintenance</span>

</div>

1. **Health Checks**:
   - Monitor API endpoints on both projects
   - Check database connectivity and performance
   - Verify payment processing pipelines
   - Track error rates and response times

2. **Data Consistency**:
   - Regular database integrity checks
   - Cross-project data synchronization verification
   - Payment reconciliation between systems
   - User session and authentication validation

3. **Performance Monitoring**:
   - Widget embedding performance metrics
   - Admin dashboard load time monitoring
   - Database query performance tracking
   - Cross-project API call latency

Cross-project testing ensures the complete PassItOn system works seamlessly for both administrators and donors, providing confidence in the full user experience.