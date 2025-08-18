<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🔍 Visual Troubleshooting Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

This guide provides step-by-step solutions to common issues with visual explanations. Most problems can be resolved quickly using these troubleshooting steps.

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Table of Contents</span>

</div>

- [Quick Diagnostic Steps](#quick-diagnostic-steps)
- [Widget Not Showing Issues](#widget-not-showing-issues)
- [Payment Processing Problems](#payment-processing-problems)
- [Mobile Display Issues](#mobile-display-issues)
- [Dashboard Access Problems](#dashboard-access-problems)
- [Email Notification Issues](#email-notification-issues)
- [Performance Problems](#performance-problems)
- [Browser Compatibility Issues](#browser-compatibility-issues)
- [When to Contact Support](#when-to-contact-support)

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Quick Diagnostic Steps</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step 1: Check Browser Console (F12)</span>

</div>

**For Everyone (Non-Technical)**
1. **Right-click** on your webpage where the widget should appear
2. **Select "Inspect"** or "Inspect Element"
3. **Click the "Console" tab** at the top
4. **Look for red error messages**

```
🔍 What to Look For:
✅ No errors = Good sign
❌ Red errors = Problem found
⚠️ Yellow warnings = Usually OK, but note them
```

**Common Error Messages:**
- `404 (Not Found)` = Widget code not loading
- `Blocked by CORS` = Cross-origin security issue  
- `Script error` = JavaScript conflict
- `Network error` = Internet connectivity issue

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step 2: Basic Checks</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Widget Visibility Checklist</span>

</div>
```
□ Organization ID is correct in embed code
□ Widget code is placed in the right location
□ Website has been published/saved after adding code
□ Browser cache has been cleared (Ctrl+F5)
□ Adblocker is not blocking the widget
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 Quick Test Process</span>

</div>
1. **Open incognito/private browser window**
2. **Visit your website**
3. **Look for the widget**
4. **Try to make a test donation**

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Widget Not Showing Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "No Donate Button Visible"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Visual Diagnostic Process</span>

</div>

**Step 1: Check Page Source**
```html
Right-click → View Page Source → Search for "PassItOn"

✅ GOOD - You should see:
<script>
  window.PassItOnConfig = {
    organizationId: 'org_abc123xyz',
    ...
  };
</script>

❌ BAD - Code is missing or malformed
```

**Step 2: Verify Organization ID**
```
In your PassItOn Dashboard:
1. Go to Widget → Embed
2. Copy the Organization ID
3. Compare with the ID in your website code

Format should be: org_xxxxxxxxxx
```

**Step 3: Check CSS Conflicts**
```css
/* In browser console, type this to check if widget exists but is hidden: */
document.querySelector('.passiton-widget-button').style.display = 'block';

If button appears, you have a CSS conflict.
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Common Solutions</span>

</div>

**Solution 1: Fix Organization ID**
```html
<!-- WRONG -->
organizationId: 'your-org-id-here',

<!-- RIGHT -->
organizationId: 'org_abc123xyz', // Your actual ID from dashboard
```

**Solution 2: Fix Code Placement**
```html
<!-- For WordPress: Add before </body> in footer.php -->
<!-- For Shopify: Add before </body> in theme.liquid -->
<!-- For Wix: Use HTML embed element -->
<!-- For Squarespace: Use Code Injection in footer -->
```

**Solution 3: Clear CSS Conflicts**
```css
/* Add this CSS to fix common conflicts */
.passiton-widget-button {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  z-index: 9999 !important;
}
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Widget Shows But Looks Wrong"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Visual Problems & Solutions</span>

</div>

**Problem: Wrong Colors**
```javascript
// Check your config colors match your brand
window.PassItOnConfig = {
  color: '#0891B2', // Make sure this is your desired color
  // ... other settings
};
```

**Problem: Button Too Small/Large**
```css
/* Add custom CSS to resize */
.passiton-widget-button {
  padding: 15px 25px !important; /* Adjust size */
  font-size: 16px !important;    /* Adjust text size */
}
```

**Problem: Wrong Position**
```javascript
// Adjust button position
window.PassItOnConfig = {
  position: 'bottom-right', // Try: bottom-left, top-right, top-left
  // ... other settings
};
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Payment Processing Problems</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Donation Form Opens But Won't Accept Payment"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Diagnostic Steps</span>

</div>

**Step 1: Check Stripe Connection**
```
1. Log into PassItOn Dashboard
2. Go to Settings → Payment Settings
3. Look for Stripe connection status:

✅ "Connected" with green checkmark = Good
⚠️ "Connected" with yellow warning = Account needs attention
❌ "Not Connected" = Setup required
```

**Step 2: Verify Test vs Live Mode**
```
Dashboard Settings → Payment Settings:

🧪 TEST MODE: For testing only (no real charges)
🟢 LIVE MODE: For real donations

Make sure you're in the right mode for your situation.
```

**Step 3: Test Credit Card Information**
```
For testing, use these Stripe test numbers:

✅ Successful: 4242 4242 4242 4242
❌ Declined: 4000 0000 0000 0002
💳 Any future expiration date
🔒 Any 3-digit CVC (like 123)
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Common Payment Solutions</span>

</div>

**Solution 1: Reconnect Stripe**
```
1. Dashboard → Settings → Payment Settings
2. Click "Disconnect Stripe"
3. Click "Connect Stripe" 
4. Complete setup process again
```

**Solution 2: Check Stripe Account Status**
```
1. Log into your Stripe Dashboard
2. Check for any red warning banners
3. Complete any requested verification
4. Ensure payouts are enabled
```

**Solution 3: Verify Account Information**
```
Common Stripe setup issues:
□ Bank account not verified
□ Tax ID information incomplete  
□ Business verification pending
□ Identity documents needed
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Payment Succeeds But Doesn't Show in Dashboard"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Diagnostic Process</span>

</div>

**Step 1: Check Webhook Status**
```
In Stripe Dashboard:
1. Go to Developers → Webhooks
2. Look for your PassItOn webhook
3. Check Recent Deliveries:

✅ Green checkmarks = Working
❌ Red X marks = Failing
```

**Step 2: Verify Organization Connection**
```
1. Dashboard → Settings → Organization
2. Confirm Stripe Customer ID is populated
3. Check that organization is active
```

**Solutions:**
- Wait 5-10 minutes for webhook processing
- Contact support if donations don't appear after 30 minutes
- Provide Stripe payment intent ID for tracking

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Mobile Display Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Widget Doesn't Work on Mobile"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Mobile-Specific Diagnostic</span>

</div>

**Step 1: Test on Actual Devices**
```
Test on real devices, not just browser resize:
□ iPhone Safari
□ iPhone Chrome  
□ Android Chrome
□ Android Samsung Browser
```

**Step 2: Check Mobile CSS**
```css
/* Add mobile-responsive CSS */
@media (max-width: 768px) {
  .passiton-widget-button {
    font-size: 14px !important;
    padding: 12px 20px !important;
    bottom: 10px !important;
    right: 10px !important;
  }
}
```

**Step 3: Verify Touch Targets**
```css
/* Ensure buttons are large enough for touch */
.passiton-widget-button {
  min-height: 44px; /* Apple's recommended minimum */
  min-width: 44px;
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Common Mobile Solutions</span>

</div>

**Solution 1: Fix Viewport Settings**
```html
<!-- Add to <head> section of your website -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**Solution 2: Improve Touch Experience**
```css
.passiton-widget-button {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
}
```

**Solution 3: Test Form Fields**
```
Mobile form issues:
□ Keyboard covers form fields
□ Zoom issues on input focus
□ Submit button not accessible
```

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Dashboard Access Problems</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Can't Log Into Dashboard"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step-by-Step Resolution</span>

</div>

**Step 1: Check Login Credentials**
```
1. Verify you're using the correct email address
2. Check for typos in password
3. Try password reset if unsure
4. Check email spam folder for reset emails
```

**Step 2: Browser Issues**
```
Try these browser troubleshooting steps:
1. Clear browser cache and cookies
2. Disable browser extensions/adblockers
3. Try incognito/private browsing mode
4. Test different browser (Chrome, Firefox, Safari)
```

**Step 3: Account Status**
```
Possible account issues:
□ Account suspended (contact support)
□ Email address changed (use new email)
□ Organization transferred (check with admin)
□ Subscription expired (renew subscription)
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">✨ Issue: "Dashboard Loads But Missing Features"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Permission-Based Issues</span>

</div>

**User Role Permissions:**
```
👑 Owner: Can access all features
✏️ Editor: Limited settings access
👁️ Viewer: Read-only access

If features are missing, check your role in Settings → Team
```

**Common Missing Features:**
- **Settings Tab**: Owner/Editor access only
- **Team Management**: Owner access only  
- **Stripe Settings**: Owner access only
- **Export Data**: Editor access or higher

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Email Notification Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Not Receiving Donation Notifications"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Email Diagnostic Process</span>

</div>

**Step 1: Check Email Settings**
```
Dashboard → Settings → Notifications:
□ Email notifications enabled
□ Correct email address listed
□ Notification types selected (donations, failures, etc.)
```

**Step 2: Check Spam/Junk Folders**
```
Look for emails from:
□ noreply@passiton.com
□ notifications@passiton.com
□ support@passiton.com

Add these to your safe senders list.
```

**Step 3: Test Email Delivery**
```
1. Dashboard → Settings → Notifications
2. Click "Send Test Email"
3. Check inbox and spam folders
4. Wait up to 10 minutes for delivery
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Email Solutions</span>

</div>

**Solution 1: Whitelist Email Addresses**
```
Add to your email whitelist:
• @passiton.com domain
• noreply@passiton.com
• notifications@passiton.com
```

**Solution 2: Check Email Provider Settings**
```
Common email provider issues:
□ Gmail: Check Promotions/Updates tabs
□ Outlook: Check Focused/Other inbox
□ Corporate email: Check with IT about filtering
```

**Solution 3: Update Email Preferences**
```
1. Verify email address is current
2. Enable specific notification types
3. Test with alternative email address
4. Check for "unsubscribe" status
```

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Performance Problems</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Website Loads Slowly After Adding Widget"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Performance Diagnostic</span>

</div>

**Step 1: Measure Loading Impact**
```
Use browser tools to check performance:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Reload page
4. Look for PassItOn script loading time

Normal loading time: < 500ms
```

**Step 2: Check Script Placement**
```html
✅ GOOD - Before </body> tag:
  <!-- Your content -->
  <script src="passiton-embed.js"></script>
</body>

❌ BAD - In <head> section:
<head>
  <script src="passiton-embed.js"></script> <!-- Blocks page loading -->
</head>
```

**Step 3: Verify Async Loading**
```html
<!-- Recommended async loading -->
<script async src="https://widget.passiton.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Performance Solutions</span>

</div>

**Solution 1: Optimize Script Loading**
```html
<!-- Use async and defer for better performance -->
<script async defer src="https://widget.passiton.com/embed.js"></script>
```

**Solution 2: Minimize Configuration**
```javascript
// Keep config simple for faster loading
window.PassItOnConfig = {
  organizationId: 'org_abc123xyz',
  defaultAmount: 25,
  color: '#0891B2'
  // Remove unnecessary options
};
```

**Solution 3: Conditional Loading**
```javascript
// Only load widget on certain pages
if (window.location.pathname === '/donate') {
  // Load widget only on donation pages
  const script = document.createElement('script');
  script.src = 'https://widget.passiton.com/embed.js';
  document.head.appendChild(script);
}
```

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Browser Compatibility Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Issue: "Widget Works in Some Browsers But Not Others"</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 Browser-Specific Testing</span>

</div>

**Testing Matrix:**
```
Desktop Browsers:
✅ Chrome (latest)     - Primary testing
✅ Firefox (latest)    - Secondary testing  
✅ Safari (latest)     - Mac users
✅ Edge (latest)       - Windows users
⚠️ Internet Explorer  - Limited support

Mobile Browsers:
✅ Chrome Mobile       - Android primary
✅ Safari Mobile       - iOS primary
✅ Samsung Internet    - Android alternative
⚠️ UC Browser          - Limited testing
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Browser-Specific Solutions</span>

</div>

**Internet Explorer Issues:**
```javascript
// Add IE compatibility check
if (window.navigator.userAgent.indexOf('MSIE') !== -1 || 
    window.navigator.userAgent.indexOf('Trident') !== -1) {
  // Show fallback donation link instead of widget
  document.getElementById('donate-fallback').style.display = 'block';
}
```

**Safari-Specific Issues:**
```css
/* Fix Safari-specific styling issues */
.passiton-widget-button {
  -webkit-appearance: none;
  -webkit-border-radius: inherit;
}
```

**Mobile Browser Issues:**
```css
/* Fix mobile browser quirks */
.passiton-widget-button {
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">💬 When to Contact Support</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Self-Service First</span>

</div>

**Try These Steps Before Contacting Support:**
1. ✅ Check this troubleshooting guide
2. ✅ Clear browser cache and try again
3. ✅ Test in different browser/device
4. ✅ Check browser console for errors
5. ✅ Verify all settings in dashboard

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Contact Support When:</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">💬 Immediate Support Needed</span>

</div>
- **Payment processing completely broken**
- **Security concerns or suspicious activity**
- **Dashboard completely inaccessible**
- **Data loss or corruption**

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">💬 Regular Support Request</span>

</div>
- **Widget not displaying after following all troubleshooting steps**
- **Email notifications not working after verification**
- **Complex integration questions**
- **Feature requests or customization needs**

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 How to Contact Support</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Information to Include</span>

</div>

**Essential Details:**
```
1. Organization ID: org_abc123xyz
2. Website URL: https://yourwebsite.com
4. Device: MacBook Pro / iPhone 12
5. Problem Description: Detailed explanation
6. Steps Already Tried: List troubleshooting attempts
```

**Screenshots to Include:**
- Error messages (browser console)
- Widget appearance issues
- Dashboard problems
- Email notification issues

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">💬 Support Channels</span>

</div>

**Email Support**: support@passiton.com
- **Response Time**: 4-8 hours (business days)
- **Best For**: Non-urgent issues, detailed problems

**Live Chat**: Available in dashboard
- **Hours**: Monday-Friday, 9 AM - 5 PM PST
- **Best For**: Quick questions, immediate help

**Phone Support**: By appointment
- **Best For**: Complex integration issues, training needs

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Advanced Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📝 Developer Tools Usage</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Non-Technical Users</span>

</div>

**Basic Console Check:**
1. **Right-click** on your webpage
2. **Select "Inspect"**
3. **Click "Console" tab**
4. **Look for red error messages**
5. **Screenshot errors for support**

**Network Tab Check:**
1. **Open browser DevTools (F12)**
2. **Click "Network" tab**
3. **Reload your page**
4. **Look for failed requests (red entries)**
5. **Check if PassItOn scripts are loading**

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Technical Users</span>

</div>

**Performance Analysis:**
```javascript
// Check widget loading performance
performance.getEntriesByName('https://widget.passiton.com/embed.js');

// Monitor widget initialization
window.PassItOnConfig.debug = true; // Enables debug logging
```

**Event Monitoring:**
```javascript
// Listen for widget events
window.addEventListener('message', function(event) {
  if (event.data.type && event.data.type.startsWith('PASSITON_')) {
    console.log('PassItOn Event:', event.data);
  }
});
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Custom Integration Debugging</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Iframe Communication Issues</span>

</div>
```javascript
// Check if iframe can communicate with parent
window.addEventListener('message', function(event) {
  console.log('Received message:', event.data);
  if (event.data.type === 'PASSITON_RESIZE') {
    console.log('Widget height:', event.data.height);
  }
});
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔧 Configuration Validation</span>

</div>
```javascript
// Validate configuration object
function validateConfig(config) {
  const required = ['organizationId'];
  const missing = required.filter(key => !config[key]);
  
  if (missing.length > 0) {
    console.error('Missing required config:', missing);
  }
  
  if (config.organizationId && !config.organizationId.startsWith('org_')) {
    console.warn('Organization ID format may be incorrect');
  }
}

validateConfig(window.PassItOnConfig);
```

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Prevention Tips</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Best Practices to Avoid Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Regular Maintenance</span>

</div>
```
Monthly Checklist:
□ Test donation flow end-to-end
□ Check email notifications are working
□ Verify widget displays correctly on mobile
□ Review analytics for unusual patterns
□ Update team member access if needed
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">⚙️ Monitoring Setup</span>

</div>
```
Set up alerts for:
□ Failed payment notifications
□ Widget loading errors
□ Unusual traffic patterns
□ Dashboard access issues
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Documentation</span>

</div>
```
Keep records of:
□ Website changes that might affect widget
□ Team member access changes
□ Configuration modifications
□ Support interactions and solutions
```

---

**Need More Help?**

If this guide doesn't solve your issue:
 
 Just reach out or create a support ticket
