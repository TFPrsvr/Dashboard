# PassItOn API Reference

## Overview

The PassItOn platform provides RESTful APIs for managing organizations, subscriptions, support tickets, and donation widgets. All APIs use JSON for request and response bodies and require proper authentication.

## Authentication

### Clerk Authentication
Most endpoints require authentication via Clerk. Include the session token in requests:

```javascript
// Client-side with Clerk React
const { getToken } = useAuth();
const token = await getToken();

fetch('/api/endpoint', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### Webhook Authentication
Webhook endpoints use signature verification:
- Stripe webhooks: Verify `stripe-signature` header
- Clerk webhooks: Verify with `WEBHOOK_SECRET`

## Core APIs

### User Management

#### GET /api/users/me
Get current user profile and organization memberships.

**Response:**
```json
{
  "id": "user_123",
  "email": "user@example.com",
  "name": "John Doe",
  "role": "owner",
  "organizations": [
    {
      "id": "org_123",
      "name": "My Organization",
      "role": "owner"
    }
  ]
}
```

#### PUT /api/users/[userId]/role
Update user role (admin only).

**Request:**
```json
{
  "role": "admin"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "role": "admin"
  }
}
```

### Organization Management

#### GET /api/organizations
List organizations for current user.

**Response:**
```json
{
  "organizations": [
    {
      "id": "org_123",
      "name": "My Organization",
      "display_name": "My Org",
      "email": "contact@myorg.com",
      "created_at": "2025-01-29T00:00:00Z",
      "role": "owner"
    }
  ]
}
```

#### POST /api/organizations
Create new organization.

**Request:**
```json
{
  "name": "New Organization",
  "display_name": "New Org",
  "email": "contact@neworg.com",
  "description": "Organization description"
}
```

**Response:**
```json
{
  "id": "org_456",
  "name": "New Organization",
  "created_at": "2025-01-29T00:00:00Z"
}
```

#### GET /api/organizations/[orgId]
Get organization details.

**Response:**
```json
{
  "id": "org_123",
  "name": "My Organization",
  "display_name": "My Org",
  "email": "contact@myorg.com",
  "legal_name": "My Organization LLC",
  "terms_of_service_url": "https://myorg.com/terms",
  "stripe_account_id": "acct_123",
  "created_at": "2025-01-29T00:00:00Z",
  "updated_at": "2025-01-29T00:00:00Z"
}
```

#### PUT /api/organizations/[orgId]
Update organization details.

**Request:**
```json
{
  "display_name": "Updated Org Name",
  "email": "newemail@myorg.com",
  "legal_name": "My Organization LLC",
  "terms_of_service_url": "https://myorg.com/terms"
}
```

### Subscription Management

#### GET /api/subscription/[orgId]
Get subscription details for organization.

**Response:**
```json
{
  "plan": "professional",
  "status": "active",
  "currentPeriodEnd": "2025-02-29T00:00:00Z",
  "cancelAtPeriodEnd": false
}
```

#### POST /api/subscription/upgrade
Create Stripe checkout session for plan upgrade.

**Request:**
```json
{
  "organizationId": "org_123",
  "plan": "professional"
}
```

**Response:**
```json
{
  "url": "https://checkout.stripe.com/session_123"
}
```

#### POST /api/subscription/cancel
Cancel subscription at period end.

**Request:**
```json
{
  "organizationId": "org_123"
}
```

**Response:**
```json
{
  "success": true
}
```

#### GET /api/billing/portal
Redirect to Stripe billing portal.

**Query Parameters:**
- `organizationId` (required): Organization ID

**Response:** Redirects to Stripe billing portal

### Widget Management

#### GET /api/widgets
List widgets for organization.

**Response:**
```json
{
  "widgets": [
    {
      "id": "widget_123",
      "name": "Main Donation Widget",
      "slug": "main-widget",
      "organization_id": "org_123",
      "is_active": true,
      "customization": {
        "primary_color": "#3b82f6",
        "button_text": "Donate Now"
      },
      "created_at": "2025-01-29T00:00:00Z"
    }
  ]
}
```

#### POST /api/widgets
Create new widget.

**Request:**
```json
{
  "name": "New Widget",
  "customization": {
    "primary_color": "#3b82f6",
    "button_text": "Support Us",
    "show_goal": true,
    "goal_amount": 10000
  }
}
```

**Response:**
```json
{
  "id": "widget_456",
  "slug": "new-widget",
  "embed_code": "<script src=\"https://app.passiton.com/widget/new-widget\"></script>"
}
```

#### GET /api/widgets/[widgetId]
Get widget details.

#### PUT /api/widgets/[widgetId]
Update widget configuration.

#### DELETE /api/widgets/[widgetId]
Delete widget.

### Support System

#### POST /api/support/notify
Send support ticket notifications (internal use).

**Request:**
```json
{
  "ticketId": "ticket_123",
  "subject": "Technical Issue",
  "description": "Detailed description",
  "userEmail": "user@example.com",
  "userName": "John Doe",
  "category": "technical",
  "priority": "medium"
}
```

**Response:**
```json
{
  "success": true
}
```

## Webhook Endpoints

### POST /api/webhooks/stripe
Handle Stripe webhook events.

**Supported Events:**
- `payment_intent.succeeded` - Donation completed
- `customer.subscription.created` - New subscription
- `customer.subscription.updated` - Subscription changed
- `customer.subscription.deleted` - Subscription canceled
- `checkout.session.completed` - Checkout completed
- `invoice.payment_succeeded` - Payment succeeded

**Headers Required:**
- `stripe-signature`: Stripe webhook signature

### POST /api/webhooks/clerk
Handle Clerk webhook events.

**Supported Events:**
- `user.created` - New user registration
- `user.updated` - User profile updated
- `user.deleted` - User account deleted

**Headers Required:**
- `svix-id`: Webhook ID
- `svix-timestamp`: Webhook timestamp  
- `svix-signature`: Webhook signature

## Error Handling

### Error Response Format
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "Additional error details"
  }
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Common Error Codes
- `INVALID_REQUEST` - Request validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `PLAN_LIMIT_EXCEEDED` - Subscription plan limit reached
- `STRIPE_ERROR` - Payment processing error
- `DATABASE_ERROR` - Database operation failed

## Rate Limiting

API endpoints are rate limited to prevent abuse:
- **General APIs**: 100 requests per minute per user
- **Webhook endpoints**: 1000 requests per minute
- **Widget embed**: No limit (cached)

Rate limit headers:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Remaining requests in window
- `X-RateLimit-Reset`: When the rate limit resets

## Data Models

### Organization
```typescript
interface Organization {
  id: string;
  name: string;
  display_name?: string;
  legal_name?: string;
  email: string;
  description?: string;
  website_url?: string;
  terms_of_service_url?: string;
  stripe_account_id?: string;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}
