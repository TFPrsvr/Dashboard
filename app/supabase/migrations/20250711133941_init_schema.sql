-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Organizations table
CREATE TABLE organizations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'trial',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (synced with Clerk)
CREATE TABLE users (
    id TEXT PRIMARY KEY, -- Clerk user ID
    email TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'owner', 'editor')),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Widgets table
CREATE TABLE widgets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    config JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Widget themes table
CREATE TABLE widget_themes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    widget_id UUID REFERENCES widgets(id) ON DELETE CASCADE,
    primary_color TEXT DEFAULT '#000000',
    secondary_color TEXT DEFAULT '#ffffff',
    font_family TEXT DEFAULT 'Inter',
    border_radius TEXT DEFAULT '8px',
    custom_css TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Causes table
CREATE TABLE causes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    widget_id UUID REFERENCES widgets(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    goal_amount DECIMAL(10, 2),
    raised_amount DECIMAL(10, 2) DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table
CREATE TABLE donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    widget_id UUID REFERENCES widgets(id) ON DELETE CASCADE,
    cause_id UUID REFERENCES causes(id) ON DELETE SET NULL,
    stripe_payment_intent_id TEXT UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    donor_email TEXT,
    donor_name TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices table
CREATE TABLE invoices (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    stripe_invoice_id TEXT UNIQUE,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'pending',
    pdf_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_organization_id ON users(organization_id);
CREATE INDEX idx_widgets_organization_id ON widgets(organization_id);
CREATE INDEX idx_widget_themes_widget_id ON widget_themes(widget_id);
CREATE INDEX idx_causes_widget_id ON causes(widget_id);
CREATE INDEX idx_donations_widget_id ON donations(widget_id);
