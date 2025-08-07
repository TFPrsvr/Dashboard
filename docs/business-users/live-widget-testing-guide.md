# Live Widget Testing Guide

This guide helps business users test their donation widgets in real-world scenarios to ensure everything works perfectly for donors.

## Overview

Live widget testing involves testing the actual donation flow that your supporters will experience when they visit your website. This is different from admin dashboard testing - it focuses on the donor experience.

## Pre-Testing Checklist

### ✅ **Required Setup Before Testing**

1. **Admin Dashboard Setup Complete**:
   - [ ] Organization created and configured
   - [ ] Stripe account connected and verified
   - [ ] Widget created and customized
   - [ ] Team members added (if needed)

2. **Widget Integration Complete**:
   - [ ] Widget code embedded on your website
   - [ ] Widget appears correctly on your site
   - [ ] Test mode enabled for safe testing

3. **Test Environment Ready**:
   - [ ] Test credit card numbers available
   - [ ] Access to website where widget is embedded
   - [ ] Different devices/browsers available for testing

## Test Mode vs Live Mode

### 🧪 **Test Mode (Recommended for Testing)**
- **Purpose**: Safe testing without real money
- **Stripe Keys**: Uses `pk_test_` and `sk_test_` keys
- **Test Cards**: Use Stripe test credit card numbers
- **No Real Charges**: All transactions are simulated

### 🟢 **Live Mode (Production)**
- **Purpose**: Real donations from real supporters  
- **Stripe Keys**: Uses `pk_live_` and `sk_live_` keys
- **Real Cards**: Actual credit cards charged
- **Real Money**: All transactions process real payments

**⚠️ Important**: Always test in Test Mode first before going live!

## Live Widget Testing Process

### Step 1: Visual Widget Testing

**Test Appearance on Your Website**

1. **Visit Your Website**:
   - Open your website in a new browser window
   - Navigate to pages where the widget should appear
   - Check that the donate button is visible and styled correctly

2. **Visual Checklist**:
   - [ ] Donate button appears in the correct location
   - [ ] Button uses your organization's colors/branding
   - [ ] Button text is readable and appropriate
   - [ ] Button size is appropriate for the page layout
   - [ ] Widget doesn't interfere with other page elements

3. **Responsive Testing**:
   - [ ] Test on desktop computer (different screen sizes)
   - [ ] Test on tablet (iPad, Android tablet)
   - [ ] Test on mobile phone (iPhone, Android)
   - [ ] Check widget adapts to different screen sizes

### Step 2: Donation Flow Testing

**Test the Complete Donor Experience**

1. **Initiate Donation**:
   - Click the donate button on your website
   - Verify donation form opens correctly
   - Check form appears professional and trustworthy

2. **Form Testing**:
   - [ ] All form fields are visible and functional
   - [ ] Donation amount options work correctly
   - [ ] Custom amount entry works
   - [ ] Donor information fields accept input
   - [ ] Form validation provides helpful error messages

3. **Payment Testing with Test Cards**:

   **Successful Test Card**:
   ```
   Card Number: 4242 4242 4242 4242
   Expiration: Any future date (e.g., 12/25)
   CVC: Any 3 digits (e.g., 123)
   ZIP: Any ZIP code (e.g., 12345)
   ```

   **Declined Test Card**:
   ```
   Card Number: 4000 0000 0000 0002
   Expiration: Any future date
   CVC: Any 3 digits
   ZIP: Any ZIP code
   ```

4. **Test Scenarios**:
   - [ ] **Successful donation**: Use successful test card
   - [ ] **Declined payment**: Use declined test card  
   - [ ] **Invalid card**: Use clearly invalid number (e.g., 1234)
   - [ ] **Expired card**: Use past expiration date
   - [ ] **Invalid CVC**: Use wrong number of digits

### Step 3: Cross-Browser Testing

**Test on Different Browsers**

1. **Desktop Browsers**:
   - [ ] Google Chrome (most common)
   - [ ] Mozilla Firefox
   - [ ] Safari (if on Mac)
   - [ ] Microsoft Edge

2. **Mobile Browsers**:
   - [ ] Safari on iPhone
   - [ ] Chrome on Android
   - [ ] Samsung Internet (if available)

3. **What to Check**:
   - Widget appears correctly in each browser
   - Donation form functions properly
   - Payment processing works
   - Success/error messages display correctly

### Step 4: User Experience Testing

**Test Like a Real Donor**

1. **First-Time Donor Simulation**:
   - [ ] Clear browser cache/use incognito mode
   - [ ] Navigate to your site as if discovering it for first time
   - [ ] Follow natural path to donation
   - [ ] Complete donation process without prior knowledge

2. **Mobile User Simulation**:
   - [ ] Test entire flow on mobile device
   - [ ] Check touch interactions work properly
   - [ ] Verify form fields are easy to tap and fill
   - [ ] Ensure keyboard doesn't cover important buttons

3. **Different Donor Types**:
   - [ ] Test small donation amounts ($5-20)
   - [ ] Test medium donations ($25-100) 
   - [ ] Test larger donations ($100+)
   - [ ] Test custom amount entry

## Testing Results Verification

### Dashboard Verification

After completing test donations:

1. **Check Admin Dashboard**:
   - [ ] Test donations appear in dashboard
   - [ ] Donation amounts are correct
   - [ ] Donor information is captured accurately
   - [ ] Transaction status shows as "Test" or "Completed"

