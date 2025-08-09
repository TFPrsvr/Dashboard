# PassItOn Chrome Extension

## Overview

The PassItOn Chrome Extension allows users to quickly add donation widgets to any website they manage, preview how widgets will look on different sites, and manage their PassItOn account directly from the browser.

## Chrome Web Store Listing

### Extension Name
PassItOn Donation Helper

### Short Description
Easily add donation widgets to any website and track your fundraising impact with PassItOn.

### Detailed Description

**Transform any website into a fundraising platform with one click!**

The PassItOn Donation Helper makes it incredibly easy to add professional donation widgets to any website you manage. Whether you're running a nonprofit, blog, or business website, this extension provides everything you need to start accepting donations in seconds.

**Key Features:**

🎯 **One-Click Widget Placement**
- Add donation widgets to any page with a single click
- Visual placement guide shows exactly where widgets will appear
- Instant preview of how widgets look on your site

💡 **Smart Widget Suggestions**
- AI-powered recommendations for optimal widget placement
- Analyze page content to suggest relevant causes
- Automatic styling to match website design

📊 **Real-Time Analytics**
- Track donations across all your websites from one place
- Monitor widget performance with detailed metrics
- Export donation data for tax reporting

🎨 **Visual Customization**
- Live preview of widget customization
- Match any website's branding and colors
- Multiple widget styles and layouts

⚡ **Instant Setup**
- No coding required - works on any website
- Automatically generates embed codes
- Seamless integration with popular platforms

🔐 **Secure & Compliant**
- Bank-level security for all transactions
- PCI DSS compliant payment processing
- GDPR and privacy regulation compliant

**Perfect for:**
- Nonprofit organizations managing multiple websites
- Web developers adding donation features for clients
- Bloggers and content creators supporting causes
- Agency teams managing fundraising campaigns
- Anyone wanting to add donations to their website quickly

**How it works:**
1. Install the extension and connect your PassItOn account
2. Navigate to any website you want to add donations to
3. Click the PassItOn icon and choose "Add Widget"
4. Customize the widget appearance and settings
5. Copy the generated code or inject directly (if you have access)
6. Start accepting donations immediately!

**Supported Platforms:**
- WordPress (automatic integration)
- Shopify (seamless installation)
- Wix, Squarespace, and other website builders
- Custom HTML websites
- Any website where you can add HTML/JavaScript

### Screenshots Needed
1. **Extension popup interface** - Main control panel
2. **Widget placement tool** - Visual guide for placing widgets
3. **Customization panel** - Real-time widget customization
4. **Analytics dashboard** - Performance metrics and insights
5. **Multi-site management** - Managing widgets across multiple sites

### Categories
- Productivity
- Social & Communication
- Developer Tools

### Permissions Explanation

**Read and change all your data on the websites you visit**
- Required to inject donation widgets into websites
- Allows the extension to analyze page content for smart suggestions
- Only activates when you explicitly use the widget placement tool

**Communicate with cooperating websites**
- Required to connect with PassItOn services
- Enables secure authentication and widget management
- Only connects to verified PassItOn domains

**Store data locally**
- Saves your widget preferences and account settings
- Enables offline access to previously configured widgets
- No personal data is shared with third parties

## Technical Implementation

### Files Structure
```
chrome-extension/
├── manifest.json           # Extension configuration
├── background.js          # Service worker for background tasks
├── content.js            # Content script for page interaction
├── content.css           # Styles for injected elements
├── popup.html            # Extension popup interface
├── popup.js              # Popup functionality
├── options.html          # Settings page
├── options.js            # Settings functionality
├── inject.js             # Script injected into target pages
├── icons/                # Extension icons
│   ├── icon-16.png
│   ├── icon-32.png
│   ├── icon-48.png
│   └── icon-128.png
└── widget/               # Widget-related assets
    ├── preview.html
    ├── preview.js
    └── styles.css
```

### Core Functionality

#### Widget Placement Tool
```javascript
// content.js - Visual widget placement
class WidgetPlacer {
  constructor() {
    this.isActive = false;
    this.highlightedElement = null;
  }
  
  activate() {
    this.isActive = true;
    document.addEventListener('mouseover', this.highlightElement.bind(this));
    document.addEventListener('click', this.selectElement.bind(this));
    this.showInstructions();
  }
  
  highlightElement(event) {
    if (this.highlightedElement) {
      this.removeHighlight(this.highlightedElement);
    }
    
    this.highlightedElement = event.target;
    this.addHighlight(event.target);
  }
  
  selectElement(event) {
    event.preventDefault();
    const element = event.target;
    this.showWidgetOptions(element);
  }
}
```

