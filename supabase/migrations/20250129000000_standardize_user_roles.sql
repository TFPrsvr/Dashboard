-- Migration: Standardize User Roles
-- This migration updates the user roles to match the standardized system:
-- 'owner' -> 'admin' (Organization administrator)
-- 'editor' -> 'user' (Limited access user)
-- 'super_admin' remains the same (Platform administrator)

-- Step 1: Add the new role constraint (temporarily allow both old and new roles)
ALTER TABLE public.users 
DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE public.users 
ADD CONSTRAINT users_role_check_temp 
CHECK (role IN ('super_admin', 'owner', 'editor', 'admin', 'user'));

-- Step 2: Update existing roles to new standardized names
UPDATE public.users 
SET role = 'admin' 
WHERE role = 'owner';

UPDATE public.users 
SET role = 'user' 
WHERE role = 'editor';

-- Step 3: Apply the final constraint with only new role names
ALTER TABLE public.users 
DROP CONSTRAINT users_role_check_temp;

ALTER TABLE public.users 
ADD CONSTRAINT users_role_check 
CHECK (role IN ('super_admin', 'admin', 'user'));

-- Step 4: Update the default role from 'editor' to 'user'
ALTER TABLE public.users 
ALTER COLUMN role SET DEFAULT 'user';

-- Step 5: Add role assignment audit table for tracking role changes
CREATE TABLE IF NOT EXISTS public.role_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  assigned_by TEXT NOT NULL REFERENCES public.users(id),
  old_role TEXT,
  new_role TEXT NOT NULL,
  organization_id UUID REFERENCES public.organizations(id),
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on role_assignments
ALTER TABLE public.role_assignments ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Super admins can see all role assignments
CREATE POLICY "Super admins can view all role assignments" ON public.role_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- RLS Policy: Admins can see role assignments within their organization
CREATE POLICY "Admins can view org role assignments" ON public.role_assignments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role = 'admin' 
      AND organization_id = role_assignments.organization_id
    )
  );

-- RLS Policy: Only super admins and admins can insert role assignments
CREATE POLICY "Admins can create role assignments" ON public.role_assignments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND (
        role = 'super_admin' OR 
        (role = 'admin' AND organization_id = role_assignments.organization_id)
      )
    )
  );

-- Step 6: Create function to log role changes
CREATE OR REPLACE FUNCTION log_role_change()
RETURNS TRIGGER AS $$
BEGIN
  -- Only log if role actually changed
  IF OLD.role IS DISTINCT FROM NEW.role THEN
    INSERT INTO public.role_assignments (
      user_id, 
      assigned_by, 
      old_role, 
      new_role, 
      organization_id,
      reason
    ) VALUES (
      NEW.id,
      COALESCE(auth.uid()::TEXT, 'system'),
      OLD.role,
      NEW.role,
      NEW.organization_id,
      'Role updated'
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically log role changes
DROP TRIGGER IF EXISTS trigger_log_role_change ON public.users;
CREATE TRIGGER trigger_log_role_change
  AFTER UPDATE ON public.users
  FOR EACH ROW
  WHEN (OLD.role IS DISTINCT FROM NEW.role)
  EXECUTE FUNCTION log_role_change();

-- Step 7: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_role_org ON public.users(role, organization_id);
CREATE INDEX IF NOT EXISTS idx_role_assignments_user_id ON public.role_assignments(user_id);
CREATE INDEX IF NOT EXISTS idx_role_assignments_assigned_by ON public.role_assignments(assigned_by);

-- Step 8: Update existing RLS policies to use new role names
-- Note: This assumes existing policies need to be updated

-- Update user policies to use new role names
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (id = auth.uid());

DROP POLICY IF EXISTS "Super admins can view all users" ON public.users;
CREATE POLICY "Super admins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

DROP POLICY IF EXISTS "Admins can view org users" ON public.users;
CREATE POLICY "Admins can view org users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users u2
      WHERE u2.id = auth.uid() 
      AND u2.role = 'admin' 
      AND u2.organization_id = users.organization_id
    )
  );

-- Update organization policies
DROP POLICY IF EXISTS "Super admins can manage all organizations" ON public.organizations;
CREATE POLICY "Super admins can manage all organizations" ON public.organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

DROP POLICY IF EXISTS "Admins can manage own organization" ON public.organizations;
CREATE POLICY "Admins can manage own organization" ON public.organizations
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() 
      AND role IN ('admin', 'user')
      AND organization_id = organizations.id
    )
  );

-- Verification query to check the migration
-- SELECT role, COUNT(*) as count FROM public.users GROUP BY role ORDER BY role;