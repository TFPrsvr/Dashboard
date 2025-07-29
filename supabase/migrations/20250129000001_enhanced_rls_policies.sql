-- Enhanced Row Level Security Policies for Role-Based Access Control
-- This migration creates comprehensive RLS policies that enforce the standardized role system

-- Drop existing policies to rebuild them with standardized role names
DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Drop all existing policies for main tables
    FOR r IN (SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public') LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I;', r.policyname, r.schemaname, r.tablename);
    END LOOP;
END $$;

-- USERS TABLE POLICIES
-- =====================

-- Users can always view their own profile
CREATE POLICY "users_select_own" ON public.users
    FOR SELECT USING (id = auth.uid()::text);

-- Super admins can view all users
CREATE POLICY "users_select_super_admin" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can view users in their organization
CREATE POLICY "users_select_admin_org" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users admin_user
            WHERE admin_user.id = auth.uid()::text 
            AND admin_user.role = 'admin' 
            AND admin_user.organization_id = users.organization_id
        )
    );

-- Users can update their own profile (limited fields)
CREATE POLICY "users_update_own" ON public.users
    FOR UPDATE USING (id = auth.uid()::text)
    WITH CHECK (
        id = auth.uid()::text 
        AND role = OLD.role  -- Cannot change own role
        AND organization_id = OLD.organization_id  -- Cannot change own org
    );

-- Super admins can update any user
CREATE POLICY "users_update_super_admin" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can update users in their organization (except role changes to super_admin)
CREATE POLICY "users_update_admin_org" ON public.users
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users admin_user
            WHERE admin_user.id = auth.uid()::text 
            AND admin_user.role = 'admin' 
            AND admin_user.organization_id = users.organization_id
        )
    )
    WITH CHECK (
        role != 'super_admin'  -- Admins cannot create super admins
        AND organization_id = (
            SELECT organization_id FROM public.users 
            WHERE id = auth.uid()::text
        )
    );

-- Super admins can insert new users
CREATE POLICY "users_insert_super_admin" ON public.users
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can invite users to their organization
CREATE POLICY "users_insert_admin_org" ON public.users
    FOR INSERT WITH CHECK (
        role != 'super_admin'  -- Admins cannot create super admins
        AND organization_id = (
            SELECT organization_id FROM public.users 
            WHERE id = auth.uid()::text AND role = 'admin'
        )
    );

-- ORGANIZATIONS TABLE POLICIES
-- =============================

-- Super admins can do everything with organizations
CREATE POLICY "organizations_all_super_admin" ON public.organizations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins and users can view their own organization
CREATE POLICY "organizations_select_own" ON public.organizations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND organization_id = organizations.id
        )
    );

-- Admins can update their own organization
CREATE POLICY "organizations_update_admin" ON public.organizations
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND organization_id = organizations.id
        )
    );

-- WIDGETS TABLE POLICIES
-- =======================

-- Super admins can manage all widgets
CREATE POLICY "widgets_all_super_admin" ON public.widgets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can manage widgets in their organization
CREATE POLICY "widgets_admin_org" ON public.widgets
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND organization_id = widgets.organization_id
        )
    );

-- Users can view widgets in their organization
CREATE POLICY "widgets_select_user_org" ON public.widgets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'user'
            AND organization_id = widgets.organization_id
        )
    );

-- Public can view active widgets (for public widget pages)
CREATE POLICY "widgets_select_public_active" ON public.widgets
    FOR SELECT USING (is_active = true);

-- WIDGET_THEMES TABLE POLICIES
-- =============================

-- Super admins can manage all widget themes
CREATE POLICY "widget_themes_all_super_admin" ON public.widget_themes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can manage themes for widgets in their organization
CREATE POLICY "widget_themes_admin_org" ON public.widget_themes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users u
            JOIN public.widgets w ON w.id = widget_themes.widget_id
            WHERE u.id = auth.uid()::text 
            AND u.role = 'admin'
            AND u.organization_id = w.organization_id
        )
    );

-- Users can view themes for widgets in their organization
CREATE POLICY "widget_themes_select_user_org" ON public.widget_themes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users u
            JOIN public.widgets w ON w.id = widget_themes.widget_id
            WHERE u.id = auth.uid()::text 
            AND u.role = 'user'
            AND u.organization_id = w.organization_id
        )
    );

-- CAUSES TABLE POLICIES
-- ======================

-- Super admins can manage all causes
CREATE POLICY "causes_all_super_admin" ON public.causes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can manage causes for widgets in their organization
CREATE POLICY "causes_admin_org" ON public.causes
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users u
            JOIN public.widgets w ON w.id = causes.widget_id
            WHERE u.id = auth.uid()::text 
            AND u.role = 'admin'
            AND u.organization_id = w.organization_id
        )
    );

