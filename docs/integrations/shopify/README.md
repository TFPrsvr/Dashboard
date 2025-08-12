<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 PassItOn Shopify App Integration</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Overview</span>

</div>

The PassItOn Shopify app allows merchants to easily add donation widgets to their stores, enabling customers to make charitable donations during checkout or on product pages.

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 App Store Listing Information</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 App Name</span>

</div>
PassItOn - Donation Widget for Shopify

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 App Tagline</span>

</div>
Add donation widgets to your store and let customers support causes they care about

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 App Description</span>

</div>

**Short Description:**
Transform your Shopify store into a force for good. PassItOn lets customers make charitable donations during checkout, boosting your brand's social impact while increasing customer loyalty.

**Full Description:**
PassItOn seamlessly integrates donation functionality into your Shopify store, allowing customers to support charitable causes alongside their purchases. Perfect for socially conscious brands looking to make a positive impact.

**Key Features:**
- Easy one-click installation with no coding required
- Customizable donation widgets that match your brand
- Support for any registered charity or cause
- Real-time donation tracking and analytics
- Mobile-optimized donation experience
- Secure payment processing through Stripe
- Detailed reporting and impact metrics
- Multiple widget placement options (checkout, cart, product pages)

**Perfect for:**
- E-commerce stores wanting to give back to the community
- Brands with social responsibility initiatives
- Seasonal campaigns (holidays, awareness months)
- Product launches with charitable partnerships
- Building customer loyalty through shared values

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 App Screenshots</span>

</div>
1. **Widget Customization Dashboard** - Show the drag-and-drop widget builder
2. **Checkout Integration** - Donation widget in Shopify checkout
3. **Analytics Dashboard** - Donation metrics and impact reports
4. **Mobile Experience** - Responsive donation widget on mobile
5. **Admin Settings** - Easy configuration options

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 App Categories</span>

</div>
- Marketing
- Social Impact
- Customer Experience
- Analytics

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">✨ Service Features</span>

</div>
- Complete donation widget customization
- Full access to all features and analytics
- Unlimited donation processing capabilities

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Technical Requirements</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Shopify App Requirements</span>

</div>
- [ ] OAuth 2.0 authentication flow
- [ ] App installation and uninstallation webhooks
- [ ] Secure HTTPS endpoints
- [ ] Privacy policy and terms of service
- [ ] App listing with screenshots and description
- [ ] Merchant-facing dashboard within Shopify Admin

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">🔌 API Endpoints Required</span>

</div>

```typescript
// App installation
POST /api/shopify/install
GET /api/shopify/auth/callback

// App configuration
GET /api/shopify/app
POST /api/shopify/configure

// Widget management
GET /api/shopify/widgets
POST /api/shopify/widgets
PUT /api/shopify/widgets/:id
DELETE /api/shopify/widgets/:id

// Webhooks
POST /api/webhooks/shopify/uninstall
POST /api/webhooks/shopify/order
```

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 Required Scopes</span>

</div>
- `read_customers` - Access customer data for donation attribution
- `read_orders` - Read order data for donation context
- `write_script_tags` - Inject donation widget scripts
- `read_themes` - Access theme files for integration
- `write_themes` - Modify theme files if needed

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📦 Installation Flow</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📦 1. App Installation</span>

</div>
1. Merchant clicks "Install App" from Shopify App Store
2. Redirected to PassItOn authorization page
3. Merchant grants permissions
4. App installed and merchant redirected to onboarding

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ 2. Initial Setup</span>

</div>
1. Create PassItOn account (or link existing)
2. Configure first donation widget
3. Select widget placement (checkout, cart, product pages)
4. Customize appearance to match store branding
5. Choose supported causes/charities

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 3. Widget Deployment</span>

</div>
1. Automatic script injection into Shopify theme
2. Widget appears on selected pages
3. Real-time preview and testing
4. Go live with donations

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Widget Integration Methods</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 1: Checkout Extension (Recommended)</span>

