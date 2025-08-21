<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem;">

<span style="font-size: 2.5rem; font-weight: 800;">🧪 PassItOn Admin - Comprehensive Test Cases</span>

</div>

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Environment Setup Tests</span>

</div>

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">📌 1. Development Environment</span>

</div>
- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts development server successfully
- [ ] Environment variables are properly loaded (.env.local)
- [ ] All required environment variables are present:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
  - [ ] `CLERK_SECRET_KEY`
  - [ ] `STRIPE_SECRET_KEY`
  - [ ] `STRIPE_WEBHOOK_SECRET`
  - [ ] `RESEND_API_KEY` (optional)

<div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #7c3aed;">🧪 2. Build & Lint Tests</span>

</div>
- [ ] `npm run build` completes successfully
- [ ] `npm run lint` passes without errors
- [ ] TypeScript compilation succeeds with no type errors
- [ ] All components render without console errors

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Authentication System Tests</span>

</div>

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 3. Clerk Integration</span>

</div>
- [ ] Sign-in page loads correctly
- [ ] User can sign in with valid credentials
- [ ] **ISSUE**: Sign-in auto-redirects to dashboard (currently shows manual button)
- [ ] User can sign up for new account
- [ ] Session persistence works across page refreshes
- [ ] Sign-out functionality works properly
- [ ] Protected routes redirect to sign-in when unauthenticated

<div style="background: rgba(245, 158, 11, 0.1); border-left: 4px solid #f59e0b; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #d97706;">📌 4. User Role Management</span>

</div>
- [ ] Super admin can access all admin features
- [ ] Organization owners can manage their organization
- [ ] Team members have appropriate access levels
- [ ] Role-based sidebar navigation displays correctly
- [ ] API endpoints respect user role permissions

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Database & Supabase Tests</span>

</div>

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">🗄️ 5. Database Schema</span>

</div>
- [ ] All required tables exist in Supabase
- [ ] Row Level Security (RLS) policies are correctly configured
- [ ] Database migrations run successfully
- [ ] Foreign key relationships work properly
- [ ] Indexes are created for performance-critical queries

<div style="background: rgba(220, 38, 38, 0.1); border-left: 4px solid #dc2626; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #b91c1c;">📌 6. Data Operations</span>

</div>
- [ ] Users can create new organizations
- [ ] Organizations can invite team members
- [ ] Widgets can be created and customized
- [ ] Donations are properly recorded
- [ ] User preferences are saved correctly

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Widget System Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 7. Widget Creation & Management</span>

</div>
- [ ] Users can create new donation widgets
- [ ] Widget customization form saves changes
- [ ] Widget preview displays correctly
- [ ] Widget slug generation works (unique, URL-safe)
- [ ] Widget status can be toggled (active/inactive)

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 8. Widget Customization</span>

</div>
- [ ] Theme customization updates preview in real-time
- [ ] Custom colors are applied correctly
- [ ] Text customization works for all fields
- [ ] Reset to default functionality works
- [ ] Changes persist after saving

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 9. Widget Analytics</span>

</div>
- [ ] **ISSUE**: Analytics page loads without errors (currently empty file)
- [ ] Donation data displays correctly in charts
- [ ] Time range filters work (7d, 30d, 90d, 1y)
- [ ] Stats calculations are accurate
- [ ] Export functionality works (if implemented)
- [ ] Refresh button updates data

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Team Management Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 10. Team Invitations</span>

</div>
- [ ] Organization owners can send team invitations
- [ ] Invitation emails are sent (with email service configured)
- [ ] Invitation links are valid and properly formatted
- [ ] Users can accept invitations successfully
- [ ] Invitation tokens expire appropriately
- [ ] Users can decline invitations

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 11. Team Administration</span>

</div>
- [ ] Team page displays all organization members
- [ ] Team member roles can be updated
- [ ] Team members can be removed from organization
- [ ] Only authorized users can manage team settings

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Notification System Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 12. Notification Infrastructure</span>

</div>
- [ ] Notifications table and schema exist
- [ ] Notification preferences can be set per user
- [ ] Email notifications are sent when configured
- [ ] In-app notifications display correctly
- [ ] Notification history is maintained
- [ ] Notification tab appears in sidebar with Bell icon

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 13. Notification Types</span>

</div>
- [ ] Donation received notifications work
- [ ] Goal reached notifications trigger correctly
- [ ] Team member joined notifications are sent
- [ ] Payment failure notifications alert users
- [ ] System alerts reach appropriate audiences

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Payment Integration Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 14. Stripe Connect</span>

</div>
- [ ] Stripe Connect onboarding flow works
- [ ] Organization can connect Stripe account
- [ ] Stripe dashboard opens correctly
- [ ] Payment processing works end-to-end
- [ ] Webhook handling processes events properly

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 15. Donation Processing</span>

</div>
- [ ] Donation forms submit successfully
- [ ] Payment intent creation works
- [ ] Successful donations are recorded in database
- [ ] Failed payments are handled gracefully
- [ ] Donation amounts are calculated correctly (cents conversion)

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Admin Features Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 16. Super Admin Dashboard</span>

</div>
- [ ] All widgets page displays widgets from all organizations
- [ ] **ISSUE**: Widget filtering and search work (React Hook dependency warnings)
- [ ] Organization management features function properly
- [ ] User management capabilities work as expected
- [ ] System statistics are accurate

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 17. Organization Management</span>

</div>
- [ ] Organization profile can be updated
- [ ] **ISSUE**: Organization settings save correctly (React Hook dependency warnings)
- [ ] Organization deletion works (if implemented)
- [ ] Organization data is properly isolated

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 User Interface Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 18. Responsive Design</span>

