# Visual Troubleshooting Guide

## Overview

This guide provides step-by-step solutions to common issues with visual explanations. Most problems can be resolved quickly using these troubleshooting steps.

## Table of Contents

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

## Quick Diagnostic Steps

### Step 1: Check Browser Console (F12)

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

### Step 2: Basic Checks

#### Widget Visibility Checklist
```
□ Organization ID is correct in embed code
□ Widget code is placed in the right location
□ Website has been published/saved after adding code
□ Browser cache has been cleared (Ctrl+F5)
□ Adblocker is not blocking the widget
```

#### Quick Test Process
1. **Open incognito/private browser window**
2. **Visit your website**
3. **Look for the widget**
4. **Try to make a test donation**

---

## Widget Not Showing Issues

### Issue: "No Donate Button Visible"

#### Visual Diagnostic Process

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

#### Common Solutions

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

### Issue: "Widget Shows But Looks Wrong"

#### Visual Problems & Solutions

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

## Payment Processing Problems

### Issue: "Donation Form Opens But Won't Accept Payment"

#### Diagnostic Steps

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

#### Common Payment Solutions

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

### Issue: "Payment Succeeds But Doesn't Show in Dashboard"

#### Diagnostic Process

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

## Mobile Display Issues

### Issue: "Widget Doesn't Work on Mobile"

#### Mobile-Specific Diagnostic

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

#### Common Mobile Solutions

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

## Dashboard Access Problems

### Issue: "Can't Log Into Dashboard"

#### Step-by-Step Resolution

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

### Issue: "Dashboard Loads But Missing Features"

#### Permission-Based Issues

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

## Email Notification Issues

### Issue: "Not Receiving Donation Notifications"

#### Email Diagnostic Process

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

#### Email Solutions

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

## Performance Problems

### Issue: "Website Loads Slowly After Adding Widget"

#### Performance Diagnostic

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

#### Performance Solutions

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

## Browser Compatibility Issues

### Issue: "Widget Works in Some Browsers But Not Others"

#### Browser-Specific Testing

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

#### Browser-Specific Solutions

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

## When to Contact Support

### Self-Service First

**Try These Steps Before Contacting Support:**
1. ✅ Check this troubleshooting guide
2. ✅ Clear browser cache and try again
3. ✅ Test in different browser/device
4. ✅ Check browser console for errors
5. ✅ Verify all settings in dashboard

### Contact Support When:

#### Immediate Support Needed
- **Payment processing completely broken**
- **Security concerns or suspicious activity**
- **Dashboard completely inaccessible**
- **Data loss or corruption**

#### Regular Support Request
- **Widget not displaying after following all troubleshooting steps**
- **Email notifications not working after verification**
- **Complex integration questions**
- **Feature requests or customization needs**

### How to Contact Support

#### Information to Include

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

#### Support Channels

**Email Support**: support@passiton.com
- **Response Time**: 4-8 hours (business days)
- **Best For**: Non-urgent issues, detailed problems

**Live Chat**: Available in dashboard
- **Hours**: Monday-Friday, 9 AM - 5 PM PST
- **Best For**: Quick questions, immediate help

**Phone Support**: By appointment
- **Best For**: Complex integration issues, training needs

---

## Advanced Troubleshooting

### Developer Tools Usage

#### For Non-Technical Users

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

#### For Technical Users

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

### Custom Integration Debugging

#### Iframe Communication Issues
```javascript
// Check if iframe can communicate with parent
window.addEventListener('message', function(event) {
  console.log('Received message:', event.data);
  if (event.data.type === 'PASSITON_RESIZE') {
    console.log('Widget height:', event.data.height);
  }
});
```

#### Configuration Validation
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

## Prevention Tips

### Best Practices to Avoid Issues

#### Regular Maintenance
```
Monthly Checklist:
□ Test donation flow end-to-end
□ Check email notifications are working
□ Verify widget displays correctly on mobile
□ Review analytics for unusual patterns
□ Update team member access if needed
```

#### Monitoring Setup
```
Set up alerts for:
□ Failed payment notifications
□ Widget loading errors
□ Unusual traffic patterns
□ Dashboard access issues
```

#### Documentation
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
- **Email**: support@passiton.com
- **Live Chat**: Available in your dashboard
- **Phone**: Schedule appointment through support

**Emergency Issues**: urgent@passiton.com

---

*Last updated: January 2025*
*For immediate support: support@passiton.com*