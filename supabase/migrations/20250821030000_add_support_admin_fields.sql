-- Add missing admin_id and admin_responded_at columns to support_tickets table
-- Generated: 2025-08-21

DO $$ 
BEGIN
    -- Add admin_id column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'support_tickets' 
        AND column_name = 'admin_id'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE support_tickets ADD COLUMN admin_id TEXT;
    END IF;

    -- Add admin_responded_at column if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'support_tickets' 
        AND column_name = 'admin_responded_at'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE support_tickets ADD COLUMN admin_responded_at TIMESTAMPTZ;
    END IF;
END $$;