</div>
```javascript
// Shopify checkout extension
import { Extension } from '@shopify/checkout-ui-extensions';

export default Extension('Checkout::Dynamic::Render', (root, api) => {
  const donationWidget = root.createComponent(DonationWidget, {
    storeId: api.shop.id,
    totalAmount: api.cost.totalAmount.amount
  });
  
  root.appendChild(donationWidget);
});
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 2: Script Tag Injection</span>

</div>
```html
<!-- Auto-injected into theme files -->
<script src="https://widget.passiton.com/shopify.js" 
        data-store-id="shop-domain" 
        data-widget-id="widget-123">
</script>
<div id="passiton-widget-container"></div>
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Method 3: Theme App Extension</span>

</div>
```liquid
<!-- Liquid template integration -->
{% render 'passiton-widget', 
   widget_id: 'widget-123',
   placement: 'checkout',
   amount_suggestion: cart.total_price %}
```

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">✨ App Dashboard Features</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Widget Management</span>

</div>
- Visual widget builder with live preview
- Multiple widget templates
- Custom CSS editor for advanced styling
- A/B testing for optimization
- Performance analytics

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Donation Analytics</span>

</div>
- Real-time donation tracking
- Customer donation patterns
- Impact reporting and metrics
- Integration with Shopify Analytics
- Export capabilities for reporting

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 Settings & Configuration</span>

</div>
- Charity/cause management
- Payment processing setup
- Email notification preferences
- Widget placement controls
- Brand customization options

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔒 Compliance and Security</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Shopify App Store Requirements</span>

</div>
- [ ] App must handle all customer data securely
- [ ] GDPR compliance for EU customers
- [ ] No unauthorized data collection
- [ ] Secure payment processing (PCI DSS compliant)
- [ ] Regular security updates and maintenance

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Data Handling</span>

</div>
- Customer data encrypted in transit and at rest
- No storage of payment card information
- Donation data linked to orders for tracking
- Opt-out mechanisms for customers
- Data retention policies documented

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing Checklist</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Pre-Submission Testing</span>

</div>
- [ ] Install/uninstall flow works correctly
- [ ] Widget appears on all selected pages
- [ ] Donation processing completes successfully
- [ ] Analytics data records accurately
- [ ] Mobile responsiveness verified
- [ ] Multiple theme compatibility tested
- [ ] Performance impact minimal
- [ ] Error handling works properly

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Shopify Review Process</span>

</div>
1. **Technical Review**: Code quality, security, performance
2. **Merchant Experience**: Installation and configuration flow
3. **User Experience**: Customer-facing donation process
4. **Policy Compliance**: Terms, privacy, data handling
5. **Store Testing**: Multi-store compatibility testing

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Post-Launch Maintenance</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Regular Updates</span>

</div>
- Shopify API version updates
- Security patches and improvements
- New features and enhancements
- Bug fixes and optimizations

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Support and Documentation</span>

</div>
- Comprehensive help documentation
- Video tutorials for setup
- Email support for merchants
- Community forum for best practices

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Performance Monitoring</span>

</div>
- App performance metrics
- Error rate monitoring
- Customer feedback tracking
- Donation conversion analytics

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Shopify Partner Dashboard Setup</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔧 App Configuration</span>

</div>
```json
{
  "name": "PassItOn Donation Widget",
  "app_url": "https://dashboard.passiton.com",
  "whitelisted_redirection_urls": [
    "https://dashboard.passiton.com/auth/shopify/callback"
  ],
  "app_proxy": {
    "url": "https://dashboard.passiton.com/shopify/proxy",
    "subpath": "passiton",
    "prefix": "apps"
  },
  "embedded_app_sdk": true,
  "pos_embedded": false
}
```

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Required App Listing Assets</span>

</div>
- App icon (512x512 PNG)
- App screenshots (1280x800 or 1024x1024)
- App demo video (optional but recommended)
- Detailed app description
- Privacy policy and terms of service links
- Support contact information

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Revenue Model</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 App Store Revenue Split</span>

</div>
- Shopify takes 20% of subscription revenue for first $1M
- 15% after $1M in annual recurring revenue
- No commission on transaction fees

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Pricing Strategy</span>

</div>
- Free tier to encourage adoption
- Professional tier for growing businesses
- Enterprise tier for high-volume merchants
- Transaction-based pricing for large volumes

---

*This documentation should be updated as Shopify requirements evolve. Last updated: January 29, 2025*