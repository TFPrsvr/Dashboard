# PassItOn Testing Procedures

## Overview

Comprehensive testing procedures to ensure PassItOn platform reliability, security, and performance across all supported integrations.

## Testing Environment Setup

### Local Development Environment
```bash
# Install dependencies
npm install

# Set up test database
npm run test:setup

# Configure environment variables
cp .env.example .env.test
```

### Testing Tools Required
- **Unit Testing**: Jest, React Testing Library
- **Integration Testing**: Cypress, Playwright
- **Performance Testing**: Lighthouse, WebPageTest
- **Security Testing**: OWASP ZAP, Snyk
- **Browser Testing**: BrowserStack, Sauce Labs

## Test Categories

### 1. Unit Testing

#### Component Tests
```javascript
// Widget component test example
import { render, screen } from '@testing-library/react';
import DonationWidget from '../components/DonationWidget';

describe('DonationWidget', () => {
  test('renders donation amounts correctly', () => {
    const amounts = [10, 25, 50];
    render(<DonationWidget amounts={amounts} />);
    
    amounts.forEach(amount => {
      expect(screen.getByText(`$${amount}`)).toBeInTheDocument();
    });
  });

  test('handles donation submission', async () => {
    const mockSubmit = jest.fn();
    render(<DonationWidget onSubmit={mockSubmit} />);
    
    // Test donation flow
    fireEvent.click(screen.getByText('$25'));
    fireEvent.click(screen.getByText('Donate Now'));
    
    expect(mockSubmit).toHaveBeenCalledWith({ amount: 25 });
  });
});
```

#### API Tests
```javascript
// API endpoint tests
describe('Donation API', () => {
  test('creates donation successfully', async () => {
    const donationData = {
      amount: 50,
      cause: 'education',
      donor_email: 'test@example.com'
    };

    const response = await request(app)
      .post('/api/donations')
      .send(donationData)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.amount).toBe(50);
  });

  test('validates donation data', async () => {
    const invalidData = { amount: -10 };

    await request(app)
      .post('/api/donations')
      .send(invalidData)
      .expect(400);
  });
});
```

### 2. Integration Testing

#### Platform Integration Tests
```javascript
// WordPress integration test
describe('WordPress Integration', () => {
  test('widget loads in WordPress theme', () => {
    cy.visit('/test-wordpress-site');
    cy.get('[data-testid="passiton-widget"]').should('be.visible');
    cy.get('[data-testid="donation-button"]').should('be.enabled');
  });

  test('shortcode renders correctly', () => {
    cy.visit('/test-shortcode-page');
    cy.get('.passiton-widget').should('exist');
    cy.get('.donation-amounts').children().should('have.length', 4);
  });
});

// Shopify integration test
describe('Shopify Integration', () => {
  test('checkout extension appears', () => {
    cy.visit('/test-shopify-checkout');
    cy.get('#passiton-checkout-extension').should('be.visible');
    cy.get('[data-testid="donation-toggle"]').click();
    cy.get('[data-testid="donation-amount"]').should('be.visible');
  });
});
```

#### Payment Processing Tests
```javascript
describe('Payment Processing', () => {
  test('successful credit card donation', () => {
    cy.visit('/test-widget');
    
    // Select donation amount
    cy.get('[data-amount="25"]').click();
    
    // Fill payment form
    cy.get('#card-number').type('4242424242424242');
    cy.get('#card-expiry').type('12/25');
    cy.get('#card-cvc').type('123');
    cy.get('#email').type('test@example.com');
    
    // Submit donation
    cy.get('[data-testid="submit-donation"]').click();
    
    // Verify success
    cy.get('[data-testid="success-message"]').should('contain', 'Thank you');
    cy.url().should('include', '/success');
  });

  test('handles payment errors gracefully', () => {
    cy.visit('/test-widget');
    cy.get('[data-amount="25"]').click();
    
    // Use test card that will be declined
    cy.get('#card-number').type('4000000000000002');
    cy.get('#card-expiry').type('12/25');
    cy.get('#card-cvc').type('123');
    cy.get('#email').type('test@example.com');
    
    cy.get('[data-testid="submit-donation"]').click();
    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});
```

