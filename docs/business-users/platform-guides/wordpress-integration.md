<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📖 WordPress Integration Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

This guide will help you integrate your PassItOn donation widget into your WordPress website. No coding experience required!

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Table of Contents</span>

</div>

- [Quick Setup (5 minutes)](#quick-setup-5-minutes)
- [Method 1: Header/Footer Code](#method-1-headerfooter-code-recommended)
- [Method 2: Page/Post Content](#method-2-pagepost-content)
- [Method 3: Widget Area](#method-3-widget-area)
- [Customization Options](#customization-options)
- [Testing Your Widget](#testing-your-widget)
- [Troubleshooting](#troubleshooting)

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Quick Setup (5 minutes)</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 What You'll Need</span>

</div>
- Your PassItOn organization ID
- WordPress admin access
- 5 minutes of your time

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step-by-Step Process</span>

</div>

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

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 1: Header/Footer Code (Recommended)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Using Theme Editor</span>

</div>

⚠️ **Important**: Always backup your website before editing theme files.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Access Theme Editor</span>

</div>
1. Login to WordPress admin
2. Go to **Appearance → Theme Editor**
3. Select **footer.php** from the file list

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Your Code</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Replace YOUR_ORG_ID_HERE</span>

</div>
Replace `YOUR_ORG_ID_HERE` with your actual organization ID from the dashboard.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 4: Save Changes</span>

</div>
Click **Update File** to save your changes.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Using a Plugin (Safer Method)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Option A: Insert Headers and Footers Plugin</span>

</div>

1. **Install Plugin**
   - Go to Plugins → Add New
   - Search for "Insert Headers and Footers"
   - Install and activate

2. **Add Your Code**
   - Go to Settings → Insert Headers and Footers
   - Paste your embed code in the "Scripts in Footer" section
   - Save settings

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Option B: Code Snippets Plugin</span>

</div>

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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 2: Page/Post Content</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Specific Pages Only</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Edit Page/Post</span>

</div>
1. Go to the page where you want the donation form
2. Switch to **Text/HTML editor** (not Visual)

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Inline Widget</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Customize Styling</span>

</div>
Add CSS to make it look better:

```html
<style>
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 donation-widget-container {</span>

</div>
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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 3: Widget Area</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Using WordPress Widgets</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Create Custom HTML Widget</span>

</div>
1. Go to **Appearance → Widgets**
2. Add **Custom HTML** widget to your desired sidebar
3. Add your embed code

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Widget Code</span>

</div>
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

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Customization Options</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Available Settings</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Position Options</span>

</div>
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Color Customization</span>

</div>
Use any hex color code:
- `#0891B2` (Teal - default)
- `#DC2626` (Red)
- `#059669` (Green)
- `#7C3AED` (Purple)

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing Your Widget</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Pre-Launch Checklist</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 ✅ Visual Check</span>

</div>
- [ ] Widget appears on your website
- [ ] Colors match your brand
- [ ] Button text is correct
- [ ] Widget doesn't overlap content

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Functionality Test</span>

</div>
- [ ] Clicking button opens donation form
- [ ] Form fields work properly
- [ ] Test donation completes successfully
- [ ] Thank you page displays

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Mobile Testing</span>

</div>
- [ ] Widget works on mobile phones
- [ ] Form is easy to use on small screens
- [ ] No layout issues

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Browser Testing</span>

</div>
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Edge ✓

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Test Donation</span>

</div>
**Always test with a real $1 donation** to ensure everything works properly.

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔍 Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Widget not showing up"</span>

</div>
**Possible causes:**
- Organization ID is incorrect
- Code wasn't saved properly
- Browser cache needs clearing

**Solutions:**
1. Double-check your organization ID
2. Clear browser cache (Ctrl+F5)
3. Check browser console for errors (F12)
4. Verify code is in the right location

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Button appears but form doesn't open"</span>

</div>
**Possible causes:**
- JavaScript errors on your site
- Conflicting plugins
- Theme compatibility issues

**Solutions:**
1. Deactivate plugins temporarily to test
2. Switch to default WordPress theme temporarily
3. Check browser console for JavaScript errors
4. Contact support with error details

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Donation form looks broken"</span>

</div>
**Possible causes:**
- CSS conflicts with your theme
- Mobile compatibility issues
- Browser compatibility problems

**Solutions:**
1. Try different positioning (bottom-left vs bottom-right)
2. Test on different devices and browsers
3. Add custom CSS to fix layout issues
4. Contact support for theme-specific help

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Payments not working"</span>

</div>
**Possible causes:**
- Stripe account not properly connected
- Test mode vs live mode confusion
- Payment form errors

**Solutions:**
1. Verify Stripe connection in dashboard
2. Check if you're in test mode vs live mode
3. Test with different payment methods
4. Contact support for payment issues

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Getting Help</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Self-Help Resources</span>

</div>
1. Check browser console for errors (F12 → Console)
2. Try in incognito/private browsing mode
3. Test on different devices
4. Check WordPress error logs

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">💬 Contact Support</span>

</div>
If you still need help:
- **Email**: support@passiton.com
- **Include**: Your organization ID, website URL, and description of the issue
- **Screenshots**: Always helpful for troubleshooting

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Advanced Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Developers</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Custom Styling</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Event Tracking</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Multiple Widgets</span>

</div>
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

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Performance Optimization</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Loading Speed</span>

</div>
- Widget loads asynchronously (won't slow down your site)
- Minimal JavaScript footprint
- CDN-delivered for fast global loading

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Caching Compatibility</span>

</div>
Compatible with all major WordPress caching plugins:
- WP Rocket ✓
- W3 Total Cache ✓
- WP Super Cache ✓
- LiteSpeed Cache ✓







