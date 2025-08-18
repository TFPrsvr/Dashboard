<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">📌 Components Architecture & File Structure</span>

</div>

This document explains how the component system works, file relationships, and architectural patterns in the PassItOn Admin Dashboard.

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📊 Component Architecture Overview</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 Directory Structure & Relationships</span>

</div>

```
components/
├── auth/               # Authentication & authorization
├── dashboard/          # Dashboard-specific business logic
├── providers/          # React context & state management  
└── ui/                # Base UI primitives (shadcn/ui)
```

**Data Flow:**
`providers/` → `auth/` → `dashboard/` → `ui/`

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 Authentication Layer</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">🔐 AuthGuard (`auth/auth-guard.tsx`)</span>

</div>

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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Provider Layer (State Management)</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 ClientProvider (`providers/client-provider.tsx`)</span>

</div>

**Purpose:** Client-side application context wrapper

**Dependencies:**
- `@clerk/nextjs` - Authentication state
- `@tanstack/react-query` - Server state management
- `components/ui/Toaster.tsx` - Global notifications

**File Relationships:**
- Wraps entire app in `app/layout.tsx`
- Provides auth context to all child components
- Manages global UI state (toasts, loading states)

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 SupabaseProvider (`providers/supabase-provider.tsx`)</span>

</div>

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

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Dashboard Component Layer</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 DashboardHeader (`dashboard/dashboard-header.tsx`)</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Sidebar (`dashboard/sidebar.tsx`)</span>

</div>

**Purpose:** Main navigation menu with role-based items

**Architecture Connections:**
- `lib/auth/permissions.ts` - Menu item visibility rules
- `app/(dashboard)/*/page.tsx` - Navigation targets
- `hooks/use-organization.ts` - Organization context

**Role-Based Rendering:**
- **Super Admin**: Links to `app/(dashboard)/admin/*` pages
- **Owner/Editor**: Links to `app/(dashboard)/dashboard/*` pages

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 WidgetCustomizer (`dashboard/widget-customizer.tsx`)</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 WidgetPreview (`dashboard/widget-preview.tsx`)</span>

</div>

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

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 OrganizationSettings (`dashboard/organization-settings.tsx`)</span>

</div>

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

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 UI Component Layer</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Base Components (`ui/`)</span>

</div>

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

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Hook Integration Patterns</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 State Management Hooks</span>

</div>

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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔌 API Integration Architecture</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 Component → API → Database Flow</span>

</div>

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

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🔐 Authentication Flow Integration</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 Component Security Architecture</span>

</div>

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

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Multi-Tenant Architecture</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Organization Context Flow</span>

</div>

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

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📌 Development Patterns</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Adding New Components</span>

</div>

**Architecture Requirements:**
1. **Location**: Choose appropriate layer (auth/dashboard/ui/providers)
2. **Dependencies**: Import from lower layers only (ui → dashboard → auth → providers)
3. **State**: Use appropriate hooks for data management
4. **Types**: Define in `types/` directory with proper relationships
5. **API**: Create corresponding API routes if needed

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Component Communication Patterns</span>

</div>

**Parent-Child:** Props and callbacks
**Sibling:** Shared hooks and context
**Global:** Zustand store and React context
**Server:** API routes with optimistic updates

This architecture ensures maintainable, scalable component relationships with clear separation of concerns.