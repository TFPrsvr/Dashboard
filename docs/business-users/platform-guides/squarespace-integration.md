# Squarespace Integration Guide

## Overview

Add your PassItOn donation widget to your Squarespace website using built-in code injection and content blocks. Perfect for nonprofits, businesses, and creators using Squarespace.

## Table of Contents

- [Quick Setup (7 minutes)](#quick-setup-7-minutes)
- [Method 1: Site-Wide Integration](#method-1-site-wide-integration-recommended)
- [Method 2: Page-Specific Integration](#method-2-page-specific-integration)
- [Method 3: Blog Post Integration](#method-3-blog-post-integration)
- [Squarespace 7.1 vs 7.0 Differences](#squarespace-71-vs-70-differences)
- [Mobile Optimization](#mobile-optimization)
- [Customization Options](#customization-options)
- [Testing & Troubleshooting](#testing--troubleshooting)

---

## Quick Setup (7 minutes)

### What You'll Need
- Your PassItOn organization ID
- Squarespace site with Business plan or higher (required for code injection)
- Admin access to your Squarespace site

### Step-by-Step Process

1. **Get Your Organization ID**
   - Log into PassItOn dashboard
   - Navigate to Widget → Embed
   - Copy your organization ID

2. **Access Code Injection**
   - Go to Settings → Advanced → Code Injection
   - Paste widget code in Footer section

3. **Save & Test**
   - Save changes
   - Visit your live site
   - Test donation functionality

---

## Method 1: Site-Wide Integration (Recommended)

### Adding to All Pages

#### Step 1: Access Code Injection
1. From your Squarespace dashboard, go to **Settings**
2. Click **Advanced**
3. Select **Code Injection**

#### Step 2: Add Footer Code
In the **Footer** section, paste this code:

```html
<!-- PassItOn Donation Widget -->
<script>
  window.PassItOnConfig = {
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 25,
    color: '#0891B2',
    buttonText: 'Support Our Mission',
    position: 'bottom-right'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>

<style>
/* Squarespace-specific styling */
.passiton-widget-button {
  font-family: inherit !important;
  z-index: 9999 !important;
}

/* Hide on certain pages if needed */
.hide-donation-widget .passiton-widget-button {
  display: none !important;
}
</style>
```

#### Step 3: Customize Colors
Match your Squarespace theme colors:

```javascript
// Get theme colors (check your Squarespace color palette)
color: '#YOUR_ACCENT_COLOR', // Replace with your brand color
```

#### Step 4: Save Settings
Click **Save** to apply changes site-wide.

### Hiding on Specific Pages

#### Add CSS Class to Exclude Pages
1. Go to the page you want to exclude
2. In Page Settings, go to **Advanced**
3. Add this to **Page Header Code Injection**:

```html
<style>
.passiton-widget-button {
  display: none !important;
}
</style>
```

---

## Method 2: Page-Specific Integration

### Adding to Individual Pages

#### Using Code Block

##### Step 1: Add Code Block
1. Edit the page where you want the donation widget
2. Click **"+"** to add a block
3. Choose **"Code"** from the block menu

##### Step 2: Add Widget Code
Paste this code in the code block:

```html
<div class="squarespace-donation-section">
  <div class="donation-header">
    <h2>Support Our Cause</h2>
    <p>Your donation helps us make a real difference</p>
  </div>
  
  <div id="page-donation-widget" class="donation-widget-container">
    <p class="loading-text">Loading donation form...</p>
  </div>
</div>

<script>
window.PassItOnConfig = {
  targetElementId: 'page-donation-widget',
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: 50,
  color: '#0891B2',
  buttonText: 'Donate Now'
};
</script>
<script src="https://your-widget-domain.com/embed.js"></script>

<style>
.squarespace-donation-section {
  background: #f8f9fa;
  padding: 40px 20px;
  border-radius: 8px;
  text-align: center;
  margin: 40px 0;
}

.donation-header h2 {
  color: #333;
  font-size: 2em;
  margin-bottom: 10px;
}

.donation-header p {
  color: #666;
  font-size: 1.1em;
  margin-bottom: 30px;
}

.donation-widget-container {
  max-width: 500px;
  margin: 0 auto;
  min-height: 400px;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.loading-text {
  color: #888;
  font-style: italic;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .squarespace-donation-section {
    padding: 30px 15px;
    margin: 20px 0;
  }
  
  .donation-header h2 {
    font-size: 1.5em;
  }
  
  .donation-widget-container {
    padding: 15px;
  }
}
</style>
```

#### Using Markdown Block (Alternative)

##### Step 1: Add Markdown Block
1. Add a **Markdown** block to your page
2. Use this format:

```markdown
## Support Our Mission

Your donation makes a real impact in our community.

<div id="markdown-donation-widget"></div>

<script>
window.PassItOnConfig = {
  targetElementId: 'markdown-donation-widget',
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: 25,
  color: '#0891B2'
};
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

### Page Header Integration

#### For Campaign-Specific Pages
1. Go to Page Settings → Advanced
2. Add to **Page Header Code Injection**:

```html
<style>
.campaign-donation-banner {
  background: linear-gradient(135deg, #0891B2, #0F766E);
  color: white;
  padding: 20px;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.campaign-donate-btn {
  background: rgba(255,255,255,0.2);
  border: 2px solid white;
  color: white;
  padding: 10px 25px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
  transition: all 0.3s ease;
}

.campaign-donate-btn:hover {
  background: white;
  color: #0891B2;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Add campaign banner
  const banner = document.createElement('div');
  banner.className = 'campaign-donation-banner';
  banner.innerHTML = `
    <h3>🎯 Campaign Goal: $10,000</h3>
    <p>Help us reach our fundraising target</p>
    <a href="#" class="campaign-donate-btn" onclick="openDonationWidget(); return false;">
      Donate to Campaign
    </a>
  `;
  
  document.body.insertBefore(banner, document.body.firstChild);
});

function openDonationWidget() {
  // Open donation widget
  const iframe = document.createElement('iframe');
  iframe.src = 'https://your-widget-domain.com/donate?org=YOUR_ORG_ID_HERE&campaign=true';
  iframe.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 500px;
    height: 600px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
    z-index: 10001;
  `;
  
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
  `;
  
  overlay.onclick = function() {
    document.body.removeChild(iframe);
    document.body.removeChild(overlay);
  };
  
  document.body.appendChild(overlay);
  document.body.appendChild(iframe);
}
</script>
```

---

## Method 3: Blog Post Integration

### Adding to Individual Blog Posts

#### Step 1: Edit Blog Post
1. Go to your blog post in edit mode
2. Position cursor where you want the donation widget

#### Step 2: Add Code Block
1. Click **"+"** to add content
2. Choose **Code** block
3. Add this code:

```html
<div class="blog-donation-callout">
  <div class="callout-content">
    <h3>📢 Support This Content</h3>
    <p>If you found this post helpful, consider supporting our work with a small donation.</p>
    
    <div id="blog-donation-widget">
      <p>Loading donation options...</p>
    </div>
  </div>
</div>

<script>
window.PassItOnConfig = {
  targetElementId: 'blog-donation-widget',
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: 15, // Smaller amount for blog content
  color: '#0891B2',
  buttonText: 'Support Our Blog',
  showPoweredBy: true
};
</script>
<script src="https://your-widget-domain.com/embed.js"></script>

<style>
.blog-donation-callout {
  background: #f8f9fa;
  border-left: 4px solid #0891B2;
  padding: 25px;
  margin: 30px 0;
  border-radius: 0 8px 8px 0;
}

.callout-content h3 {
  color: #333;
  margin-top: 0;
  margin-bottom: 10px;
}

.callout-content p {
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

#blog-donation-widget {
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>
```

### Newsletter Signup + Donation Combo

#### Combining Email Capture with Donations
```html
<div class="newsletter-donation-combo">
  <h3>Stay Connected & Support Us</h3>
  <p>Get our newsletter and optionally support our mission</p>
  
  <!-- Squarespace Newsletter Block -->
  <div class="newsletter-section">
    <!-- Add Newsletter Block here through Squarespace interface -->
  </div>
  
  <div class="donation-section">
    <p><strong>Plus, consider a donation:</strong></p>
    <div id="combo-donation-widget"></div>
  </div>
</div>

<script>
window.PassItOnConfig = {
  targetElementId: 'combo-donation-widget',
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: 20,
  color: '#0891B2',
  buttonText: 'Support + Subscribe'
};
</script>
<script src="https://your-widget-domain.com/embed.js"></script>

<style>
.newsletter-donation-combo {
  background: #f8f9fa;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
  margin: 40px 0;
}

.newsletter-section {
  margin-bottom: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid #ddd;
}

.donation-section {
  margin-top: 25px;
}
</style>
```

---

## Squarespace 7.1 vs 7.0 Differences

### Squarespace 7.1 (Current)

#### Code Injection Location
- **Settings → Advanced → Code Injection**
- Header and Footer options available
- Page-specific code injection in page settings

#### Block Types
- **Code Block**: For custom HTML/CSS/JS
- **Markdown Block**: For simple markdown + code
- **Embed Block**: For iframe content

### Squarespace 7.0 (Legacy)

#### Code Injection Location
- **Settings → Advanced → Code Injection**
- Same functionality as 7.1

#### Block Types
- **Code Block**: Available but interface slightly different
- **Embed Block**: May have different sizing options

### Template-Specific Considerations

#### Family Templates (7.1)
- Better responsive handling
- Improved mobile optimization
- More flexible block positioning

#### Classic Templates (7.0)
- May require additional CSS for responsive design
- Different block spacing
- Manual mobile optimization needed

---

## Mobile Optimization

### Responsive Design

#### Mobile-First CSS
```css
/* Mobile-first approach */
.donation-widget-container {
  padding: 15px;
  margin: 20px 0;
}

/* Tablet and up */
@media (min-width: 768px) {
  .donation-widget-container {
    padding: 30px;
    margin: 40px auto;
    max-width: 600px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .donation-widget-container {
    padding: 40px;
    max-width: 700px;
  }
}
```

#### Touch-Friendly Buttons
```css
.passiton-widget-button {
  min-height: 44px; /* Apple's recommended touch target size */
  min-width: 44px;
  padding: 12px 20px;
  font-size: 16px; /* Prevents zoom on iOS */
}
```

### Mobile-Specific Features

#### Swipe-to-Donate (Advanced)
```javascript
// Add swipe gesture for mobile donation
let startX, startY;

document.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
  if (!startX || !startY) return;
  
  const endX = e.changedTouches[0].clientX;
  const endY = e.changedTouches[0].clientY;
  
  const diffX = startX - endX;
  const diffY = startY - endY;
  
  // Swipe left to open donation widget
  if (Math.abs(diffX) > Math.abs(diffY) && diffX > 50) {
    openDonationWidget();
  }
  
  startX = null;
  startY = null;
});
```

---

## Customization Options

### Theme Integration

#### Matching Squarespace Fonts
```css
.passiton-widget-button {
  font-family: inherit !important; /* Uses Squarespace theme font */
}

/* Or specify exact font */
.passiton-widget-button {
  font-family: 'Helvetica Neue', Arial, sans-serif !important;
}
```

#### Using Squarespace Colors
```javascript
// Extract colors from Squarespace CSS
const computedStyle = getComputedStyle(document.body);
const accentColor = computedStyle.getPropertyValue('--accent-color') || '#0891B2';

window.PassItOnConfig = {
  organizationId: 'YOUR_ORG_ID_HERE',
  color: accentColor,
  // ... other config
};
```

### Advanced Styling

#### Glassmorphism Effect
```css
.donation-widget-container {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

#### Neumorphism Style
```css
.passiton-widget-button {
  background: #e0e5ec;
  border-radius: 20px;
  box-shadow: 
    9px 9px 16px #a3b1c6,
    -9px -9px 16px #ffffff;
  border: none;
  color: #333;
}

.passiton-widget-button:hover {
  box-shadow: 
    inset 9px 9px 16px #a3b1c6,
    inset -9px -9px 16px #ffffff;
}
```

---

## Testing & Troubleshooting

### Pre-Launch Checklist

#### ✅ Functionality Tests
- [ ] Widget loads on all template pages
- [ ] Mobile responsiveness works
- [ ] Payment processing completes
- [ ] Confirmation emails sent
- [ ] Analytics tracking active

#### ✅ Design Integration
- [ ] Colors match Squarespace theme
- [ ] Fonts consistent with site
- [ ] Layout doesn't break on different screen sizes
- [ ] No conflicts with existing CSS

#### ✅ Performance Tests
- [ ] Site loading speed not affected
- [ ] Widget loads asynchronously
- [ ] No JavaScript errors in console
- [ ] Works with Squarespace caching

### Common Squarespace Issues

#### "Code injection not working"
**Possible causes:**
- Not on Business plan or higher
- Code syntax errors
- Script blocked by browser

**Solutions:**
1. Verify you have Business plan or higher
2. Check code for syntax errors
3. Test in different browsers
4. Check browser console for errors

#### "Widget conflicts with template"
**Possible causes:**
- CSS specificity issues
- Template-specific JavaScript conflicts
- Z-index problems

**Solutions:**
1. Use `!important` in CSS declarations
2. Increase z-index values
3. Test with different Squarespace templates
4. Add template-specific CSS overrides

#### "Mobile layout broken"
**Possible causes:**
- Missing responsive CSS
- Fixed positioning not supported
- Viewport settings conflict

**Solutions:**
1. Add comprehensive mobile CSS
2. Test on actual devices
3. Use relative positioning when needed
4. Check Squarespace mobile settings

### Squarespace-Specific Limitations

#### Plan Requirements
- **Code Injection**: Requires Business plan or higher
- **Custom CSS**: Available on all paid plans
- **Third-party scripts**: Business plan or higher

#### Template Restrictions
- Some templates may have CSS limitations
- Mobile editing may be restricted
- Certain blocks may not support custom code

### Getting Help

#### Squarespace Support
- **Template issues**: Contact Squarespace support
- **Plan limitations**: Check Squarespace documentation
- **Code injection**: Squarespace help center

#### PassItOn Support
- **Widget functionality**: support@passiton.com
- **Integration issues**: Provide template name and Squarespace version
- **Customization help**: Include current code and desired outcome

---

## Advanced Features

### Analytics Integration

#### Squarespace Analytics
```javascript
// Track donations in Squarespace Analytics
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_DONATION_COMPLETE') {
    // Send to Squarespace Analytics (if available)
    if (window.Y && window.Y.Squarespace && window.Y.Squarespace.Analytics) {
      window.Y.Squarespace.Analytics.customEvent('donation_completed', {
        amount: event.data.amount,
        currency: 'USD'
      });
    }
  }
});
```

### E-commerce Integration

#### Commerce + Donations
```javascript
// Add donation option to Squarespace Commerce checkout
document.addEventListener('DOMContentLoaded', function() {
  // Look for Squarespace commerce elements
  const checkoutButton = document.querySelector('.sqs-add-to-cart-button');
  if (checkoutButton) {
    // Add donation option near checkout
    const donationOption = document.createElement('div');
    donationOption.innerHTML = `
      <div class="checkout-donation-option">
        <p>Add a donation to your order?</p>
        <div id="checkout-donation-widget"></div>
      </div>
    `;
    checkoutButton.parentNode.insertBefore(donationOption, checkoutButton.nextSibling);
    
    // Initialize donation widget
    window.PassItOnConfig = {
      targetElementId: 'checkout-donation-widget',
      organizationId: 'YOUR_ORG_ID_HERE',
      defaultAmount: 10,
      buttonText: 'Add Donation'
    };
  }
});
```

---

## Going Live

### Launch Preparation

1. **Test thoroughly** on Squarespace preview
2. **Check mobile** on actual devices
3. **Verify payments** with small test donations
4. **Monitor performance** for any site slowdown
5. **Update team** on donation management

### Marketing Integration

#### Squarespace Email Campaigns
- Include donation links in newsletters
- Create donation-focused email templates
- Track donation conversions from emails

#### Social Media Integration
- Share donation milestones
- Include donation links in social posts
- Create donation-focused landing pages

---

*Last updated: January 2025*
*For Squarespace platform issues: Contact Squarespace Support*
*For widget functionality: support@passiton.com*