2. **Email Notifications**:
   - [ ] Organization receives donation notification emails
   - [ ] Test donor receives confirmation email (if enabled)
   - [ ] Email content is professional and accurate

3. **Analytics and Reporting**:
   - [ ] Test donations appear in analytics
   - [ ] Data is accurate and complete
   - [ ] Export functionality works (if needed)

### Stripe Dashboard Verification

1. **Check Stripe Dashboard**:
   - [ ] Test payments appear in Stripe
   - [ ] Payment amounts match expectations
   - [ ] Test mode indicator is visible (in test mode)
   - [ ] No real charges were processed

## Common Issues and Solutions

### Issue: Widget Not Appearing

**Diagnosis Steps**:
1. Check browser developer console for errors (F12 → Console)
2. Verify widget code is properly embedded
3. Check if adblocker is blocking the widget
4. Test in incognito/private browsing mode

**Common Solutions**:
- Clear browser cache and cookies
- Disable browser extensions temporarily
- Check widget code placement on website
- Verify organization ID in embed code

### Issue: Payment Processing Fails

**Diagnosis Steps**:
1. Verify Stripe connection in admin dashboard
2. Check if using correct test vs live mode
3. Confirm test credit card numbers are correct
4. Check browser console for error messages

**Common Solutions**:
- Reconnect Stripe account in dashboard
- Switch to test mode for testing
- Use verified test card numbers
- Check Stripe account status and verification

### Issue: Donations Not Appearing in Dashboard

**Diagnosis Steps**:
1. Wait 2-3 minutes (processing delay normal)
2. Refresh dashboard page
3. Check Stripe dashboard for payment confirmation
4. Verify webhook configuration

**Common Solutions**:
- Allow processing time before assuming failure
- Check spam folder for notification emails
- Contact support if donations missing after 30 minutes

## Going Live Checklist

### Before Switching to Live Mode

1. **Complete Testing**:
   - [ ] All test scenarios passed successfully
   - [ ] Widget works on all target devices/browsers
   - [ ] Team is comfortable with the donation process
   - [ ] Analytics and reporting verified

2. **Stripe Account Ready**:
   - [ ] Stripe account fully verified
   - [ ] Bank account connected for payouts
   - [ ] Tax information completed
   - [ ] Identity verification completed (if required)

3. **Live Environment Preparation**:
   - [ ] Live Stripe keys configured in admin dashboard
   - [ ] Website updated with live widget code (if different)
   - [ ] Email notification settings configured for live mode
   - [ ] Team trained on live transaction monitoring

### Switching to Live Mode

1. **In Admin Dashboard**:
   - Go to Settings → Payment Settings
   - Switch from "Test Mode" to "Live Mode"
   - Verify live Stripe connection is active

2. **First Live Test**:
   - Make one small live donation ($1-5) to verify everything works
   - Use real credit card for this test
   - Verify donation appears in dashboard and Stripe
   - Check that real money is processed correctly

3. **Monitor Initial Live Donations**:
   - Watch first few live donations closely
   - Respond quickly to any donor issues
   - Verify email notifications work correctly
   - Check that funds transfer to your account properly

## Ongoing Live Monitoring

### Daily Monitoring (First Week Live)

1. **Check Dashboard Daily**:
   - [ ] Review new donations
   - [ ] Check for any failed payments
   - [ ] Monitor donation patterns

2. **Email Monitoring**:
   - [ ] Confirm notification emails are being received
   - [ ] Check spam folder for missed notifications
   - [ ] Verify donor confirmation emails are sending

3. **Website Monitoring**:
   - [ ] Visit your website and test widget daily
   - [ ] Check for any changes that might affect widget
   - [ ] Monitor website performance impact

### Weekly Monitoring (Ongoing)

1. **Analytics Review**:
   - [ ] Review donation analytics and trends
   - [ ] Check conversion rates and donor behavior
   - [ ] Identify any unusual patterns

2. **Technical Health Check**:
   - [ ] Test donation flow weekly
   - [ ] Check widget appearance on different devices
   - [ ] Monitor for any error reports

3. **Financial Reconciliation**:
   - [ ] Compare dashboard totals with Stripe reports
   - [ ] Verify payouts are processing correctly
   - [ ] Check for any discrepancies

## Support and Resources

### When to Contact Support

**Immediate Support Needed**:
- Donation processing completely broken
- Widget disappeared from website
- Payments processing but not appearing in dashboard
- Donor complaints about payment failures

**Regular Support Request**:
- Questions about test results
- Help optimizing donation flow
- Assistance with advanced widget customization
- Training for team members

### Support Information

- **Email**: support@passiton.com
- **Response Time**: 4-8 hours (business days)
- **Live Chat**: Available in admin dashboard
- **Emergency Support**: urgent@passiton.com (for critical issues)

### What to Include in Support Requests

1. **Organization ID**: Found in dashboard settings
2. **Website URL**: Where widget is embedded
3. **Detailed Problem Description**: What's happening vs what should happen
4. **Steps Already Tried**: What troubleshooting you've attempted
5. **Screenshots**: Of any error messages or issues
6. **Browser/Device Info**: What you were using when problem occurred

## Summary

Live widget testing ensures your donors have a smooth, professional experience when supporting your organization. Regular testing and monitoring help maintain trust and maximize donations.

**Key Takeaways**:
- Always test in Test Mode before going live
- Test on multiple devices and browsers
- Monitor live donations closely when first launching
- Have support contact information ready
- Regular testing prevents issues from impacting donors