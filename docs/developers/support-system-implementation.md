# Support System Implementation Guide

## Overview

This document provides comprehensive technical details for the PassItOn support ticket system, including database schema, API endpoints, user interfaces, and integration patterns.

## Architecture Overview

### System Components:
```
Frontend (React/Next.js) ↔ API Routes ↔ Database (Supabase) ↔ External Notifications
```

### Technology Stack:
- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes  
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Clerk
- **Notifications**: Console, Slack webhooks, Email (ready)

## Database Schema

### Support Tickets Table:
```sql
CREATE TABLE IF NOT EXISTS support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,                    -- Clerk user ID
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'general',
  priority TEXT NOT NULL DEFAULT 'medium',
  status TEXT NOT NULL DEFAULT 'open',
  user_email TEXT,
  user_name TEXT,
  admin_response TEXT,                      -- Admin's response to ticket
  admin_id TEXT,                           -- Admin who responded
  customer_response TEXT,                   -- Customer's reply to admin
  customer_responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Constraints and Indexes:
```sql
-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_support_tickets_user_id ON support_tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_support_tickets_status ON support_tickets(status);
CREATE INDEX IF NOT EXISTS idx_support_tickets_created_at ON support_tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer_response ON support_tickets(customer_response);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_support_tickets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON support_tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_support_tickets_updated_at();
```

### Data Model:
```typescript
interface SupportTicket {
  id: string;
  user_id: string;
  subject: string;
  description: string;
  category: 'general' | 'technical' | 'billing' | 'bug_report' | 'feature_request';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'waiting_response' | 'resolved' | 'closed';
  user_email?: string;
  user_name?: string;
  admin_response?: string;
  admin_id?: string;
  customer_response?: string;
  customer_responded_at?: string;
  created_at: string;
  updated_at: string;
}
```

## API Endpoints

### Customer Support Endpoints:

#### **GET /api/support**
```typescript
// Get user's support tickets
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch('/api/support');
  const result = await response.json();
  return result.tickets; // Array of user's tickets
}
```

#### **POST /api/support**
```typescript
// Create new support ticket
export async function POST(request: NextRequest) {
  const { userId } = await auth();
  const { subject, description, category, priority, user_email, user_name } = await request.json();

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .insert({
      user_id: userId,
      subject,
      description,
      category: category || 'general',
      priority: priority || 'medium',
      user_email,
      user_name,
      status: 'open'
    })
    .select()
    .single();

  return NextResponse.json({ ticket }, { status: 201 });
}
```

#### **POST /api/support/[ticketId]/respond**
```typescript
// Customer response to admin reply
export async function POST(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const { userId } = await auth();
  const { response } = await request.json();

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .update({
      customer_response: response,
      customer_responded_at: new Date().toISOString(),
      status: 'in_progress',
      updated_at: new Date().toISOString()
    })
    .eq('id', params.ticketId)
    .eq('user_id', userId) // Security: user can only respond to own tickets
    .select()
    .single();

  return NextResponse.json({ success: true, ticket });
}
```

### Admin Support Endpoints:

#### **GET /api/admin/support**
```typescript
// Get all support tickets (admin only)
export async function GET(request: NextRequest) {
  const { userId } = await auth();
  
  // Check admin role
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (!user || !['admin', 'super_admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
  }

  const { data: tickets } = await supabase
    .from('support_tickets')
    .select('*')
    .order('created_at', { ascending: false });

  return NextResponse.json({ tickets: tickets || [] });
}
```

#### **PATCH /api/admin/support/[ticketId]**
```typescript
// Update support ticket (admin only)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { ticketId: string } }
) {
  const { userId } = await auth();
  const { admin_response, status } = await request.json();

  // Verify admin permissions
  const { data: user } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single();

  if (!user || !['admin', 'super_admin'].includes(user.role)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const updateData: any = { updated_at: new Date().toISOString() };
  
  if (admin_response) {
    updateData.admin_response = admin_response;
    updateData.admin_id = userId;
  }
  
  if (status) {
    updateData.status = status;
  }

  const { data: ticket, error } = await supabase
    .from('support_tickets')
    .update(updateData)
    .eq('id', params.ticketId)
    .select()
    .single();

  return NextResponse.json({ ticket });
}
```

### Notification Endpoint:

#### **POST /api/support/notify**
```typescript
export async function POST(request: NextRequest) {
  const { ticketId, subject, description, userEmail, userName, category, priority } = await request.json();

  // Console notification (always active)
  console.log('\n🚨 SUPPORT TICKET ALERT 🚨');
  console.log('================================');
  console.log(`Subject: ${subject}`);
  console.log(`User: ${userName} (${userEmail})`); 
  console.log(`Priority: ${priority.toUpperCase()}`);
  console.log(`Category: ${category}`);
  console.log('================================\n');

  // Slack notification (if configured)
  if (process.env.SLACK_WEBHOOK_URL) {
    await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: `🎫 New Support Ticket: ${subject}`,
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*New Support Ticket Created*\n*From:* ${userName} (${userEmail})\n*Subject:* ${subject}\n*Priority:* ${priority}\n*Category:* ${category}`
            }
          },
          {
            type: "actions",
            elements: [{
              type: "button",
              text: { type: "plain_text", text: "View Ticket" },
              url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/support`
            }]
          }
        ]
      })
    });
  }

  // Email notification structure (ready for implementation)
  const emailNotification = {
    to: process.env.SUPPORT_EMAIL || 'support@passiton.com',
    subject: `New Support Ticket: ${subject}`,
    html: `
      <h2>New Support Ticket Created</h2>
      <p><strong>Ticket ID:</strong> ${ticketId}</p>
      <p><strong>From:</strong> ${userName} (${userEmail})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Priority:</strong> ${priority}</p>
      <p><strong>Description:</strong></p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        ${description}
      </div>
      <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/support">View in Admin Dashboard</a></p>
    `
  };

  return NextResponse.json({ 
    success: true, 
    message: 'Notifications sent',
    methods: ['console', 'slack_ready', 'email_ready']
  });
}
```

## Frontend Implementation

### Customer Support Page:

#### **Component Structure**:
```typescript
// app/(dashboard)/dashboard/support/page.tsx
export default function SupportPage() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState("");

  // Fetch user's tickets
  const fetchTickets = async () => {
    const response = await fetch('/api/support');
    const result = await response.json();
    setTickets(result.tickets || []);
  };

  // Create new ticket
  const handleSubmit = async (e: React.FormEvent) => {
    const response = await fetch('/api/support', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: formData.subject,
        description: formData.description,
        category: formData.category,
        priority: formData.priority,
        user_email: user?.primaryEmailAddress?.emailAddress,
        user_name: user?.fullName || user?.firstName || "User",
      }),
    });
  };

  // Customer response to admin
  const handleCustomerResponse = async (ticketId: string) => {
    const response = await fetch(`/api/support/${ticketId}/respond`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ response: responseText }),
    });
  };
}
```

#### **Key UI Components**:
```typescript
// Ticket creation form
<form onSubmit={handleSubmit}>
  <Input placeholder="Brief description of your issue" required />
  <Select> {/* Category selection */}
  <Select> {/* Priority selection */}
  <Textarea placeholder="Detailed description..." required />
  <Button type="submit">Create Ticket</Button>