### 3. Performance Testing

#### Load Time Tests
```javascript
// Performance benchmarks
const performanceTests = {
  widgetLoad: {
    target: 1000, // 1 second
    test: 'widget initialization'
  },
  paymentProcess: {
    target: 3000, // 3 seconds
    test: 'payment form submission'
  },
  analyticsUpdate: {
    target: 2000, // 2 seconds
    test: 'analytics data sync'
  }
};

describe('Performance Tests', () => {
  Object.entries(performanceTests).forEach(([key, config]) => {
    test(`${config.test} completes within ${config.target}ms`, async () => {
      const startTime = Date.now();
      
      // Execute test action
      await performAction(key);
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(config.target);
    });
  });
});
```

#### Lighthouse Audits
```bash
# Automated Lighthouse testing
npm run test:lighthouse

# Performance thresholds
Performance: >= 90
Accessibility: >= 95
Best Practices: >= 90
SEO: >= 85
```

### 4. Security Testing

#### Input Validation Tests
```javascript
describe('Security Tests', () => {
  test('prevents XSS attacks', async () => {
    const maliciousInput = '<script>alert("xss")</script>';
    
    const response = await request(app)
      .post('/api/donations')
      .send({ 
        amount: 25,
        donor_name: maliciousInput,
        message: maliciousInput
      });

    expect(response.body.donor_name).not.toContain('<script>');
    expect(response.body.message).not.toContain('<script>');
  });

  test('validates API authentication', async () => {
    await request(app)
      .get('/api/admin/donations')
      .expect(401);

    await request(app)
      .get('/api/admin/donations')
      .set('Authorization', 'Bearer invalid-token')
      .expect(401);
  });

  test('prevents SQL injection', async () => {
    const maliciousInput = "'; DROP TABLE donations; --";
    
    const response = await request(app)
      .post('/api/donations')
      .send({ 
        amount: 25,
        donor_email: maliciousInput
      })
      .expect(400);
  });
});
```

#### Data Protection Tests
```javascript
describe('Data Protection', () => {
  test('encrypts sensitive data', async () => {
    const donation = await createTestDonation();
    const storedData = await getDonationFromDB(donation.id);
    
    // Verify sensitive fields are encrypted
    expect(storedData.donor_email).not.toBe(donation.donor_email);
    expect(storedData.payment_method_id).toMatch(/^encrypted_/);
  });

  test('respects GDPR deletion requests', async () => {
    const donation = await createTestDonation();
    
    await request(app)
      .delete(`/api/donors/${donation.donor_id}/gdpr`)
      .set('Authorization', `Bearer ${adminToken}`)
      .expect(200);

    const deletedData = await getDonationFromDB(donation.id);
    expect(deletedData.donor_email).toBe('[DELETED]');
    expect(deletedData.donor_name).toBe('[DELETED]');
  });
});
```

### 5. Browser Compatibility Testing

#### Cross-Browser Test Matrix
```javascript
const browsers = [
  { name: 'Chrome', versions: ['latest', 'latest-1'] },
  { name: 'Firefox', versions: ['latest', 'latest-1'] },
  { name: 'Safari', versions: ['latest'] },
  { name: 'Edge', versions: ['latest'] }
];

describe('Browser Compatibility', () => {
  browsers.forEach(browser => {
    browser.versions.forEach(version => {
      test(`works in ${browser.name} ${version}`, async () => {
        await testInBrowser(browser.name, version, () => {
          // Core functionality tests
          cy.visit('/test-widget');
          cy.get('[data-testid="donation-widget"]').should('be.visible');
          cy.get('[data-testid="donation-button"]').should('be.enabled');
          
          // Test payment flow
          cy.get('[data-amount="25"]').click();
          cy.get('#email').should('be.visible');
        });
      });
    });
  });
});
```

### 6. Accessibility Testing

