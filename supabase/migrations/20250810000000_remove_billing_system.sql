-- Remove all billing and subscription related database elements
-- This migration removes the billing system completely while preserving payment processing

-- 1. Drop billing-related tables
DROP TABLE IF EXISTS invoices CASCADE;

-- 2. Remove subscription status from organizations table
ALTER TABLE organizations DROP COLUMN IF EXISTS subscription_status;
ALTER TABLE organizations DROP COLUMN IF EXISTS stripe_customer_id;

-- 3. Clean up any billing-related indexes or constraints that might exist
-- (These will be automatically dropped with the table drops above)

-- 4. Add comment to document the change
COMMENT ON TABLE organizations IS 'Organizations table - billing system removed 2025-08-10';

-- Note: We preserve stripe_account_id and stripe_onboarding_complete as these are needed for payment processing
-- Note: We preserve payment-related tables (donations, causes) as these handle actual transactions