</form>

// Ticket list with status badges
{tickets.map((ticket) => (
  <Card key={ticket.id}>
    <Badge className={getStatusColor(ticket.status)}>
      {ticket.status.replace('_', ' ')}
    </Badge>
    
    {/* Admin response display */}
    {ticket.admin_response && (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4>Response from Support</h4>
        <p>{ticket.admin_response}</p>
        {ticket.status === 'waiting_response' && (
          <Button onClick={() => setSelectedTicket(ticket)}>Reply</Button>
        )}
      </div>
    )}
  </Card>
))}

// Customer response modal
{selectedTicket && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <Card>
      <CardHeader>Reply to: {selectedTicket.subject}</CardHeader>
      <CardContent>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p>Support Response:</p>
          <p>{selectedTicket.admin_response}</p>
        </div>
        <Textarea 
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Type your reply here..." 
        />
        <Button onClick={() => handleCustomerResponse(selectedTicket.id)}>
          Send Reply
        </Button>
      </CardContent>
    </Card>
  </div>
)}
```

### Admin Support Management:

#### **Component Structure**:
```typescript
// app/(dashboard)/admin/support/page.tsx
export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [responseText, setResponseText] = useState("");

  // Fetch all tickets (admin)
  const fetchAllTickets = async () => {
    const response = await fetch('/api/admin/support');
    const result = await response.json();
    setTickets(result.tickets || []);
  };

  // Admin response to ticket
  const handleRespond = async (ticketId: string) => {
    const response = await fetch(`/api/admin/support/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        admin_response: responseText,
        status: 'waiting_response'
      }),
    });
  };

  // Update ticket status
  const updateTicketStatus = async (ticketId: string, status: string) => {
    const response = await fetch(`/api/admin/support/${ticketId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
  };
}
```

#### **Admin UI Features**:
```typescript
// Ticket management interface
{tickets.map((ticket) => (
  <Card key={ticket.id}>
    <div className="flex justify-between">
      <div>
        <h3>{ticket.subject}</h3>
        <p>From: {ticket.user_name} ({ticket.user_email})</p>
        <p>Created: {new Date(ticket.created_at).toLocaleDateString()}</p>
      </div>
      
      <div className="flex gap-2">
        <Badge className={getStatusColor(ticket.status)}>
          {ticket.status.replace('_', ' ')}
        </Badge>
        <Badge className={getPriorityColor(ticket.priority)}>
          {ticket.priority}
        </Badge>
      </div>
    </div>

    <p>{ticket.description}</p>

    {/* Previous admin response */}
    {ticket.admin_response && (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4>Admin Response</h4>
        <p>{ticket.admin_response}</p>
      </div>
    )}

    {/* Customer response */}
    {ticket.customer_response && (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <h4>Customer Reply</h4>
        <p>{ticket.customer_response}</p>
        <small>Replied: {new Date(ticket.customer_responded_at).toLocaleString()}</small>
      </div>
    )}

    <div className="flex justify-between">
      {/* Status management */}
      <Select value={ticket.status} onValueChange={(status) => updateTicketStatus(ticket.id, status)}>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="in_progress">In Progress</SelectItem>
        <SelectItem value="waiting_response">Waiting Response</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
        <SelectItem value="closed">Closed</SelectItem>
      </Select>

      {/* Response button */}
      <Button onClick={() => setSelectedTicket(ticket)}>Respond</Button>
    </div>
  </Card>
))}

// Admin response modal
{selectedTicket && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <Card>
      <CardHeader>Respond to: {selectedTicket.subject}</CardHeader>
      <CardContent>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p>Original Issue:</p>
          <p>{selectedTicket.description}</p>
        </div>
        
        <Textarea 
          value={responseText}
          onChange={(e) => setResponseText(e.target.value)}
          placeholder="Type your response here..." 
        />
        
        <Button onClick={() => handleRespond(selectedTicket.id)}>
          Send Response
        </Button>
      </CardContent>
    </Card>
  </div>
)}
```

## Navigation Integration

### Sidebar Navigation:
```typescript
// components/dashboard/sidebar.tsx
const navItems = [
  // ... existing items
  {
    title: "Support",
    href: "/dashboard/support",
    icon: MessageCircle,
  },
];

