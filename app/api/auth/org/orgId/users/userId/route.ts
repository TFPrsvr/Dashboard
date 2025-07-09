import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function PUT(
  request: Request,
  { params }: { params: { orgId: string; userId: string } }
) {
  const { role } = await request.json();
  const updated = await clerkClient.organizations.updateOrganizationMembership({
    organizationId: params.orgId,
    userId: params.userId,
    role,
    publicMetadata: { role },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { orgId: string; userId: string } }
) {
  await clerkClient.organizations.removeOrganizationMembership({
    organizationId: params.orgId,
    userId: params.userId,
  });
  return NextResponse.json({ success: true });
}
