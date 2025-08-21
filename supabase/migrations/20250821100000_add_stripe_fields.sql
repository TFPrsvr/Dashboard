-- Add missing Stripe Connect fields to organizations table
-- These fields are needed for Stripe Connect payment processing

-- Add stripe_account_id field if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' 
        AND column_name = 'stripe_account_id'
    ) THEN
        ALTER TABLE organizations ADD COLUMN stripe_account_id TEXT;
    END IF;
END $$;

-- Add stripe_onboarding_complete field if it doesn't exist  
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' 
        AND column_name = 'stripe_onboarding_complete'
    ) THEN
        ALTER TABLE organizations ADD COLUMN stripe_onboarding_complete BOOLEAN DEFAULT false;
    END IF;
END $$;

-- Add display_name field if it doesn't exist (used by Stripe Connect)
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'organizations' 
        AND column_name = 'display_name'
    ) THEN
        ALTER TABLE organizations ADD COLUMN display_name TEXT;
    END IF;
END $$;

-- Create function to get donation stats if it doesn't exist
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