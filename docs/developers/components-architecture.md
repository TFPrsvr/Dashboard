# Components Architecture & File Structure

This document explains how the component system works, file relationships, and architectural patterns in the PassItOn Admin Dashboard.

## Component Architecture Overview

### Directory Structure & Relationships

```
components/
├── auth/               # Authentication & authorization
├── dashboard/          # Dashboard-specific business logic
├── providers/          # React context & state management  
└── ui/                # Base UI primitives (shadcn/ui)
```

**Data Flow:**
`providers/` → `auth/` → `dashboard/` → `ui/`

## Authentication Layer

### AuthGuard (`auth/auth-guard.tsx`)

**Purpose:** Route protection and role-based access control

**Connected Files:**
- `lib/auth/permissions.ts` - Role validation logic
- `hooks/use-organization.ts` - Organization context
- `types/roles.types.ts` - Role type definitions

**How it works:**
1. Receives user from Clerk authentication
2. Validates role against required permissions in `permissions.ts`
3. Redirects unauthorized users to appropriate pages
4. Wraps protected components/pages

**Usage Pattern:**
```tsx
// In page.tsx files
<AuthGuard requiredRole="super_admin">
  <AdminComponent />
</AuthGuard>
```

## Provider Layer (State Management)

### ClientProvider (`providers/client-provider.tsx`)

**Purpose:** Client-side application context wrapper

**Dependencies:**
- `@clerk/nextjs` - Authentication state
- `@tanstack/react-query` - Server state management
- `components/ui/Toaster.tsx` - Global notifications

**File Relationships:**
- Wraps entire app in `app/layout.tsx`
- Provides auth context to all child components
- Manages global UI state (toasts, loading states)

### SupabaseProvider (`providers/supabase-provider.tsx`)

**Purpose:** Database client context for all components

**Connected Files:**
- `lib/supabase/supabase-client.ts` - Browser client
- `lib/supabase/supabase-server.ts` - Server client
- All components that need database access

**Architecture Pattern:**
1. Creates Supabase client with Clerk session
2. Provides authenticated database access
3. Manages real-time subscriptions
4. Handles connection state

## Dashboard Component Layer

### DashboardHeader (`dashboard/dashboard-header.tsx`)

**Purpose:** Main navigation and user context display

**File Dependencies:**
- `hooks/use-organization.ts` - Current organization data
- `lib/auth/permissions.ts` - Role-based menu items
- `components/ui/` - UI primitives (Button, DropdownMenu)

**Connected Components:**
- `Sidebar.tsx` - Works together for navigation
- `AuthGuard.tsx` - Receives user role for menu rendering

**Data Flow:**
1. Gets current user from Clerk
2. Fetches organization from `use-organization` hook
3. Renders navigation based on role permissions
4. Communicates with sidebar for mobile menu state

### Sidebar (`dashboard/sidebar.tsx`)

**Purpose:** Main navigation menu with role-based items

**Architecture Connections:**
- `lib/auth/permissions.ts` - Menu item visibility rules
- `app/(dashboard)/*/page.tsx` - Navigation targets
- `hooks/use-organization.ts` - Organization context

**Role-Based Rendering:**
- **Super Admin**: Links to `app/(dashboard)/admin/*` pages
- **Owner/Editor**: Links to `app/(dashboard)/dashboard/*` pages

### WidgetCustomizer (`dashboard/widget-customizer.tsx`)

**Purpose:** Widget configuration interface

**File Relationships:**
- `hooks/use-widget.ts` - Widget state management
- `types/widget.types.ts` - Widget configuration types
- `app/api/widgets/route.ts` - Save configuration API
- `WidgetPreview.tsx` - Real-time preview display

**Data Architecture:**
1. Fetches current widget config via `use-widget` hook
2. Updates local state for real-time preview
3. Saves to database via `/api/widgets` endpoint
4. Syncs with preview component for live updates

### WidgetPreview (`dashboard/widget-preview.tsx`)

**Purpose:** Live widget rendering with current configuration

