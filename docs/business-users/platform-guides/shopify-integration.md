<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📖 Shopify Integration Guide</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

Integrate your PassItOn donation widget seamlessly into your Shopify store. Perfect for businesses that want to give customers an easy way to support causes alongside their purchases.

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Table of Contents</span>

</div>

- [Quick Setup (10 minutes)](#quick-setup-10-minutes)
- [Method 1: Theme Code Integration](#method-1-theme-code-integration-recommended)
- [Method 2: Shopify App (Coming Soon)](#method-2-shopify-app-coming-soon)
- [Method 3: Custom Pages](#method-3-custom-pages)
- [Cart & Checkout Integration](#cart--checkout-integration)
- [Customization for E-commerce](#customization-for-e-commerce)
- [Testing & Troubleshooting](#testing--troubleshooting)

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Quick Setup (10 minutes)</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 What You'll Need</span>

</div>
- Your PassItOn organization ID
- Shopify store admin access
- Basic familiarity with Shopify admin

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Step-by-Step Process</span>

</div>

1. **Get Your Organization ID**
   - Log into your PassItOn dashboard
   - Navigate to Widget → Embed
   - Copy your organization ID

2. **Access Shopify Theme Editor**
   - Go to Online Store → Themes
   - Click "Actions" → "Edit code"

3. **Add Widget Code**
   - Find `theme.liquid` file
   - Add embed code before `</body>`

4. **Save & Test**
   - Save changes
   - Preview your store
   - Test donation functionality

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 1: Theme Code Integration (Recommended)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Adding to All Pages</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Access Theme Files</span>

</div>
1. From Shopify admin, go to **Online Store → Themes**
2. Find your active theme
3. Click **Actions → Edit code**

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Edit theme.liquid</span>

</div>
1. In the Layout folder, click **theme.liquid**
2. Scroll to the bottom, find the `</body>` tag
3. Add this code just before `</body>`:

```html
<!-- PassItOn Donation Widget -->
<script>
  window.PassItOnConfig = {
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 25,
    color: '#{{ settings.color_accent | remove: "#" }}', // Uses your theme's accent color
    buttonText: 'Support a Cause',
    position: 'bottom-right'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Save Changes</span>

</div>
Click **Save** to apply changes to your live store.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Adding to Specific Pages Only</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Product Pages Only</span>

</div>
1. Open **Templates → product.liquid**
2. Add the widget code where you want it to appear
3. Use inline embedding:

```html
<div class="product-donation-widget">
  <h3>Love this product? Support our cause too!</h3>
  <div id="product-donation-widget">
    <p>Loading donation options...</p>
  </div>
</div>

<script>
  window.PassItOnConfig = {
    targetElementId: 'product-donation-widget',
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: {{ product.price | divided_by: 100 | times: 0.1 | round }}, // 10% of product price
    color: '#{{ settings.color_accent | remove: "#" }}',
    buttonText: 'Donate {{ product.price | divided_by: 100 | times: 0.1 | round | money }}'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 For Collection Pages</span>

</div>
1. Open **Templates → collection.liquid**
2. Add widget after product listings:

```html
<div class="collection-support-section">
  <div class="container">
    <h2>Support Our Mission</h2>
    <p>Love shopping with us? Consider supporting the causes we care about.</p>
    <div id="collection-donation-widget"></div>
  </div>
</div>

<script>
  window.PassItOnConfig = {
    targetElementId: 'collection-donation-widget',
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 20,
    color: '#{{ settings.color_accent | remove: "#" }}',
    buttonText: 'Support This Cause'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 2: Shopify App (Coming Soon)</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Native Shopify App Benefits</span>

</div>
- **Easy Installation**: One-click install from Shopify App Store
- **Theme Integration**: Automatic integration with any theme
- **Admin Dashboard**: Manage donations directly from Shopify admin
- **Order Integration**: Link donations to customer orders
- **Analytics**: Built-in reporting within Shopify

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Current Status</span>

</div>
Our Shopify app is in development. For now, use the theme code integration method above.

**Want early access?** Email us at apps@passiton.com to join the beta program.

---

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Method 3: Custom Pages</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Creating a Dedicated Donation Page</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 1: Create New Page</span>

</div>
1. Go to **Online Store → Pages**
2. Click **Add page**
3. Title: "Support Our Cause" (or similar)

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 2: Add Page Content</span>

</div>
Switch to HTML editor and add:

```html
<div class="donation-page-header">
  <h1>Support Our Mission</h1>
  <p>Your donation helps us make a difference in the world.</p>
</div>

<div class="donation-widget-container">
  <div id="page-donation-widget">
    <p>Loading donation form...</p>
  </div>
</div>

<div class="donation-page-content">
  <h2>Where Your Donation Goes</h2>
  <div class="impact-stats">
    <div class="stat">
      <h3>$25</h3>
      <p>Provides clean water for one person for a month</p>
    </div>
    <div class="stat">
      <h3>$50</h3>
      <p>Feeds a family of four for one week</p>
    </div>
    <div class="stat">
      <h3>$100</h3>
      <p>Supports education for one child for a month</p>
    </div>
  </div>
</div>

<style>
.donation-page-header {
  text-align: center;
  margin-bottom: 40px;
}

.donation-widget-container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
}

.impact-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.stat {
  text-align: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat h3 {
  color: #0891B2;
  font-size: 2em;
  margin-bottom: 10px;
}
</style>

<script>
  window.PassItOnConfig = {
    targetElementId: 'page-donation-widget',
    organizationId: 'YOUR_ORG_ID_HERE',
    defaultAmount: 50,
    color: '#0891B2',
    buttonText: 'Make a Donation'
  };
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Step 3: Add to Navigation</span>

</div>
1. Go to **Online Store → Navigation**
2. Add link to your new donation page
3. Place in main menu or footer

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Cart & Checkout Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Round-Up Donations at Checkout</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Option 1: Cart Page Integration</span>

</div>
1. Edit **Templates → cart.liquid**
2. Add round-up option in cart totals:

```html
<div class="cart-donation-section">
  <h3>Round up for a good cause?</h3>
  <p>Round up your order to the nearest dollar and donate the difference.</p>
  
  <div class="round-up-calculator">
    <span class="cart-total">Cart Total: {{ cart.total_price | money }}</span>
    <span class="rounded-total">Rounded: <span id="rounded-amount"></span></span>
    <span class="donation-amount">Donation: <span id="donation-amount"></span></span>
  </div>
  
  <div id="checkout-donation-widget"></div>
</div>

<script>
// Calculate round-up amount
const cartTotal = {{ cart.total_price | divided_by: 100.0 }};
const roundedTotal = Math.ceil(cartTotal);
const donationAmount = roundedTotal - cartTotal;

document.getElementById('rounded-amount').textContent = '$' + roundedTotal.toFixed(2);
document.getElementById('donation-amount').textContent = '$' + donationAmount.toFixed(2);

// Initialize widget with calculated amount
window.PassItOnConfig = {
  targetElementId: 'checkout-donation-widget',
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: Math.round(donationAmount * 100) / 100, // Round to nearest cent
  color: '#{{ settings.color_accent | remove: "#" }}',
  buttonText: 'Add $' + donationAmount.toFixed(2) + ' Donation'
};
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Post-Purchase Thank You</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Add to Thank You Page</span>

</div>
1. Go to **Settings → Checkout**
2. Scroll to **Order status page**
3. Add to **Additional scripts**:

```html
<div class="post-purchase-donation">
  <h2>Thank you for your purchase!</h2>
  <p>Feeling generous? Consider supporting our cause too.</p>
  <div id="thankyou-donation-widget"></div>
</div>

<script>
window.PassItOnConfig = {
  targetElementId: 'thankyou-donation-widget',
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: Math.round({{ checkout.total_price | divided_by: 100 }} * 0.05), // 5% of order
  color: '#0891B2',
  buttonText: 'Support Our Cause'
};
</script>
<script src="https://your-widget-domain.com/embed.js"></script>
```

---

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Customization for E-commerce</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Smart Default Amounts</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Based on Cart Value</span>

</div>
```javascript
// Dynamic amount based on cart total
const cartTotal = {{ cart.total_price | divided_by: 100.0 }};
let suggestedAmount = 10; // Default

if (cartTotal > 100) suggestedAmount = 25;
if (cartTotal > 200) suggestedAmount = 50;
if (cartTotal > 500) suggestedAmount = 100;

window.PassItOnConfig = {
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: suggestedAmount,
  color: '#{{ settings.color_accent | remove: "#" }}'
};
```

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Based on Product Category</span>

</div>
```javascript
// Different amounts for different product types
{% if product.type == 'luxury' %}
  const suggestedAmount = 50;
{% elsif product.type == 'basic' %}
  const suggestedAmount = 10;
{% else %}
  const suggestedAmount = 25;
{% endif %}

window.PassItOnConfig = {
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: suggestedAmount
};
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Seasonal Campaigns</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Holiday-Specific Messaging</span>

</div>
```javascript
// Different messaging based on date
const now = new Date();
const month = now.getMonth() + 1;
let buttonText = 'Support Our Cause';
let campaignColor = '#0891B2';

if (month === 12) {
  buttonText = 'Holiday Giving';
  campaignColor = '#DC2626'; // Red for holidays
} else if (month === 2) {
  buttonText = 'Share the Love';
  campaignColor = '#EC4899'; // Pink for Valentine's
}

window.PassItOnConfig = {
  organizationId: 'YOUR_ORG_ID_HERE',
  buttonText: buttonText,
  color: campaignColor
};
```

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing & Troubleshooting</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Pre-Launch Checklist</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 ✅ Store Integration</span>

</div>
- [ ] Widget appears on desired pages
- [ ] Colors match your store theme
- [ ] Mobile responsive design works
- [ ] No layout conflicts with theme

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ Functionality Testing</span>

</div>
- [ ] Donation button opens widget
- [ ] Payment processing works
- [ ] Confirmation emails sent
- [ ] Thank you page displays

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">🧪 ✅ E-commerce Specific Tests</span>

</div>
- [ ] Cart integration doesn't break checkout
- [ ] Round-up calculations are accurate
- [ ] Post-purchase widget works
- [ ] Analytics tracking functions

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Common Shopify Issues</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Widget conflicts with theme"</span>

</div>
**Solutions:**
1. Check for CSS conflicts in browser dev tools
2. Try different positioning options
3. Add custom CSS to fix layout issues
4. Test with different themes

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Round-up calculations wrong"</span>

</div>
**Solutions:**
1. Verify Liquid template syntax
2. Test with different cart amounts
3. Check JavaScript console for errors
4. Ensure proper number formatting

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 "Checkout process broken"</span>

</div>
**Solutions:**
1. Remove widget from checkout pages temporarily
2. Check Shopify checkout settings
3. Test in different browsers
4. Contact Shopify support if needed

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Shopify-Specific Support</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Resources</span>

</div>
- **Shopify Partner Help**: For theme customization issues
- **PassItOn Support**: For widget functionality
- **Shopify Community**: For general Shopify questions

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Performance Impact</span>

</div>
- Widget loads asynchronously (no checkout slowdown)
- Minimal impact on store speed
- CDN delivery for fast loading

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">✨ Advanced Shopify Features</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Customer Segmentation</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Different Widgets for Different Customers</span>

</div>
```javascript
// Show different donation amounts based on customer tags
{% if customer.tags contains 'VIP' %}
  const defaultAmount = 100;
  const buttonText = 'VIP Donation';
{% elsif customer.tags contains 'Returning' %}
  const defaultAmount = 50;
  const buttonText = 'Welcome Back - Donate';
{% else %}
  const defaultAmount = 25;
  const buttonText = 'First-Time Donation';
{% endif %}

window.PassItOnConfig = {
  organizationId: 'YOUR_ORG_ID_HERE',
  defaultAmount: defaultAmount,
  buttonText: buttonText
};
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Multi-Language Support</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Liquid Translation</span>

</div>
```javascript
// Use Shopify's translation system
window.PassItOnConfig = {
  organizationId: 'YOUR_ORG_ID_HERE',
  buttonText: '{{ "donate_now" | t }}',
  language: '{{ request.locale.iso_code }}'
};
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Analytics Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Shopify Analytics</span>

</div>
```javascript
// Track donations in Shopify analytics
window.addEventListener('message', function(event) {
  if (event.data.type === 'PASSITON_DONATION_COMPLETE') {
    // Send to Shopify Analytics
    analytics.track('Donation Completed', {
      amount: event.data.amount,
      currency: 'USD',
      organization: 'YOUR_ORG_ID_HERE'
    });
  }
});
```

---

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Going Live</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Launch Checklist</span>

</div>

1. **Test thoroughly** with real small donations
2. **Check mobile** experience on actual devices
3. **Verify analytics** are tracking properly
4. **Train staff** on donation management
5. **Monitor performance** for first week

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Marketing Your Donations</span>

</div>

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Email Newsletter</span>

</div>
- Announce the new donation feature
- Share impact stories
- Include donation statistics

<div style="background: rgba(59, 130, 246, 0.05); border-left: 2px solid #3b82f6; padding: 1rem; margin: 1.5rem 0; border-radius: 6px;">

<span style="font-size: 1.2rem; font-weight: 500; color: #1d4ed8;">📌 Social Media</span>

</div>
- Post about cause partnership
- Share donation milestones
- Thank donors publicly (with permission)

---

"For Shopify platform issues: Contact Shopify Support*