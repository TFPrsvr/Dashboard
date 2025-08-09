# PassItOn Admin Dashboard

A comprehensive multi-tenant admin dashboard for managing donation widgets, organizations, and team members. Built with modern web technologies including Next.js 14, Supabase, and Clerk authentication for scalable, secure operations.

## 📚 Documentation

Our documentation is organized by user role to provide targeted, relevant information for your needs. Select the appropriate section below:

### 👨‍💻 **Future Developers**
**[Developer Documentation Hub →](./docs/future-developers/README.md)**

Technical documentation for software engineers, DevOps teams, and system integrators:
- **[Developer Documentation Hub](./docs/future-developers/README.md)** - Central navigation for all technical docs
- **[Comprehensive Setup & Deployment Guide](./docs/future-developers/comprehensive-setup-deployment-guide.md)** - Complete setup, Docker, and production deployment
- **[Environment Variables Setup](./docs/future-developers/environment-variables-setup.md)** - Detailed environment configuration reference
- **[Authentication System Guide](./docs/future-developers/authentication-system-guide.md)** - Clerk authentication and super admin setup
- **[API Reference](./docs/future-developers/api-reference.md)** - Complete API documentation
- **[Components Architecture](./docs/future-developers/components-architecture.md)** - Component structure and design patterns
- **[Technical Troubleshooting Guide](./docs/admins/technical-troubleshooting-guide.md)** - Comprehensive technical issue resolution

### 👩‍💼 **Business Users**
**[Integration & Usage Guide →](./docs/business-users/integration-guide.md)**

User-friendly guides for organization owners, content managers, and end users:
- **[Integration Guide](./docs/business-users/integration-guide.md)** - Complete setup and usage guide for business users
- **[Service Setup Guide](./docs/business-users/service-setup-guide.md)** - Step-by-step third-party service setup (Stripe, Clerk, Supabase)
- **[Live Widget Testing Guide](./docs/business-users/live-widget-testing-guide.md)** - Testing donation widgets in real environments
- **[Support System Guide](./docs/business-users/support-system-guide.md)** - How to use the support ticket system
- **[User Troubleshooting Guide](./docs/business-users/user-troubleshooting-guide.md)** - Visual troubleshooting for common issues

### 🔐 **System Administrators**
**[Admin Setup Guide →](./docs/admins/setup-super-admin.md)**

Platform administration guides for system administrators and super users:
- **[Setup Super Admin](./docs/admins/setup-super-admin.md)** - Comprehensive guide for creating and managing super admin users
- **[Support Management Guide](./docs/admins/support-management-guide.md)** - Managing support tickets and user assistance  
- **[Technical Troubleshooting Guide](./docs/admins/technical-troubleshooting-guide.md)** - Comprehensive technical and monitoring troubleshooting
- User role hierarchy and permission management
- Platform security and compliance configuration

### 🔌 **Platform Integrations**
**[Integration Hub →](./docs/integrations/platform-integration-overview.md)**

Comprehensive platform integrations and marketplace implementations:
- **[Platform Integration Overview](./docs/integrations/platform-integration-overview.md)** - Complete integration strategy and roadmap
- **[Shopify Integration](./docs/integrations/shopify/)** - E-commerce marketplace integration
- **[WordPress Plugin](./docs/integrations/wordpress/)** - WordPress.org plugin directory integration
- **[Chrome Extension](./docs/integrations/chrome-extension/)** - Browser extension for universal widget deployment
- **[Drupal Module](./docs/integrations/drupal/)** - Enterprise-grade module for government and institutional sites

## 🚀 Quick Start

### Developer Quick Setup
```bash
# Clone the repository
git clone <repository-url>
cd PassItOn-Admin

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your configuration values

# Start development server
npm run dev
```

For complete installation and configuration instructions, see our **[Developer Documentation](./docs/future-developers/README.md)**.

### Business User Onboarding
1. **Start Here**: Review the [Integration Guide](./docs/business-users/integration-guide.md) for platform overview
2. **Configure Services**: Follow the [Service Setup Guide](./docs/business-users/service-setup-guide.md) for third-party integrations
3. **Test Implementation**: Use the [Live Widget Testing Guide](./docs/business-users/live-widget-testing-guide.md) to verify functionality

### Administrator Setup Process  
1. **Initial Configuration**: Complete the [Setup Super Admin Guide](./docs/admins/setup-super-admin.md) for platform access
2. **User Management**: Configure organizational roles and permissions
3. **Support Operations**: Establish the support ticket workflow system

## 🏗️ Project Architecture

```
PassItOn-Admin/
├── 📚 docs/                 # Documentation organized by user role
│   ├── future-developers/   # Technical implementation guides
│   ├── business-users/      # User-facing documentation  
│   ├── admins/             # System administration guides
│   ├── integrations/        # Platform integration documentation
│   └── policies/           # Legal and policy documentation
├── 🚀 app/                 # Next.js 14 App Router structure
│   ├── (dashboard)/        # Protected dashboard routes
│   ├── api/                # Backend API endpoints
│   └── globals.css         # Global styling
├── 🧩 components/          # Reusable React components
│   ├── ui/                 # Base UI components
│   ├── dashboard/          # Dashboard-specific components
│   └── auth/              # Authentication components
├── 📦 lib/                 # Utility libraries and configurations
│   ├── auth/              # Authentication utilities
│   ├── supabase/          # Database client configuration
│   └── stripe/            # Payment processing utilities
└── 🗄️ supabase/           # Database migrations and configuration
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router for optimal performance
- **TypeScript** - Static typing for enhanced code reliability
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Lucide React** - Modern icon library for consistent UI elements

### Backend & Infrastructure
- **Supabase** - PostgreSQL database with real-time capabilities and Row Level Security
- **Clerk** - Complete authentication and user management solution
- **Stripe** - Secure payment processing and subscription management

### Development & Deployment
- **ESLint & Prettier** - Code quality and formatting standards
- **Vercel** - Optimized deployment platform for Next.js applications

## 📞 Getting Help

### Documentation Resources
- **Technical Setup**: Consult our [Developer Documentation](./docs/future-developers/README.md) for installation and configuration support
- **Platform Usage**: Review the [Business User Integration Guide](./docs/business-users/integration-guide.md) for operational questions
- **Administrative Tasks**: Reference the [System Administrator Guide](./docs/admins/setup-super-admin.md) for platform management
- **Platform Integrations**: Explore our [Integration Hub](./docs/integrations/platform-integration-overview.md) for marketplace implementations

### Support Channels
- **Documentation Issues**: Check the relevant documentation section for your role
- **Technical Questions**: Review the troubleshooting guides in the developer section
- **Platform Support**: Use the built-in support ticket system within the dashboard

---

## 📋 Project Status

This is an active production application with comprehensive documentation and ongoing development. All core features are stable and ready for deployment.

**Latest Update**: Enhanced authentication system with comprehensive super admin creation methods and improved security features.

---

*Complete documentation is available in the [documentation directory](./docs/) organized by user role for optimal accessibility.*