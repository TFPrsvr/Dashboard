// app/api/org/route.ts
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

export async function GET() {
  // List all orgs for this user
  const { userId } = await clerkClient.sessions.getAuth();
  const memberships =
    await clerkClient.organizations.getOrganizationMembershipList({ userId });
  const orgs = await Promise.all(
    memberships.map((m) =>
      prisma.organization.findUnique({ where: { id: m.organizationId }! })
    )
  );
  return NextResponse.json(orgs.filter(Boolean));
}

export async function POST(request: Request) {
  const { name, userId } = await request.json();
  // 1) Create in Clerk
  const org = await clerkClient.organizations.createOrganization({ name });
  await clerkClient.organizations.createOrganizationMembership({
    organizationId: org.id,
    userId,
    role: "owner",
    publicMetadata: { role: "owner" },
  });
  // 2) Persist in your DB
  const dbOrg = await prisma.organization.create({
    data: { id: org.id, name },
  });
  return NextResponse.json(dbOrg, { status: 201 });
}
