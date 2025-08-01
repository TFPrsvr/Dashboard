# PassItOn Shopify App Integration

## Overview

The PassItOn Shopify app allows merchants to easily add donation widgets to their stores, enabling customers to make charitable donations during checkout or on product pages.

## App Store Listing Information

### App Name
PassItOn - Donation Widget for Shopify

### App Tagline
Add donation widgets to your store and let customers support causes they care about

### App Description

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

### App Screenshots
1. **Widget Customization Dashboard** - Show the drag-and-drop widget builder
2. **Checkout Integration** - Donation widget in Shopify checkout
3. **Analytics Dashboard** - Donation metrics and impact reports
4. **Mobile Experience** - Responsive donation widget on mobile
5. **Admin Settings** - Easy configuration options

### App Categories
- Marketing
- Social Impact
- Customer Experience
- Analytics

### Pricing
- **Free Plan**: 1 widget, up to 50 donations/month
- **Professional Plan**: $39/month - 5 widgets, 1,000 donations/month
- **Enterprise Plan**: $299/month - Unlimited widgets and donations

## Technical Requirements

### Shopify App Requirements
- [ ] OAuth 2.0 authentication flow
- [ ] App installation and uninstallation webhooks
- [ ] Secure HTTPS endpoints
- [ ] Privacy policy and terms of service
- [ ] App listing with screenshots and description
- [ ] Merchant-facing dashboard within Shopify Admin

### API Endpoints Required

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

### Required Scopes
- `read_customers` - Access customer data for donation attribution
- `read_orders` - Read order data for donation context
- `write_script_tags` - Inject donation widget scripts
- `read_themes` - Access theme files for integration
- `write_themes` - Modify theme files if needed

## Installation Flow

### 1. App Installation
1. Merchant clicks "Install App" from Shopify App Store
2. Redirected to PassItOn authorization page
3. Merchant grants permissions
4. App installed and merchant redirected to onboarding

### 2. Initial Setup
1. Create PassItOn account (or link existing)
2. Configure first donation widget
3. Select widget placement (checkout, cart, product pages)
4. Customize appearance to match store branding
5. Choose supported causes/charities

### 3. Widget Deployment
1. Automatic script injection into Shopify theme
2. Widget appears on selected pages
3. Real-time preview and testing
4. Go live with donations

## Widget Integration Methods

### Method 1: Checkout Extension (Recommended)
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

### Method 2: Script Tag Injection
```html
<!-- Auto-injected into theme files -->
<script src="https://widget.passiton.com/shopify.js" 
        data-store-id="shop-domain" 
        data-widget-id="widget-123">
</script>
<div id="passiton-widget-container"></div>
```

### Method 3: Theme App Extension
```liquid
<!-- Liquid template integration -->
{% render 'passiton-widget', 
   widget_id: 'widget-123',
   placement: 'checkout',
   amount_suggestion: cart.total_price %}
```

## App Dashboard Features

### Widget Management
- Visual widget builder with live preview
- Multiple widget templates
- Custom CSS editor for advanced styling
- A/B testing for optimization
- Performance analytics

### Donation Analytics
- Real-time donation tracking
- Customer donation patterns
- Impact reporting and metrics
- Integration with Shopify Analytics
- Export capabilities for reporting

### Settings & Configuration
- Charity/cause management
- Payment processing setup
- Email notification preferences
- Widget placement controls
- Brand customization options

## Compliance and Security

### Shopify App Store Requirements
- [ ] App must handle all customer data securely
- [ ] GDPR compliance for EU customers
- [ ] No unauthorized data collection
- [ ] Secure payment processing (PCI DSS compliant)
- [ ] Regular security updates and maintenance

### Data Handling
- Customer data encrypted in transit and at rest
- No storage of payment card information
- Donation data linked to orders for tracking
- Opt-out mechanisms for customers
- Data retention policies documented

## Testing Checklist

### Pre-Submission Testing
- [ ] Install/uninstall flow works correctly
- [ ] Widget appears on all selected pages
- [ ] Donation processing completes successfully
- [ ] Analytics data records accurately
- [ ] Mobile responsiveness verified
- [ ] Multiple theme compatibility tested
- [ ] Performance impact minimal
- [ ] Error handling works properly

### Shopify Review Process
1. **Technical Review**: Code quality, security, performance
2. **Merchant Experience**: Installation and configuration flow
3. **User Experience**: Customer-facing donation process
4. **Policy Compliance**: Terms, privacy, data handling
5. **Store Testing**: Multi-store compatibility testing

## Post-Launch Maintenance

### Regular Updates
- Shopify API version updates
- Security patches and improvements
- New features and enhancements
- Bug fixes and optimizations

### Support and Documentation
- Comprehensive help documentation
- Video tutorials for setup
- Email support for merchants
- Community forum for best practices

### Performance Monitoring
- App performance metrics
- Error rate monitoring
- Customer feedback tracking
- Donation conversion analytics

## Shopify Partner Dashboard Setup

### App Configuration
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

### Required App Listing Assets
- App icon (512x512 PNG)
- App screenshots (1280x800 or 1024x1024)
- App demo video (optional but recommended)
- Detailed app description
- Privacy policy and terms of service links
- Support contact information

## Revenue Model

### App Store Revenue Split
- Shopify takes 20% of subscription revenue for first $1M
- 15% after $1M in annual recurring revenue
- No commission on transaction fees

### Pricing Strategy
- Free tier to encourage adoption
- Professional tier for growing businesses
- Enterprise tier for high-volume merchants
- Transaction-based pricing for large volumes

---

*This documentation should be updated as Shopify requirements evolve. Last updated: January 29, 2025*