<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 PassItOn API Reference</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📖 Overview</span>

The PassItOn platform provides RESTful APIs for managing organizations, support tickets, and donation widgets. All APIs use JSON for request and response bodies and require proper authentication.

</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 Authentication</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🎯 Clerk Authentication</span>

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

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🎣 Webhook Authentication</span>

Webhook endpoints use signature verification:
- Stripe webhooks: Verify `stripe-signature` header
- Clerk webhooks: Verify with `WEBHOOK_SECRET`

</div>

</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🛠 Core APIs</span>

</div>

<div style="background: rgba(16, 185, 129, 0.1); border-left: 4px solid #10b981; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #059669;">👥 User Management</span>

<div style="margin-top: 1rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #0d9488;">🔍 GET /api/users/me</span>

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

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #0d9488;">✏️ PUT /api/users/[userId]/role</span>

Update user role (Super Admin only).

**Request:**
```json
{
  "role": "super_admin",
  "reason": "Platform administrator"
}
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "user_123",
    "role": "super_admin",
    "updated_at": "2025-01-29T00:00:00Z"
  }
}
```

</div>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🏢 Organization Management</span>

<div style="margin-top: 1rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #1e40af;">🔍 GET /api/organizations</span>

List organizations (Admin: all organizations, User: own organization).

**Response:**
```json
{
  "organizations": [
    {
      "id": "org_123",
      "name": "My Organization",
      "email": "contact@myorg.com",
      "display_name": "My Organization",
      "created_at": "2025-01-29T00:00:00Z",
      "stripe_account_id": "acct_123",
      "stripe_onboarding_complete": true
    }
  ]
}
```

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #1e40af;">➕ POST /api/organizations</span>

Create new organization.

**Request:**
```json
{
  "name": "My Organization",
  "email": "contact@myorg.com",
  "display_name": "My Organization",
  "legal_name": "My Organization LLC",
  "terms_of_service_url": "https://myorg.com/terms"
}
```

**Response:**
```json
{
  "id": "org_123",
  "name": "My Organization",
  "email": "contact@myorg.com",
  "display_name": "My Organization",
  "created_at": "2025-01-29T00:00:00Z"
}
```

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #1e40af;">🔍 GET /api/organizations/[orgId]</span>

Get organization details.

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #1e40af;">✏️ PUT /api/organizations/[orgId]</span>

Update organization details.

**Request:**
```json
{
  "display_name": "Updated Organization Name",
  "email": "newemail@myorg.com",
  "terms_of_service_url": "https://myorg.com/terms"
}
```

</div>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">🎨 Widget Management</span>

<div style="margin-top: 1rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #6d28d9;">🔍 GET /api/widgets</span>

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

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #6d28d9;">➕ POST /api/widgets</span>

Create new widget.

**Request:**
```json
{
  "name": "Main Donation Widget",
  "slug": "main-widget",
  "is_active": true,
  "customization": {
    "primary_color": "#3b82f6",
    "button_text": "Donate Now"
  }
}
```

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #6d28d9;">🔍 GET /api/widgets/[widgetId]</span>

Get widget details.

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #6d28d9;">✏️ PUT /api/widgets/[widgetId]</span>

Update widget.

</div>

<div style="margin-top: 2rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #6d28d9;">🗑 DELETE /api/widgets/[widgetId]</span>

Delete widget.

</div>

</div>

<div style="background: rgba(245, 101, 101, 0.1); border-left: 4px solid #f56565; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #e53e3e;">🎧 Support System</span>

<div style="margin-top: 1rem;">

<span style="font-size: 1.2rem; font-weight: 600; color: #c53030;">📧 POST /api/support/notify</span>

Send support notification email.

**Request:**
```json
{
  "organizationId": "org_123",
  "type": "technical_issue",
  "message": "Widget not loading on website",
  "userEmail": "user@example.com",
  "priority": "high"
}
```

</div>

</div>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🎣 Webhook Endpoints</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">💳 POST /api/webhooks/stripe</span>

Handle Stripe webhook events.

**Supported Events:**
- `payment_intent.succeeded` - Donation completed
- `checkout.session.completed` - Checkout completed

**Headers Required:**
- `stripe-signature`: Stripe webhook signature

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">👤 POST /api/webhooks/clerk</span>

