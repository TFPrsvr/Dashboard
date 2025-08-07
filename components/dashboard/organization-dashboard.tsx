"use client";

import { useOrganization } from "@/hooks/use-organization";
import { ErrorPage, LoadingSpinner } from "@/components/ui/error-page";
import { useRouter } from "next/navigation";

export function OrganizationDashboard() {
  const { organization, loading, error, notFound } = useOrganization();
  const router = useRouter();

  // If still loading
  if (loading) {
    return <LoadingSpinner message="Loading organization..." />;
  }

  // If organization not found
  if (notFound) {
    return (
      <ErrorPage 
        title="Organization Not Found"
        message="The organization you're looking for doesn't exist or you don't have access to it."
        actions={[
          { label: "Go to Dashboard", onClick: () => router.push("/dashboard") },
          { label: "Contact Support", href: "mailto:support@passiton.com" }
        ]}
      />
    );
  }

  // If error occurred
  if (error) {
    return (
      <ErrorPage 
        title="Error Loading Organization"
        message={error}
        actions={[
          { label: "Try Again", onClick: () => window.location.reload() },
          { label: "Go Back", onClick: () => router.back() }
        ]}
      />
    );
  }

  // If no organization data (shouldn't happen, but defensive)
  if (!organization) {
    return (
      <ErrorPage 
        title="No Organization Data"
        message="Organization data is missing. Please try refreshing the page."
      />
    );
  }

  // Normal rendering
  return (
    <div className="organization-dashboard">
      <h1>Welcome to {organization.name}</h1>
      {/* Rest of dashboard content */}
    </div>
  );
}