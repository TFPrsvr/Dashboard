import { clerkClient } from "@clerk/nextjs/server";

export async function getUserRoleInOrg(orgId: string, userId: string) {
  const m = await clerkClient.organizations.getOrganizationMembership({
    organizationId: orgId,
    userId,
  });
  return m.publicMetadata.role || m.role;
}