</div>
- [ ] Layout works on desktop screens (1920px+)
- [ ] Layout works on tablet screens (768-1024px)
- [ ] Layout works on mobile screens (320-768px)
- [ ] Navigation menu collapses appropriately on mobile
- [ ] Forms are usable on all screen sizes

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 19. Accessibility</span>

</div>
- [ ] All interactive elements are keyboard accessible
- [ ] Screen reader compatibility works
- [ ] Color contrast meets WCAG guidelines
- [ ] Form labels are properly associated
- [ ] Error messages are clearly communicated

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Error Handling Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔌 20. API Error Handling</span>

</div>
- [ ] Network errors are handled gracefully
- [ ] Server errors display appropriate messages
- [ ] Loading states are shown during API calls
- [ ] Timeout scenarios are handled
- [ ] Rate limiting errors are handled

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 21. User Input Validation</span>

</div>
- [ ] Form validation prevents invalid submissions
- [ ] Required field validation works
- [ ] Email format validation works
- [ ] URL format validation works
- [ ] Error messages are clear and helpful

<div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Performance Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 22. Loading Performance</span>

</div>
- [ ] Initial page load time is acceptable (<3 seconds)
- [ ] Navigation between pages is smooth
- [ ] Large data sets load without freezing
- [ ] Images and assets load efficiently
- [ ] Lazy loading works where implemented

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 23. Memory & Resources</span>

</div>
- [ ] No memory leaks detected during extended use
- [ ] Event listeners are properly cleaned up
- [ ] Large lists use virtualization if needed
- [ ] API calls are debounced where appropriate

<div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Security Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 24. Authentication Security</span>

</div>
- [ ] JWT tokens are properly validated
- [ ] Session tokens expire appropriately
- [ ] Protected routes require authentication
- [ ] User data is isolated by organization
- [ ] Admin features require proper permissions

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🔒 25. Data Security</span>

</div>
- [ ] SQL injection prevention works
- [ ] XSS protection is in place
- [ ] CSRF tokens are used where needed
- [ ] Sensitive data is not exposed in client code
- [ ] API keys are properly secured

<div style="background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Integration Tests</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 26. Third-Party Services</span>

</div>
- [ ] Clerk authentication integration works
- [ ] Supabase database integration works
- [ ] Stripe payment integration works
- [ ] Email service integration works (if configured)
- [ ] All webhook endpoints respond correctly

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 27. Cross-Browser Compatibility</span>

</div>
- [ ] Chrome (latest version) - full functionality
- [ ] Firefox (latest version) - full functionality
- [ ] Safari (latest version) - full functionality
- [ ] Edge (latest version) - full functionality
- [ ] Mobile Safari (iOS) - core functionality
- [ ] Chrome Mobile (Android) - core functionality

<div style="background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Known Issues to Test/Fix</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 28. Critical Issues</span>

</div>
- [ ] **Sign-in redirect**: Remove manual "Go to Dashboard" button, implement auto-redirect
- [ ] **Analytics page**: Empty file causing build failures
- [ ] **React Hook dependencies**: useEffect warnings in 3 components
- [ ] **Notification system**: Ensure all components integrated properly

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">⚙️ 29. Test Data Setup</span>

</div>
- [ ] Create test organizations with different subscription statuses
- [ ] Create test users with different roles (super_admin, owner, editor)
- [ ] Create test widgets in various states
- [ ] Create test donation records for analytics
- [ ] Create test team invitation scenarios
- [ ] Verify notification system with test data

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 30. Regression Testing</span>

</div>
- [ ] All authentication flows work after changes
- [ ] Widget customization doesn't break after updates
- [ ] Payment integration remains functional
- [ ] Team management features work correctly
- [ ] Admin dashboard maintains functionality
- [ ] Database operations remain secure and fast

---

<div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">🧪 Test Execution Priority</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 P0 - Critical (Must Pass)</span>

</div>
1. User authentication and auto-redirect
2. Database operations and security
3. Payment processing functionality
4. Widget creation and customization

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 P1 - High Priority  </span>

</div>
1. Team invitation system
2. Notification system integration
3. Admin dashboard functionality
4. API endpoint security

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 P2 - Medium Priority</span>

</div>
1. Analytics and reporting
2. UI/UX and responsive design
3. Performance optimization
4. Cross-browser compatibility

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 P3 - Nice to Have</span>

</div>
1. Advanced customization features
2. Extended integrations
3. Advanced analytics
4. Additional security features

---

<div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: white; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">

<span style="font-size: 1.8rem; font-weight: 700;">⚙️ Test Environment Setup</span>

</div>

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Prerequisites</span>

</div>
1. **Database**: Fresh Supabase instance with all migrations
2. **Authentication**: Clerk test environment configured
3. **Payments**: Stripe test mode enabled
4. **Email**: Email service configured or mocked
5. **Environment**: All environment variables set for testing

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">🧪 Test Data Requirements</span>

</div>
1. **Organizations**: 3 test orgs (free, premium, enterprise)
2. **Users**: 5 test users with different roles
3. **Widgets**: 10 test widgets in various states
4. **Donations**: 50 test donation records
5. **Invitations**: 5 pending invitations for testing

<div style="background: rgba(59, 130, 246, 0.1); border-left: 4px solid #3b82f6; padding: 1.5rem; margin: 2rem 0; border-radius: 8px;">

<span style="font-size: 1.5rem; font-weight: 600; color: #1d4ed8;">📌 Cleanup Procedures</span>

</div>
1. Reset test database after each full test run
2. Clear browser cache and local storage
3. Reset test user authentication states
4. Clear any test files or uploads
5. Verify no test data persists in production systems

---

*Branch: feat-test-cases*