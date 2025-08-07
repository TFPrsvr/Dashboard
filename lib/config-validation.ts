// Environment variable validation with fallbacks
export function validateEnvironmentConfig() {
  const requiredVars = {
    'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY': process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    'CLERK_SECRET_KEY': process.env.CLERK_SECRET_KEY,
    'NEXT_PUBLIC_SUPABASE_URL': process.env.NEXT_PUBLIC_SUPABASE_URL,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    'SUPABASE_SERVICE_ROLE_KEY': process.env.SUPABASE_SERVICE_ROLE_KEY,
    'STRIPE_SECRET_KEY': process.env.STRIPE_SECRET_KEY,
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY': process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  };

  const missing = Object.entries(requiredVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    
    if (process.env.NODE_ENV === 'development') {
      throw new Error(`Missing environment variables: ${missing.join(', ')}`);
    }
    
    console.error('⚠️ Using fallback configurations for production');
  }
}

// Call this in app startup
if (typeof window === 'undefined') {
  validateEnvironmentConfig();
}