**Dependencies:**
- `WidgetCustomizer.tsx` - Receives configuration changes
- `app/widget/[slug]/page.tsx` - Embedded widget rendering
- `hooks/use-widget.ts` - Shared widget state

**Rendering Flow:**
1. Receives config from customizer in real-time
2. Applies styling and theme changes
3. Simulates actual widget appearance
4. Updates when configuration changes

### OrganizationSettings (`dashboard/organization-settings.tsx`)

**Purpose:** Organization management interface

**Connected Systems:**
- `hooks/use-organization.ts` - Organization data
- `hooks/use-stripe-connect.ts` - Payment setup
- `app/api/organizations/[orgId]/route.ts` - Update API
- `lib/stripe/connect.ts` - Stripe integration

**Integration Points:**
1. Manages organization profile data
2. Handles Stripe Connect onboarding
3. Team member invitation system
4. Subscription management

## UI Component Layer

### Base Components (`ui/`)

**Purpose:** Reusable UI primitives built on Radix UI

**Architecture Pattern:**
- Built with `@radix-ui/*` for accessibility
- Styled with Tailwind CSS
- Consistent API patterns across components
- Used by all higher-level components

**Key Relationships:**
- `Button.tsx` - Used in all interactive components
- `Card.tsx` - Layout wrapper for dashboard sections  
- `Toast.tsx` + `use-toast.tsx` - Global notification system
- `Input.tsx`, `Select.tsx` - Form components in settings

## Hook Integration Patterns

### State Management Hooks

**File Locations:** `hooks/`

**Architecture Connections:**
- `use-organization.ts` → Multiple dashboard components
- `use-widget.ts` → Widget customizer/preview components  
- `use-stripe-connect.ts` → Organization settings
- `use-notifications.ts` → Dashboard header, notification components

**Data Flow Pattern:**
1. Hooks fetch data from Supabase via providers
2. Components consume hook data via React context
3. State updates trigger re-renders across connected components
4. API mutations update both local and server state

## API Integration Architecture

### Component → API → Database Flow

**Pattern:**
```
Component → Hook → API Route → Supabase → Database
    ↓         ↓        ↓          ↓         ↓
 UI State → Local → Server → Client → PostgreSQL
```

**Example: Widget Configuration**
1. `WidgetCustomizer` updates local state
2. `use-widget` hook manages state and API calls
3. `app/api/widgets/route.ts` validates and saves
4. Supabase client updates database
5. Real-time updates reflect across all components

## Authentication Flow Integration

### Component Security Architecture

**Flow:**
```
Page Request → Middleware → AuthGuard → Component → API
     ↓            ↓           ↓           ↓        ↓
  Route Check → Auth Check → Role Check → Render → Data Access
```

**File Integration:**
- `middleware.ts` - Route-level protection
- `AuthGuard.tsx` - Component-level protection  
- `lib/auth/permissions.ts` - Role validation
- `app/api/*/route.ts` - API-level authorization

## Multi-Tenant Architecture

### Organization Context Flow

**Components → Organization Relationship:**
1. `SupabaseProvider` establishes user session
2. `use-organization` hook determines current organization
3. `AuthGuard` validates user's role in organization
4. Dashboard components filter data by organization ID
5. API routes enforce organization-scoped data access

**Database Relationships:**
- Users belong to Organizations (foreign key)
- Widgets belong to Organizations  
- All data is organization-scoped via RLS policies

## Development Patterns

### Adding New Components

**Architecture Requirements:**
1. **Location**: Choose appropriate layer (auth/dashboard/ui/providers)
2. **Dependencies**: Import from lower layers only (ui → dashboard → auth → providers)
3. **State**: Use appropriate hooks for data management
4. **Types**: Define in `types/` directory with proper relationships
5. **API**: Create corresponding API routes if needed

### Component Communication Patterns

**Parent-Child:** Props and callbacks
**Sibling:** Shared hooks and context
**Global:** Zustand store and React context
**Server:** API routes with optimistic updates

This architecture ensures maintainable, scalable component relationships with clear separation of concerns.