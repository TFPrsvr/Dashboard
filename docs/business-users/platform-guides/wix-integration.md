<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📖 Wix Integration Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

Add your PassItOn donation widget to your Wix website using Wix's built-in tools. No coding experience required - perfect for small businesses and nonprofits using Wix.

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Table of Contents</span>

</div>

- [Quick Setup (5 minutes)](#quick-setup-5-minutes)
- [Method 1: HTML Embed Code](#method-1-html-embed-code-recommended)
- [Method 2: Custom Element](#method-2-custom-element)
- [Method 3: Wix Velo (Advanced)](#method-3-wix-velo-advanced)
- [Mobile Optimization](#mobile-optimization)
- [Customization Options](#customization-options)
- [Testing & Troubleshooting](#testing--troubleshooting)

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Quick Setup (5 minutes)</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 What You'll Need</span>

</div>
- Your PassItOn organization ID
- Wix website with edit access
- 5 minutes of your time

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step-by-Step Process</span>

</div>

1. **Get Your Organization ID**
   - Log into your PassItOn dashboard
   - Go to Widget → Embed
   - Copy your organization ID

2. **Open Wix Editor**
   - Go to your Wix dashboard
   - Click "Edit Site"

3. **Add HTML Element**
   - Click the "+" to add elements
   - Go to "Embed" → "HTML Embed"
   - Add your widget code

4. **Publish & Test**
   - Click "Publish" to make changes live
   - Test the donation functionality

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 1: HTML Embed Code (Recommended)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Adding Floating Donation Button</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Add HTML Embed Element</span>

</div>
1. In Wix Editor, click the **"+" button** (Add Elements)
2. Navigate to **"Embed" → "HTML Embed"**
3. Drag the HTML Embed element to your page
4. Position it where you want the donation button to appear

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Your Code</span>

</div>
Click on the HTML element and select **"Enter Code"**. Paste this code:

```html
<!-- PassItOn Floating Donation Widget -->
<div id="wix-donation-widget" style="position: fixed; bottom: 20px; right: 20px; z-index: 1000;">
  <button id="donate-button" style="
    background: #0891B2;
    color: white;
    border: none;
    padding: 15px 25px;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(8, 145, 178, 0.3);
    transition: all 0.3s ease;
  " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
    Donate Now
  </button>
</div>

<script>
document.getElementById('donate-button').addEventListener('click', function() {
  // Create iframe for donation widget
  const iframe = document.createElement('iframe');
  iframe.src = 'https://your-widget-domain.com/donate?org=YOUR_ORG_ID_HERE&amount=25';
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
    z-index: 10000;
    background: white;
  `;
  
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 9999;
  `;
  
  // Add close functionality
  overlay.addEventListener('click', function() {
    document.body.removeChild(iframe);
    document.body.removeChild(overlay);
  });
  
  // Add to page
  document.body.appendChild(overlay);
  document.body.appendChild(iframe);
});
</script>
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Replace Organization ID</span>

</div>
Replace `YOUR_ORG_ID_HERE` with your actual organization ID.

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 4: Adjust Styling</span>

</div>
Customize the button colors and text to match your brand:

```css
background: #YOUR_BRAND_COLOR;
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 5: Save and Publish</span>

</div>
1. Click **"Update"** to save the HTML element
2. Click **"Publish"** to make changes live

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Adding Inline Donation Form</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Specific Pages</span>

</div>
1. **Add HTML Embed** where you want the donation form
2. Use this code for an embedded form:

```html
<div class="wix-donation-form" style="
  background: #f9f9f9;
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
">
  <h2 style="color: #333; margin-bottom: 15px;">Support Our Mission</h2>
  <p style="color: #666; margin-bottom: 25px;">Your donation makes a real difference</p>
  
  <div id="inline-donation-widget" style="min-height: 400px;">
    <p>Loading donation form...</p>
  </div>
</div>

<script>
// Create iframe for inline widget
const container = document.getElementById('inline-donation-widget');
const iframe = document.createElement('iframe');
iframe.src = 'https://your-widget-domain.com/donate?org=YOUR_ORG_ID_HERE&inline=true';
iframe.style.cssText = `
  width: 100%;
  height: 500px;
  border: none;
  border-radius: 8px;
`;

// Handle iframe height changes
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_RESIZE') {
    iframe.style.height = event.data.height + 'px';
  }
});

container.innerHTML = '';
container.appendChild(iframe);
</script>
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 2: Custom Element</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Using Wix's Custom Element Feature</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Add Custom Element</span>

</div>
1. Click **"+" (Add Elements)**
2. Go to **"Embed" → "Custom Element"**
3. Drag it to your desired location

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🔧 Step 2: Configure Element</span>

</div>
1. Click the custom element
2. Choose **"Choose Source" → "Website URL"**
3. Enter your widget URL: `https://your-widget-domain.com/embed`

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Add Parameters</span>

</div>
In the URL parameters section, add:
```
org=YOUR_ORG_ID_HERE
amount=25
color=0891B2
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 4: Adjust Size</span>

</div>
- Set width: 100% (responsive)
- Set height: 500px (or auto if supported)

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 3: Wix Velo (Advanced)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 For Developers Using Wix Velo</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Enable Wix Velo</span>

</div>
1. In Wix Editor, click **"Dev Mode"**
2. Enable **Wix Velo** if not already enabled

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add HTML Element</span>

</div>
Add an HTML element with ID `donationWidget`

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Add Velo Code</span>

</div>
In your page code, add:

```javascript
import { fetch } from 'wix-fetch';

$w.onReady(function () {
  // Initialize donation widget
  initializeDonationWidget();
});

async function initializeDonationWidget() {
  // Get widget configuration
  try {
    const config = await getWidgetConfig('YOUR_ORG_ID_HERE');
    renderDonationWidget(config);
  } catch (error) {
    console.error('Failed to load donation widget:', error);
    showErrorMessage();
  }
}

async function getWidgetConfig(orgId) {
  const response = await fetch(`https://your-api-domain.com/api/widget-config/${orgId}`);
  return response.json();
}

function renderDonationWidget(config) {
  const widgetHtml = `
    <div class="velo-donation-widget">
      <h3>Support Our Cause</h3>
      <div class="donation-amounts">
        ${config.suggestedAmounts.map(amount => 
          `<button class="amount-btn" data-amount="${amount}">$${amount}</button>`
        ).join('')}
      </div>
      <button id="custom-amount-btn">Custom Amount</button>
    </div>
    
    <style>
      .velo-donation-widget {
        font-family: Arial, sans-serif;
        padding: 20px;
        background: ${config.theme.backgroundColor};
        border-radius: 8px;
        text-align: center;
      }
      
      .amount-btn {
        background: ${config.theme.primaryColor};
        color: white;
        border: none;
        padding: 10px 20px;
        margin: 5px;
        border-radius: 5px;
        cursor: pointer;
      }
      
      .amount-btn:hover {
        opacity: 0.8;
      }
    </style>
  `;
  
  $w('#donationWidget').html = widgetHtml;
  
  // Add click handlers
  $w('#donationWidget').onClick((event) => {
    if (event.target.classList.contains('amount-btn')) {
      const amount = event.target.dataset.amount;
      openDonationForm(amount);
    }
  });
}

function openDonationForm(amount) {
  // Open donation form in lightbox or redirect
  const donationUrl = `https://your-widget-domain.com/donate?org=YOUR_ORG_ID_HERE&amount=${amount}`;
  
  // Option 1: Open in lightbox
  $w('#lightbox1').show();
  $w('#lightboxIframe').src = donationUrl;
  
  // Option 2: Redirect to donation page
  // wixLocationFrontend.to(donationUrl);
}

function showErrorMessage() {
  $w('#donationWidget').html = `
    <div style="text-align: center; padding: 20px; color: #888;">
      <p>Donation widget temporarily unavailable.</p>
      <p>Please try again later.</p>
    </div>
  `;
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 4: Add Lightbox (Optional)</span>

</div>
1. Add a **Lightbox** element for the donation form
2. Add an **iframe** inside the lightbox with ID `lightboxIframe`
3. Style the lightbox appropriately

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Mobile Optimization</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Responsive Design</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Mobile-Friendly Button</span>

</div>
```html
<style>
@media (max-width: 768px) {
  #wix-donation-widget {
    bottom: 10px !important;
    right: 10px !important;
  }
  
  #donate-button {
    padding: 12px 20px !important;
    font-size: 14px !important;
  }
}

@media (max-width: 480px) {
  .donation-iframe {
    width: 95% !important;
    height: 80vh !important;
  }
}
</style>
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Touch-Friendly Interface</span>

</div>
- Buttons minimum 44px height for touch targets
- Adequate spacing between elements
- Clear, readable fonts on mobile devices

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Mobile Testing Checklist</span>

</div>
- [ ] Button is easily tappable on mobile
- [ ] Donation form opens properly
- [ ] Form fields work with mobile keyboards
- [ ] Payment processing works on mobile browsers
- [ ] Confirmation page displays correctly

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Customization Options</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Brand Colors</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Matching Your Wix Theme</span>

</div>
1. In Wix Editor, go to **Design → Colors**
2. Note your brand colors
3. Update widget CSS:

```css
background: #YOUR_PRIMARY_COLOR;
border: 2px solid #YOUR_SECONDARY_COLOR;
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Button Styles</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Modern Flat Design</span>

</div>
```css
<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 donate-button {</span>

</div>
  background: linear-gradient(135deg, #0891B2, #0F766E);
  border: none;
  padding: 15px 30px;
  border-radius: 0; /* Flat corners */
  font-family: 'Your Wix Font';
  text-transform: uppercase;
  letter-spacing: 1px;
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Rounded Pill Style</span>

</div>
```css
<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 donate-button {</span>

</div>
  background: #0891B2;
  border: none;
  padding: 12px 25px;
  border-radius: 50px; /* Full rounding */
  box-shadow: 0 4px 15px rgba(8, 145, 178, 0.3);
}
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Animation Effects</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Hover Animations</span>

</div>
```css
<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 donate-button {</span>

</div>
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 donate-button:hover {</span>

</div>
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(8, 145, 178, 0.4);
}
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Pulse Effect</span>

</div>
```css
@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(8, 145, 178, 0.7); }
  70% { box-shadow: 0 0 0 10px rgba(8, 145, 178, 0); }
  100% { box-shadow: 0 0 0 0 rgba(8, 145, 178, 0); }
}

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 donate-button {</span>

</div>
  animation: pulse 2s infinite;
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

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 ✅ Visual Check</span>

</div>
- [ ] Widget appears correctly on desktop
- [ ] Mobile layout looks good
- [ ] Colors match your brand
- [ ] Button text is clear and compelling

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Functionality Test</span>

</div>
- [ ] Button opens donation form
- [ ] Form fields work properly
- [ ] Payment processing completes
- [ ] Confirmation message displays

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Browser Testing</span>

</div>
- [ ] Chrome ✓
- [ ] Firefox ✓
- [ ] Safari ✓
- [ ] Mobile Safari ✓
- [ ] Chrome Mobile ✓

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Wix Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Widget not displaying"</span>

</div>
**Possible causes:**
- HTML element not configured properly
- Organization ID incorrect
- Code syntax errors

**Solutions:**
1. Check HTML element settings
2. Verify organization ID
3. Review code for typos
4. Check browser console for errors

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Mobile layout broken"</span>

</div>
**Possible causes:**
- Missing mobile CSS
- Fixed positioning issues
- Viewport scaling problems

**Solutions:**
1. Add mobile-responsive CSS
2. Test on actual mobile devices
3. Use Wix's mobile editor
4. Adjust iframe dimensions

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Button conflicts with Wix theme"</span>

</div>
**Possible causes:**
- CSS specificity issues
- Theme style overrides
- Z-index problems

**Solutions:**
1. Use `!important` in CSS rules
2. Increase z-index values
3. Test with different Wix themes
4. Use inline styles for critical properties

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Wix-Specific Limitations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Known Issues</span>

</div>
- **Fixed positioning**: May not work on all devices
- **iframe restrictions**: Some limitations on iframe content
- **Mobile editing**: Separate mobile layout needed

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Workarounds</span>

</div>
- Use relative positioning when needed
- Test thoroughly on mobile devices
- Consider Wix App Market alternatives (when available)

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">✨ Advanced Features</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Analytics Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Wix Analytics</span>

</div>
```javascript
// Track donations in Wix Analytics
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_DONATION_COMPLETE') {
    // Send to Wix Analytics
    if (window.wixDevelopersAnalytics) {
      window.wixDevelopersAnalytics.reportCustomEvent('donation_completed', {
        amount: event.data.amount,
        currency: 'USD'
      });
    }
  }
});
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Google Analytics Integration</span>

</div>
```javascript
// Track donations with Google Analytics
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_DONATION_COMPLETE') {
    gtag('event', 'donation', {
      'event_category': 'engagement',
      'event_label': 'passiton_widget',
      'value': event.data.amount
    });
  }
});
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Multi-Language Support</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Wix Multilingual Sites</span>

</div>
```javascript
// Detect Wix site language
const siteLanguage = window.location.pathname.split('/')[1] || 'en';

const translations = {
  'en': 'Donate Now',
  'es': 'Donar Ahora',
  'fr': 'Faire un Don',
  'de': 'Jetzt Spenden'
};

document.getElementById('donate-button').textContent = translations[siteLanguage] || translations['en'];
```

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Going Live</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Pre-Launch Checklist</span>

</div>

1. **Test on all devices** (desktop, tablet, mobile)
2. **Verify payment processing** with small test donations
3. **Check email confirmations** are being sent
4. **Monitor site performance** (widget shouldn't slow down site)
5. **Train team** on donation management

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Marketing Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Wix Marketing Tools</span>

</div>
- Add donation call-to-action in Wix email campaigns
- Include widget link in social media posts
- Feature donation milestones on your site

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 SEO Optimization</span>

</div>
- Add donation-related keywords to page content
- Create donation-focused landing pages
- Include donation impact in meta descriptions

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">💬 Support Resources</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Wix-Specific Help</span>

</div>
- **Wix Support**: For platform-related issues
- **Wix Forum**: Community help and discussions
- **Wix Code Documentation**: For Velo development

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 PassItOn Support</span>

</div>
- **Email**: support@passiton.com
- **Documentation**: Complete setup guides
- **Technical Support**: Widget functionality help

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Best Practices</span>

</div>
- Always test changes in Wix preview mode first
- Keep widget code simple and lightweight
- Monitor donation performance regularly
- Update organization ID if you change accounts

---
*For Wix-specific issues: Contact Wix Support*
