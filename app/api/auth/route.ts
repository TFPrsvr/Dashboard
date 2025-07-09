import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function GET() {
  const orgs = await clerkClient.organizations.getOrganizationList({
    limit: 100,
  });
  return NextResponse.json(orgs);
}

export async function POST(request: Request) {
  const { name, userId } = await request.json();
  const org = await clerkClient.organizations.createOrganization({ name });
  await clerkClient.organizations.createOrganizationMembership({
    organizationId: org.id,
    userId,
    role: "owner",
    publicMetadata: { role: "owner" },
  });
  return NextResponse.json(org);
}
