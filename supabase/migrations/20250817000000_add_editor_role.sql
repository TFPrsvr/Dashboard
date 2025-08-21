-- Migration: Add Admin and User Roles
-- This migration updates the role system to include 'admin' and 'user' roles
-- Current schema has: 'super_admin', 'owner', 'editor'
-- Target schema: 'super_admin', 'admin', 'editor', 'user'

-- Step 1: Temporarily remove the constraint to allow flexibility
ALTER TABLE public.users 
DROP CONSTRAINT IF EXISTS users_role_check;

-- Step 2: Update existing roles to new standard
-- Convert 'owner' to 'admin' (organization administrators)
UPDATE public.users 
SET role = 'admin' 
WHERE role = 'owner';

-- Keep 'editor' as is - it's already the right role
-- Keep 'super_admin' as is

-- Handle any NULL roles (set to user by default)
UPDATE public.users 
SET role = 'user' 
WHERE role IS NULL;

-- Handle any empty string roles
UPDATE public.users 
SET role = 'user' 
WHERE role = '';

-- Handle any other legacy roles
UPDATE public.users 
SET role = 'user' 
WHERE role NOT IN ('super_admin', 'admin', 'editor');

-- Step 3: Add the constraint with all valid roles
ALTER TABLE public.users 
ADD CONSTRAINT users_role_check 
CHECK (role IN ('super_admin', 'admin', 'editor', 'user'));

-- Step 5: Update RLS policies to include editor permissions where appropriate
-- Editors should have similar permissions to admins within their organization

-- Update organization policies to include editors
DROP POLICY IF EXISTS "Admins can manage own organization" ON public.organizations;
DROP POLICY IF EXISTS "Admins and editors can manage own organization" ON public.organizations;
CREATE POLICY "Admins and editors can manage own organization" ON public.organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid()::text 
      AND role IN ('admin', 'editor', 'user')
      AND organization_id = organizations.id
    )
  );

-- Add specific policies for editors if needed
-- For now, editors will have similar access to users within their organization

-- Verification query to check available roles (uncomment to run manually)
-- SELECT role, COUNT(*) as count FROM public.users GROUP BY role ORDER BY role;