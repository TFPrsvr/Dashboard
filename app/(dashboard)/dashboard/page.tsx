"use client";

import { useOrganization } from "@/hooks/use-organization";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Palette, Heart, TrendingUp, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Widget, Cause } from "@/types/widget.types";

export default function DashboardPage() {
  const { organization, loading } = useOrganization();
  const [widget, setWidget] = useState<Widget | null>(null);
  const [causes, setCauses] = useState<Cause[]>([]);
  const [loadingWidget, setLoadingWidget] = useState(true);

  // Fetch widget data to determine completion status
  useEffect(() => {
    async function fetchWidget() {
      if (!organization?.id) return;
      
      try {
        setLoadingWidget(true);
        const response = await fetch(`/api/widgets`);
        if (response.ok) {
          const widgets = await response.json();
          if (widgets.length > 0) {
            setWidget(widgets[0]);
            
            // Fetch causes for this widget
            const causesResponse = await fetch(`/api/causes?widgetId=${widgets[0].id}`);
            if (causesResponse.ok) {
              const causesData = await causesResponse.json();
              setCauses(causesData || []);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching widget:", error);
      } finally {
        setLoadingWidget(false);
      }
    }

    fetchWidget();
  }, [organization?.id]);

  // Determine step completion status
  const isStep1Complete = widget && (widget.config?.theme || widget.config?.settings);
  const isStep2Complete = causes.length > 0;
  const isStep3Complete = widget?.is_active;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back, {organization?.name}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s an overview of your donation widget performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">
              Start customizing your widget to begin accepting donations
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Widget Status</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Not Active</div>
            <p className="text-xs text-muted-foreground">
              Customize and activate your widget
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Monthly Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">--</div>
            <p className="text-xs text-muted-foreground">
              No data available yet
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Step 1: Customize Widget */}
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            isStep1Complete ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">1. Customize Your Widget</h3>
                {isStep1Complete && <Check className="w-4 h-4 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600">
                {isStep1Complete 
                  ? "Widget customized successfully" 
                  : "Design your donation widget to match your brand"
                }
              </p>
            </div>
            <Link href="/dashboard/widget/customize">
              <Button variant={isStep1Complete ? "outline" : "default"}>
                {isStep1Complete ? "Edit Widget" : "Get Started"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Step 2: Add Causes */}
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            isStep2Complete ? 'bg-green-50 border border-green-200' : 
            isStep1Complete ? 'bg-gray-50' : 'bg-gray-50 opacity-50'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">2. Add Causes</h3>
                {isStep2Complete && <Check className="w-4 h-4 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600">
                {isStep2Complete 
                  ? `${causes.length} cause${causes.length !== 1 ? 's' : ''} added`
                  : isStep1Complete 
                    ? "Create causes for donors to support"
                    : "Complete step 1 first"
                }
              </p>
            </div>
            {isStep1Complete ? (
              <Link href="/dashboard/widget/customize">
                <Button variant={isStep2Complete ? "outline" : "default"}>
                  {isStep2Complete ? "Manage Causes" : "Add Causes"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button disabled>Complete Step 1</Button>
            )}
          </div>

          {/* Step 3: Embed Widget */}
          <div className={`flex items-center justify-between p-4 rounded-lg ${
            isStep3Complete ? 'bg-green-50 border border-green-200' : 
            isStep2Complete ? 'bg-gray-50' : 'bg-gray-50 opacity-50'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">3. Embed Widget</h3>
                {isStep3Complete && <Check className="w-4 h-4 text-green-600" />}
              </div>
              <p className="text-sm text-gray-600">
                {isStep3Complete 
                  ? "Widget is live and accepting donations"
                  : isStep2Complete 
                    ? "Add the widget to your website"
                    : "Complete step 2 first"
                }
              </p>
            </div>
            {isStep2Complete ? (
              <Link href="/dashboard/widget/customize">
                <Button variant={isStep3Complete ? "outline" : "default"}>
                  {isStep3Complete ? "View Widget" : "Embed Widget"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Button disabled>Complete Step 2</Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
