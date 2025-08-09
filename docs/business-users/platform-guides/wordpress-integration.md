# WordPress Integration Guide

## Overview

This guide will help you integrate your PassItOn donation widget into your WordPress website. No coding experience required!

## Table of Contents

- [Quick Setup (5 minutes)](#quick-setup-5-minutes)
- [Method 1: Header/Footer Code](#method-1-headerfooter-code-recommended)
- [Method 2: Page/Post Content](#method-2-pagepost-content)
- [Method 3: Widget Area](#method-3-widget-area)
- [Customization Options](#customization-options)
- [Testing Your Widget](#testing-your-widget)
- [Troubleshooting](#troubleshooting)

---

## Quick Setup (5 minutes)

### What You'll Need
- Your PassItOn organization ID
- WordPress admin access
- 5 minutes of your time

### Step-by-Step Process

1. **Get Your Organization ID**
   - Log into your PassItOn dashboard
   - Go to Widget → Embed
   - Copy your organization ID (looks like: `org_abc123xyz`)

2. **Add Code to WordPress**
   - Go to your WordPress admin panel
   - Navigate to Appearance → Theme Editor (or use a plugin)
   - Add the embed code before `</body>` tag

3. **Test Your Widget**
   - Visit your website
   - Look for the donation button
   - Test a small donation ($1)

---

## Method 1: Header/Footer Code (Recommended)

### Using Theme Editor

⚠️ **Important**: Always backup your website before editing theme files.

#### Step 1: Access Theme Editor
1. Login to WordPress admin
2. Go to **Appearance → Theme Editor**
3. Select **footer.php** from the file list

#### Step 2: Add Your Code
Add this code just before the `</body>` tag:

```html
<!-- PassItOn Donation Widget -->
<script>
  window.PassItOnConfig = {
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 25,
    color: '#0891B2',
    buttonText: 'Donate Now',
    position: 'bottom-right'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

#### Step 3: Replace YOUR_ORG_ID_HERE
Replace `YOUR_ORG_ID_HERE` with your actual organization ID from the dashboard.

#### Step 4: Save Changes
Click **Update File** to save your changes.

### Using a Plugin (Safer Method)

#### Option A: Insert Headers and Footers Plugin

1. **Install Plugin**
   - Go to Plugins → Add New
   - Search for "Insert Headers and Footers"
   - Install and activate

2. **Add Your Code**
   - Go to Settings → Insert Headers and Footers
   - Paste your embed code in the "Scripts in Footer" section
   - Save settings

#### Option B: Code Snippets Plugin

1. **Install Plugin**
   - Search for "Code Snippets" plugin
   - Install and activate

2. **Create New Snippet**
   - Go to Snippets → Add New
   - Title: "PassItOn Widget"
   - Paste this code:

```php
function add_passiton_widget() {
    ?>
    <script>
      window.PassItOnConfig = {
        organizationId: 'YOUR_ORG_ID_HERE',
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

3. **Activate Snippet**
   - Save and activate the snippet

---

## Method 2: Page/Post Content

### For Specific Pages Only

#### Step 1: Edit Page/Post
1. Go to the page where you want the donation form
2. Switch to **Text/HTML editor** (not Visual)

#### Step 2: Add Inline Widget
Paste this code where you want the donation form to appear:

```html
<!-- Donation Form Container -->
<div id="donation-widget-container" style="margin: 20px 0;">
  <p>Loading donation form...</p>
</div>

<script>
  window.PassItOnConfig = {
    targetElementId: 'donation-widget-container',
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 50,
    color: '#0891B2',
    buttonText: 'Support Our Cause'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

#### Step 3: Customize Styling
Add CSS to make it look better:

```html
<style>
#donation-widget-container {
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  margin: 30px auto;
}
</style>
```

---

## Method 3: Widget Area

### Using WordPress Widgets

#### Step 1: Create Custom HTML Widget
1. Go to **Appearance → Widgets**
2. Add **Custom HTML** widget to your desired sidebar
3. Add your embed code

#### Step 2: Widget Code
```html
<div class="passiton-widget">
  <h3>Support Our Mission</h3>
  <div id="sidebar-donation-widget">
    <p>Loading...</p>
  </div>
</div>

<script>
  window.PassItOnConfig = {
    targetElementId: 'sidebar-donation-widget',
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 25,
    color: '#0891B2'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

---

## Customization Options

### Available Settings

```javascript
window.PassItOnConfig = {
  // Required
  organizationId: 'your-org-id',
  
  // Appearance
  color: '#0891B2',              // Primary button color
  buttonText: 'Donate Now',      // Button text
  position: 'bottom-right',      // Position for floating button
  
  // Behavior
  defaultAmount: 25,             // Default donation amount
  targetElementId: 'my-div',     // For inline embedding
  
  // Advanced
  showPoweredBy: true,           // Show "Powered by PassItOn"
  theme: 'light',                // 'light' or 'dark'
  language: 'en'                 // Language code
};
```

### Position Options
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

### Color Customization
Use any hex color code:
- `#0891B2` (Teal - default)
- `#DC2626` (Red)
- `#059669` (Green)
- `#7C3AED` (Purple)

---

## Testing Your Widget

### Pre-Launch Checklist

#### ✅ Visual Check
- [ ] Widget appears on your website
- [ ] Colors match your brand
- [ ] Button text is correct
- [ ] Widget doesn't overlap content

#### ✅ Functionality Test
- [ ] Clicking button opens donation form
- [ ] Form fields work properly
- [ ] Test donation completes successfully
- [ ] Thank you page displays

#### ✅ Mobile Testing
- [ ] Widget works on mobile phones
- [ ] Form is easy to use on small screens
- [ ] No layout issues

#### ✅ Browser Testing
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓

### Test Donation
**Always test with a real $1 donation** to ensure everything works properly.

---

## Troubleshooting

### Common Issues

#### "Widget not showing up"
**Possible causes:**
- Organization ID is incorrect
- Code wasn't saved properly
- Browser cache needs clearing

**Solutions:**
1. Double-check your organization ID
2. Clear browser cache (Ctrl+F5)
3. Check browser console for errors (F12)
4. Verify code is in the right location

#### "Button appears but form doesn't open"
**Possible causes:**
- JavaScript errors on your site
- Conflicting plugins
- Theme compatibility issues

**Solutions:**
1. Deactivate plugins temporarily to test
2. Switch to default WordPress theme temporarily
3. Check browser console for JavaScript errors
4. Contact support with error details

#### "Donation form looks broken"
**Possible causes:**
- CSS conflicts with your theme
- Mobile compatibility issues
- Browser compatibility problems

**Solutions:**
1. Try different positioning (bottom-left vs bottom-right)
2. Test on different devices and browsers
3. Add custom CSS to fix layout issues
4. Contact support for theme-specific help

#### "Payments not working"
**Possible causes:**
- Stripe account not properly connected
- Test mode vs live mode confusion
- Payment form errors

**Solutions:**
1. Verify Stripe connection in dashboard
2. Check if you're in test mode vs live mode
3. Test with different payment methods
4. Contact support for payment issues

### Getting Help

#### Self-Help Resources
1. Check browser console for errors (F12 → Console)
2. Try in incognito/private browsing mode
3. Test on different devices
4. Check WordPress error logs

#### Contact Support
If you still need help:
- **Email**: support@passiton.com
- **Include**: Your organization ID, website URL, and description of the issue
- **Screenshots**: Always helpful for troubleshooting

---

## Advanced Integration

### For Developers

#### Custom Styling
Add custom CSS to match your theme:

```css
/* Custom PassItOn Widget Styles */
.passiton-widget-button {
  background: #your-color !important;
  border-radius: 25px !important;
  font-family: your-font-family !important;
}

.passiton-widget-modal {
  font-family: your-font-family !important;
}
```

#### Event Tracking
Track donations with Google Analytics:

```javascript
// Add this after your PassItOn config
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_DONATION_COMPLETE') {
    // Google Analytics 4
    gtag('event', 'donation_complete', {
      'value': event.data.amount,
      'currency': 'USD'
    });
    
    // Facebook Pixel
    fbq('track', 'Donate', {
      value: event.data.amount,
      currency: 'USD'
    });
  }
});
```

#### Multiple Widgets
You can have different widgets on different pages:

```javascript
// Homepage - General donations
if (window.location.pathname === '/') {
  window.PassItOnConfig = {
    organizationId: 'your-org-id',
    defaultAmount: 50,
    buttonText: 'Support Our Mission'
  };
}

// Specific campaign page
if (window.location.pathname.includes('/campaign')) {
  window.PassItOnConfig = {
    organizationId: 'your-org-id',
    defaultAmount: 25,
    buttonText: 'Support This Campaign',
    color: '#DC2626'
  };
}
```

---

## Performance Optimization

### Loading Speed
- Widget loads asynchronously (won't slow down your site)
- Minimal JavaScript footprint
- CDN-delivered for fast global loading

### Caching Compatibility
Compatible with all major WordPress caching plugins:
- WP Rocket ✓
- W3 Total Cache ✓
- WP Super Cache ✓
- LiteSpeed Cache ✓







