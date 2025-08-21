<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🌐 Squarespace Integration Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

<div style="margin-top: 1rem; font-size: 1.1rem; opacity: 0.9;">

Add your PassItOn donation widget to your Squarespace website using built-in code injection and content blocks. Perfect for nonprofits, businesses, and creators using Squarespace.

</div>

</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📋 Table of Contents</span>

<div style="margin-top: 1rem;">

- [Quick Setup (7 minutes)](#quick-setup-7-minutes)
- [Method 1: Site-Wide Integration](#method-1-site-wide-integration-recommended)
- [Method 2: Page-Specific Integration](#method-2-page-specific-integration)
- [Method 3: Blog Post Integration](#method-3-blog-post-integration)
- [Squarespace 7.1 vs 7.0 Differences](#squarespace-71-vs-70-differences)
- [Mobile Optimization](#mobile-optimization)
- [Customization Options](#customization-options)
- [Testing & Troubleshooting](#testing--troubleshooting)

</div>

</div>

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚡ Quick Setup (7 minutes)</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📦 What You'll Need</span>

<div style="margin-top: 1rem;">
- Your PassItOn organization ID
- Squarespace site with Business plan or higher (required for code injection)
- Admin access to your Squarespace site

<div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #059669;">📌 Step-by-Step Process</span>

</div>

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

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 1: Site-Wide Integration (Recommended)</span>

</div>

<div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid #06b6d4; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #0891b2;">📌 Adding to All Pages</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Access Code Injection</span>

</div>
1. From your Squarespace dashboard, go to **Settings**
2. Click **Advanced**
3. Select **Code Injection**

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Footer Code</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Customize Colors</span>

</div>
Match your Squarespace theme colors:

```javascript
// Get theme colors (check your Squarespace color palette)
color: '#YOUR_ACCENT_COLOR', // Replace with your brand color
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 4: Save Settings</span>

</div>
Click **Save** to apply changes site-wide.

<div style="background: rgba(6, 182, 212, 0.1); border-left: 4px solid #06b6d4; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #0891b2;">📌 Hiding on Specific Pages</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Add CSS Class to Exclude Pages</span>

</div>
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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 2: Page-Specific Integration</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 Adding to Individual Pages</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Using Code Block</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Add Code Block</span>

</div>
1. Edit the page where you want the donation widget
2. Click **"+"** to add a block
3. Choose **"Code"** from the block menu

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Widget Code</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Using Markdown Block (Alternative)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Add Markdown Block</span>

</div>
1. Add a **Markdown** block to your page
2. Use this format:

```markdown
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">💬 Support Our Mission</span>

</div>

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

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 Page Header Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Campaign-Specific Pages</span>

</div>
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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 3: Blog Post Integration</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Adding to Individual Blog Posts</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Edit Blog Post</span>

</div>
1. Go to your blog post in edit mode
2. Position cursor where you want the donation widget

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Code Block</span>

</div>
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

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 blog-donation-widget {</span>

</div>
  background: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
</style>
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Newsletter Signup + Donation Combo</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Combining Email Capture with Donations</span>

</div>
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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Squarespace 7.1 vs 7.0 Differences</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Squarespace 7.1 (Current)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Code Injection Location</span>

</div>
- **Settings → Advanced → Code Injection**
- Header and Footer options available
- Page-specific code injection in page settings

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Block Types</span>

</div>
- **Code Block**: For custom HTML/CSS/JS
- **Markdown Block**: For simple markdown + code
- **Embed Block**: For iframe content

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Squarespace 7.0 (Legacy)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Code Injection Location</span>

</div>
- **Settings → Advanced → Code Injection**
- Same functionality as 7.1

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Block Types</span>

</div>
- **Code Block**: Available but interface slightly different
- **Embed Block**: May have different sizing options

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Template-Specific Considerations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Family Templates (7.1)</span>

</div>
- Better responsive handling
- Improved mobile optimization
- More flexible block positioning

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Classic Templates (7.0)</span>

</div>
- May require additional CSS for responsive design
- Different block spacing
- Manual mobile optimization needed

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Mobile Optimization</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Responsive Design</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Mobile-First CSS</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Touch-Friendly Buttons</span>

</div>
```css
.passiton-widget-button {
  min-height: 44px; /* Apple's recommended touch target size */
  min-width: 44px;
  padding: 12px 20px;
  font-size: 16px; /* Prevents zoom on iOS */
}
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">✨ Mobile-Specific Features</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Swipe-to-Donate (Advanced)</span>

</div>
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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Customization Options</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Theme Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Matching Squarespace Fonts</span>

</div>
```css
.passiton-widget-button {
  font-family: inherit !important; /* Uses Squarespace theme font */
}

/* Or specify exact font */
.passiton-widget-button {
  font-family: 'Helvetica Neue', Arial, sans-serif !important;
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Using Squarespace Colors</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Advanced Styling</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Glassmorphism Effect</span>

</div>
```css
.donation-widget-container {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Neumorphism Style</span>

</div>
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

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing & Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Pre-Launch Checklist</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Functionality Tests</span>

</div>
- [ ] Widget loads on all template pages
- [ ] Mobile responsiveness works
- [ ] Payment processing completes
- [ ] Confirmation emails sent
- [ ] Analytics tracking active

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 ✅ Design Integration</span>

</div>
- [ ] Colors match Squarespace theme
- [ ] Fonts consistent with site
- [ ] Layout doesn't break on different screen sizes
- [ ] No conflicts with existing CSS

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Performance Tests</span>

</div>
- [ ] Site loading speed not affected
- [ ] Widget loads asynchronously
- [ ] No JavaScript errors in console
- [ ] Works with Squarespace caching

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Squarespace Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Code injection not working"</span>

</div>
**Possible causes:**
- Not on Business plan or higher
- Code syntax errors
- Script blocked by browser

**Solutions:**
1. Verify you have Business plan or higher
2. Check code for syntax errors
3. Test in different browsers
4. Check browser console for errors

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Widget conflicts with template"</span>

</div>
**Possible causes:**
- CSS specificity issues
- Template-specific JavaScript conflicts
- Z-index problems

**Solutions:**
1. Use `!important` in CSS declarations
2. Increase z-index values
3. Test with different Squarespace templates
4. Add template-specific CSS overrides

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Mobile layout broken"</span>

</div>
**Possible causes:**
- Missing responsive CSS
- Fixed positioning not supported
- Viewport settings conflict

**Solutions:**
1. Add comprehensive mobile CSS
2. Test on actual devices
3. Use relative positioning when needed
4. Check Squarespace mobile settings

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Squarespace-Specific Limitations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Plan Requirements</span>

</div>
- **Code Injection**: Requires Business plan or higher
- **Custom CSS**: Available on all paid plans
- **Third-party scripts**: Business plan or higher

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Template Restrictions</span>

</div>
- Some templates may have CSS limitations
- Mobile editing may be restricted
- Certain blocks may not support custom code

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Getting Help</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">💬 Squarespace Support</span>

</div>
- **Template issues**: Contact Squarespace support
- **Plan limitations**: Check Squarespace documentation
- **Code injection**: Squarespace help center

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">💬 PassItOn Support</span>

</div>
- **Widget functionality**: support@passiton.com
- **Integration issues**: Provide template name and Squarespace version
- **Customization help**: Include current code and desired outcome

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">✨ Advanced Features</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Analytics Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Squarespace Analytics</span>

</div>
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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 E-commerce Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Commerce + Donations</span>

</div>
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

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Going Live</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Launch Preparation</span>

</div>

1. **Test thoroughly** on Squarespace preview
2. **Check mobile** on actual devices
3. **Verify payments** with small test donations
4. **Monitor performance** for any site slowdown
5. **Update team** on donation management

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Marketing Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Squarespace Email Campaigns</span>

</div>
- Include donation links in newsletters
- Create donation-focused email templates
- Track donation conversions from emails

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Social Media Integration</span>

</div>
- Share donation milestones
- Include donation links in social posts
- Create donation-focused landing pages

---
*For Squarespace platform issues: Contact Squarespace Support*
