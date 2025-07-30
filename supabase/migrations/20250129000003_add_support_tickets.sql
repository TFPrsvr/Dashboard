-- Create support_tickets table
CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL, -- Clerk user ID
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('technical', 'billing', 'general', 'bug_report', 'feature_request')),
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'waiting_response', 'resolved', 'closed')),
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    admin_response TEXT,
    admin_user_id TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create support_ticket_messages table for conversation history
CREATE TABLE IF NOT EXISTS support_ticket_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL, -- Clerk user ID (could be customer or admin)
    user_name TEXT NOT NULL,
    user_email TEXT NOT NULL,
    message TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_ticket_messages ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own tickets
CREATE POLICY "Users can view own tickets" ON support_tickets
    FOR SELECT USING (user_id = auth.uid());

-- Policy: Users can create tickets
CREATE POLICY "Users can create tickets" ON support_tickets
    FOR INSERT WITH CHECK (user_id = auth.uid());

-- Policy: Users can update their own tickets (limited fields)
CREATE POLICY "Users can update own tickets" ON support_tickets
    FOR UPDATE USING (user_id = auth.uid());

-- Policy: Users can view messages for their tickets
CREATE POLICY "Users can view ticket messages" ON support_ticket_messages
    FOR SELECT USING (
        ticket_id IN (
            SELECT id FROM support_tickets WHERE user_id = auth.uid()
        )
    );

-- Policy: Users can add messages to their tickets
CREATE POLICY "Users can add ticket messages" ON support_ticket_messages
    FOR INSERT WITH CHECK (
        ticket_id IN (
            SELECT id FROM support_tickets WHERE user_id = auth.uid()
        ) AND user_id = auth.uid()
    );

-- Add indexes
CREATE INDEX support_tickets_user_id_idx ON support_tickets(user_id);
CREATE INDEX support_tickets_organization_id_idx ON support_tickets(organization_id);
CREATE INDEX support_tickets_status_idx ON support_tickets(status);
CREATE INDEX support_tickets_created_at_idx ON support_tickets(created_at);
CREATE INDEX support_ticket_messages_ticket_id_idx ON support_ticket_messages(ticket_id);

-- Add updated_at trigger for support_tickets
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