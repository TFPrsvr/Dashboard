-- Clean up duplicate indexes and add missing Stripe fields
-- This migration fixes performance issues and adds required fields for Stripe Connect

-- 1. Remove duplicate indexes for support_ticket_messages
DROP INDEX IF EXISTS idx_support_ticket_messages_ticket_id;
-- Keep support_ticket_messages_ticket_id_idx

-- 2. Remove duplicate indexes for support_tickets  
DROP INDEX IF EXISTS idx_support_tickets_created_at;
-- Keep support_tickets_created_at_idx

DROP INDEX IF EXISTS idx_support_tickets_organization_id;
-- Keep support_tickets_organization_id_idx

DROP INDEX IF EXISTS idx_support_tickets_status;
-- Keep support_tickets_status_idx

DROP INDEX IF EXISTS idx_support_tickets_user_id;
-- Keep support_tickets_user_id_idx

-- 3. Add missing Stripe Connect fields to organizations table
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS stripe_account_id TEXT;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS stripe_onboarding_complete BOOLEAN DEFAULT false;
ALTER TABLE organizations ADD COLUMN IF NOT EXISTS display_name TEXT;

-- 4. Drop existing function and recreate with correct signature
DROP FUNCTION IF EXISTS get_donation_stats(uuid);

-- Create donation stats function
CREATE OR REPLACE FUNCTION get_donation_stats(widget_id uuid)
RETURNS TABLE (
  total_raised bigint,
  total_donations bigint,
  average_donation numeric,
  unique_donors bigint
) 
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(SUM(amount), 0) as total_raised,
    COUNT(*)::bigint as total_donations,
    COALESCE(AVG(amount), 0) as average_donation,
    COUNT(DISTINCT donor_email)::bigint as unique_donors
  FROM donations 
  WHERE donations.widget_id = get_donation_stats.widget_id
    AND status = 'succeeded';
END;
$$;