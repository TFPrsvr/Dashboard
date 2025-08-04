-- Add customer_response field to support_tickets table
-- This allows customers to respond to admin responses

ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_response TEXT;

-- Add index for better performance when filtering by response status
CREATE INDEX IF NOT EXISTS idx_support_tickets_customer_response ON support_tickets(customer_response);

-- Add timestamp for when customer responded
ALTER TABLE support_tickets 
ADD COLUMN IF NOT EXISTS customer_responded_at TIMESTAMP WITH TIME ZONE;