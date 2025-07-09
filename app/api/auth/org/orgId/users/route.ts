import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET(
  _request: Request,
  { params }: { params: { orgId: string } }
) {
  const members = await clerkClient.organizations.getOrganizationMembershipList(
    {
      organizationId: params.orgId,
    }
  );
  return NextResponse.json(members);
}

export async function POST(
  request: Request,
  { params }: { params: { orgId: string } }
) {
  const { email } = await request.json();
  const membership =
    await clerkClient.organizations.createOrganizationMembership({
      organizationId: params.orgId,
      emailAddress: email,
      role: "editor",
      publicMetadata: { role: "editor" },
    });
  return NextResponse.json(membership);
}
