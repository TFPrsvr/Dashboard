"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Building, CreditCard, ExternalLink, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/supabase-client";
import { useStripeConnect } from "@/hooks/use-stripe-connect";
import { useToast } from "@/components/ui/use-toast";

interface OrganizationSettingsProps {
  organizationId: string;
}

export function OrganizationSettings({ organizationId }: OrganizationSettingsProps) {
  const { toast } = useToast();
  const { createConnectAccount, checkStatus, loading: stripeLoading } = useStripeConnect();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [stripeStatus, setStripeStatus] = useState<{
    connected: boolean;
    onboardingComplete: boolean;
    requiresAction: boolean;
    actionUrl?: string;
  }>({
    connected: false,
    onboardingComplete: false,
    requiresAction: false,
  });

  const [formData, setFormData] = useState({
    legalName: "",
    displayName: "",
    email: "",
    termsOfServiceUrl: "",
  });

  const fetchOrganization = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", organizationId)
        .single();

      if (error) throw error;

      setFormData({
        legalName: data.legal_name || data.name || "",
        displayName: data.display_name || data.name || "",
        email: data.email || "",
        termsOfServiceUrl: data.terms_of_service_url || "",
      });
    } catch (error) {
      console.error("Error fetching organization:", error);
      toast({
        title: "Error",
        description: "Failed to load organization details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [organizationId, toast]);

  const fetchStripeStatus = useCallback(async () => {
    try {
      const status = await checkStatus(organizationId);
      setStripeStatus({
        connected: !!status.accountId,
        onboardingComplete: status.onboardingComplete,
        requiresAction: status.requiresAction,
        actionUrl: status.actionUrl,
      });
    } catch (error) {
      // No Stripe account yet, which is fine
      setStripeStatus({
        connected: false,
        onboardingComplete: false,
        requiresAction: false,
      });
    }
  }, [organizationId, checkStatus]);

  useEffect(() => {
    fetchOrganization();
    fetchStripeStatus();
  }, [fetchOrganization, fetchStripeStatus]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("organizations")
        .update({
          legal_name: formData.legalName,
          display_name: formData.displayName,
          email: formData.email,
          terms_of_service_url: formData.termsOfServiceUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", organizationId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Organization profile updated successfully",
      });

      fetchOrganization();
    } catch (error) {
      console.error("Error updating organization:", error);
      toast({
        title: "Error",
        description: "Failed to update organization profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleConnectStripe = async () => {
    try {
      await createConnectAccount(organizationId);
    } catch (error) {
      console.error("Error connecting Stripe:", error);
      toast({
        title: "Error",
        description: "Failed to set up Stripe Connect",
        variant: "destructive",
      });
    }
  };

  const handleOpenStripeDashboard = async () => {
    // For Standard accounts, just open the main Stripe dashboard
    window.open("https://dashboard.stripe.com", "_blank");
  };

  if (loading) {
    return <div>Loading organization settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Organization Settings</h1>
        <p className="text-gray-600">Manage your organization profile and payment processing</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">
            <Building className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="w-4 h-4 mr-2" />
            Payment Processing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Organization Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="legal-name">Legal Name *</Label>
                  <Input
                    id="legal-name"
                    value={formData.legalName}
                    onChange={(e) => setFormData(prev => ({ ...prev, legalName: e.target.value }))}
                    placeholder="Your organization's legal name"
                    autoComplete="organization"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Used for official documents and tax purposes
                  </p>
                </div>

                <div>
                  <Label htmlFor="display-name">Display Name *</Label>
                  <Input
                    id="display-name"
                    value={formData.displayName}
                    onChange={(e) => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    placeholder="Name shown to donors"
                    autoComplete="organization"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This name appears on donation widgets
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="email">Contact Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="contact@yourorg.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <Label htmlFor="terms-url">Terms of Service URL</Label>
                <Input
                  id="terms-url"
                  type="url"
                  value={formData.termsOfServiceUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, termsOfServiceUrl: e.target.value }))}
                  placeholder="https://yourorg.com/terms"
                  autoComplete="url"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link to your terms of service (optional, but recommended)
                </p>
              </div>

              <Button 
                onClick={handleSaveProfile} 
                disabled={saving || !formData.legalName || !formData.displayName || !formData.email}
              >
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-900 mb-2">About Payment Processing</h3>
                <p className="text-sm text-blue-800">
                  Connect your Stripe account to receive donations directly from your supporters. 
                  All donation payments are processed securely through Stripe and deposited into your connected account.
                </p>
              </div>

              {!stripeStatus.connected ? (
                <div className="border rounded-lg p-6 text-center">
                  <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Connect Stripe Account</h3>
                  <p className="text-gray-600 mb-4">
                    Connect your Stripe account to start accepting donations. 
                    You&apos;ll be redirected to Stripe to complete the setup process.
                  </p>
                  <Button 
                    onClick={handleConnectStripe} 
                    disabled={stripeLoading}
                    size="lg"
                  >
                    {stripeLoading ? "Connecting..." : "Connect with Stripe"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 border rounded-lg">
                    {stripeStatus.onboardingComplete ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-yellow-500" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">
                        {stripeStatus.onboardingComplete 
                          ? "Stripe Account Connected" 
                          : "Stripe Setup Required"
                        }
                      </p>
                      <p className="text-sm text-gray-600">
                        {stripeStatus.onboardingComplete
                          ? "Your Stripe account is fully set up and ready to accept donations"
                          : "Complete your Stripe onboarding to start accepting donations"
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {stripeStatus.requiresAction && stripeStatus.actionUrl && (
                      <Button
                        onClick={() => window.open(stripeStatus.actionUrl, "_blank")}
                        variant="outline"
                      >
                        Complete Setup
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                    
                    {stripeStatus.onboardingComplete && (
                      <Button
                        onClick={handleOpenStripeDashboard}
                        disabled={stripeLoading}
                        variant="outline"
                      >
                        {stripeLoading ? "Opening..." : "Open Stripe Dashboard"}
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    )}

                    <Button
                      onClick={fetchStripeStatus}
                      variant="ghost"
                      size="sm"
                    >
                      Refresh Status
                    </Button>
                  </div>

                  {stripeStatus.onboardingComplete && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-2">✓ Ready to Accept Donations</h4>
                      <p className="text-sm text-green-800">
                        Your payment processing is set up! Create donation widgets to start receiving contributions from your supporters.
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-3">Payment Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p className="font-medium text-gray-900">Processing</p>
                    <p>Donations are processed securely through Stripe</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Payouts</p>
                    <p>Funds are deposited directly to your connected bank account</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Fees</p>
                    <p>Standard Stripe processing fees apply (2.9% + $0.30 per transaction)</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Tax Reporting</p>
                    <p>Donation records are available for tax and reporting purposes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}