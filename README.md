# PassItOn Admin Dashboard

A multi-tenant admin dashboard for managing donation widgets, organizations, and team members built with Next.js 14, Supabase, and Clerk authentication.

## 📚 Documentation

All documentation has been organized by audience. Please visit the appropriate section:

### 👨‍💻 **Developers**
**[Complete Setup & API Documentation →](./docs/developers/README.md)**

Technical documentation including:
- Installation and environment setup
- Database configuration
- API documentation
- Testing procedures
- Production deployment

### 👩‍💼 **Business Users**
**[Integration & Usage Guide →](./docs/business-users/integration-guide.md)**

Non-technical documentation including:
- Widget customization
- Website integration
- Team management
- Troubleshooting

### 🔐 **System Administrators**
**[Admin Setup Guide →](./docs/admins/setup-super-admin.md)**

Platform administration including:
- Super admin user creation
- System configuration
- User role management

## 🚀 Quick Start

```bash
# Clone and install
git clone <repository-url>
cd PassItOn-Admin
npm install

# Setup environment
cp .env.example .env.local
# Fill in your environment variables

# Start development
npm run dev
```

**For detailed setup instructions, see [Developer Documentation](./docs/developers/README.md)**

## 🏗️ Project Structure

```
PassItOn-Admin/
├── docs/                    # 📚 All documentation organized by audience
│   ├── developers/          # Technical documentation
│   ├── business-users/      # Non-technical user guides
│   └── admins/             # System administration guides
├── app/                    # Next.js 14 App Router
├── components/             # React components
├── lib/                   # Utility libraries
└── supabase/              # Database configuration
```

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and authentication
- **Clerk** - User management
- **Stripe** - Payment processing

## 📞 Support

- **Setup Issues**: See [Developer Documentation](./docs/developers/README.md)
- **Usage Questions**: See [Business User Guide](./docs/business-users/integration-guide.md)  
- **Admin Tasks**: See [Admin Documentation](./docs/admins/setup-super-admin.md)

---

*For complete documentation, please visit the [docs folder](./docs/) and select your role.*