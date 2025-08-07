import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import { createSuperAdminWithSecret, createSuperAdminAccount } from '@/lib/auth/super-admin-creation';

export async function POST(request: NextRequest) {
  try {
    const { email, secretKey } = await request.json();

    if (!email || !secretKey) {
      return NextResponse.json(
        { success: false, message: 'Email and secret key are required.' },
        { status: 400 }
      );
    }

    // Get current user if signed in
    const user = await currentUser();
    const clerkUserId = user?.id;

    // Use the secret key method
    const result = await createSuperAdminWithSecret(email, secretKey, clerkUserId);

    if (result.success) {
      return NextResponse.json(result, { status: 200 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Super admin creation API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: `Server error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check if secret URL creation is enabled
export async function GET(request: NextRequest) {
  const enableSecretUrl = process.env.ENABLE_SECRET_URL_CREATION === 'true';
  const hasSecretKey = !!process.env.SUPER_ADMIN_SECRET;

  return NextResponse.json({
    enabled: enableSecretUrl && hasSecretKey,
    message: enableSecretUrl && hasSecretKey 
      ? 'Secret URL super admin creation is enabled' 
      : 'Secret URL super admin creation is disabled or not configured'
  });
}