```

### Subscription
```typescript
interface Subscription {
  id: string;
  organization_id: string;
  stripe_customer_id?: string;
  stripe_subscription_id?: string;
  plan: 'free' | 'professional' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}
```

### Widget
```typescript
interface Widget {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  is_active: boolean;
  customization: {
    primary_color?: string;
    button_text?: string;
    show_goal?: boolean;
    goal_amount?: number;
    thank_you_message?: string;
  };
  created_at: string;
  updated_at: string;
}
```

### Support Ticket
```typescript
interface SupportTicket {
  id: string;
  organization_id?: string;
  user_id: string;
  subject: string;
  description: string;
  category: 'technical' | 'billing' | 'general' | 'bug_report' | 'feature_request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
  user_email: string;
  user_name: string;
  admin_response?: string;
  admin_user_id?: string;
  resolved_at?: string;
  created_at: string;
  updated_at: string;
}
```

### Donation
```typescript
interface Donation {
  id: string;
  organization_id: string;
  widget_id: string;
  amount: number;
  currency: string;
  donor_email?: string;
  donor_name?: string;
  message?: string;
  stripe_payment_intent_id: string;
  status: 'pending' | 'succeeded' | 'failed';
  created_at: string;
  updated_at: string;
}
```

## Plan Limits and Features

### Free Plan
- **Widgets**: 1
- **Monthly Donations**: 50
- **Team Members**: 1
- **Features**: Basic customization, email support

### Professional Plan ($39/month)
- **Widgets**: 5
- **Monthly Donations**: 1,000
- **Team Members**: 5
- **Features**: Advanced customization, priority support, remove branding, API access

### Enterprise Plan ($299+/month)
- **Widgets**: Unlimited
- **Monthly Donations**: Unlimited
- **Team Members**: Unlimited
- **Features**: White-label, dedicated support, custom integrations, SLA

### Checking Plan Limits

Use the plan limits in your application:

```typescript
// Check limits before allowing actions
const limits = await getPlanLimits(organizationId);

if (currentWidgets >= limits.widgets && limits.widgets !== -1) {
  throw new Error('Widget limit exceeded');
}
```

## Integration Examples

### Creating a Donation Widget

```javascript
// 1. Create widget via API
const response = await fetch('/api/widgets', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Homepage Widget',
    customization: {
      primary_color: '#3b82f6',
      button_text: 'Donate Now',
      show_goal: true,
      goal_amount: 5000,
      thank_you_message: 'Thank you for your support!'
    }
  })
});

const widget = await response.json();

// 2. Embed widget in website
const embedCode = `<script src="https://app.passiton.com/widget/${widget.slug}"></script>`;
```

### Processing Subscription Changes

```javascript
// Handle subscription webhook
export async function POST(request) {
  const event = await stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get('stripe-signature'),
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object;
    
    // Update database
    await supabase
      .from('subscriptions')
      .update({
        status: subscription.status,
        current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        cancel_at_period_end: subscription.cancel_at_period_end
      })
      .eq('stripe_subscription_id', subscription.id);
  }

  return Response.json({ received: true });
}
```

## Testing

### API Testing with curl

```bash
# Get user organizations
curl -X GET "http://localhost:3000/api/organizations" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json"

# Create support ticket
curl -X POST "http://localhost:3000/api/support/tickets" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Test Issue",
    "description": "This is a test ticket",
    "category": "technical",
    "priority": "medium"
  }'
```

### Webhook Testing

```bash
# Test Stripe webhook locally
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Trigger test events
stripe trigger payment_intent.succeeded
stripe trigger customer.subscription.created
```

---

*This API reference is automatically updated with each release. For the latest version, check the developer documentation at `/docs/developers/`.*