#### WCAG 2.1 Compliance Tests
```javascript
describe('Accessibility Tests', () => {
  test('meets WCAG 2.1 AA standards', () => {
    cy.visit('/test-widget');
    cy.injectAxe();
    cy.checkA11y();
  });

  test('keyboard navigation works', () => {
    cy.visit('/test-widget');
    
    // Tab through all interactive elements
    cy.get('body').tab();
    cy.focused().should('have.attr', 'data-amount', '10');
    
    cy.focused().tab();
    cy.focused().should('have.attr', 'data-amount', '25');
    
    // Test Enter key activation
    cy.focused().type('{enter}');
    cy.get('[data-amount="25"]').should('have.class', 'selected');
  });

  test('screen reader compatibility', () => {
    cy.visit('/test-widget');
    
    // Verify ARIA labels
    cy.get('[data-testid="donation-widget"]')
      .should('have.attr', 'role', 'region')
      .should('have.attr', 'aria-label', 'Donation widget');
    
    // Verify form labels
    cy.get('#email').should('have.attr', 'aria-describedby');
    cy.get('#amount').should('have.attr', 'aria-required', 'true');
  });
});
```

## Test Data Management

### Test Data Setup
```javascript
// Test data factory
const createTestDonation = (overrides = {}) => ({
  amount: 25,
  cause: 'education',
  donor_email: 'test@example.com',
  donor_name: 'Test Donor',
  payment_method: 'card',
  ...overrides
});

const createTestWidget = (overrides = {}) => ({
  name: 'Test Widget',
  style: 'modern',
  amounts: [10, 25, 50, 100],
  goal: 1000,
  ...overrides
});
```

### Database Seeding
```bash
# Seed test database
npm run test:seed

# Reset test data
npm run test:reset
```

## Automated Testing Pipeline

### GitHub Actions Configuration
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test:unit

  integration-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm ci
      - run: npm run test:e2e

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
```

## Test Reporting

### Coverage Requirements
- **Unit Tests**: >= 90% code coverage
- **Integration Tests**: >= 80% feature coverage
- **E2E Tests**: >= 95% user journey coverage

### Reporting Tools
```bash
# Generate coverage report
npm run test:coverage

# Generate HTML report
npm run test:report

# Upload to codecov
npm run test:upload-coverage
```

## Manual Testing Procedures

### Pre-Release Testing Checklist

#### Core Functionality
- [ ] Widget displays correctly on all supported platforms
- [ ] Payment processing works with all card types
- [ ] Email receipts are sent and formatted correctly
- [ ] Analytics data is captured accurately
- [ ] Error handling displays appropriate messages

#### Platform-Specific Testing
- [ ] WordPress: Plugin installs and activates without errors
- [ ] Shopify: App integrates with checkout flow
- [ ] Chrome Extension: Popup and content scripts work
- [ ] Custom HTML: Embed code works on various sites

#### Edge Cases
- [ ] Network connectivity issues handled gracefully
- [ ] Large donation amounts processed correctly
- [ ] International payment methods work
- [ ] Mobile device compatibility verified

### User Acceptance Testing

#### Test Scenarios
1. **New User Onboarding**: First-time setup and widget creation
2. **Donation Flow**: Complete donation from start to finish
3. **Admin Dashboard**: Managing widgets and viewing analytics
4. **Error Recovery**: Handling payment failures and retries

## Continuous Monitoring

### Production Monitoring
```javascript
// Error tracking setup
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  beforeSend: (event) => {
    // Filter sensitive data
    return filterSensitiveData(event);
  }
});

// Performance monitoring
const observer = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    if (entry.duration > 1000) {
      console.warn('Slow operation detected:', entry.name);
    }
  });
});
```

### Health Checks
```bash
# API health check
curl -f https://api.passiton.com/health || exit 1

# Widget availability check
curl -f https://widget.passiton.com/status || exit 1

# Database connectivity check
npm run health:database
```

---

*Testing procedures should be reviewed and updated with each release. Maintain comprehensive test coverage to ensure platform reliability.*

**Last Updated**: January 30, 2025
**Next Review**: February 30, 2025