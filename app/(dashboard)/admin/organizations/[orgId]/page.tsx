export default function OrganizationDetailPage({
  params,
}: {
  params: { orgId: string };
}) {
  return (
    <div>
      <h1>Organization Details</h1>
      <p>Organization ID: {params.orgId}</p>
    </div>
  );
}