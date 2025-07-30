-- Fix RLS policies for support_tickets table
-- Since we're using Clerk authentication and handling authorization in the API layer,
-- we'll disable RLS for support_tickets and rely on application-level security

-- Drop all existing policies
DROP POLICY IF EXISTS "Users can view own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Users can create own tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admin users can view all tickets" ON support_tickets;
DROP POLICY IF EXISTS "Admin users can update all tickets" ON support_tickets;

-- Disable RLS entirely for support_tickets
-- This allows our API endpoints to handle authorization properly
ALTER TABLE support_tickets DISABLE ROW LEVEL SECURITY;