const adminItems = [
  // ... existing admin items
  {
    title: "Support Management",
    href: "/admin/support", 
    icon: MessageCircle,
  },
];

// Role-based navigation display
{role && ['admin', 'super_admin'].includes(role) && (
  <div className="mt-8">
    <p className="text-xs font-semibold text-gray-500 uppercase">Admin</p>
    <ul className="space-y-1">
      {adminItems.map((item) => (
        <li key={item.href}>
          <Link href={item.href} className={cn(/* styling */)}>
            <item.icon className="w-5 h-5" />
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}
```

## External Notifications

### Slack Integration:
```typescript
// Environment variable required: SLACK_WEBHOOK_URL
const slackMessage = {
  text: `🎫 New Support Ticket: ${subject}`,
  blocks: [
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*New Support Ticket Created*\n*From:* ${userName} (${userEmail})\n*Subject:* ${subject}\n*Priority:* ${priority}\n*Category:* ${category}`
      }
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Description:*\n${description}`
      }
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "View Ticket" },
          url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/support`
        }
      ]
    }
  ]
};

await fetch(process.env.SLACK_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(slackMessage)
});
```

### Email Integration (Ready for Implementation):
```typescript
// Email service integration structure
interface EmailNotification {
  to: string;
  subject: string;
  html: string;
}

async function sendEmail(notification: EmailNotification) {
  // Implement with your preferred service:
  // - SendGrid
  // - Resend
  // - AWS SES
  // - Nodemailer + SMTP
}
```

## Status Flow Management

### Ticket Lifecycle:
```
[open] → [in_progress] → [waiting_response] → [in_progress] → [resolved] → [closed]
                     ↑                      ↓
              Admin responds          Customer responds
```

### Status Rules:
```typescript
const statusTransitions = {
  'open': ['in_progress', 'closed'],
  'in_progress': ['waiting_response', 'resolved', 'closed'],
  'waiting_response': ['in_progress', 'resolved', 'closed'],
  'resolved': ['closed', 'in_progress'], // Reopen if needed
  'closed': [] // Final state
};

function canTransitionTo(currentStatus: string, newStatus: string): boolean {
  return statusTransitions[currentStatus]?.includes(newStatus) || false;
}
```

## Error Handling

### API Error Responses:
```typescript
// Standardized error response format
interface ErrorResponse {
  error: string;
  code?: string;
  details?: any;
}

// Common error handlers
export function handleAuthError(): NextResponse {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function handlePermissionError(): NextResponse {
  return NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 });
}

export function handleValidationError(message: string): NextResponse {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function handleDatabaseError(error: any): NextResponse {
  console.error('Database error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
```

### Frontend Error Handling:
```typescript
// Error boundary for support components
export function SupportErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <div className="text-center py-12">
          <p>Something went wrong with the support system.</p>
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
}

// API error handling
async function apiCall(url: string, options: RequestInit) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Request failed');
    }

    return result;
  } catch (error) {
    console.error('API Error:', error);
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "An unexpected error occurred",
      variant: "destructive",
    });
    throw error;
  }
}
```

## Security Considerations

### Authentication & Authorization:
```typescript
// API route security pattern
export async function POST(request: NextRequest) {
  // 1. Authentication check
  const { userId } = await auth();
  if (!userId) {
    return handleAuthError();
  }

  // 2. Input validation
  const body = await request.json();
  const validatedData = validateSupportTicketInput(body);
  if (!validatedData.success) {
    return handleValidationError(validatedData.error);
  }

  // 3. Authorization check (for admin endpoints)
  if (isAdminEndpoint) {
    const userRole = await getUserRole(userId);
    if (!userRole || !['admin', 'super_admin'].includes(userRole)) {
      return handlePermissionError();
    }
  }

  // 4. Data access control
  // Ensure users can only access their own tickets
  const { data, error } = await supabase
    .from('support_tickets')
    .select('*')
    .eq('user_id', userId); // Important: filter by user
}
```

### Data Sanitization:
```typescript
function sanitizeSupportTicketInput(input: any) {
  return {
    subject: input.subject?.trim().substring(0, 200),
    description: input.description?.trim().substring(0, 5000),
    category: ['general', 'technical', 'billing', 'bug_report', 'feature_request']
      .includes(input.category) ? input.category : 'general',
    priority: ['low', 'medium', 'high', 'urgent']
      .includes(input.priority) ? input.priority : 'medium'
  };
}
```

## Performance Optimizations

### Database Query Optimization:
```sql
-- Efficient queries with proper indexing
EXPLAIN ANALYZE SELECT * FROM support_tickets 
WHERE user_id = $1 
ORDER BY created_at DESC 
LIMIT 20;

-- Index usage verification
SELECT schemaname, tablename, indexname, idx_scan, idx_tup_read, idx_tup_fetch 
FROM pg_stat_user_indexes 
WHERE tablename = 'support_tickets';
```

### Frontend Optimization:
```typescript
// Pagination for large ticket lists
const [tickets, setTickets] = useState<SupportTicket[]>([]);
const [loading, setLoading] = useState(false);
const [hasMore, setHasMore] = useState(true);

const loadMoreTickets = useCallback(async () => {
  if (loading || !hasMore) return;
  
  setLoading(true);
  const response = await fetch(`/api/support?offset=${tickets.length}&limit=20`);
  const result = await response.json();
  
  if (result.tickets.length < 20) {
    setHasMore(false);
  }
  
  setTickets(prev => [...prev, ...result.tickets]);
  setLoading(false);
}, [tickets.length, loading, hasMore]);

// Memoized components for performance
const TicketCard = memo(({ ticket }: { ticket: SupportTicket }) => {
  return (
    <Card key={ticket.id}>
      {/* Ticket content */}
    </Card>
  );
});
```

## Testing Strategy

### Unit Tests:
```typescript
// API endpoint tests
describe('POST /api/support', () => {
  it('creates ticket with valid data', async () => {
    const ticketData = {
      subject: 'Test Issue',
      description: 'Test description',
      category: 'technical',
      priority: 'medium'
    };

    const response = await request(app)
      .post('/api/support')
      .set('Authorization', `Bearer ${userToken}`)
      .send(ticketData)
      .expect(201);

    expect(response.body.ticket.subject).toBe('Test Issue');
  });

  it('rejects unauthenticated requests', async () => {
    await request(app)
      .post('/api/support')
      .send({ subject: 'Test' })
      .expect(401);
  });
});

// Component tests
describe('SupportPage', () => {
  it('displays user tickets', async () => {
    const mockTickets = [
      { id: '1', subject: 'Test Ticket', status: 'open' }
    ];

    render(<SupportPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Ticket')).toBeInTheDocument();
    });
  });
});
```

### Integration Tests:
```typescript
describe('Support System Integration', () => {
  it('completes full ticket lifecycle', async () => {
    // 1. Customer creates ticket
    const createResponse = await createTicket({
      subject: 'Integration Test',
      description: 'Test description'
    });
    
    // 2. Admin responds
    const respondResponse = await adminRespond(createResponse.ticket.id, {
      admin_response: 'Thank you for contacting support...'
    });
    
    // 3. Customer replies  
    const replyResponse = await customerReply(createResponse.ticket.id, {
      response: 'Thanks for the help!'
    });
    
    // 4. Admin closes ticket
    const closeResponse = await updateTicketStatus(createResponse.ticket.id, 'resolved');
    
    expect(closeResponse.ticket.status).toBe('resolved');
  });
});
```

## Deployment Considerations

### Environment Variables:
```bash
# Required for support system
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Optional for enhanced notifications
SUPPORT_EMAIL=support@yourcompany.com
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
NEXT_PUBLIC_APP_URL=https://yourapp.com
```

### Database Setup:
```sql
-- Run in production Supabase
-- 1. Create table and indexes (see schema section)
-- 2. Disable RLS (we handle auth in application)
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;
-- 3. Verify indexes are created
-- 4. Test with sample data
```

### Monitoring:
```typescript
// Add monitoring for support system
console.log('Support System Metrics:', {
  ticketCount: await getTicketCount(),
  avgResponseTime: await getAvgResponseTime(),
  activeTickets: await getActiveTicketCount(),
  timestamp: new Date().toISOString()
});
```

---

**Author**: Development Team  
**Date**: January 30, 2025  
**Version**: 1.0  
**Next Review**: February 28, 2025