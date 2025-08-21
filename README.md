<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🚀 PassItOn Admin Dashboard</span>

A comprehensive multi-tenant admin dashboard for managing donation widgets, organizations, and team members. Built with modern web technologies including Next.js 14, Supabase, and Clerk authentication for scalable, secure operations.

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">📚 Documentation</span>

Our documentation is organized by user role to provide targeted, relevant information for your needs. Select the appropriate section below:

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">👨‍💻 **Future Developers**</span>
**[Developer Documentation Hub →](./docs/future-developers/README.md)**

Technical documentation for software engineers, DevOps teams, and system integrators:
- **[Developer Documentation Hub](./docs/future-developers/README.md)** - Central navigation for all technical docs
- **[Comprehensive Setup & Deployment Guide](./docs/future-developers/comprehensive-setup-deployment-guide.md)** - Complete setup, Docker, and production deployment
- **[Environment Variables Setup](./docs/future-developers/environment-variables-setup.md)** - Detailed environment configuration reference
- **[Authentication System Guide](./docs/future-developers/authentication-system-guide.md)** - Clerk authentication and super admin setup
- **[API Reference](./docs/future-developers/api-reference.md)** - Complete API documentation
- **[Components Architecture](./docs/future-developers/components-architecture.md)** - Component structure and design patterns
- **[Technical Troubleshooting Guide](./docs/admins/technical-troubleshooting-guide.md)** - Comprehensive technical issue resolution


</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">👩‍💼 **Business Users**</span>
**[Integration & Usage Guide →](./docs/business-users/integration-guide.md)**

User-friendly guides for organization owners, content managers, and end users:
- **[Integration Guide](./docs/business-users/integration-guide.md)** - Complete setup and usage guide for business users
- **[Service Setup Guide](./docs/business-users/service-setup-guide.md)** - Step-by-step third-party service setup (Stripe, Clerk, Supabase)
- **[Live Widget Testing Guide](./docs/business-users/live-widget-testing-guide.md)** - Testing donation widgets in real environments
- **[Support System Guide](./docs/business-users/support-system-guide.md)** - How to use the support ticket system
- **[User Troubleshooting Guide](./docs/business-users/user-troubleshooting-guide.md)** - Visual troubleshooting for common issues

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🔐 **System Administrators**</span>
**[Admin Setup Guide →](./docs/admins/setup-super-admin.md)**

Platform administration guides for system administrators and super users:
- **[Setup Super Admin](./docs/admins/setup-super-admin.md)** - Comprehensive guide for creating and managing super admin users
- **[Support Management Guide](./docs/admins/support-management-guide.md)** - Managing support tickets and user assistance  
- **[Technical Troubleshooting Guide](./docs/admins/technical-troubleshooting-guide.md)** - Comprehensive technical and monitoring troubleshooting
- User role hierarchy and permission management
- Platform security and compliance configuration

</div>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">🔌 **Platform Integrations**</span>
**[Integration Hub →](./docs/integrations/platform-integration-overview.md)**

Comprehensive platform integrations and marketplace implementations:
- **[Platform Integration Overview](./docs/integrations/platform-integration-overview.md)** - Complete integration strategy and roadmap
- **[Shopify Integration](./docs/integrations/shopify/)** - E-commerce marketplace integration
- **[WordPress Plugin](./docs/integrations/wordpress/)** - WordPress.org plugin directory integration
- **[Chrome Extension](./docs/integrations/chrome-extension/)** - Browser extension for universal widget deployment
- **[Drupal Module](./docs/integrations/drupal/)** - Enterprise-grade module for government and institutional sites

</div>

</div>

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🚀 Quick Start</span>

<div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-top: 1rem;">

<span style="font-size: 1.4rem; font-weight: 600;">👨‍💻 Developer Quick Setup</span>
```bash
Clone the repository
git clone <repository-url>
cd PassItOn-Admin

Install dependencies
npm install

Configure environment variables
cp .env.example .env.local
Edit .env.local with your configuration values

Start development server
npm run dev
```

For complete installation and configuration instructions, see our **[Developer Documentation](./docs/future-developers/README.md)**.

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">👩‍💼 Business User Onboarding</span></div>
1. **Start Here**: Review the [Integration Guide](./docs/business-users/integration-guide.md) for platform overview
2. **Configure Services**: Follow the [Service Setup Guide](./docs/business-users/service-setup-guide.md) for third-party integrations
3. **Test Implementation**: Use the [Live Widget Testing Guide](./docs/business-users/live-widget-testing-guide.md) to verify functionality

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔐 Administrator Setup Process</span></div>  
1. **Initial Configuration**: Complete the [Setup Super Admin Guide](./docs/admins/setup-super-admin.md) for platform access
2. **User Management**: Configure organizational roles and permissions
3. **Support Operations**: Establish the support ticket workflow system

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;"><span style="font-size: 1.8rem; font-weight: 700;">🏗️ Project Architecture</span></div>

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

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;"><span style="font-size: 1.8rem; font-weight: 700;">🛠️ Technology Stack</span></div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💻 Frontend</span></div>
- **Next.js 14** - React framework with App Router for optimal performance
- **TypeScript** - Static typing for enhanced code reliability
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Lucide React** - Modern icon library for consistent UI elements

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🏗️ Backend & Infrastructure</span></div>
- **Supabase** - PostgreSQL database with real-time capabilities and Row Level Security
- **Clerk** - Complete authentication and user management solution
- **Stripe** - Secure payment processing for donations

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🚀 Development & Deployment</span></div>
- **ESLint & Prettier** - Code quality and formatting standards
- **Vercel** - Optimized deployment platform for Next.js applications

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;"><span style="font-size: 1.8rem; font-weight: 700;">📞 Getting Help</span></div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📚 Documentation Resources</span></div>
- **Technical Setup**: Consult our [Developer Documentation](./docs/future-developers/README.md) for installation and configuration support
- **Platform Usage**: Review the [Business User Integration Guide](./docs/business-users/integration-guide.md) for operational questions
- **Administrative Tasks**: Reference the [System Administrator Guide](./docs/admins/setup-super-admin.md) for platform management
- **Platform Integrations**: Explore our [Integration Hub](./docs/integrations/platform-integration-overview.md) for marketplace implementations

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;"><span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">💬 Support Channels</span></div>
- **Documentation Issues**: Check the relevant documentation section for your role
- **Technical Questions**: Review the troubleshooting guides in the developer section
- **Platform Support**: Use the built-in support ticket system within the dashboard
- **Direct Contact**: <span style="background: #fef3c7; padding: 2px 6px; border-radius: 4px; border: 2px solid #f59e0b;">**[BANYAN LABS CONTACT EMAIL]**</span>

<div style="background: #fef3c7; border: 2px solid #f59e0b; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
<strong>📋 BANYAN LABS COMPANY INFORMATION TO ADD:</strong><br>
• <strong>[BANYAN LABS COMPANY NAME]</strong><br>
• <strong>[BANYAN LABS BUSINESS ADDRESS]</strong><br>
• <strong>[BANYAN LABS SUPPORT EMAIL]</strong><br>
• <strong>[BANYAN LABS PHONE NUMBER]</strong><br>
• <strong>[BANYAN LABS WEBSITE]</strong>
</div>

---

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;"><span style="font-size: 1.8rem; font-weight: 700;">📋 Project Status</span></div>

This is an active production application with comprehensive documentation and ongoing development. All core features are stable and ready for deployment.

**Latest Update**: Enhanced authentication system with comprehensive super admin creation methods and improved security features.

---

*Complete documentation is available in the [documentation directory](./docs/) organized by user role for optimal accessibility.*