#### Background Service Worker
```javascript
// background.js - Handle extension lifecycle
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: 'https://dashboard.passiton.com/extension/welcome'
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: activateWidgetPlacer
  });
});

// Handle commands (keyboard shortcuts)
chrome.commands.onCommand.addListener((command) => {
  if (command === 'add_donation_widget') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: activateWidgetPlacer
      });
    });
  }
});
```

#### Popup Interface
```html
<!-- popup.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="container">
    <header>
      <img src="icons/icon-32.png" alt="PassItOn">
      <h1>PassItOn</h1>
    </header>
    
    <div id="authenticated" class="hidden">
      <button id="addWidget" class="primary">Add Widget to This Page</button>
      <button id="manageWidgets">Manage Existing Widgets</button>
      <button id="viewAnalytics">View Analytics</button>
      <button id="openDashboard">Open Dashboard</button>
    </div>
    
    <div id="unauthenticated">
      <p>Connect your PassItOn account to start adding donation widgets.</p>
      <button id="connectAccount" class="primary">Connect Account</button>
      <button id="createAccount">Create Free Account</button>
    </div>
  </div>
  
  <script src="popup.js"></script>
</body>
</html>
```

### Privacy and Security

#### Data Collection
- **Account Information**: User's PassItOn account details for authentication
- **Widget Configuration**: Settings and preferences for created widgets
- **Usage Analytics**: Anonymous usage data to improve the extension
- **Website URLs**: Only for sites where widgets are actively placed

#### Data Storage
- All sensitive data stored using Chrome's secure storage API
- Authentication tokens encrypted and stored locally
- No personal data transmitted to third parties
- Widget configurations cached locally for offline access

#### Security Measures
- Content Security Policy prevents code injection
- All API communications use HTTPS
- Authentication tokens have limited scope and expiration
- Regular security updates and vulnerability patching

## Publishing Requirements

### Chrome Web Store Requirements

#### Developer Account
- [ ] Verified Chrome Web Store developer account
- [ ] One-time $5 developer registration fee paid
- [ ] Developer account verified with Google

#### Technical Requirements
- [ ] Manifest v3 compliance
- [ ] All required permissions justified
- [ ] Content Security Policy implemented
- [ ] No malicious or deceptive behavior
- [ ] Proper error handling and user feedback

#### Asset Requirements
- [ ] 128x128px icon (for Chrome Web Store)
- [ ] 16x16px, 32x32px, 48x48px icons (for extension)
- [ ] Screenshots (1280x800 or 640x400)
- [ ] Promotional tile (440x280) - optional
- [ ] Promotional images for featured listings

#### Policy Compliance
- [ ] Privacy policy linked and accessible
- [ ] User data handling clearly explained
- [ ] No prohibited content or functionality
- [ ] Accessibility guidelines followed
- [ ] International compliance (GDPR, etc.)

### Submission Checklist

#### Pre-Submission Testing
- [ ] Test installation and removal process
- [ ] Verify all features work across different websites
- [ ] Test on multiple Chrome versions
- [ ] Validate permissions are minimal and necessary
- [ ] Ensure no console errors or warnings
- [ ] Test with different screen sizes and resolutions

#### Documentation
- [ ] Comprehensive README with setup instructions
- [ ] Privacy policy explaining data collection
- [ ] Terms of service for extension usage
- [ ] User guide with screenshots and examples
- [ ] Developer documentation for customization

#### Quality Assurance
- [ ] Code review completed
- [ ] Security audit performed
- [ ] Performance testing completed
- [ ] User experience testing conducted
- [ ] Accessibility compliance verified

## Post-Launch Strategy

### User Onboarding
1. **Welcome Screen**: Introduce key features and benefits
2. **Account Connection**: Streamlined PassItOn account linking
3. **First Widget**: Guided tutorial for adding first widget
4. **Best Practices**: Tips for optimal widget placement

### Feature Roadmap
- **Version 1.1**: Widget templates and themes
- **Version 1.2**: Advanced analytics and A/B testing
- **Version 1.3**: Team collaboration features
- **Version 2.0**: AI-powered optimization suggestions

### Support and Maintenance
- Regular updates for Chrome API changes
- Bug fixes and security patches
- User feedback integration
- Performance optimization
- New feature development based on user requests

### Marketing and Growth
- Integration with PassItOn dashboard promotions
- Chrome Web Store optimization
- User reviews and ratings management
- Social media and blog content
- Partnership with web development communities

---

*This Chrome extension documentation should be updated as Chrome Web Store requirements evolve. Last updated: January 29, 2025*