// Safe super admin creation system - only works for authorized team emails
import { supabaseAdmin } from '@/lib/supabase/supabase-server';
import { currentUser } from '@clerk/nextjs/server';

// AUTHORIZED TEAM EMAILS - Use environment variable for better security
const getAuthorizedSuperAdminEmails = (): string[] => {
  // Check environment variable first (most secure)
  const envEmails = process.env.SUPER_ADMIN_EMAILS;
  if (envEmails) {
    return envEmails.split(',').map(email => email.trim().toLowerCase());
  }
  
  // Fallback to hardcoded list
  return [
    'tfortner@banyanlabs.io',
    'thalsell@banyanlabs.io',
    'scallins@banyanlabs.io',
    // Add more team member emails here as needed
  ];
};

// FALLBACK OPTIONS - Choose your preferred method
const ENABLE_FIRST_USER_SUPER_ADMIN = process.env.ENABLE_FIRST_USER_SUPER_ADMIN === 'true'; // If no super admins exist, first user becomes super admin
const FALLBACK_SECRET_KEY = process.env.SUPER_ADMIN_SECRET; // Optional secret for emergency super admin creation
const ENABLE_SECRET_URL_CREATION = process.env.ENABLE_SECRET_URL_CREATION === 'true'; // Allow super admin creation via secret URL

export interface SuperAdminCreationResult {
  success: boolean;
  message: string;
  userRole?: string;
  alreadyExists?: boolean;
}

// Check if email is on the authorized list
export function isAuthorizedForSuperAdmin(email: string): boolean {
  return getAuthorizedSuperAdminEmails().includes(email.toLowerCase());
}

// Create super admin account - only works for authorized emails
export async function createSuperAdminAccount(
  clerkUserId: string, 
  email: string
): Promise<SuperAdminCreationResult> {
  try {
    // Security check - only authorized emails can be super admins
    if (!isAuthorizedForSuperAdmin(email)) {
      return {
        success: false,
        message: `Email ${email} is not authorized for super admin access.`
      };
    }

    // Check if user already exists in database
    const { data: existingUser, error: checkError } = await supabaseAdmin
      .from('users')
      .select('role, email')
      .eq('id', clerkUserId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError;
    }

    // If user already exists, upgrade them to super admin
    if (existingUser) {
      if (existingUser.role === 'super_admin') {
        return {
          success: true,
          message: 'User is already a super admin.',
          userRole: 'super_admin',
          alreadyExists: true
        };
      } else {
        // Upgrade existing user to super admin
        const { error: updateError } = await supabaseAdmin
          .from('users')
          .update({ 
            role: 'super_admin',
            organization_id: null, // Super admins don't belong to specific organizations
            status: 'accepted'
          })
          .eq('id', clerkUserId);

        if (updateError) throw updateError;

        return {
          success: true,
          message: `User ${email} has been upgraded to super admin.`,
          userRole: 'super_admin'
        };
      }
    }

    // Create new super admin user in database
    const { error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        id: clerkUserId,
        email: email,
        role: 'super_admin',
        organization_id: null,
        status: 'accepted',
        created_at: new Date().toISOString()
      });

    if (insertError) throw insertError;

    return {
      success: true,
      message: `Super admin account created successfully for ${email}.`,
      userRole: 'super_admin'
    };

  } catch (error) {
    console.error('Error creating super admin:', error);
    return {
      success: false,
      message: `Failed to create super admin: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Check if any super admins exist in the system
export async function checkSuperAdminExists(): Promise<boolean> {
  try {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('role', 'super_admin')
      .limit(1)
      .single();
    
    return !error && !!data;
  } catch (error) {
    console.error('Error checking for super admins:', error);
    return false;
  }
}

// Auto-create super admin on sign-in (with fallback options)
export async function autoCreateSuperAdminIfAuthorized(): Promise<SuperAdminCreationResult | null> {
  try {
    const user = await currentUser();
    
    if (!user?.id || !user?.emailAddresses?.[0]?.emailAddress) {
      return null;
    }

    const email = user.emailAddresses[0].emailAddress;
    
    // Method 1: Authorized email list (most secure)
    if (isAuthorizedForSuperAdmin(email)) {
      return await createSuperAdminAccount(user.id, email);
    }

    // Method 2: First user becomes super admin (if enabled)
    if (ENABLE_FIRST_USER_SUPER_ADMIN) {
      const superAdminExists = await checkSuperAdminExists();
      if (!superAdminExists) {
        return await createSuperAdminAccount(user.id, email);
      }
    }

    return null;

  } catch (error) {
    console.error('Error in auto super admin creation:', error);
    return null;
  }
}

// Get list of authorized super admin emails (for admin interface)
export function getAuthorizedSuperAdminEmailsList(): string[] {
  return [...getAuthorizedSuperAdminEmails()];
}

// Create super admin with secret key (emergency method)
export async function createSuperAdminWithSecret(
  email: string,
  secretKey: string,
  clerkUserId?: string
): Promise<SuperAdminCreationResult> {
  try {
    // Verify the secret key
    if (!FALLBACK_SECRET_KEY || secretKey !== FALLBACK_SECRET_KEY) {
      return {
        success: false,
        message: 'Invalid secret key. Access denied.'
      };
    }

    // If no clerkUserId provided, this means the user needs to sign in first
    if (!clerkUserId) {
      return {
        success: false,
        message: `Secret key verified for ${email}. User must now sign in with Clerk to complete super admin creation.`
      };
    }

    // Create the super admin account
    return await createSuperAdminAccount(clerkUserId, email);

  } catch (error) {
    return {
      success: false,
      message: `Error with secret key creation: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// Manual super admin creation API endpoint helper
export async function createSuperAdminManually(
  targetEmail: string, 
  requestingUserId: string
): Promise<SuperAdminCreationResult> {
  try {
    // Verify requesting user is already a super admin
    const { data: requestingUser, error } = await supabaseAdmin
      .from('users')
      .select('role')
      .eq('id', requestingUserId)
      .single();

    if (error || requestingUser?.role !== 'super_admin') {
      return {
        success: false,
        message: 'Only existing super admins can create new super admin accounts.'
      };
    }

    // Check if target email is authorized
    if (!isAuthorizedForSuperAdmin(targetEmail)) {
      return {
        success: false,
        message: `Email ${targetEmail} is not on the authorized super admin list. Update the getAuthorizedSuperAdminEmails function or SUPER_ADMIN_EMAILS environment variable to authorize this email.`
      };
    }

    // Note: This would require the target user to sign in with Clerk first
    // to get their Clerk user ID before we can create the database record
    return {
      success: false,
      message: `To create super admin for ${targetEmail}: 1) Add email to the authorized list, 2) Have user sign in with Clerk, 3) Auto-creation will happen on sign-in.`
    };

  } catch (error) {
    return {
      success: false,
      message: `Error creating super admin: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}