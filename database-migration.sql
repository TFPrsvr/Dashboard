-- Database Migration: Add missing columns to users table
-- Run this in Supabase Dashboard -> SQL Editor

-- Add missing columns to users table
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'accepted' CHECK (status IN ('pending', 'accepted'));

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS invited_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS invitation_token TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS first_name TEXT;

ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS last_name TEXT;

-- Update existing users to have accepted status and accepted_at timestamp
UPDATE public.users 
SET 
  status = 'accepted',
  accepted_at = created_at
WHERE status IS NULL OR accepted_at IS NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_status ON public.users(status);
CREATE INDEX IF NOT EXISTS idx_users_invitation_token ON public.users(invitation_token);
CREATE INDEX IF NOT EXISTS idx_users_invited_at ON public.users(invited_at);

-- Verify the migration
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_name = 'users' 
  AND table_schema = 'public'
ORDER BY ordinal_position;