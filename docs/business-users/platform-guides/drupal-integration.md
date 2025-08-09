# Drupal PassItOn Widget Integration Guide

## Overview

This guide helps non-technical users set up and manage PassItOn donation widgets on Drupal websites. Perfect for nonprofit administrators, content managers, and organization staff who need to add donation functionality to their Drupal site.

## Before You Start

### What You'll Need
- **Drupal Site Access**: Administrative access to your Drupal website
- **PassItOn Account**: Organization account with API credentials
- **Site Requirements**: Drupal 9, 10, or 11 with HTTPS enabled
- **Time Required**: 30-45 minutes for complete setup

### Getting Your API Credentials
1. Log into your [PassItOn Dashboard](https://dashboard.passiton.com)
2. Go to **Settings > API Access**
3. Copy your **Organization ID** and **API Key**
4. Keep these secure - you'll need them for setup

## Step 1: Install the Module

### Option A: Through Drupal Admin (Recommended)
1. Log into your Drupal site as an administrator
2. Go to **Extend** (or **Modules** in older versions)
3. Click **Install new module**
4. Enter: `https://ftp.drupal.org/files/projects/passiton_widget-1.0.0.tar.gz`
5. Click **Install**
6. Find "PassItOn Donation Widget" in the module list
7. Check the box next to it and click **Install**

### Option B: Ask Your Developer
If you don't have module installation permissions:
1. Contact your web developer or site administrator
2. Provide them with this guide
3. Ask them to install the "PassItOn Donation Widget" module
4. Request admin access to configure the widget settings

## Step 2: Configure Your API Settings

### Basic Configuration
1. Go to **Configuration > Web Services > PassItOn Widget**
2. Fill in the required fields:

   ```
   Organization ID: [Your Organization ID from Step 1]
   API Key: [Your API Key from Step 1]
   Environment: Production
   ```

3. **Test Your Connection**:
   - Click "Test API Connection"
   - You should see: ✅ "Connection successful"
   - If you see an error, double-check your credentials

### Optional Settings
- **Enable Analytics**: Check this to track widget performance
- **Load Assets Globally**: Check this to load widget code on all pages
- **Debug Mode**: Leave unchecked unless troubleshooting

## Step 3: Add Widgets to Your Content

### Method 1: Using Blocks (Easiest)
Perfect for adding widgets to sidebars, headers, or footers.

1. Go to **Structure > Block Layout**
2. Find the region where you want the widget (like "Sidebar" or "Content")
3. Click **Place block** in that region
4. Search for "PassItOn Widget" and click **Place block**
5. Configure your widget:
   - **Block Title**: "Support Our Mission" (or leave blank)
   - **Widget ID**: Your specific widget ID from PassItOn dashboard
   - **Display Settings**: Choose when to show the widget
6. Click **Save block**

### Method 2: Adding to Specific Content Pages
Perfect for adding widgets to specific articles or pages.

1. Edit the content where you want the widget
2. Look for "PassItOn Widget Settings" section (usually under "Advanced")
3. Check "Enable donation widget for this content"
4. Choose **Widget Placement**:
   - **Top of content**: Widget appears before the article
   - **Bottom of content**: Widget appears after the article
   - **Sidebar**: Widget appears in the sidebar
5. Save your content

### Method 3: Automatic Placement
Perfect for adding widgets to all articles or news posts automatically.

1. Go to **Configuration > Web Services > PassItOn Widget**
2. Scroll to "Automatic Insertion Settings"
3. Check "Enable auto-insertion"
4. Select **Content Types** where you want widgets (like "Article" or "News")
5. Choose **Default Placement**: Usually "Bottom of content"
6. Set **Display Weight**: 10 (controls order of elements)
7. Save configuration

## Step 4: Customize Widget Appearance

### Basic Styling Options
1. In your widget configuration, look for "Appearance Settings"
2. Choose from available options:
   - **Theme**: Minimal, Standard, or Prominent
   - **Color Scheme**: Match your site's colors
   - **Size**: Small, Medium, or Large
   - **Button Text**: Customize the donation button

### Advanced Styling (Ask Your Developer)
For custom colors, fonts, or layouts that match your site exactly:
1. Provide your developer with your brand guidelines
2. Ask them to create a custom widget template
3. They can override the default styling in your theme

## Step 5: Monitor Performance

### Analytics Dashboard
1. Go to **Reports > PassItOn Analytics**
2. View key metrics:
   - **Widget Views**: How many people saw your widget
   - **Click Rate**: Percentage of viewers who clicked
   - **Donations**: Successful donations through your widget
   - **Conversion Rate**: Percentage of clicks that became donations

### Understanding Your Data
- **High Views, Low Clicks**: Widget placement might need adjustment
- **High Clicks, Low Donations**: Consider adjusting suggested amounts
- **Low Overall Performance**: Try different content types or placements

## Common Widget Placements

### For Nonprofit Websites
- **Homepage**: Block in sidebar or bottom of main content
- **About Us Page**: Bottom of content with mission statement
- **News/Articles**: Automatic insertion at bottom of all articles
- **Events Page**: Top of content to encourage event-related giving

### For Educational Institutions
- **Program Pages**: Bottom of content with program-specific appeals
- **News Section**: Automatic insertion in news articles
- **Alumni Pages**: Targeted appeals for alumni engagement
- **Research Pages**: Appeals for research funding

### For Government/Municipal Sites
- **Community Programs**: Appeals for specific community initiatives
- **Parks & Recreation**: Fundraising for facility improvements
- **Public Services**: Voluntary contributions for enhanced services
- **Environmental Pages**: Appeals for sustainability projects

## Troubleshooting Common Issues

### Widget Not Appearing
**Problem**: Widget configured but not showing on pages
**Solutions**:
1. Check that the content type has widgets enabled
2. Verify block is assigned to the correct region
3. Check visibility settings on the block
4. Clear cache: Go to **Configuration > Performance > Clear all caches**

### "Configuration Error" Message
**Problem**: Widget shows error instead of donation form
**Solutions**:
1. Verify API credentials in **Configuration > Web Services > PassItOn Widget**
2. Test API connection
3. Check that Organization ID and API Key match your PassItOn account
4. Ensure your site uses HTTPS (not HTTP)

### Widget Loads Slowly
**Problem**: Page loading is slower with widgets
**Solutions**:
1. Enable "Load Assets Globally" in configuration
2. Use fewer widgets per page (recommend 1-2 maximum)
3. Contact your developer about caching optimization

### Permission Issues
**Problem**: Can't access widget settings
**Solutions**:
1. Contact your site administrator
2. Ask them to grant you "Create PassItOn widgets" permission
3. Go to **People > Permissions** and check PassItOn Widget permissions

## Best Practices

### Placement Strategy
1. **Start Small**: Add widgets to 2-3 key pages first
2. **Test Performance**: Monitor analytics for 2 weeks
3. **Expand Gradually**: Add to more pages based on what works
4. **Avoid Overwhelming**: Don't use more than 2 widgets per page

### Content Strategy
- **Match Content**: Place widgets on content related to your cause
- **Timing Matters**: Add to trending or popular content
- **Call to Action**: Include compelling text near your widgets
- **Regular Updates**: Refresh widget placement based on performance

### Performance Monitoring
- **Weekly Check**: Review analytics weekly for the first month
- **Monthly Reports**: Generate monthly performance reports
- **Seasonal Adjustments**: Adjust placement for giving seasons
- **A/B Testing**: Try different placements and track results

## Getting Additional Help

### Within Drupal
- **Module Help**: Go to **Help > PassItOn Widget** for built-in documentation
- **Test Tools**: Use "Test API Connection" to verify setup
- **Analytics**: Check **Reports > PassItOn Analytics** for performance data

### PassItOn Support
- **Dashboard Help**: Log into [PassItOn Dashboard](https://dashboard.passiton.com) for account support
- **Widget Configuration**: Use the dashboard to create and customize widgets
- **API Issues**: Contact PassItOn support for API-related problems

### Technical Support
- **Site Issues**: Contact your web developer or site administrator
- **Module Problems**: Check the Drupal.org project page for updates
- **Custom Development**: Hire a Drupal developer for custom features

---

## Quick Reference

### Key URLs in Your Drupal Site
- **Widget Configuration**: `/admin/config/services/passiton-widget`
- **Block Management**: `/admin/structure/block`
- **Analytics Dashboard**: `/admin/reports/passiton-widget`
- **Module Help**: `/admin/help/passiton-widget`

### Common Tasks Checklist
- [ ] Install and enable PassItOn Widget module
- [ ] Configure API credentials and test connection
- [ ] Add widgets to key content pages
- [ ] Monitor performance for 2 weeks
- [ ] Adjust placement based on analytics
- [ ] Set up automatic insertion for content types
- [ ] Create monthly performance review schedule

---

*This guide covers the essential steps for non-technical users. For advanced customization or development tasks, consult with your web developer or refer to the technical documentation.*