Handle Clerk user events.

**Supported Events:**
- `user.created` - New user registered
- `user.updated` - User profile updated
- `user.deleted` - User account deleted

**Headers Required:**
- `svix-id`, `svix-timestamp`, `svix-signature`: Clerk webhook headers

</div>

</div>

<div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">❌ Error Handling</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">📋 Error Response Format</span>

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "details": {
    "field": "validation error details"
  }
}
```

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">📊 Common HTTP Status Codes</span>

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🚨 Common Error Codes</span>

- `INVALID_REQUEST` - Request validation failed
- `UNAUTHORIZED` - Authentication required
- `FORBIDDEN` - Insufficient permissions
- `NOT_FOUND` - Resource not found
- `VALIDATION_ERROR` - Input validation failed
- `RATE_LIMITED` - Too many requests

</div>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚡ Rate Limiting</span>

API endpoints are rate limited to ensure fair usage:

- **Authentication endpoints**: 5 requests per minute
- **CRUD operations**: 100 requests per minute  
- **Webhook endpoints**: 1000 requests per minute
- **Public widget endpoints**: 10000 requests per minute

Rate limit headers are included in responses:
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining in window
- `X-RateLimit-Reset`: Time when limit resets (Unix timestamp)

</div>

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Data Models</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🏢 Organization</span>

```typescript
interface Organization {
  id: string;
  name: string;
  display_name: string;
  legal_name?: string;
  email: string;
  stripe_account_id?: string;
  stripe_onboarding_complete: boolean;
  terms_of_service_url?: string;
  created_at: string;
  updated_at: string;
}
```

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🎨 Widget</span>

```typescript
interface Widget {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  is_active: boolean;
  customization: {
    primary_color: string;
    button_text: string;
    // ... other customization options
  };
  created_at: string;
  updated_at: string;
}
```

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🎧 Support Ticket</span>

```typescript
interface SupportTicket {
  id: string;
  organization_id: string;
  subject: string;
  description: string;
  category: 'technical' | 'general' | 'bug_report' | 'feature_request';
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

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">💰 Donation</span>

```typescript
interface Donation {
  id: string;
  organization_id: string;
  widget_id: string;
  donor_name?: string;
  donor_email?: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  stripe_payment_intent_id: string;
  message?: string;
  created_at: string;
  updated_at: string;
}
```

</div>

</div>

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔧 Integration Examples</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🎨 Creating a Donation Widget</span>

```javascript
// 1. Create widget via API
const response = await fetch('/api/widgets', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Main Donation Widget',
    slug: 'main-widget',
    is_active: true,
    customization: {
      primary_color: '#3b82f6',
      button_text: 'Donate Now'
    }
  })
});

const widget = await response.json();

// 2. Embed widget in website
const embedCode = `<script src="https://app.passiton.com/widget/${widget.slug}"></script>`;
```

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">💳 Processing Donation Webhooks</span>

```javascript
// Handle donation webhook
export async function POST(request) {
  const event = await stripe.webhooks.constructEvent(
    await request.text(),
    request.headers.get('stripe-signature'),
    process.env.STRIPE_WEBHOOK_SECRET
  );

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Handle successful donation
    console.log('Payment succeeded:', paymentIntent.id);
  }

  return Response.json({ received: true });
}
```

</div>

</div>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Testing</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">📡 API Testing with curl</span>

```bash
<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Get user organizations</span>

</div>
curl -X GET "http://localhost:3000/api/organizations" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json"

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">💬 Create support ticket</span>

</div>
curl -X POST "http://localhost:3000/api/support/tickets" \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject": "Widget not loading",
    "description": "The donation widget is not appearing on our website",
    "category": "technical",
    "priority": "high"
  }'
```

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🎣 Webhook Testing</span>

```bash
<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Test Stripe webhook locally</span>

</div>
stripe listen --forward-to localhost:3000/api/webhooks/stripe

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 Trigger test events</span>

</div>
stripe trigger payment_intent.succeeded
stripe trigger checkout.session.completed
```

</div>

</div>

---

<div style="text-align: center; color: #64748b; font-style: italic; margin-top: 3rem;">
This API reference is automatically updated with each release. For the latest version, check the developer documentation at `/docs/future-developers/`.
</div>