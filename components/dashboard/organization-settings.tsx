"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { Building, CreditCard, ExternalLink, AlertCircle, CheckCircle, DollarSign } from "lucide-react";
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

  const [subscription, setSubscription] = useState<{
    plan: 'free' | 'professional' | 'enterprise';
    status: 'active' | 'canceled' | 'past_due' | 'trialing';
    currentPeriodEnd?: string;
    cancelAtPeriodEnd?: boolean;
  }>({ plan: 'free', status: 'active' });

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

  const fetchSubscription = useCallback(async () => {
    try {
      const response = await fetch(`/api/subscription/${organizationId}`);
      if (response.ok) {
        const data = await response.json();
        setSubscription(data);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    }
  }, [organizationId]);

  useEffect(() => {
    fetchOrganization();
    fetchStripeStatus();
    fetchSubscription();
  }, [fetchOrganization, fetchStripeStatus, fetchSubscription]);

  const handleUpgrade = async (plan: 'professional' | 'enterprise') => {
    try {
      const response = await fetch('/api/subscription/upgrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId, plan })
      });
      
      if (response.ok) {
        const { url } = await response.json();
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error upgrading subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to upgrade subscription',
        variant: 'destructive',
      });
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch('/api/subscription/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ organizationId })
      });
      
      if (response.ok) {
        await fetchSubscription();
        toast({
          title: 'Success',
          description: 'Subscription will be canceled at the end of the billing period',
        });
      } else {
        throw new Error('Failed to cancel subscription');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      toast({
        title: 'Error',
        description: 'Failed to cancel subscription',
        variant: 'destructive',
      });
    }
  };

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
        <p className="text-gray-600">Manage your organization profile and payment settings</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile">
            <Building className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="billing">
            <DollarSign className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="payments">
            <CreditCard className="w-4 h-4 mr-2" />
            Payments
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

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Subscription & Billing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Plan */}
              <div className="border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">{subscription.plan} Plan</h3>
                    <p className="text-sm text-gray-600">
                      Status: <span className="capitalize">{subscription.status}</span>
                    </p>
                    {subscription.currentPeriodEnd && (
                      <p className="text-sm text-gray-600">
                        {subscription.cancelAtPeriodEnd ? 'Ends' : 'Renews'} on{' '}
                        {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {subscription.plan === 'free' && (
                    <div className="text-right">
                      <p className="text-2xl font-bold">$0</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  )}
                  {subscription.plan === 'professional' && (
                    <div className="text-right">
                      <p className="text-2xl font-bold">$39</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  )}
                  {subscription.plan === 'enterprise' && (
                    <div className="text-right">
                      <p className="text-2xl font-bold">$299+</p>
                      <p className="text-sm text-gray-600">per month</p>
                    </div>
                  )}
                </div>

                {/* Plan Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {subscription.plan === 'free' && (
                    <>
                      <div>• 1 donation widget</div>
                      <div>• Up to 50 donations/month</div>
                      <div>• Basic customization</div>
                    </>
                  )}
                  {subscription.plan === 'professional' && (
                    <>
                      <div>• 5 donation widgets</div>
                      <div>• Up to 1,000 donations/month</div>
                      <div>• Advanced customization</div>
                      <div>• Remove PassItOn branding</div>
                      <div>• Priority support</div>
                      <div>• Team collaboration</div>
                    </>
                  )}
                  {subscription.plan === 'enterprise' && (
                    <>
                      <div>• Unlimited widgets</div>
                      <div>• Unlimited donations</div>
                      <div>• White-label solution</div>
                      <div>• Dedicated account manager</div>
                      <div>• Custom integrations</div>
                      <div>• SLA guarantee</div>
                    </>
                  )}
                </div>
              </div>

              {/* Upgrade Options */}
              {subscription.plan === 'free' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Upgrade Your Plan</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-2">Professional</h5>
                      <p className="text-2xl font-bold mb-2">$39<span className="text-sm font-normal">/month</span></p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• 5 donation widgets</li>
                        <li>• Up to 1,000 donations/month</li>
                        <li>• Advanced customization</li>
                        <li>• Remove branding</li>
                      </ul>
                      <Button onClick={() => handleUpgrade('professional')} className="w-full">
                        Upgrade to Professional
                      </Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <h5 className="font-semibold mb-2">Enterprise</h5>
                      <p className="text-2xl font-bold mb-2">$299+<span className="text-sm font-normal">/month</span></p>
                      <ul className="text-sm space-y-1 mb-4">
                        <li>• Unlimited widgets</li>
                        <li>• Unlimited donations</li>
                        <li>• White-label solution</li>
                        <li>• Dedicated support</li>
                      </ul>
                      <Button onClick={() => handleUpgrade('enterprise')} className="w-full">
                        Contact Sales
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Manage Subscription */}
              {subscription.plan !== 'free' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Manage Subscription</h4>
                  <div className="flex gap-4">
                    {!subscription.cancelAtPeriodEnd && (
                      <Button 
                        onClick={handleCancelSubscription}
                        variant="outline"
                      >
                        Cancel Subscription
                      </Button>
                    )}
                    {subscription.cancelAtPeriodEnd && (
                      <Button 
                        onClick={() => {
                          // Reactivate subscription logic
                        }}
                        variant="outline"
                      >
                        Reactivate Subscription
                      </Button>
                    )}
                    <Button 
                      onClick={() => window.open('/api/billing/portal', '_blank')}
                      variant="outline"
                    >
                      Manage Billing
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                          ? "Your Stripe account is fully set up and ready to accept payments"
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
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}