-- Users can view causes for widgets in their organization
CREATE POLICY "causes_select_user_org" ON public.causes
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users u
            JOIN public.widgets w ON w.id = causes.widget_id
            WHERE u.id = auth.uid()::text 
            AND u.role = 'user'
            AND u.organization_id = w.organization_id
        )
    );

-- Public can view active causes for active widgets
CREATE POLICY "causes_select_public_active" ON public.causes
    FOR SELECT USING (
        is_active = true 
        AND EXISTS (
            SELECT 1 FROM public.widgets 
            WHERE id = causes.widget_id AND is_active = true
        )
    );

-- DONATIONS TABLE POLICIES
-- =========================

-- Super admins can view all donations
CREATE POLICY "donations_select_super_admin" ON public.donations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can view and manage donations for their organization's widgets
CREATE POLICY "donations_admin_org" ON public.donations
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users u
            JOIN public.widgets w ON w.id = donations.widget_id
            WHERE u.id = auth.uid()::text 
            AND u.role = 'admin'
            AND u.organization_id = w.organization_id
        )
    );

-- Users can view donations for their organization's widgets (limited)
CREATE POLICY "donations_select_user_org" ON public.donations
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users u
            JOIN public.widgets w ON w.id = donations.widget_id
            WHERE u.id = auth.uid()::text 
            AND u.role = 'user'
            AND u.organization_id = w.organization_id
        )
    );

-- Public donations can be inserted (for public donation flow)
CREATE POLICY "donations_insert_public" ON public.donations
    FOR INSERT WITH CHECK (true);  -- Donations come from public, verified by Stripe

-- INVOICES TABLE POLICIES
-- ========================

-- Super admins can view all invoices
CREATE POLICY "invoices_select_super_admin" ON public.invoices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can view invoices for their organization
CREATE POLICY "invoices_admin_org" ON public.invoices
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND organization_id = invoices.organization_id
        )
    );

-- NOTIFICATIONS TABLE POLICIES (if exists)
-- =========================================

-- Super admins can manage all notifications
CREATE POLICY "notifications_all_super_admin" ON public.notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Users can view their own notifications
CREATE POLICY "notifications_select_own" ON public.notifications
    FOR SELECT USING (user_id = auth.uid()::text);

-- Admins can create notifications for users in their organization
CREATE POLICY "notifications_insert_admin_org" ON public.notifications
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users sender
            JOIN public.users recipient ON recipient.id = notifications.user_id
            WHERE sender.id = auth.uid()::text 
            AND sender.role = 'admin'
            AND sender.organization_id = recipient.organization_id
        )
    );

-- Users can update their own notifications (mark as read, etc.)
CREATE POLICY "notifications_update_own" ON public.notifications
    FOR UPDATE USING (user_id = auth.uid()::text);

-- ANALYTICS TABLE POLICIES (if exists)
-- ====================================

-- Super admins can view all analytics
CREATE POLICY "analytics_select_super_admin" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text AND role = 'super_admin'
        )
    );

-- Admins can view analytics for their organization
CREATE POLICY "analytics_admin_org" ON public.analytics
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid()::text 
            AND role = 'admin'
            AND organization_id = analytics.organization_id
        )
    );

-- Create function to check role permissions (can be used in policies)
CREATE OR REPLACE FUNCTION auth.has_role_permission(required_role TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid()::text 
        AND (
            role = required_role OR
            (required_role = 'admin' AND role = 'super_admin') OR
            (required_role = 'user' AND role IN ('admin', 'super_admin'))
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check organization access
CREATE OR REPLACE FUNCTION auth.has_org_access(org_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.users 
        WHERE id = auth.uid()::text 
        AND (
            role = 'super_admin' OR
            organization_id = org_id
        )
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add helpful comments for documentation
COMMENT ON FUNCTION auth.has_role_permission IS 'Check if current user has the required role or higher';
COMMENT ON FUNCTION auth.has_org_access IS 'Check if current user can access the specified organization';

-- Create indexes for RLS performance
CREATE INDEX IF NOT EXISTS idx_users_auth_uid ON public.users(id) WHERE id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_role_org ON public.users(role, organization_id);
CREATE INDEX IF NOT EXISTS idx_widgets_org_active ON public.widgets(organization_id, is_active);
CREATE INDEX IF NOT EXISTS idx_donations_widget_created ON public.donations(widget_id, created_at);

-- Enable RLS on all tables (ensure it's enabled)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.widget_themes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.causes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_assignments ENABLE ROW LEVEL SECURITY;